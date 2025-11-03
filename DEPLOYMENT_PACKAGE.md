# Union Conference 2025 Booking System - Deployment Package

## 🎉 System Ready for Use!

Your professional booking system for Union Conference 2025 Copenhagen is complete and ready to deploy!

---

## 📦 What's Included

### **1. Complete Web Application**
- ✅ Public booking interface with interactive calendar
- ✅ Admin dashboard for managing bookings
- ✅ Automated email confirmations
- ✅ Calendar invitations (.ics files)
- ✅ Export to CSV functionality
- ✅ PHC Corporation branding throughout

### **2. Email Templates (6 Templates)**
- Initial invitation email
- Personal VIP invitation
- Reminder email
- Automated confirmation
- Pre-conference reminder
- Post-conference follow-up

### **3. Documentation**
- Comprehensive user guide
- Email campaign strategy
- Technical setup instructions
- Troubleshooting guide

### **4. Database**
- Pre-configured with 56 time slots (Nov 18-21, 2025)
- 5 admin users (PHC team)
- Ready for production use

---

## 🚀 Quick Start

### **Option 1: Test Locally (Right Now)**

The system is already running and accessible at:

**🌐 Public Booking Page:**
https://3000-im144mx7zdzxk9fsi8tqo-53e74426.manusvm.computer

**🔧 Admin Dashboard:**
https://3000-im144mx7zdzxk9fsi8tqo-53e74426.manusvm.computer/admin.html

**Try it out:**
1. Visit the booking page
2. Select a date (Nov 18-21, 2025)
3. Choose a time slot
4. Fill in the booking form
5. Submit and see the confirmation

### **Option 2: Deploy to Production**

#### **Recommended: Render.com (Free & Easy)**

1. **Sign up at Render.com**
   - Visit: https://render.com
   - Sign up with GitHub or email

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect GitHub repository (or upload files)

3. **Configure Service**
   - **Name:** union-conference-2025
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `node server/index.js`
   - **Plan:** Free

4. **Add Environment Variables**
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=yassir.shuaib@eu.phchd.com
   SMTP_PASS=your_app_password
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait 2-3 minutes for deployment
   - Your booking system will be live!

#### **Alternative: Railway.app**

1. Visit railway.app
2. Click "Start a New Project"
3. Deploy from GitHub or upload files
4. Add environment variables
5. Deploy (takes 2-3 minutes)

#### **Alternative: Heroku**

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
cd /home/ubuntu/union-booking-system
heroku create union-conference-2025

# Add Procfile
echo "web: node server/index.js" > Procfile

# Deploy
git init
git add .
git commit -m "Initial commit"
git push heroku master

# Open app
heroku open
```

---

## 📧 Email Campaign Setup

### **Step 1: Prepare Contact List**

Create an Excel file with these columns:
- First Name
- Last Name
- Email
- Organization
- Previous Conference (Paris 2023, Seville 2024, etc.)
- VIP Status (Yes/No)

### **Step 2: Choose Email Platform**

**For 500 contacts, recommended: Mailchimp Free Plan**

1. **Sign up:** mailchimp.com
2. **Import contacts:** Upload your Excel file
3. **Create campaign:** Use templates from `Email_Templates.md`
4. **Schedule:** Send 6-8 weeks before conference

### **Step 3: Update Email Templates**

Replace `[INSERT BOOKING LINK]` with your actual booking URL:
- **Test URL:** https://3000-im144mx7zdzxk9fsi8tqo-53e74426.manusvm.computer
- **Production URL:** (Your deployed URL)

### **Step 4: Campaign Timeline**

| When | Action | Template |
|------|--------|----------|
| **Early October 2025** | Initial invitation | Template 1 & 2 |
| **Late October 2025** | Reminder | Template 3 |
| **After booking** | Automated confirmation | Template 4 |
| **November 16-17** | Pre-conference reminder | Template 5 |
| **Late November** | Follow-up | Template 6 |

---

## 🔐 Email Configuration

### **Gmail Setup (Recommended for Testing)**

1. **Enable 2-Factor Authentication**
   - Go to Google Account → Security
   - Turn on 2-Step Verification

2. **Generate App Password**
   - Google Account → Security → 2-Step Verification
   - Scroll to "App passwords"
   - Select "Mail" and generate
   - Copy the 16-character password

3. **Create `.env` file**
   ```bash
   cd /home/ubuntu/union-booking-system
   nano .env
   ```

4. **Add configuration:**
   ```env
   PORT=3000
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=yassir.shuaib@eu.phchd.com
   SMTP_PASS=your_16_character_app_password
   ```

5. **Restart server**
   ```bash
   npm start
   ```

### **SendGrid Setup (Recommended for Production)**

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

## 📊 Admin Dashboard Features

### **Access Admin Dashboard:**
- URL: `https://your-domain.com/admin.html`
- No login required (consider adding password protection for production)

