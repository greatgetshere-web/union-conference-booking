# GoDaddy Setup Guide
## Connect PHC-meetings-unionconference.com to Your Booking System

**Total Time:** 30 minutes + 1-2 hours wait  
**Total Cost:** $11.99/year (GoDaddy domain) + $0 (Render hosting)

---

## Overview: What We're Doing

We need **THREE steps**:

1. **Buy domain on GoDaddy** → Get PHC-meetings-unionconference.com
2. **Deploy website on Render** → Host your booking system (FREE)
3. **Connect them together** → Make the domain point to your website

---

## STEP 1: Buy Domain on GoDaddy (15 minutes, $11.99)

### 1.1 Go to GoDaddy

1. Open your web browser
2. Go to: **https://www.godaddy.com**
3. You'll see the GoDaddy homepage

### 1.2 Search for Your Domain

1. In the big search box, type:
   ```
   PHC-meetings-unionconference.com
   ```

2. Click **"Search Domain"** button

3. You'll see if it's available:
   - ✅ **Available** → Great! You'll see the price
   - ❌ **Taken** → Try alternatives like:
     - PHC-union-meetings.com
     - PHC-union2025.com
     - unionconference-phc.com

### 1.3 Add to Cart

1. Click **"Add to Cart"** next to the .com domain

2. You'll see the price: Usually **$11.99** for first year

3. **Important:** GoDaddy will try to sell you extras:
   - ❌ **Domain Privacy** - Skip for now (you can add later)
   - ❌ **Professional Email** - Not needed
   - ❌ **Website Builder** - Not needed (you already have one!)
   - ❌ **SSL Certificate** - Not needed (Render provides free SSL)

4. Click **"Continue to Cart"**

### 1.4 Create Account & Checkout

1. **If you don't have a GoDaddy account:**
   - Click **"Create Account"**
   - Enter your email
   - Create a password
   - Click "Create Account"

2. **If you already have an account:**
   - Click **"Sign In"**
   - Enter your credentials

3. **Review your cart:**
   - Should show: PHC-meetings-unionconference.com - $11.99
   - Remove any extras you don't want

4. **Checkout:**
   - Click **"Proceed to Checkout"**
   - Enter payment information
   - Click **"Complete Purchase"**

### 1.5 Confirmation

1. You'll see a confirmation page
2. You'll receive a confirmation email
3. The domain is now yours!

**✅ STEP 1 COMPLETE!** Keep GoDaddy tab open - we'll need it later.

---

## STEP 2: Deploy Your Website on Render.com (15 minutes, FREE)

### 2.1 Sign Up for Render

1. Open a new tab
2. Go to: **https://render.com**
3. Click **"Get Started"** button
4. Sign up with:
   - **Recommended:** GitHub account
   - **Alternative:** Email address

5. Verify your email if using email signup

### 2.2 Create New Web Service

1. In Render Dashboard, click **"New +"** button (top right)
2. Select **"Web Service"** from dropdown

### 2.3 Connect Your Code

**For now, I'll provide you with a GitHub repository:**

I'll create a public GitHub repository with your booking system code, then you can:

1. Click **"Public Git repository"**
2. Enter the repository URL I'll provide
3. Click **"Connect"**

**Alternative:** I can help you upload the code directly.

### 2.4 Configure Web Service

Fill in these settings:

**Name:**
```
union-conference-2025
```

**Region:**
```
Frankfurt (EU Central)
```
(Closest to Copenhagen)

**Branch:**
```
main
```

**Root Directory:**
```
(leave blank)
```

**Build Command:**
```
npm install
```

**Start Command:**
```
node server/index.js
```

**Plan:**
```
Free
```
(Select the Free tier - $0/month)

### 2.5 Add Environment Variables

**IMPORTANT:** Click **"Advanced"** to expand environment variables section.

Add these variables one by one:

| Key | Value |
|-----|-------|
| `PORT` | `3000` |
| `NODE_ENV` | `production` |
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | `yassir.shuaib@eu.phchd.com` |
| `SMTP_PASS` | `[YOUR_GMAIL_APP_PASSWORD]` |

**To get Gmail App Password:**

1. Go to: https://myaccount.google.com/security
2. Enable **"2-Step Verification"** if not already on
3. Go to: https://myaccount.google.com/apppasswords
4. Select **"Mail"** and **"Other"**
5. Name it: "Union Conference Booking"
6. Click **"Generate"**
7. Copy the 16-character password (format: xxxx xxxx xxxx xxxx)
8. Paste as `SMTP_PASS` value (remove spaces)

### 2.6 Deploy

1. Click **"Create Web Service"** button at bottom
2. Wait 2-3 minutes while Render builds your app
3. You'll see logs scrolling - this is normal!
4. When complete, you'll see:
   ```
   ✅ Your service is live at:
   https://union-conference-2025.onrender.com
   ```

