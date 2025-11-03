# How to Get PHC-meetings-unionconference.com Working

## ⚠️ Important: The Custom Domain Doesn't Exist Yet

Right now, you have a **test URL**:
```
https://3000-im144mx7zdzxk9fsi8tqo-53e74426.manusvm.computer
```

To get your **custom domain** working:
```
https://PHC-meetings-unionconference.com
```

You need to complete 3 steps. **Total time: ~2 hours. Total cost: $8.88/year.**

---

## Step 1: Buy the Domain Name (15 minutes, $8.88)

### What is a domain?
A domain is like buying a phone number for your website. Instead of a long number (3000-im144mx7zdzxk9fsi8tqo-53e74426.manusvm.computer), you get a short, memorable name (PHC-meetings-unionconference.com).

### How to buy it:

1. **Go to Namecheap.com**
   - Website: https://www.namecheap.com

2. **Search for your domain**
   - Type: "PHC-meetings-unionconference.com"
   - Click Search

3. **Add to cart and checkout**
   - Price: $8.88 for first year
   - You'll need to create an account
   - Pay with credit card

4. **Done!**
   - You now own the domain for 1 year
   - You'll get a confirmation email

---

## Step 2: Host Your Website (10 minutes, FREE)

### What is hosting?
Hosting is like renting space on the internet where your booking system lives. Think of it like renting an apartment for your website.

### How to host it (FREE with Render.com):

1. **Go to Render.com**
   - Website: https://render.com
   - Click "Get Started"
   - Sign up with your email

2. **Create a New Web Service**
   - Click "New +" button
   - Select "Web Service"

3. **Upload your booking system**
   - Option A: Connect GitHub (if you have the code there)
   - Option B: I'll help you upload the files

4. **Configure it**
   - **Name:** union-conference-2025
   - **Environment:** Node
   - **Build Command:** npm install
   - **Start Command:** node server/index.js
   - **Plan:** Select "Free"

5. **Add Email Settings**
   - Click "Environment" tab
   - Add these variables:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=yassir.shuaib@eu.phchd.com
   SMTP_PASS=your_gmail_app_password
   ```

6. **Deploy**
   - Click "Create Web Service"
   - Wait 2-3 minutes
   - You'll get a URL like: union-conference-2025.onrender.com

---

## Step 3: Connect Domain to Hosting (5 minutes + 1-2 hours wait)

### What is this step?
This connects your domain name (PHC-meetings-unionconference.com) to your hosting (Render.com). Like connecting your phone number to your actual phone.

### How to connect them:

#### Part A: In Render (2 minutes)

1. **In your Render dashboard:**
   - Go to your web service
   - Click "Settings" tab
   - Scroll to "Custom Domains"
   - Click "Add Custom Domain"

2. **Enter your domain:**
   ```
   PHC-meetings-unionconference.com
   ```

3. **Copy the CNAME record**
   - Render will show you something like:
   ```
   Type: CNAME
   Name: @
   Value: union-conference-2025.onrender.com
   ```
   - Keep this window open!

#### Part B: In Namecheap (3 minutes)

1. **Login to Namecheap**
   - Go to: https://www.namecheap.com
   - Login with your account

2. **Go to your domain**
   - Click "Domain List"
   - Click "Manage" next to PHC-meetings-unionconference.com

3. **Go to DNS settings**
   - Click "Advanced DNS" tab

4. **Add the CNAME record**
   - Click "Add New Record"
   - **Type:** CNAME Record
   - **Host:** @
   - **Value:** union-conference-2025.onrender.com
   - **TTL:** Automatic
   - Click the checkmark to save

5. **Done!**
   - Click "Save All Changes"

#### Part C: Wait for DNS Propagation (1-2 hours)

- **What's happening:** The internet is updating to know that PHC-meetings-unionconference.com points to your Render hosting
- **How long:** Usually 1-2 hours, sometimes up to 24 hours
- **Check status:** Visit https://dnschecker.org and enter your domain

---

## Step 4: Test Your Custom Domain

### After 1-2 hours:

1. **Visit your custom domain:**
   ```
   https://PHC-meetings-unionconference.com
   ```

2. **You should see:**
   - Your booking system!
   - The same one you see at the test URL
   - But now with a professional, short URL

3. **Admin dashboard:**
   ```
   https://PHC-meetings-unionconference.com/admin-login.html
   ```

4. **SSL Certificate (HTTPS):**
   - Render automatically adds SSL
   - Your site will have the padlock icon 🔒
   - This happens automatically, no action needed

---

## What If You Don't Want to Do This?

### Option: Just Use the Test URL

You can use the current test URL for your conference:
```
https://3000-im144mx7zdzxk9fsi8tqo-53e74426.manusvm.computer
```

**Pros:**
- ✅ Already working
- ✅ Free
- ✅ No setup needed

**Cons:**
- ❌ Very long and hard to remember
- ❌ Not professional
- ❌ May stop working if server restarts
- ❌ Can't put on business cards or posters

### Option: Use a Short URL Service (Free, 5 minutes)

If you don't want to buy a domain, you can create a short link:

1. **Go to Bitly.com**
   - Sign up (free)

2. **Shorten your URL**
   - Paste: https://3000-im144mx7zdzxk9fsi8tqo-53e74426.manusvm.computer
   - Create custom: bit.ly/union2025-phc

3. **Share the short link:**
   ```
   https://bit.ly/union2025-phc
   ```

**Pros:**
- ✅ Much shorter
- ✅ Free
- ✅ Quick to set up

**Cons:**
- ❌ Still not your own domain
- ❌ Has "bit.ly" in the URL
- ❌ Less professional than custom domain

---

## Summary: What You Need to Do

### To get PHC-meetings-unionconference.com working:

| Step | What | Where | Time | Cost |
|------|------|-------|------|------|
| 1 | Buy domain | Namecheap.com | 15 min | $8.88/year |
| 2 | Host website | Render.com | 10 min | FREE |
| 3 | Connect them | Both sites | 5 min | FREE |
| 4 | Wait for DNS | Automatic | 1-2 hours | FREE |
| **Total** | | | **~2 hours** | **$8.88/year** |

### Current Status:

- ✅ Booking system built and working
- ✅ Admin dashboard secured
- ✅ Email templates ready
- ✅ Test URL available
- ❌ Custom domain not registered yet
- ❌ Not deployed to production yet

### What Happens After Setup:

Once you complete the 3 steps above:

**Instead of sharing this:**
```
https://3000-im144mx7zdzxk9fsi8tqo-53e74426.manusvm.computer
```

**You'll share this:**
```
https://PHC-meetings-unionconference.com
```

Much better! ✨

---

## Need Help?

### I can help you with:

1. **Screen sharing** - Walk you through each step
2. **Questions** - Explain anything that's unclear
3. **Technical issues** - Troubleshoot if something doesn't work

### Contact:

- Dr. Yassir Shuaib: yassir.shuaib@eu.phchd.com

---

## Quick Decision Guide

### Do you want a professional custom domain?

**YES** → Follow Steps 1-4 above ($8.88/year)

**NO, just need it to work** → Use the test URL (free, but long)

**MAYBE LATER** → Use bit.ly short link for now (free, shorter)

---

**The booking system is ready. The custom domain is optional but recommended for professionalism.**

---

**Document Version:** 1.0  
**Last Updated:** November 2, 2025  
**Status:** Booking system complete, domain registration pending

