# Union Conference 2025 Booking System - User Guide

## 📋 Table of Contents

1. [System Overview](#system-overview)
2. [Quick Start Guide](#quick-start-guide)
3. [Deployment Instructions](#deployment-instructions)
4. [Configuration](#configuration)
5. [Using the Public Booking Page](#using-the-public-booking-page)
6. [Using the Admin Dashboard](#using-the-admin-dashboard)
7. [Email Campaign Management](#email-campaign-management)
8. [Troubleshooting](#troubleshooting)
9. [Technical Support](#technical-support)

---

## System Overview

The Union Conference 2025 Booking System is a professional web application designed to streamline meeting scheduling at the Union World Conference on Lung Health 2025 in Copenhagen.

### **Key Features:**

✅ **Public Booking Interface**
- Interactive calendar for November 18-21, 2025
- Flexible time slots (15/30/45/60 minutes)
- Real-time availability checking
- Automated email confirmations
- Calendar invitations (.ics files)

✅ **Admin Dashboard**
- View all bookings in table and calendar views
- Export bookings to CSV
- Filter by date and status
- Booking statistics and analytics
- Cancel bookings if needed

✅ **Email Integration**
- Automated confirmation emails
- Calendar invitations
- Admin notifications
- Professional PHC branding

### **Technical Stack:**
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js + Express
- **Database:** SQLite
- **Email:** Nodemailer

---

## Quick Start Guide

### **Prerequisites:**
- Node.js (v14 or higher)
- npm (Node Package Manager)
- Basic command line knowledge

### **Installation Steps:**

1. **Navigate to the project directory:**
```bash
cd /home/ubuntu/union-booking-system
```

2. **Install dependencies (already done):**
```bash
npm install
```

3. **Initialize the database (already done):**
```bash
npm run init-db
```

4. **Start the server:**
```bash
npm start
```

5. **Access the system:**
- **Public Booking Page:** http://localhost:3000
- **Admin Dashboard:** http://localhost:3000/admin.html

---

## Deployment Instructions

### **Option 1: Deploy to a Cloud Platform**

#### **Heroku Deployment:**

1. **Install Heroku CLI:**
```bash
npm install -g heroku
```

2. **Login to Heroku:**
```bash
heroku login
```

3. **Create a new Heroku app:**
```bash
cd /home/ubuntu/union-booking-system
heroku create union-conference-2025
```

4. **Add Procfile:**
```bash
echo "web: node server/index.js" > Procfile
```

5. **Deploy:**
```bash
git init
git add .
git commit -m "Initial commit"
git push heroku master
```

6. **Open your app:**
```bash
heroku open
```

#### **DigitalOcean App Platform:**

1. Connect your GitHub repository
2. Select Node.js environment
3. Set build command: `npm install`
4. Set run command: `node server/index.js`
5. Deploy

#### **AWS Elastic Beanstalk:**

1. Install AWS CLI and EB CLI
2. Initialize EB application
3. Deploy with `eb deploy`

### **Option 2: Deploy to PHC Servers**

Contact your IT department to:
1. Set up a Node.js environment
2. Configure firewall rules
3. Set up SSL certificate
4. Configure domain name

### **Option 3: Use a Simple Hosting Service**

**Recommended Services:**
- **Render.com** (Free tier available)
- **Railway.app** (Simple deployment)
- **Fly.io** (Global deployment)

---

## Configuration

### **Environment Variables**

Create a `.env` file in the project root:

```env
# Server Configuration
PORT=3000
NODE_ENV=production

# Email Configuration (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=yassir.shuaib@eu.phchd.com
SMTP_PASS=your_app_password_here

# Admin Emails (comma-separated)
ADMIN_EMAILS=yassir.shuaib@eu.phchd.com,maria.salazardecastro@eu.phchd.com,atsushi.yanagida@phchd.com,wenji.yuan@phchd.com,naofumi.yoda@phchd.com
```

### **Email Setup**

#### **Using Gmail:**

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password:**
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
   - Use this password in `.env` file

3. **Update `.env` file:**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=yassir.shuaib@eu.phchd.com
SMTP_PASS=your_16_character_app_password
```

#### **Using Microsoft 365:**

```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=yassir.shuaib@eu.phchd.com
SMTP_PASS=your_password
```

#### **Using SendGrid (Recommended for Production):**

1. Sign up at sendgrid.com
2. Create API key
3. Update `.env`:
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your_sendgrid_api_key
```

---

## Using the Public Booking Page

### **For Attendees:**

1. **Visit the booking page:**
   - URL: https://your-domain.com (or http://localhost:3000 for testing)

2. **Select a date:**
   - Click on one of the four conference dates (Nov 18-21)
   - Available time slots will load automatically

3. **Choose a time slot:**
   - Click on an available time slot (green)
   - Booked slots are grayed out

4. **Fill in your information:**
   - Name (required)
   - Email (required)
   - Organization
   - Phone number
   - Meeting duration (15/30/45/60 minutes)
   - Meeting topic
   - Special requests

5. **Confirm booking:**
   - Click "Confirm Booking"
   - Wait for confirmation message
   - Check your email for confirmation and calendar invitation

6. **Save confirmation:**
   - Note your reference number
   - Add calendar invitation to your calendar
   - Print confirmation if needed

### **Sharing the Booking Link:**

Include this link in your emails:
```
https://your-domain.com
```

Or create a short link using:
- Bitly: bit.ly/union2025-phc
- TinyURL: tinyurl.com/phc-union2025

---

## Using the Admin Dashboard

### **Accessing the Dashboard:**

1. **Navigate to:**
   - URL: https://your-domain.com/admin.html

2. **No login required** (for now)
   - For production, consider adding password protection

### **Dashboard Features:**

#### **1. Statistics Overview**
- **Total Bookings:** All bookings created
- **Confirmed:** Active bookings
- **Cancelled:** Cancelled bookings
- **Days with Bookings:** Number of days that have at least one booking

#### **2. Filters**
- **Date Filter:** View bookings for specific dates
- **Status Filter:** Filter by confirmed or cancelled
- **Refresh Button:** Reload all data

#### **3. Bookings Table**
- **View all bookings** in a sortable table
- **Columns:**
  - Reference number
  - Attendee name
  - Organization
  - Email
  - Date
  - Time
  - Duration
  - Topic
  - Status
  - Actions (view details, cancel)

#### **4. Export to CSV**
- Click "Export to CSV" button
- Downloads all bookings as CSV file
- Open in Excel for further analysis

#### **5. Calendar View**
- **Visual representation** of bookings by day
- **Click on any booking** to view details
- **Color-coded** by status

### **Managing Bookings:**

#### **View Booking Details:**
1. Click the 👁️ icon in the Actions column
2. View complete booking information
3. Close modal when done

#### **Cancel a Booking:**
1. Click the ❌ icon in the Actions column
2. Confirm cancellation
3. Booking status changes to "cancelled"
4. Time slot becomes available again

#### **Export Bookings:**
1. Click "Export to CSV" button
2. Save the file
3. Open in Excel/Google Sheets
4. Use for reporting or analysis

---

## Email Campaign Management

### **Campaign Timeline:**

#### **6-8 Weeks Before Conference (Early October 2025):**
- Send initial invitation emails to all previous booth visitors
- Use Template 1 for general contacts
- Use Template 2 for VIP contacts
- Include booking link prominently

#### **2-3 Weeks Before Conference (Late October/Early November):**
- Send reminder emails to those who haven't booked
- Use Template 3
- Emphasize limited availability

#### **Immediately After Booking:**
- Automated confirmation email (Template 4)
- Sent automatically by the system
- Includes calendar invitation

#### **2-3 Days Before Conference (November 16-17):**
- Send pre-conference reminder to all confirmed attendees
- Use Template 5
- Include booth location and directions

#### **1 Week After Conference (Late November):**
- Send thank you and follow-up emails
- Use Template 6
- Personalize based on meeting notes

### **Sending Emails:**

#### **Option 1: Manual Sending (Small Lists)**
1. Open your email client (Outlook, Gmail)
2. Copy email template from `Email_Templates.md`
3. Customize with recipient name and details
4. Replace `[INSERT BOOKING LINK]` with actual link
5. Send to individual or BCC for groups

#### **Option 2: Mail Merge (Medium Lists)**
1. Prepare Excel file with contact list
2. Use Word Mail Merge feature
3. Merge email templates with contact data
4. Send personalized emails in bulk

#### **Option 3: Email Marketing Platform (Large Lists - 500 contacts)**

**Recommended: Mailchimp**

1. **Sign up for Mailchimp:**
   - Free plan: Up to 500 contacts
   - URL: mailchimp.com

2. **Import contact list:**
   - Upload CSV with columns: First Name, Last Name, Email, Organization
   - Segment by previous conference or VIP status

3. **Create email campaign:**
   - Choose "Regular Email Campaign"
   - Select template or paste HTML
   - Customize with booking link

4. **Schedule and send:**
   - Test email first
   - Schedule for optimal time (Tuesday-Thursday, 9-11 AM)
   - Monitor open rates and clicks

5. **Track results:**
   - Open rate (target: 50-60%)
   - Click-through rate (target: 20-30%)
   - Booking conversion rate

### **Best Practices:**

✅ **Personalization:**
- Use recipient's first name
- Reference previous meeting
- Mention specific interests

✅ **Clear Call-to-Action:**
- Make booking link prominent
- Use button or highlighted text
- Repeat link in email

✅ **Mobile-Friendly:**
- Keep subject lines short
- Use responsive design
- Test on mobile devices

✅ **Timing:**
- Send Tuesday-Thursday
- 9-11 AM recipient's timezone
- Avoid Mondays and Fridays

✅ **Follow-Up:**
- Send reminders to non-responders
- Don't spam (max 3 emails)
- Respect unsubscribe requests

---

## Troubleshooting

### **Common Issues:**

#### **1. Server won't start:**
```
Error: Cannot find module 'express'
```
**Solution:**
```bash
cd /home/ubuntu/union-booking-system
npm install
```

#### **2. Database not found:**
```
Error: SQLITE_CANTOPEN: unable to open database file
```
**Solution:**
```bash
npm run init-db
```

#### **3. Email not sending:**
```
Error: Invalid login
```
**Solution:**
- Check SMTP credentials in `.env` file
- Verify app password (not regular password)
- Enable "Less secure app access" if using Gmail

#### **4. Time slots not loading:**
**Solution:**
- Check browser console for errors (F12)
- Verify server is running
- Check API endpoint: http://localhost:3000/api/timeslots

#### **5. Booking fails:**
```
Error: Time slot already booked
```
**Solution:**
- Refresh the page
- Select a different time slot
- Check admin dashboard for conflicts

### **Debug Mode:**

Enable detailed logging:
```bash
NODE_ENV=development npm start
```

Check server logs for errors:
```bash
tail -f server.log
```

---

## Technical Support

### **For Technical Issues:**

**Dr. Yassir Shuaib**
- Email: yassir.shuaib@eu.phchd.com
- Role: Project Lead

**Maria Salazar de Castro**
- Email: maria.salazardecastro@eu.phchd.com
- Role: Coordination

### **For IT/Deployment Support:**

Contact PHC IT Department:
- Deployment assistance
- Server configuration
- Domain setup
- SSL certificates

### **System Files:**

- **Main Application:** `/home/ubuntu/union-booking-system`
- **Database:** `/home/ubuntu/union-booking-system/data/bookings.db`
- **Email Templates:** `/home/ubuntu/union-booking-system/Email_Templates.md`
- **User Guide:** `/home/ubuntu/union-booking-system/USER_GUIDE.md`

---

## Appendix

### **A. Database Schema**

**bookings table:**
- id (INTEGER PRIMARY KEY)
- reference_number (TEXT UNIQUE)
- attendee_name (TEXT)
- attendee_email (TEXT)
- attendee_organization (TEXT)
- attendee_phone (TEXT)
- meeting_date (TEXT)
- meeting_time (TEXT)
- duration (INTEGER)
- meeting_topic (TEXT)
- special_requests (TEXT)
- status (TEXT)
- created_at (DATETIME)
- updated_at (DATETIME)

**time_slots table:**
- id (INTEGER PRIMARY KEY)
- date (TEXT)
- start_time (TEXT)
- end_time (TEXT)
- is_available (INTEGER)
- is_blocked (INTEGER)

**admin_users table:**
- id (INTEGER PRIMARY KEY)
- email (TEXT UNIQUE)
- name (TEXT)
- role (TEXT)
- created_at (DATETIME)

### **B. API Endpoints**

- `GET /api/timeslots` - Get available time slots
- `GET /api/bookings` - Get all bookings (with filters)
- `GET /api/bookings/:reference` - Get single booking
- `POST /api/bookings` - Create new booking
- `DELETE /api/bookings/:reference` - Cancel booking
- `GET /api/export/bookings` - Export bookings to CSV
- `GET /api/stats` - Get booking statistics

### **C. File Structure**

```
union-booking-system/
├── server/
│   ├── index.js           # Main server file
│   └── init-db.js         # Database initialization
├── public/
│   ├── index.html         # Public booking page
│   ├── admin.html         # Admin dashboard
│   ├── styles.css         # Main styles
│   ├── admin-styles.css   # Admin styles
│   ├── script.js          # Booking page JS
│   └── admin-script.js    # Admin dashboard JS
├── data/
│   └── bookings.db        # SQLite database
├── package.json           # Dependencies
├── .env                   # Configuration (create this)
├── Email_Templates.md     # Email templates
└── USER_GUIDE.md          # This file
```

---

## Quick Reference

### **Important URLs:**
- Public Booking: `https://your-domain.com`
- Admin Dashboard: `https://your-domain.com/admin.html`

### **Conference Details:**
- **Event:** Union World Conference on Lung Health 2025
- **Dates:** November 18-21, 2025
- **Location:** Copenhagen, Denmark
- **Meeting Times:** 09:00 - 16:00 daily
- **Booth:** [TBD]

### **Contact List:**
- yassir.shuaib@eu.phchd.com
- maria.salazardecastro@eu.phchd.com
- atsushi.yanagida@phchd.com
- wenji.yuan@phchd.com
- naofumi.yoda@phchd.com

### **Key Commands:**
```bash
# Start server
npm start

# Initialize database
npm run init-db

# Development mode (with auto-reload)
npm run dev
```

---

**Document Version:** 1.0  
**Last Updated:** November 2, 2025  
**System Version:** 1.0.0

---

**Need Help?** Contact Dr. Yassir Shuaib at yassir.shuaib@eu.phchd.com