5. **Click the URL** to test your booking system!

**✅ STEP 2 COMPLETE!** Your website is now live on Render.

---

## STEP 3: Connect GoDaddy Domain to Render (10 minutes)

Now we connect your GoDaddy domain to your Render website.

### 3.1 Get CNAME Information from Render

1. In your Render Dashboard, go to your web service
2. Click **"Settings"** tab (left sidebar)
3. Scroll to **"Custom Domains"** section
4. Click **"Add Custom Domain"**

5. Enter your domain:
   ```
   PHC-meetings-unionconference.com
   ```

6. Click **"Add"** button

7. Render will show you:
   ```
   Add this CNAME record to your DNS:
   
   Type: CNAME
   Name: @
   Value: union-conference-2025.onrender.com
   ```

8. **IMPORTANT:** Write down or copy:
   ```
   union-conference-2025.onrender.com
   ```

**Keep this Render tab open!**

### 3.2 Configure DNS in GoDaddy

1. Go back to your **GoDaddy tab**
2. If you closed it:
   - Go to: https://www.godaddy.com
   - Sign in
   - Click **"My Products"**

3. Find your domain: **PHC-meetings-unionconference.com**

4. Click the **three dots** (⋯) next to it

5. Click **"Manage DNS"**

### 3.3 Add CNAME Record in GoDaddy

You'll see a table with DNS records. Now we'll add a new one:

**Step A: Remove Default Records (if any)**

1. Look for any records with Type "A" or "CNAME" and Name "@"
2. Click the **pencil icon** (edit) or **trash icon** (delete)
3. Delete or disable them
4. This clears the way for our new record

**Step B: Add New CNAME Record**

1. Click **"Add"** button (or "Add New Record")

2. Fill in the form:
   - **Type:** Select **"CNAME"** from dropdown
   - **Name:** Type `@`
   - **Value:** Type `union-conference-2025.onrender.com`
   - **TTL:** Select **"1 Hour"** (or leave as default)

3. Click **"Save"** button

**Step C: Add WWW Subdomain (Optional but Recommended)**

1. Click **"Add"** button again

2. Fill in:
   - **Type:** **"CNAME"**
   - **Name:** `www`
   - **Value:** `union-conference-2025.onrender.com`
   - **TTL:** **"1 Hour"**

3. Click **"Save"**

### 3.4 Save Changes

1. Look for a **"Save"** or **"Save All Changes"** button at the top
2. Click it to confirm all changes
3. You'll see a confirmation message

**✅ STEP 3 COMPLETE!** Domain and hosting are connected.

---

## STEP 4: Wait for DNS Propagation (1-2 hours)

### What's Happening?

The internet is updating to know that your domain points to Render. This is called "DNS propagation."

### How Long?

- **Minimum:** 15-30 minutes
- **Typical:** 1-2 hours
- **Maximum:** 24-48 hours (rare)

### Check Progress:

1. Go to: **https://dnschecker.org**
2. Enter: `PHC-meetings-unionconference.com`
3. Select: **"CNAME"** from dropdown
4. Click **"Search"**

You'll see a world map:
- ✅ **Green checkmarks** = Working in that location
- ❌ **Red X** = Not propagated yet

**Wait until most locations show green checkmarks.**

### Meanwhile, You Can:

- ☕ Take a break
- 📧 Prepare your email templates
- 📋 Update your contact list (500 people)
- 📊 Plan your email campaign timeline

---

## STEP 5: Verify Everything Works

### After 1-2 Hours:

### Test 1: Visit Your Domain

1. Open a new browser tab (or incognito mode)
2. Go to: **https://PHC-meetings-unionconference.com**
3. You should see your booking system!

**If you see an error:**
- Wait another 30-60 minutes
- Clear browser cache: Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac)
- Try incognito/private mode
- Check dnschecker.org again

### Test 2: Check SSL Certificate (HTTPS)

1. Look at the address bar
2. You should see: 🔒 **https**://PHC-meetings-unionconference.com
3. Click the padlock icon
4. Should say: "Connection is secure"

**If no padlock yet:**
- Wait 10-15 more minutes
- Render automatically provisions SSL (free)
- Refresh the page

### Test 3: Make a Test Booking

1. Select a date (Nov 18-21, 2025)
2. Choose a time slot
3. Fill in test information:
   - Name: Test User
   - Email: your.email@test.com
   - Organization: Test Org
   - Duration: 30 minutes
4. Click **"Book Meeting"**
5. You should see confirmation
6. Check your email for confirmation message

### Test 4: Test Admin Dashboard

