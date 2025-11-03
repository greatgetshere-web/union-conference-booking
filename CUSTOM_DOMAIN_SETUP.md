# Custom Domain Setup Guide
## PHC-meetings-unionconference.com

This guide will help you set up your custom domain **PHC-meetings-unionconference.com** for the Union Conference 2025 booking system.

---

## 📋 Overview

Your booking system will be accessible at:
- **Main booking page:** https://PHC-meetings-unionconference.com
- **Admin dashboard:** https://PHC-meetings-unionconference.com/admin-login.html

---

## Step 1: Register the Domain

### Option A: Register with Namecheap (Recommended - $8.88/year)

1. **Visit Namecheap.com**
   - Go to: https://www.namecheap.com

2. **Search for domain:**
   - Search: "PHC-meetings-unionconference.com"
   - Check availability

3. **Purchase domain:**
   - Add to cart
   - Complete checkout
   - Cost: ~$8.88/year

### Option B: Register with GoDaddy

1. Visit godaddy.com
2. Search for "PHC-meetings-unionconference.com"
3. Purchase (Cost: ~$11.99/year)

### Option C: Register with Google Domains

1. Visit domains.google.com
2. Search and purchase
3. Cost: ~$12/year

---

## Step 2: Deploy Your Application

### Option A: Deploy to Render.com (Recommended - Free Tier)

#### **2.1 Sign Up for Render**

1. **Visit:** https://render.com
2. **Sign up** with GitHub or email
3. **Verify** your email

#### **2.2 Create New Web Service**

1. Click **"New +"** → **"Web Service"**

2. **Connect Repository:**
   - Option 1: Connect GitHub (if you have the code in GitHub)
   - Option 2: Upload the tar.gz file I provided
   - Option 3: Use Render's Git integration

3. **Configure Service:**
   ```
   Name: union-conference-2025
   Environment: Node
   Region: Choose closest to Copenhagen (Frankfurt or Amsterdam)
   Branch: main
   Build Command: npm install
   Start Command: node server/index.js
   ```

4. **Select Plan:**
   - Choose **"Free"** plan
   - Note: Free tier sleeps after 15 min of inactivity

#### **2.3 Add Environment Variables**

Click **"Environment"** tab and add:

```
PORT=3000
NODE_ENV=production
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=yassir.shuaib@eu.phchd.com
SMTP_PASS=your_gmail_app_password_here
```

#### **2.4 Deploy**

1. Click **"Create Web Service"**
2. Wait 2-3 minutes for deployment
3. You'll get a URL like: `https://union-conference-2025.onrender.com`

---

## Step 3: Connect Custom Domain to Render

### **3.1 Add Custom Domain in Render**

1. **In Render Dashboard:**
   - Go to your web service
   - Click **"Settings"** tab
   - Scroll to **"Custom Domains"**
   - Click **"Add Custom Domain"**

2. **Enter your domain:**
   ```
   PHC-meetings-unionconference.com
   ```

3. **Render will provide DNS records:**
   - You'll see something like:
   ```
   Type: CNAME
   Name: PHC-meetings-unionconference.com
   Value: union-conference-2025.onrender.com
   ```

### **3.2 Configure DNS at Your Domain Registrar**

#### **If using Namecheap:**

1. **Login to Namecheap**
2. **Go to Domain List** → Click **"Manage"** next to your domain
3. **Advanced DNS** tab
4. **Add New Record:**
   ```
   Type: CNAME Record
   Host: @
   Value: union-conference-2025.onrender.com
   TTL: Automatic
   ```

5. **Add WWW subdomain (optional):**
   ```
   Type: CNAME Record
   Host: www
   Value: union-conference-2025.onrender.com
   TTL: Automatic
   ```

6. **Save changes**

#### **If using GoDaddy:**

1. Login to GoDaddy
2. My Products → Domains → DNS
3. Add CNAME record:
   ```
   Type: CNAME
   Name: @
   Value: union-conference-2025.onrender.com
   ```

