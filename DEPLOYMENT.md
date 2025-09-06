# Deployment Checklist

## Pre-Deployment Setup

### 1. Environment Variables
Set up the following environment variables in Vercel dashboard:

```bash
# Database (Vercel Postgres)
POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=

# NextAuth.js
NEXTAUTH_SECRET=
NEXTAUTH_URL=https://your-domain.vercel.app
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Plaid Integration
PLAID_CLIENT_ID=
PLAID_SECRET=
PLAID_ENV=sandbox  # Change to 'production' for live deployment

# OpenAI
OPENAI_API_KEY=
```

### 2. External Service Setup

#### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add your domain to authorized origins
6. Add callback URL: `https://your-domain.vercel.app/api/auth/callback/google`

#### Plaid Setup  
1. Sign up at [Plaid Dashboard](https://dashboard.plaid.com/)
2. Get your Client ID and Secret
3. Configure webhook URL: `https://your-domain.vercel.app/api/plaid/webhook`
4. Add your domain to allowed origins
5. For production, apply for production access

#### OpenAI Setup
1. Create account at [OpenAI](https://openai.com/)
2. Generate API key
3. Set up billing (required for API usage)

### 3. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Push schema to database  
npx prisma db push

# Optional: Seed with construction categories
npx prisma db seed
```

## Vercel Deployment

### 1. Connect Repository
1. Push code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your GitHub repository

### 2. Configure Build Settings
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: Leave empty (default)
- **Install Command**: `npm install`

### 3. Environment Variables
Copy all environment variables from your `.env.local` to Vercel dashboard.

### 4. Domain Configuration
1. Add custom domain (optional)
2. Configure DNS records
3. Update `NEXTAUTH_URL` with production domain

## Post-Deployment Steps

### 1. Database Migration
```bash
# Run in Vercel console or locally with production DB URL
npx prisma migrate deploy
```

### 2. Test Core Features
- [ ] User authentication (Google OAuth)
- [ ] Plaid Link flow
- [ ] Transaction fetching
- [ ] AI categorization
- [ ] Project creation
- [ ] Report generation

### 3. Plaid Production Access
For production deployment with real bank data:
1. Complete Plaid's production access request
2. Provide required documentation
3. Wait for approval (can take several days)
4. Update `PLAID_ENV` to `production`

### 4. Security Checklist
- [ ] HTTPS enabled (automatic with Vercel)
- [ ] Environment variables secured
- [ ] Database access restricted
- [ ] API routes protected with authentication
- [ ] Rate limiting configured (if needed)

## Monitoring and Maintenance

### 1. Set Up Monitoring
- Enable Vercel Analytics
- Configure error tracking (Sentry recommended)
- Set up uptime monitoring

### 2. Regular Tasks
- Monitor Plaid webhook health
- Check OpenAI API usage
- Review database performance
- Update dependencies

### 3. Backup Strategy
- Database backups (Vercel Postgres includes backups)
- Environment variable backup
- Code repository backups

## Scaling Considerations

### Database
- Monitor connection usage
- Consider connection pooling
- Plan for database scaling

### API Limits
- Monitor Plaid API usage
- Track OpenAI API costs
- Implement rate limiting if needed

### Performance
- Enable Vercel's Edge Functions for API routes
- Configure caching strategies
- Monitor Core Web Vitals

## Troubleshooting

### Common Issues
1. **Plaid Link fails**: Check environment variables and webhook URL
2. **Authentication errors**: Verify Google OAuth configuration
3. **Database connection issues**: Check Vercel Postgres settings
4. **AI categorization fails**: Verify OpenAI API key and credits

### Debug Commands
```bash
# Check database connection
npx prisma db push --preview-feature

# Validate environment variables
npm run dev

# Check build process
npm run build
```

## Production Checklist
- [ ] All environment variables configured
- [ ] Database schema deployed
- [ ] External services configured
- [ ] Domain and SSL configured  
- [ ] Authentication tested
- [ ] Core features tested
- [ ] Performance optimized
- [ ] Monitoring enabled
- [ ] Backup strategy in place
- [ ] Documentation updated

## Support Resources
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Plaid Documentation](https://plaid.com/docs/)
- [NextAuth.js Documentation](https://next-auth.js.org/)