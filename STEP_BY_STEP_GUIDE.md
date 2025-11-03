# Complete Step-by-Step Guide
## Get PHC-meetings-unionconference.com Working

**Total Time:** 30 minutes + 1-2 hours wait  
**Total Cost:** $8.88/year  

---

## 🎯 What We're Doing

We need **TWO things** to make your custom domain work:

| What | Where to Get It | Cost |
|------|----------------|------|
| **1. Domain Name** | Namecheap.com | $8.88/year |
| **2. Website Hosting** | Render.com | FREE |

**Then we connect them together!**

---

## PART 1: Buy the Domain Name (15 minutes, $8.88)

### Step 1.1: Go to Namecheap

1. Open your web browser
2. Go to: **https://www.namecheap.com**
3. You'll see the Namecheap homepage

### Step 1.2: Search for Your Domain

1. In the search box at the top, type:
   ```
   PHC-meetings-unionconference.com
   ```

2. Click the **Search** button (or press Enter)

3. You'll see if the domain is available:
   - ✅ **Available** → Great! Continue to next step
   - ❌ **Taken** → Try a different name like:
     - PHC-union-meetings.com
     - PHC-union2025.com
     - union-phc-meetings.com

### Step 1.3: Add to Cart

1. Click the **"Add to Cart"** button next to the domain

2. You'll see the price: **$8.88** for the first year

3. **Optional extras** (you can skip these):
   - WhoisGuard (privacy protection) - FREE for first year
   - Premium DNS - Not needed
   - Email hosting - Not needed

4. Click **"View Cart"** button (top right)

### Step 1.4: Create Account & Checkout

1. If you don't have a Namecheap account:
   - Click **"Create Account"**
   - Enter your email and create a password
   - Verify your email

2. If you already have an account:
   - Click **"Sign In"**
   - Enter your credentials

3. **Checkout:**
   - Review your order: PHC-meetings-unionconference.com - $8.88
   - Click **"Confirm Order"**
   - Enter payment details (credit card)
   - Click **"Pay Now"**

### Step 1.5: Confirmation

1. You'll get a confirmation email
2. The domain is now yours for 1 year!
3. **Keep the Namecheap tab open** - we'll need it later

✅ **PART 1 COMPLETE!** You now own the domain name.

---

## PART 2: Deploy Your Website to Render.com (15 minutes, FREE)

### Step 2.1: Sign Up for Render

1. Open a new tab
2. Go to: **https://render.com**
3. Click **"Get Started"** (top right)
4. Sign up with:
   - **Option A:** GitHub account (recommended)
   - **Option B:** Email address

5. Verify your email if using email signup

### Step 2.2: Create a New Web Service

1. Once logged in, you'll see the Render Dashboard
2. Click the **"New +"** button (top right)
3. Select **"Web Service"** from the dropdown

### Step 2.3: Connect Your Code

**Option A: If you have the code on GitHub:**
1. Click **"Connect GitHub"**
2. Authorize Render to access your repositories
3. Select your repository

**Option B: If you have the code locally (recommended for now):**
1. I'll provide you with a GitHub repository link
2. Or we can use Render's Git integration

**For now, let me help you with the easiest method:**

I'll create a public GitHub repository for you with all the code, then you can connect it to Render.

### Step 2.4: Configure the Web Service

Once connected, fill in these settings:

**Name:**
```
union-conference-2025
```

**Region:**
```
Frankfurt (EU Central) - closest to Copenhagen
```

