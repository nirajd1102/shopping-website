# Step-by-Step Deployment Guide

Follow these steps in order to deploy your website to Netlify.

## STEP 1: Prepare Your Code (✅ Already Done)
- Git initialized
- Netlify config files created

## STEP 2: Commit Your Code

Run these commands in your terminal:

```bash
git add .
git commit -m "Ready for Netlify deployment"
```

## STEP 3: Create GitHub Repository

1. Go to https://github.com and sign in (or create account)
2. Click the **"+"** icon in top right → **"New repository"**
3. Repository name: `shopping-website` (or any name you like)
4. Description: "Fashion Shopping Website"
5. Choose **Public** or **Private**
6. **DO NOT** check "Initialize with README" (we already have code)
7. Click **"Create repository"**

## STEP 4: Push Code to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

**Replace:**
- `YOUR_USERNAME` with your GitHub username
- `YOUR_REPO_NAME` with the repository name you created

## STEP 5: Deploy to Netlify

### 5.1 Create Netlify Account
1. Go to https://app.netlify.com
2. Click **"Sign up"**
3. Choose **"Sign up with GitHub"** (recommended - easier setup)
4. Authorize Netlify to access your GitHub

### 5.2 Import Your Site
1. In Netlify dashboard, click **"Add new site"**
2. Click **"Import an existing project"**
3. Click **"Deploy with GitHub"**
4. Authorize if prompted
5. Find and select your `shopping-website` repository
6. Click **"Next"**

### 5.3 Configure Build Settings
Netlify should auto-detect Next.js, but verify:
- **Build command**: `npm run build`
- **Publish directory**: `.next` (or leave default)
- Click **"Show advanced"** to see more options

### 5.4 Add Environment Variables (CRITICAL!)

Before clicking "Deploy", click **"Show advanced"** → **"New variable"** and add these one by one:

1. **NEXT_PUBLIC_SUPABASE_URL**
   - Value: Your Supabase URL (from your .env file or Supabase dashboard)
   - Example: `https://cggvjgpjxqhwpindwuzd.supabase.co`

2. **NEXT_PUBLIC_SUPABASE_ANON_KEY**
   - Value: Your Supabase anon key
   - Get it from: Supabase Dashboard → Settings → API → anon/public key

3. **SUPABASE_SERVICE_ROLE_KEY**
   - Value: Your Supabase service role key
   - Get it from: Supabase Dashboard → Settings → API → service_role key
   - ⚠️ Keep this secret!

4. **NEXT_PUBLIC_ADMIN_EMAIL**
   - Value: `admin@fashionstore.com` (or your admin email)

5. **NEXT_PUBLIC_ADMIN_PASSWORD**
   - Value: Your admin password

6. **NEXT_PUBLIC_WHATSAPP_NUMBER**
   - Value: Your WhatsApp number (e.g., `919876543210`)

### 5.5 Deploy!
1. Click **"Deploy site"**
2. Wait 3-5 minutes for the build to complete
3. You'll see build logs in real-time

## STEP 6: Update Supabase CORS

After deployment, you'll get a URL like: `https://your-site-name.netlify.app`

1. Go to your Supabase Dashboard
2. Navigate to **Settings** → **API**
3. Scroll to **"CORS"** section
4. Add your Netlify URL: `https://your-site-name.netlify.app`
5. Click **"Save"**

## STEP 7: Test Your Site

Visit your Netlify URL and test:
- [ ] Homepage loads
- [ ] Products display
- [ ] Cart works
- [ ] Checkout works
- [ ] Admin panel works

## Troubleshooting

**Build fails?**
- Check build logs in Netlify
- Make sure all environment variables are set
- Check for any error messages

**Site loads but shows errors?**
- Check browser console (F12)
- Verify environment variables are correct
- Make sure Supabase CORS is updated

**Need help?**
- Check NETLIFY_DEPLOYMENT.md for detailed troubleshooting
- Check Netlify build logs for specific errors

## Your Site URL

After successful deployment, your site will be at:
`https://your-site-name.netlify.app`

You can change the site name in Netlify → Site settings → General → Site details → Change site name
