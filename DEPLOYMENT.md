# Deployment Guide

## 🚀 Production Deployment Checklist

### Pre-Deployment

1. **Environment Variables**
   - Set all required environment variables in your hosting platform
   - Ensure `OPENAI_API_KEY` is set (required for AI features)
   - Optional: Set `PINECONE_API_KEY` for transaction storage
   - Optional: Set `NEXT_PUBLIC_ALCHEMY_KEY` or `ETHERSCAN_API_KEY` for transaction fetching

2. **Build Test**
   ```bash
   npm run build
   npm run start
   ```
   - Verify the build completes without errors
   - Test all major features

3. **Security**
   - Never commit `.env` files
   - Use environment variables in your hosting platform
   - Enable HTTPS
   - Review API rate limits

### Vercel Deployment (Recommended)

1. **Connect Repository**
   - Push your code to GitHub/GitLab/Bitbucket
   - Import project in Vercel dashboard

2. **Configure Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env.example`

3. **Build Settings**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live at `https://your-project.vercel.app`

### Other Platforms

#### Netlify
1. Connect repository
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Add environment variables in Site Settings

#### Railway
1. Connect repository
2. Set build command: `npm run build`
3. Set start command: `npm run start`
4. Add environment variables

#### AWS Amplify
1. Connect repository
2. Build settings:
   - Build command: `npm run build`
   - Output directory: `.next`
3. Add environment variables

### Post-Deployment

1. **Verify Functionality**
   - Test wallet connection
   - Test AI insights generation
   - Test goal simulator
   - Check all API routes

2. **Performance**
   - Check Lighthouse scores
   - Optimize images if needed
   - Monitor API response times

3. **Monitoring**
   - Set up error tracking (Sentry recommended)
   - Monitor API usage
   - Track user analytics

### Environment Variables Reference

```bash
# Required
OPENAI_API_KEY=sk-...

# Optional but Recommended
NEXT_PUBLIC_ALCHEMY_KEY=...
# OR
ETHERSCAN_API_KEY=...

# Optional
PINECONE_API_KEY=...
PINECONE_ENVIRONMENT=...
PINECONE_INDEX_NAME=transaction_summary

# Optional
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=...
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### Troubleshooting

**Build Fails:**
- Check Node.js version (requires 18+)
- Verify all dependencies are installed
- Check for TypeScript errors

**Runtime Errors:**
- Verify environment variables are set
- Check API keys are valid
- Review server logs

**Wallet Connection Issues:**
- Ensure app is served over HTTPS
- Check browser console for errors
- Verify wagmi configuration

### Performance Optimization

1. **Enable Caching**
   - API responses should be cached
   - Static assets cached by CDN

2. **Image Optimization**
   - Use Next.js Image component
   - Optimize image formats (WebP, AVIF)

3. **Code Splitting**
   - Already enabled via Next.js
   - Monitor bundle sizes

### Security Best Practices

1. **API Keys**
   - Never expose API keys in client-side code
   - Use server-side API routes for sensitive operations
   - Rotate keys regularly

2. **CORS**
   - Configure CORS properly
   - Only allow trusted domains

3. **Rate Limiting**
   - Implement rate limiting on API routes
   - Monitor API usage

### Support

For issues or questions:
- Check the README.md
- Review error logs
- Check Next.js documentation
- Review wagmi documentation