**Branch:**
```
main
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
(Click the "Free" option - $0/month)

### Step 2.5: Add Environment Variables

This is IMPORTANT for email to work!

1. Scroll down to **"Environment Variables"**
2. Click **"Add Environment Variable"**
3. Add these one by one:

**Variable 1:**
```
Key: PORT
Value: 3000
```

**Variable 2:**
```
Key: NODE_ENV
Value: production
```

**Variable 3:**
```
Key: SMTP_HOST
Value: smtp.gmail.com
```

**Variable 4:**
```
Key: SMTP_PORT
Value: 587
```

**Variable 5:**
```
Key: SMTP_USER
Value: yassir.shuaib@eu.phchd.com
```

**Variable 6:**
```
Key: SMTP_PASS
Value: [YOUR_GMAIL_APP_PASSWORD]
```

**⚠️ For SMTP_PASS, you need a Gmail App Password:**

1. Go to: https://myaccount.google.com/security
2. Enable 2-Step Verification if not already enabled
3. Go to: https://myaccount.google.com/apppasswords
4. Select "Mail" and generate
5. Copy the 16-character password
6. Paste it as the SMTP_PASS value

### Step 2.6: Deploy!

1. Scroll to the bottom
2. Click **"Create Web Service"**
3. Wait 2-3 minutes while Render:
   - Builds your application
   - Installs dependencies
   - Starts the server

4. You'll see logs scrolling by - this is normal!

5. When done, you'll see:
   ```
   ✅ Your service is live at:
   https://union-conference-2025.onrender.com
   ```

6. **Click the URL** to test it!

✅ **PART 2 COMPLETE!** Your website is now hosted on Render.

---

## PART 3: Connect Domain to Render (5 minutes + wait)

Now we connect the domain name (from Namecheap) to the hosting (on Render).

### Step 3.1: Add Custom Domain in Render

1. In your Render Dashboard, go to your web service
2. Click the **"Settings"** tab (left sidebar)
3. Scroll down to **"Custom Domains"** section
4. Click **"Add Custom Domain"**

5. Enter your domain:
   ```
   PHC-meetings-unionconference.com
   ```

6. Click **"Add"**

7. Render will show you DNS instructions:
   ```
   Add this CNAME record to your DNS:
   
   Type: CNAME
   Name: @
   Value: union-conference-2025.onrender.com
   ```

8. **IMPORTANT:** Copy or write down this information!
   - Specifically the **Value**: `union-conference-2025.onrender.com`

### Step 3.2: Configure DNS in Namecheap

1. Go back to your **Namecheap tab**
2. If you closed it, go to: https://www.namecheap.com
3. Login and go to **"Domain List"**
4. Click **"Manage"** next to PHC-meetings-unionconference.com

5. Click the **"Advanced DNS"** tab

6. You'll see a table with DNS records

7. Click **"Add New Record"**

8. Fill in:
   - **Type:** Select "CNAME Record" from dropdown
   - **Host:** Type `@`
   - **Value:** Type `union-conference-2025.onrender.com`
   - **TTL:** Select "Automatic"

9. Click the **green checkmark** to save

10. **Optional:** Add www subdomain
    - Click "Add New Record" again
    - **Type:** CNAME Record
    - **Host:** `www`
    - **Value:** `union-conference-2025.onrender.com`
    - **TTL:** Automatic
    - Click checkmark

11. Click **"Save All Changes"** (green button at top)

✅ **PART 3 COMPLETE!** Domain and hosting are now connected.

---

## PART 4: Wait for DNS Propagation (1-2 hours)

### What's Happening?

The internet is updating to know that PHC-meetings-unionconference.com points to your Render server. This takes time.

### How Long?

- **Minimum:** 15 minutes
- **Typical:** 1-2 hours
- **Maximum:** 48 hours (rare)

### How to Check:

1. Go to: **https://dnschecker.org**
2. Enter: `PHC-meetings-unionconference.com`
3. Select: "CNAME" from dropdown
4. Click **"Search"**

You'll see a world map with checkmarks:
- ✅ **Green checks** = Domain is working in that location
- ❌ **Red X** = Not propagated yet in that location

**Wait until most locations show green checks.**

### Meanwhile:

- ☕ Get a coffee
- 📧 Prepare your email templates
- 📋 Update your contact list
- 🎯 Plan your email campaign

---

## PART 5: Verify Everything Works

### After 1-2 hours:

### Test 1: Visit Your Custom Domain

1. Open a new browser tab
2. Go to: **https://PHC-meetings-unionconference.com**
3. You should see your booking system!

**If you see an error:**
- Wait another hour
- Clear your browser cache (Ctrl+Shift+Delete)
- Try in incognito/private mode

### Test 2: Check SSL Certificate

1. Look at the address bar
2. You should see: 🔒 **Secure** | https://PHC-meetings-unionconference.com
3. Click the padlock icon
4. It should say "Connection is secure"

**If no padlock:**
- Wait 10 more minutes
- Render automatically provisions SSL
- Refresh the page

### Test 3: Make a Test Booking

1. On your booking page, select a date
2. Choose a time slot
3. Fill in the form with test data
4. Click "Book Meeting"
5. Check your email for confirmation

### Test 4: Test Admin Dashboard

1. Go to: **https://PHC-meetings-unionconference.com/admin-login.html**
2. Enter: `yassir.shuaib@eu.phchd.com`
3. Click "Access Admin Dashboard"
4. You should see the admin dashboard
5. Check that your test booking appears

✅ **EVERYTHING WORKING!**

---

## PART 6: Share with Your Team

### Email to PHC Team:

**To:**
- maria.salazardecastro@eu.phchd.com
- atsushi.yanagida@phchd.com
- wenji.yuan@phchd.com
- naofumi.yoda@phchd.com

**Subject:** Union Conference 2025 - Booking System is Live!

**Body:**
```
Dear Team,