1. Go to: **https://PHC-meetings-unionconference.com/admin-login.html**
2. Enter: `yassir.shuaib@eu.phchd.com`
3. Click **"Access Admin Dashboard"**
4. You should be logged in!
5. Verify your test booking appears in the dashboard

**✅ EVERYTHING WORKING!** Your custom domain is live!

---

## STEP 6: Share with PHC Team

### Send This Email:

**To:**
- maria.salazardecastro@eu.phchd.com
- atsushi.yanagida@phchd.com
- wenji.yuan@phchd.com
- naofumi.yoda@phchd.com

**Subject:** Union Conference 2025 - Booking System is Live!

**Body:**
```
Dear Team,

Great news! Our booking system for Union Conference 2025 is now live!

🌐 PUBLIC BOOKING PAGE:
https://PHC-meetings-unionconference.com

🔐 ADMIN DASHBOARD:
https://PHC-meetings-unionconference.com/admin-login.html

To access the admin dashboard:
1. Click the admin link above
2. Enter your PHC email address
3. You'll be logged in instantly (no password needed)

Conference Details:
📅 Dates: November 18-21, 2025
📍 Location: Copenhagen, Denmark
⏰ Meeting Times: 09:00 - 16:00 daily
📊 Available Slots: 56 (14 per day × 4 days)

Please test the system and let me know if you have any feedback or questions.

Best regards,
Dr. Yassir Shuaib
```

---

## Troubleshooting Guide

### Problem: Domain not working after 24 hours

**Solution:**

1. **Check DNS in GoDaddy:**
   - Login to GoDaddy
   - Go to My Products → Domain → Manage DNS
   - Verify CNAME record exists:
     - Type: CNAME
     - Name: @
     - Value: union-conference-2025.onrender.com

2. **Check in Render:**
   - Go to Settings → Custom Domains
   - Should show: PHC-meetings-unionconference.com
   - Status should be: "Active" or "Verified"

3. **Flush DNS cache:**
   ```
   Windows: ipconfig /flushdns
   Mac: sudo dscacheutil -flushcache
   Linux: sudo systemd-resolve --flush-caches
   ```

4. **Contact GoDaddy Support:**
   - Chat: Available 24/7
   - Phone: 1-480-505-8877
   - They can check DNS propagation

### Problem: SSL Certificate not showing (no padlock)

**Solution:**

1. Wait 15 more minutes (SSL takes time)
2. In Render dashboard:
   - Go to Settings → Custom Domains
   - Check "SSL Status"
   - Should say: "Active"
3. If says "Pending": Wait longer
4. If says "Failed": Contact Render support

### Problem: "This site can't be reached" error

**Solution:**

1. DNS not propagated yet - wait longer
2. Check dnschecker.org
3. Try accessing via Render URL first:
   - https://union-conference-2025.onrender.com
4. If Render URL works but custom domain doesn't:
   - DNS issue - check GoDaddy settings

### Problem: Admin login not working

**Solution:**

1. Clear browser cache and cookies
2. Try incognito/private mode
3. Verify email is exactly one of the 5 authorized:
   - yassir.shuaib@eu.phchd.com
   - maria.salazardecastro@eu.phchd.com
   - atsushi.yanagida@phchd.com
   - wenji.yuan@phchd.com
   - naofumi.yoda@phchd.com
4. Check browser console (F12) for errors

### Problem: Confirmation emails not sending

**Solution:**

1. **Check SMTP settings in Render:**
   - Go to Environment tab
   - Verify all 6 variables are set correctly
   - Especially check SMTP_PASS (Gmail app password)

2. **Test Gmail app password:**
   - Make sure 2-Step Verification is enabled
   - Regenerate app password if needed
   - Remove spaces when pasting password

3. **Check email spam folder**

4. **Alternative:** Use SendGrid (free tier):
   - Sign up at sendgrid.com
   - Get API key
   - Update SMTP settings in Render

### Problem: GoDaddy won't let me add CNAME for @

**Solution:**

Some GoDaddy accounts have restrictions. Try this:

**Option A: Use CNAME Flattening**
1. In GoDaddy DNS, look for "CNAME Flattening" option
2. Enable it
3. Then add CNAME for @

**Option B: Use A Record (Alternative)**
1. Contact Render support to get IP address
2. In GoDaddy, add A record instead:
   - Type: A
   - Name: @
   - Value: [IP from Render]
   - TTL: 1 Hour

**Option C: Use Subdomain**
1. Use `www` or `book` subdomain instead
2. Your URL becomes:
   - www.PHC-meetings-unionconference.com
   - or book.PHC-meetings-unionconference.com

---

## Complete Checklist

Use this to track your progress:

