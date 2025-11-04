const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');
const ics = require('ics');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

// Database connection
const dbPath = '/tmp/bookings.db';
const db = new sqlite3.Database(dbPath);

// Email configuration (to be configured with actual SMTP settings)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || ''
  }
});

// Helper function to generate reference number
function generateReferenceNumber() {
  return 'UC2025-' + uuidv4().substring(0, 8).toUpperCase();
}

// Helper function to generate calendar invitation
function generateCalendarInvite(booking) {
  const [year, month, day] = booking.meeting_date.split('-').map(Number);
  const [hour, minute] = booking.meeting_time.split(':').map(Number);
  
  const event = {
    start: [year, month, day, hour, minute],
    duration: { minutes: booking.duration },
    title: `Union Conference 2025 Meeting - ${booking.attendee_name}`,
    description: `Meeting with PHC Corporation at Union Conference 2025\\n\\nTopic: ${booking.meeting_topic || 'General Discussion'}\\n\\nBooth Location: TBD\\n\\nReference: ${booking.reference_number}`,
    location: 'PHC Corporation Booth, Union Conference 2025, Copenhagen',
    status: 'CONFIRMED',
    organizer: { name: 'PHC Corporation', email: 'yassir.shuaib@eu.phchd.com' },
    attendees: [
      { name: booking.attendee_name, email: booking.attendee_email, rsvp: true }
    ]
  };

  return new Promise((resolve, reject) => {
    ics.createEvent(event, (error, value) => {
      if (error) reject(error);
      else resolve(value);
    });
  });
}

// API Routes

// Get available time slots
app.get('/api/timeslots', (req, res) => {
  const { date } = req.query;
  
  let query = `
    SELECT ts.*, 
           (SELECT COUNT(*) FROM bookings b 
            WHERE b.meeting_date = ts.date 
            AND b.meeting_time = ts.start_time 
            AND b.status = 'confirmed') as booked_count
    FROM time_slots ts
    WHERE ts.is_blocked = 0
  `;
  
  const params = [];
  if (date) {
    query += ' AND ts.date = ?';
    params.push(date);
  }
  
  query += ' ORDER BY ts.date, ts.start_time';
  
  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    // Mark slots as available if not booked
    const slots = rows.map(slot => ({
      ...slot,
      is_available: slot.booked_count === 0 && slot.is_available === 1
    }));
    
    res.json(slots);
  });
});

// Get all bookings (admin only)
app.get('/api/bookings', (req, res) => {
  const { date, status } = req.query;
  
  let query = 'SELECT * FROM bookings WHERE 1=1';
  const params = [];
  
  if (date) {
    query += ' AND meeting_date = ?';
    params.push(date);
  }
  
  if (status) {
    query += ' AND status = ?';
    params.push(status);
  }
  
  query += ' ORDER BY meeting_date, meeting_time';
  
  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Get single booking by reference number
app.get('/api/bookings/:reference', (req, res) => {
  const { reference } = req.params;
  
  db.get(
    'SELECT * FROM bookings WHERE reference_number = ?',
    [reference],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!row) {
        return res.status(404).json({ error: 'Booking not found' });
      }
      res.json(row);
    }
  );
});

