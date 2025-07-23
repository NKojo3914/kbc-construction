# KBC Construction - Netlify Deployment

This Next.js application is configured for static deployment on Netlify.

## Deployment Steps

### Option 1: Connect GitHub Repository (Recommended)

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/kbc-construction.git
   git push -u origin main
   ```

2. **Deploy on Netlify:**
   - Go to [netlify.com](https://netlify.com) and sign in
   - Click "New site from Git"
   - Connect your GitHub account
   - Select your repository
   - Netlify will automatically detect the settings from `netlify.toml`:
     - Build command: `pnpm run build`
     - Publish directory: `out`
   - Click "Deploy site"

### Option 2: Manual Deployment

1. **Build the project locally:**
   ```bash
   pnpm install
   pnpm run build
   ```

2. **Deploy the `out` folder:**
   - Go to [app.netlify.com](https://app.netlify.com)
   - Drag and drop the `out` folder to the deploy area
   - Your site will be deployed instantly

## Configuration Files

- **`netlify.toml`**: Contains build settings and redirects for Netlify
- **`next.config.mjs`**: Configured for static export with `output: 'export'`

## Build Process

The app uses Next.js static export to generate a fully static website that can be served from any static hosting provider. The build process:

1. Compiles TypeScript and React components
2. Optimizes images and assets
3. Generates static HTML files
4. Outputs everything to the `out` directory

## Features Supported

- ✅ Static pages and routing
- ✅ Client-side React components
- ✅ CSS and Tailwind styling
- ✅ Images and assets
- ✅ Interactive animations and state management

## Domain Setup

After deployment, you can:
1. Use the provided Netlify subdomain (e.g., `amazing-app-123456.netlify.app`)
2. Set up a custom domain in your Netlify dashboard

## Environment Variables

If your app uses environment variables, add them in:
- Netlify Dashboard → Site Settings → Environment Variables
- Prefix client-side variables with `NEXT_PUBLIC_`