### **Features:**
1. **Statistics Overview**
   - Total bookings
   - Confirmed vs cancelled
   - Days with bookings

2. **Bookings Table**
   - View all bookings
   - Filter by date and status
   - View details
   - Cancel bookings

3. **Calendar View**
   - Visual representation by day
   - Click to view details

4. **Export to CSV**
   - Download all bookings
   - Open in Excel for analysis

---

## 📱 Sharing the Booking Link

### **Short URLs (Recommended)**

Create short, memorable links:

**Bitly:**
1. Visit bitly.com
2. Paste your booking URL
3. Create custom short link: `bit.ly/union2025-phc`

**TinyURL:**
1. Visit tinyurl.com
2. Create: `tinyurl.com/phc-union2025`

### **QR Code**

Generate QR code for:
- Conference materials
- Email signatures
- Posters at booth

Use: qr-code-generator.com

---

## 📁 File Structure

```
union-booking-system/
├── server/
│   ├── index.js              # Main server
│   └── init-db.js            # Database setup
├── public/
│   ├── index.html            # Booking page
│   ├── admin.html            # Admin dashboard
│   ├── styles.css            # Main styles
│   ├── admin-styles.css      # Admin styles
│   ├── script.js             # Booking JS
│   └── admin-script.js       # Admin JS
├── data/
│   └── bookings.db           # SQLite database
├── package.json              # Dependencies
├── Email_Templates.md        # 6 email templates
├── USER_GUIDE.md             # Complete user guide
└── DEPLOYMENT_PACKAGE.md     # This file
```

---

## ✅ Pre-Launch Checklist

### **Before Going Live:**

- [ ] Test booking flow end-to-end
- [ ] Configure email settings (.env file)
- [ ] Test email confirmations
- [ ] Update booth number in emails
- [ ] Create short URL (bit.ly)
- [ ] Generate QR code
- [ ] Test admin dashboard
- [ ] Export test booking to CSV
- [ ] Add SSL certificate (if custom domain)
- [ ] Test on mobile devices
- [ ] Prepare contact list (500 contacts)
- [ ] Choose email platform (Mailchimp)
- [ ] Customize email templates
- [ ] Schedule initial email campaign
- [ ] Brief PHC team on system usage

---

## 🎯 Success Metrics

### **Target Goals:**

| Metric | Target |
|--------|--------|
| Email open rate | 50-60% |
| Click-through rate | 20-30% |
| Booking conversion | 40-50% |
| Total bookings | 200-250 |
| Bookings per day | 50-60 |

### **Track:**
- Daily booking rate
- Most popular time slots
- Peak booking days
- Cancellation rate
- No-show rate (after conference)

---

## 🆘 Support Contacts

### **System Issues:**
- **Dr. Yassir Shuaib:** yassir.shuaib@eu.phchd.com
- **Maria Salazar de Castro:** maria.salazardecastro@eu.phchd.com

### **Technical Support:**
- PHC IT Department
- Deployment assistance
- Server configuration

### **Documentation:**
- **User Guide:** `USER_GUIDE.md`
- **Email Templates:** `Email_Templates.md`
- **This File:** `DEPLOYMENT_PACKAGE.md`

---

## 🎊 You're All Set!

Your Union Conference 2025 Booking System is ready to go!

**Next Steps:**
1. ✅ Test the system (link above)
2. ✅ Deploy to production (Render.com recommended)
3. ✅ Configure email settings
4. ✅ Prepare contact list
5. ✅ Launch email campaign (6-8 weeks before conference)
6. ✅ Monitor bookings via admin dashboard

**Questions?** Contact Dr. Yassir Shuaib at yassir.shuaib@eu.phchd.com

---

**Good luck with Union Conference 2025 in Copenhagen!** 🇩🇰

---

**System Version:** 1.0.0  
**Created:** November 2, 2025  
**Conference Dates:** November 18-21, 2025  
**Location:** Copenhagen, Denmark

