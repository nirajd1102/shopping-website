# Quick Deployment Checklist

## Before Deploying

- [ ] Code is pushed to GitHub/GitLab/Bitbucket
- [ ] All local changes are committed
- [ ] `.env` file is NOT committed (it's in .gitignore)
- [ ] You have your Supabase credentials ready

## Netlify Setup Steps

1. **Create Netlify Account**
   - Go to https://app.netlify.com
   - Sign up with GitHub (recommended)

2. **Import Your Repository**
   - Click "Add new site" → "Import an existing project"
   - Connect your Git provider
   - Select your repository

3. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next` (or leave default)
   - Click "Show advanced" to set environment variables

4. **Add Environment Variables** (IMPORTANT!)
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   NEXT_PUBLIC_ADMIN_EMAIL=admin@fashionstore.com
   NEXT_PUBLIC_ADMIN_PASSWORD=your_password
   NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
   ```

5. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete (usually 2-5 minutes)

6. **Update Supabase CORS**
   - Go to Supabase Dashboard → Settings → API
   - Add your Netlify URL to allowed origins:
     `https://your-site-name.netlify.app`

## After Deployment

- [ ] Test homepage loads
- [ ] Test product pages
- [ ] Test cart functionality
- [ ] Test checkout process
- [ ] Test admin login
- [ ] Verify images load correctly

## Common Issues

**Build fails?**
- Check build logs in Netlify
- Verify all environment variables are set
- Ensure Node version is 20

**Environment variables not working?**
- Variables must start with `NEXT_PUBLIC_` to be available in browser
- Redeploy after adding variables
- Check spelling (case-sensitive)

**Images not loading?**
- Update Supabase CORS settings
- Check image URLs in database
- Verify next.config.js image domains

## Your Site URL

After deployment, your site will be available at:
`https://your-site-name.netlify.app`

You can customize this in Domain settings!
