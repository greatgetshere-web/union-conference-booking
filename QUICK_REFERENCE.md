# Union Conference 2025 Booking System - Quick Reference Card

## 🔗 Important Links

### **Test System (Available Now)**
- **Booking Page:** https://3000-im144mx7zdzxk9fsi8tqo-53e74426.manusvm.computer
- **Admin Dashboard:** https://3000-im144mx7zdzxk9fsi8tqo-53e74426.manusvm.computer/admin.html

### **Production (After Deployment)**
- **Booking Page:** https://your-domain.com
- **Admin Dashboard:** https://your-domain.com/admin.html

---

## 📅 Conference Details

- **Event:** Union World Conference on Lung Health 2025
- **Dates:** November 18-21, 2025 (Tuesday-Friday)
- **Location:** Copenhagen, Denmark
- **Meeting Times:** 09:00 - 16:00 daily
- **Booth:** [TBD]
- **Total Time Slots:** 56 slots (14 per day × 4 days)

---

## 👥 PHC Team Contacts

- yassir.shuaib@eu.phchd.com (Lead)
- maria.salazardecastro@eu.phchd.com
- atsushi.yanagida@phchd.com
- wenji.yuan@phchd.com
- naofumi.yoda@phchd.com

---

## 📧 Email Campaign Timeline

| When | Action | Template |
|------|--------|----------|
| **Early Oct 2025** | Initial invitation | Template 1 & 2 |
| **Late Oct 2025** | Reminder | Template 3 |
| **Immediate** | Auto-confirmation | Template 4 |
| **Nov 16-17** | Pre-conference | Template 5 |
| **Late Nov** | Follow-up | Template 6 |

---

## 💻 Quick Commands

### **Start Server**
```bash
cd /home/ubuntu/union-booking-system
npm start
```

### **Initialize Database**
```bash
npm run init-db
```

### **Development Mode**
```bash
npm run dev
```

---

## 📊 Admin Dashboard Quick Guide

### **View Bookings**
1. Go to admin.html
2. See statistics at top
3. View table or calendar view
4. Click 👁️ to see details

### **Export Bookings**
1. Click "Export to CSV"
2. Open in Excel
3. Analyze data

### **Cancel Booking**
1. Find booking in table
2. Click ❌ icon
3. Confirm cancellation

### **Filter Bookings**
- Select date from dropdown
- Select status (confirmed/cancelled)
- Click Refresh

---

## 📱 Share Booking Link

### **Create Short URL**
- **Bitly:** bit.ly/union2025-phc
- **TinyURL:** tinyurl.com/phc-union2025

### **Generate QR Code**
- Visit: qr-code-generator.com
- Paste booking URL
- Download and print

---

## 🎯 Target Metrics

- **Email Open Rate:** 50-60%
- **Click-Through Rate:** 20-30%
- **Booking Conversion:** 40-50%
- **Total Bookings Goal:** 200-250

---

## 🔐 Email Setup (Gmail)

1. Enable 2FA on Gmail
2. Generate App Password
3. Create `.env` file:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=yassir.shuaib@eu.phchd.com
SMTP_PASS=your_16_char_password
```
4. Restart server

---

## 🚀 Deploy to Render.com

1. Sign up: render.com
2. New Web Service
3. Connect GitHub or upload files
4. Build: `npm install`
5. Start: `node server/index.js`
6. Add environment variables
7. Deploy!

---

## 📁 Key Files

- **Email Templates:** `Email_Templates.md` (6 templates)
- **User Guide:** `USER_GUIDE.md` (complete manual)
- **Deployment:** `DEPLOYMENT_PACKAGE.md` (setup guide)
- **Database:** `data/bookings.db` (SQLite)
- **Server:** `server/index.js` (main app)

---

## 🆘 Troubleshooting

### **Server Won't Start**
```bash
npm install
npm run init-db
npm start
```

### **Email Not Sending**
- Check `.env` file
- Verify app password
- Test SMTP settings

### **Time Slots Not Loading**
- Check server is running
- Open browser console (F12)
- Check API: /api/timeslots

### **Database Error**
```bash
npm run init-db
```

---

## ✅ Pre-Launch Checklist

- [ ] Test booking flow
- [ ] Configure email (.env)
- [ ] Test email confirmations
- [ ] Update booth number
- [ ] Create short URL
- [ ] Generate QR code
- [ ] Test admin dashboard
- [ ] Export test CSV
- [ ] Test on mobile
- [ ] Prepare contact list (500)
- [ ] Choose email platform
- [ ] Customize templates
- [ ] Schedule campaign
- [ ] Brief PHC team

---

## 🎊 System Features

✅ Interactive calendar (Nov 18-21)  
✅ Flexible durations (15/30/45/60 min)  
✅ Real-time availability  
✅ Auto email confirmations  
✅ Calendar invitations (.ics)  
✅ Admin dashboard  
✅ Export to CSV  
✅ PHC branding  
✅ Mobile responsive  
✅ 6 email templates  
✅ Complete documentation  

---

## 📞 Support

**Questions?** Contact:
- Dr. Yassir Shuaib: yassir.shuaib@eu.phchd.com
- Maria Salazar de Castro: maria.salazardecastro@eu.phchd.com

**Documentation:**
- Full guide: `USER_GUIDE.md`
- Email templates: `Email_Templates.md`
- Deployment: `DEPLOYMENT_PACKAGE.md`

---

**Version:** 1.0.0  
**Created:** November 2, 2025  
**Ready for:** Union Conference 2025, Copenhagen

---

**Print this page and keep it handy!** 📄