Our booking system for Union Conference 2025 is now live at:

🌐 PUBLIC BOOKING PAGE:
https://PHC-meetings-unionconference.com

🔐 ADMIN DASHBOARD:
https://PHC-meetings-unionconference.com/admin-login.html

Your PHC email address is authorized to access the admin dashboard.
Simply enter your email to login (no password needed).

Conference Details:
📅 Dates: November 18-21, 2025
📍 Location: Copenhagen, Denmark
⏰ Meeting Times: 09:00 - 16:00 daily
📊 Total Slots: 56 (14 per day)

Please test the system and let me know if you have any questions.

Best regards,
Dr. Yassir Shuaib
```

---

## Troubleshooting

### Problem: Domain not working after 24 hours

**Solution:**
1. Check DNS at dnschecker.org
2. Verify CNAME record in Namecheap:
   - Should be: `@ → union-conference-2025.onrender.com`
3. Contact Namecheap support if still not working

### Problem: SSL certificate not showing

**Solution:**
1. Wait 15 more minutes
2. In Render dashboard, go to Settings → Custom Domains
3. Look for "SSL Status" - should say "Active"
4. If says "Pending", wait longer
5. If says "Failed", contact Render support

### Problem: Admin login not working

**Solution:**
1. Clear browser cache
2. Try incognito mode
3. Verify email is exactly: `yassir.shuaib@eu.phchd.com`
4. Check browser console (F12) for errors

### Problem: Emails not sending

**Solution:**
1. Check SMTP settings in Render environment variables
2. Verify Gmail app password is correct
3. Test by making a booking and checking email
4. Check spam folder

### Problem: Website shows "Service Unavailable"

**Solution:**
1. Check Render dashboard - service should be "Running"
2. Check Render logs for errors
3. Restart service in Render dashboard
4. Contact Render support if persists

---

## Summary Checklist

Use this to track your progress:

### Domain Registration:
- [ ] Visited Namecheap.com
- [ ] Searched for PHC-meetings-unionconference.com
- [ ] Added to cart
- [ ] Created account / logged in
- [ ] Completed payment ($8.88)
- [ ] Received confirmation email

### Render Deployment:
- [ ] Signed up for Render.com
- [ ] Created new web service
- [ ] Connected code repository
- [ ] Configured build/start commands
- [ ] Added environment variables (6 total)
- [ ] Generated Gmail app password
- [ ] Clicked "Create Web Service"
- [ ] Service deployed successfully
- [ ] Tested Render URL (*.onrender.com)

### DNS Configuration:
- [ ] Added custom domain in Render
- [ ] Copied CNAME value from Render
- [ ] Logged into Namecheap
- [ ] Went to Advanced DNS
- [ ] Added CNAME record (@ → render URL)
- [ ] Saved all changes
- [ ] Waited for DNS propagation

### Verification:
- [ ] Checked dnschecker.org (green checks)
- [ ] Visited custom domain (works!)
- [ ] Verified SSL certificate (padlock icon)
- [ ] Made test booking
- [ ] Received confirmation email
- [ ] Tested admin dashboard
- [ ] Shared with PHC team

---

## What's Next?

Once everything is working:

1. **Update Email Templates**
   - Replace [INSERT BOOKING LINK] with:
   - https://PHC-meetings-unionconference.com

2. **Prepare Contact List**
   - 500 booth visitors from previous conferences
   - Excel format with: Name, Email, Organization

3. **Set Up Email Campaign**
   - Use Mailchimp (free for 500 contacts)
   - Import contacts
   - Customize templates
   - Schedule for early October 2025

4. **Launch Campaign**
   - Send initial invitations (6-8 weeks before conference)
   - Monitor bookings via admin dashboard
   - Send reminders to non-responders

5. **Conference Preparation**
   - Export bookings to CSV
   - Print schedule
   - Brief booth team
   - Prepare meeting materials

---

## Need Help?

**I'm here to help you through each step!**

Just let me know:
- Which step you're on
- What you're seeing on your screen
- Any error messages

**Contact:**
- Dr. Yassir Shuaib: yassir.shuaib@eu.phchd.com

---

**You've got this! The process is straightforward, and I'll guide you through any issues.** 💪

---

**Document Version:** 1.0  
**Last Updated:** November 2, 2025  
**Estimated Time:** 30 minutes + 1-2 hours wait  
**Total Cost:** $8.88/year

