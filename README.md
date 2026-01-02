# Gifted Landing Page

A beautiful landing page for the Gifted app - a gift discovery platform.

## 🚀 Deploy to Vercel (Free)

### Option 1: One-Click Deploy (Easiest)

After pushing to GitHub, click this button:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/gifted-landing)

### Option 2: Manual Deployment

1. **Push to GitHub:**
   ```bash
   cd gifted-landing
   git init
   git add .
   git commit -m "Initial commit"
   gh repo create gifted-landing --public --source=. --push
   # Or create repo manually on GitHub and push
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your `gifted-landing` repository
   - Click "Deploy"

3. **Your site will be live at:** `https://gifted-landing.vercel.app`

### Option 3: Vercel CLI

```bash
npm i -g vercel
cd gifted-landing
vercel
```

## ⚙️ Environment Variables

The waitlist form stores emails in your Supabase database. Set these environment variables:

### Local Development
Create a `.env.local` file:
```bash
cp env.template .env.local
# Then edit .env.local with your actual keys
```

### Vercel Deployment
Add these in Vercel Dashboard > Settings > Environment Variables:

| Variable | Value | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xvbendwssoteawvrbglr.supabase.co` | Your Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | `[from Supabase]` | Service role key (keep secret!) |

**To get your Service Role Key:**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to Settings > API
4. Copy the `service_role` key (under "Project API keys")

## 📊 Viewing Waitlist Signups

All email signups are stored in the `waitlist` table. To view them:

**Option 1: Supabase Dashboard**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to Table Editor > `waitlist`

**Option 2: SQL Query**
```sql
SELECT email, created_at, source FROM waitlist ORDER BY created_at DESC;
```

## 🎨 Customization

### Change Colors
Edit `app/globals.css`:
```css
:root {
  --primary-500: #FF6B6B;  /* Main brand color */
}
```

### Update Content
Edit `app/page.tsx` to change text, features, etc.

## 📁 Project Structure

```
gifted-landing/
├── app/
│   ├── api/
│   │   └── waitlist/
│   │       └── route.ts    # Waitlist API endpoint
│   ├── globals.css         # Styles
│   ├── layout.tsx          # Layout + metadata
│   └── page.tsx            # Main landing page
├── public/
│   ├── logo.svg            # Full logo
│   ├── logo-icon.svg       # Icon only
│   └── favicon.svg         # Favicon
├── env.template            # Environment variables template
└── vercel.json             # Vercel config
```

## 🔗 After Deployment

1. Copy your Vercel URL (e.g., `https://gifted-landing.vercel.app`)
2. Use this URL when applying to:
   - **Etsy Developer Program**
   - **Awin Affiliate Network**
   - **App Store** (when ready)

## 💡 Tips

- **Custom Domain**: Add a custom domain in Vercel settings for free
- **Analytics**: Vercel includes free analytics
- **Edge Functions**: Already optimized for edge delivery