### GoDaddy Domain Purchase:
- [ ] Visited GoDaddy.com
- [ ] Searched for PHC-meetings-unionconference.com
- [ ] Domain available
- [ ] Added to cart
- [ ] Removed unnecessary extras
- [ ] Created account / logged in
- [ ] Completed payment ($11.99)
- [ ] Received confirmation email

### Render Deployment:
- [ ] Signed up for Render.com
- [ ] Created new web service
- [ ] Connected code repository
- [ ] Set name: union-conference-2025
- [ ] Set region: Frankfurt
- [ ] Set build command: npm install
- [ ] Set start command: node server/index.js
- [ ] Selected Free plan
- [ ] Added 6 environment variables
- [ ] Generated Gmail app password
- [ ] Deployed successfully
- [ ] Tested Render URL (*.onrender.com)

### DNS Configuration:
- [ ] Added custom domain in Render
- [ ] Copied CNAME value from Render
- [ ] Logged into GoDaddy
- [ ] Went to Manage DNS
- [ ] Removed conflicting records
- [ ] Added CNAME record (@ → render URL)
- [ ] Added WWW CNAME record
- [ ] Saved all changes
- [ ] Waited for DNS propagation (1-2 hours)

### Verification:
- [ ] Checked dnschecker.org (green checks)
- [ ] Visited custom domain successfully
- [ ] Verified SSL certificate (padlock)
- [ ] Made test booking
- [ ] Received confirmation email
- [ ] Tested admin dashboard login
- [ ] Verified test booking in admin
- [ ] Shared with PHC team

---

## Cost Summary

| Item | Provider | Cost |
|------|----------|------|
| Domain registration | GoDaddy | $11.99/year |
| Domain renewal (year 2+) | GoDaddy | ~$17.99/year |
| Website hosting | Render.com | FREE |
| SSL certificate | Render.com | FREE (included) |
| Email service | Gmail | FREE |
| **Total Year 1** | | **$11.99** |
| **Total Year 2+** | | **~$17.99/year** |

**Optional Upgrades:**
- Domain Privacy (GoDaddy): +$9.99/year
- Render Pro (no sleep): +$7/month
- SendGrid Email: +$15/month (40k emails)

---

## Important GoDaddy Tips

### 1. Auto-Renewal
- GoDaddy auto-renews domains by default
- Check: My Products → Domain → Settings
- You can turn off auto-renewal if preferred

### 2. Domain Privacy
- Protects your personal information in WHOIS
- Optional: $9.99/year
- Can add anytime in domain settings

### 3. Domain Transfer Lock
- Prevents unauthorized domain transfers
- Usually enabled by default
- Check: Domain Settings → Domain Lock

### 4. DNS Management
- Always accessible via: My Products → Domain → Manage DNS
- Changes can take up to 48 hours
- GoDaddy has good 24/7 support if needed

---

## Next Steps After Setup

Once your domain is live:

### 1. Update Email Templates
- Replace all [INSERT BOOKING LINK] with:
- https://PHC-meetings-unionconference.com

### 2. Create Short Link (Optional)
- Use Bitly: bit.ly/union2025
- Easier to share in emails and social media

### 3. Generate QR Code
- Visit: qr-code-generator.com
- Enter: PHC-meetings-unionconference.com
- Download and use on posters/flyers

### 4. Prepare Email Campaign
- Import 500 contacts to Mailchimp
- Customize email templates
- Schedule for early October 2025

### 5. Monitor Bookings
- Check admin dashboard daily
- Export to CSV weekly
- Track metrics (open rate, bookings, etc.)

---

## Support Contacts

### GoDaddy Support:
- **Phone:** 1-480-505-8877 (24/7)
- **Chat:** Available on godaddy.com (24/7)
- **Help:** https://www.godaddy.com/help

### Render Support:
- **Docs:** https://render.com/docs
- **Community:** https://community.render.com
- **Email:** support@render.com

### Application Support:
- **Dr. Yassir Shuaib:** yassir.shuaib@eu.phchd.com
- **Maria Salazar:** maria.salazardecastro@eu.phchd.com

---

## Summary

**What You're Getting:**
- ✅ Professional custom domain
- ✅ Free, reliable hosting
- ✅ Automatic SSL certificate
- ✅ Secured admin dashboard
- ✅ Email confirmations
- ✅ 56 pre-configured time slots
- ✅ Complete booking system

**Total Investment:**
- **Time:** ~30 minutes + 1-2 hours wait
- **Money:** $11.99 for first year

**Result:**
- Professional booking system at:
- https://PHC-meetings-unionconference.com

---

**You're ready to go! Follow the steps above and let me know if you need help with any step.** 🚀

---

**Document Version:** 1.0  
**Last Updated:** November 2, 2025  
**For:** Union Conference 2025, Copenhagen  
**Domain Registrar:** GoDaddy  
**Hosting:** Render.com