#### **If using Google Domains:**

1. Login to Google Domains
2. DNS → Custom records
3. Add:
   ```
   Type: CNAME
   Name: @
   Data: union-conference-2025.onrender.com
   ```

### **3.3 Wait for DNS Propagation**

- **Time:** 15 minutes to 48 hours (usually 1-2 hours)
- **Check status:** https://dnschecker.org
- Enter: PHC-meetings-unionconference.com

---

## Step 4: Enable SSL Certificate (HTTPS)

### **Render Automatic SSL:**

1. **In Render Dashboard:**
   - Go to your web service
   - Settings → Custom Domains
   - Render automatically provisions SSL certificate
   - Wait 5-10 minutes

2. **Verify HTTPS:**
   - Visit: https://PHC-meetings-unionconference.com
   - Look for padlock icon in browser

---

## Alternative Deployment Options

### Option B: Deploy to Railway.app

1. **Sign up:** https://railway.app
2. **New Project** → Deploy from GitHub
3. **Add environment variables**
4. **Add custom domain** in Settings
5. **Configure DNS** (same as Render)

### Option C: Deploy to Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
cd /home/ubuntu/union-booking-system
heroku create union-conference-2025

# Add custom domain
heroku domains:add PHC-meetings-unionconference.com

# Get DNS target
heroku domains

# Configure DNS at registrar (use the DNS target provided)

# Deploy
git init
git add .
git commit -m "Initial commit"
git push heroku master
```

---

## Step 5: Verify Everything Works

### **5.1 Test Public Booking Page**

1. Visit: https://PHC-meetings-unionconference.com
2. Select a date
3. Choose a time slot
4. Fill in booking form
5. Submit and verify confirmation

### **5.2 Test Admin Dashboard**

1. Visit: https://PHC-meetings-unionconference.com/admin-login.html
2. Enter one of the authorized emails:
   - yassir.shuaib@eu.phchd.com
   - maria.salazardecastro@eu.phchd.com
   - atsushi.yanagida@phchd.com
   - wenji.yuan@phchd.com
   - naofumi.yoda@phchd.com
3. Verify access granted
4. Check dashboard loads correctly

### **5.3 Test Email Confirmations**

1. Make a test booking
2. Check email inbox
3. Verify confirmation email received
4. Check calendar invitation (.ics file)

---

## Step 6: Share the Booking Link

### **Your Final URLs:**

**Public Booking Page:**
```
https://PHC-meetings-unionconference.com
```

**Admin Dashboard:**
```
https://PHC-meetings-unionconference.com/admin-login.html
```

### **Share with PHC Team:**

Send this email to:
- maria.salazardecastro@eu.phchd.com
- atsushi.yanagida@phchd.com
- wenji.yuan@phchd.com
- naofumi.yoda@phchd.com

```
Subject: Union Conference 2025 - Booking System Ready

Dear Team,

Our booking system for Union Conference 2025 is now live!

PUBLIC BOOKING PAGE:
https://PHC-meetings-unionconference.com

ADMIN DASHBOARD:
https://PHC-meetings-unionconference.com/admin-login.html

Your email is authorized to access the admin dashboard. Simply enter your PHC email address to login.

Conference Details:
- Dates: November 18-21, 2025
- Location: Copenhagen, Denmark
- Meeting Times: 09:00 - 16:00 daily

Please test the system and let me know if you have any questions.