// Create new booking
app.post('/api/bookings', async (req, res) => {
  const {
    attendee_name,
    attendee_email,
    attendee_organization,
    attendee_phone,
    meeting_date,
    meeting_time,
    duration,
    meeting_topic,
    special_requests
  } = req.body;

  // Validate required fields
  if (!attendee_name || !attendee_email || !meeting_date || !meeting_time || !duration) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Check if time slot is available
  db.get(
    `SELECT COUNT(*) as count FROM bookings 
     WHERE meeting_date = ? AND meeting_time = ? AND status = 'confirmed'`,
    [meeting_date, meeting_time],
    async (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      if (row.count > 0) {
        return res.status(409).json({ error: 'Time slot already booked' });
      }

      // Generate reference number
      const reference_number = generateReferenceNumber();

      // Insert booking
      db.run(
        `INSERT INTO bookings (
          reference_number, attendee_name, attendee_email, attendee_organization,
          attendee_phone, meeting_date, meeting_time, duration, meeting_topic,
          special_requests, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'confirmed')`,
        [
          reference_number, attendee_name, attendee_email, attendee_organization,
          attendee_phone, meeting_date, meeting_time, duration, meeting_topic,
          special_requests
        ],
        async function(err) {
          if (err) {
            return res.status(500).json({ error: err.message });
          }

          const booking = {
            id: this.lastID,
            reference_number,
            attendee_name,
            attendee_email,
            attendee_organization,
            attendee_phone,
            meeting_date,
            meeting_time,
            duration,
            meeting_topic,
            special_requests,
            status: 'confirmed'
          };

          // Generate calendar invitation
          try {
            const calendarInvite = await generateCalendarInvite(booking);
            
            // Send confirmation email (if SMTP is configured)
            if (process.env.SMTP_USER) {
              const mailOptions = {
                from: '"PHC Corporation" <yassir.shuaib@eu.phchd.com>',
                to: attendee_email,
                cc: 'yassir.shuaib@eu.phchd.com',
                subject: `Meeting Confirmed - Union Conference 2025 | ${reference_number}`,
                html: `
                  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #003D5C 0%, #005A7F 100%); color: white; padding: 20px; text-align: center;">
                      <h1 style="margin: 0;">Meeting Confirmed</h1>
                      <p style="margin: 10px 0 0 0;">Union Conference 2025, Copenhagen</p>
                    </div>
                    
                    <div style="padding: 30px; background: #f8f9fa;">
                      <p>Dear ${attendee_name},</p>
                      
                      <p>Thank you for scheduling a meeting with PHC Corporation at the Union Conference 2025 in Copenhagen!</p>
                      
                      <div style="background: white; padding: 20px; border-left: 4px solid #FF6B6B; margin: 20px 0;">
                        <h3 style="margin-top: 0; color: #003D5C;">Meeting Details</h3>
                        <p><strong>Reference Number:</strong> ${reference_number}</p>
                        <p><strong>Date:</strong> ${meeting_date}</p>
                        <p><strong>Time:</strong> ${meeting_time}</p>
                        <p><strong>Duration:</strong> ${duration} minutes</p>
                        <p><strong>Topic:</strong> ${meeting_topic || 'General Discussion'}</p>
                      </div>
                      
                      <p><strong>Location:</strong> PHC Corporation Booth, Union Conference 2025, Copenhagen</p>
                      
                      <p>We look forward to discussing PATHFAST TB-LAM technology and our 6 posters and presentations at the conference.</p>
                      
                      <p>If you need to reschedule or cancel, please contact us at yassir.shuaib@eu.phchd.com</p>
                      
                      <p>Best regards,<br>
                      PHC Corporation Team</p>
                    </div>
                    
                    <div style="background: #003D5C; color: white; padding: 15px; text-align: center; font-size: 12px;">
                      <p style="margin: 0;">PHC Corporation | Union Conference 2025</p>
                    </div>
                  </div>
                `,
                icalEvent: {
                  content: calendarInvite,
                  method: 'REQUEST'
                }
              };

              await transporter.sendMail(mailOptions);
            }
          } catch (emailError) {
            console.error('Email error:', emailError);
            // Continue even if email fails
          }

          res.status(201).json(booking);
        }
      );
    }
  );
});

// Cancel booking
app.delete('/api/bookings/:reference', (req, res) => {
  const { reference } = req.params;
  
  db.run(
    `UPDATE bookings SET status = 'cancelled', updated_at = CURRENT_TIMESTAMP 
     WHERE reference_number = ?`,
    [reference],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Booking not found' });
      }
      res.json({ message: 'Booking cancelled successfully' });
    }
  );
});

// Export bookings to CSV (admin only)
app.get('/api/export/bookings', (req, res) => {
  db.all(
    'SELECT * FROM bookings ORDER BY meeting_date, meeting_time',
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      // Convert to CSV
      const headers = Object.keys(rows[0] || {}).join(',');
      const csvRows = rows.map(row => 
        Object.values(row).map(val => `"${val}"`).join(',')
      );
      const csv = [headers, ...csvRows].join('\n');
      
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=bookings.csv');
      res.send(csv);
    }
  );
});

// Get booking statistics
app.get('/api/stats', (req, res) => {
  db.get(
    `SELECT 
      COUNT(*) as total_bookings,
      COUNT(CASE WHEN status = 'confirmed' THEN 1 END) as confirmed,
      COUNT(CASE WHEN status = 'cancelled' THEN 1 END) as cancelled,
      COUNT(DISTINCT meeting_date) as days_with_bookings
     FROM bookings`,
    [],
    (err, stats) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(stats);
    }
  );
});

// Serve frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Union Conference 2025 Booking System running on port ${PORT}`);
  console.log(`📅 Conference dates: 18-21 November 2025`);
  console.log(`🌐 Access at: http://localhost:${PORT}`);
});

