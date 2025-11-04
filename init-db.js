const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../data/bookings.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  // Bookings table
  db.run(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      reference_number TEXT UNIQUE NOT NULL,
      attendee_name TEXT NOT NULL,
      attendee_email TEXT NOT NULL,
      attendee_organization TEXT,
      attendee_phone TEXT,
      meeting_date TEXT NOT NULL,
      meeting_time TEXT NOT NULL,
      duration INTEGER NOT NULL,
      meeting_topic TEXT,
      special_requests TEXT,
      status TEXT DEFAULT 'confirmed',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Time slots table
  db.run(`
    CREATE TABLE IF NOT EXISTS time_slots (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      start_time TEXT NOT NULL,
      end_time TEXT NOT NULL,
      is_available INTEGER DEFAULT 1,
      is_blocked INTEGER DEFAULT 0,
      UNIQUE(date, start_time)
    )
  `);

  // Admin users table
  db.run(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      role TEXT DEFAULT 'admin',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Insert admin users (PHC team)
  const adminUsers = [
    ['yassir.shuaib@eu.phchd.com', 'Dr. Yassir Shuaib'],
    ['maria.salazardecastro@eu.phchd.com', 'Maria Salazar de Castro'],
    ['atsushi.yanagida@phchd.com', 'Atsushi Yanagida'],
    ['wenji.yuan@phchd.com', 'Wenji Yuan'],
    ['naofumi.yoda@phchd.com', 'Naofumi Yoda']
  ];

  const insertAdmin = db.prepare(`
    INSERT OR IGNORE INTO admin_users (email, name) VALUES (?, ?)
  `);

  adminUsers.forEach(([email, name]) => {
    insertAdmin.run(email, name);
  });

  insertAdmin.finalize();

  // Generate time slots for conference dates (18-21 November 2025)
  // Time: 09:00 - 16:00, 30-minute intervals
  const conferenceDates = [
    '2025-11-18',
    '2025-11-19',
    '2025-11-20',
    '2025-11-21'
  ];

  const timeSlots = [];
  const startHour = 9;
  const endHour = 16;

  conferenceDates.forEach(date => {
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const startTime = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
        const endMinute = minute + 30;
        const endHourAdjusted = endMinute >= 60 ? hour + 1 : hour;
        const endMinuteAdjusted = endMinute >= 60 ? 0 : endMinute;
        const endTime = `${String(endHourAdjusted).padStart(2, '0')}:${String(endMinuteAdjusted).padStart(2, '0')}`;
        
        timeSlots.push([date, startTime, endTime]);
      }
    }
  });

  const insertSlot = db.prepare(`
    INSERT OR IGNORE INTO time_slots (date, start_time, end_time) VALUES (?, ?, ?)
  `);

  timeSlots.forEach(([date, start, end]) => {
    insertSlot.run(date, start, end);
  });

  insertSlot.finalize();

  console.log('✅ Database initialized successfully!');
  console.log(`📊 Created ${timeSlots.length} time slots for conference dates`);
  console.log(`👥 Added ${adminUsers.length} admin users`);
});

db.close();