Best regards,
Dr. Yassir Shuaib
```

---

## Step 7: Email Campaign Setup

### **Update Email Templates:**

Replace all instances of:
```
[INSERT BOOKING LINK]
```

With:
```
https://PHC-meetings-unionconference.com
```

### **Create Short Link (Optional):**

For easier sharing in emails:

1. **Visit Bitly:**
   - Go to: https://bitly.com
   - Sign up (free)
   - Shorten: PHC-meetings-unionconference.com
   - Create custom: bit.ly/union2025

2. **Use in emails:**
   ```
   Book your meeting: https://bit.ly/union2025
   ```

---

## Troubleshooting

### **Domain not working after 24 hours:**

1. **Check DNS settings:**
   - Visit: https://dnschecker.org
   - Enter: PHC-meetings-unionconference.com
   - Verify CNAME record points to Render

2. **Verify CNAME record:**
   ```
   Type: CNAME
   Host: @
   Value: union-conference-2025.onrender.com
   ```

3. **Clear DNS cache:**
   ```bash
   # Windows
   ipconfig /flushdns
   
   # Mac
   sudo dscacheutil -flushcache
   
   # Linux
   sudo systemd-resolve --flush-caches
   ```

### **SSL certificate not working:**

1. Wait 10-15 minutes after DNS propagation
2. In Render dashboard, go to Settings → Custom Domains
3. Click "Refresh SSL" if available
4. Contact Render support if still not working

### **Admin login not working:**

1. Clear browser cache and cookies
2. Try incognito/private mode
3. Verify email is exactly one of the 5 authorized emails
4. Check browser console for errors (F12)

### **Emails not sending:**

1. Verify SMTP settings in Render environment variables
2. Check Gmail app password is correct
3. Test SMTP connection
4. Consider using SendGrid for production

---

## Cost Summary

### **Annual Costs:**

| Item | Cost | Provider |
|------|------|----------|
| Domain registration | $8.88/year | Namecheap |
| Hosting (Free tier) | $0/month | Render.com |
| SSL Certificate | $0 | Included |
| Email (Gmail) | $0 | Free |
| **Total Year 1** | **$8.88** | |

### **Optional Upgrades:**

| Item | Cost | When Needed |
|------|------|-------------|
| Render Pro (no sleep) | $7/month | High traffic |
| SendGrid Email | $15/month | 40,000+ emails |
| Premium domain privacy | $2.88/year | Privacy protection |

---

## Security Checklist

- [x] Admin dashboard requires authentication
- [x] Only 5 authorized PHC emails can access admin
- [x] SSL certificate enabled (HTTPS)
- [x] Session expires after 24 hours
- [ ] Configure email SMTP with app password (not regular password)
- [ ] Enable domain privacy protection
- [ ] Set up regular database backups
- [ ] Monitor for suspicious activity

---

## Maintenance

### **Regular Tasks:**

**Weekly:**
- Check admin dashboard for new bookings
- Export bookings to CSV for backup

**Monthly:**
- Review booking statistics
- Check email delivery rates
- Verify domain renewal date

**Before Conference:**
- Export all bookings
- Print schedule
- Brief booth team

---

## Support

### **Domain Issues:**
- Namecheap Support: https://www.namecheap.com/support/
- GoDaddy Support: https://www.godaddy.com/help

### **Hosting Issues:**
- Render Support: https://render.com/docs
- Render Community: https://community.render.com

### **Application Issues:**
- Dr. Yassir Shuaib: yassir.shuaib@eu.phchd.com
- Maria Salazar de Castro: maria.salazardecastro@eu.phchd.com

---

## Quick Reference

### **Important URLs:**

- **Domain Registrar:** https://www.namecheap.com
- **Hosting Platform:** https://render.com
- **DNS Checker:** https://dnschecker.org
- **SSL Checker:** https://www.sslshopper.com/ssl-checker.html
- **Short URL Creator:** https://bitly.com

### **DNS Configuration:**

```
Type: CNAME
Host: @
Value: union-conference-2025.onrender.com
TTL: Automatic
```

### **Authorized Admin Emails:**

1. yassir.shuaib@eu.phchd.com
2. maria.salazardecastro@eu.phchd.com
3. atsushi.yanagida@phchd.com
4. wenji.yuan@phchd.com
5. naofumi.yoda@phchd.com

---

**Document Version:** 1.0  
**Last Updated:** November 2, 2025  
**Domain:** PHC-meetings-unionconference.com  
**Conference:** Union Conference 2025, Copenhagen

