# FinTrackfy - Construction Finance Tracker

A complete finance tracking web application built specifically for construction companies. Track expenses, manage projects, connect bank accounts, and leverage AI-powered categorization to streamline your construction business finances.

## 🚀 Features

### Core Functionality
- **Dashboard**: Overview of financial metrics, recent transactions, and project status
- **Bank Integration**: Connect multiple bank accounts using Plaid
- **Transaction Management**: View, filter, categorize, and approve transactions
- **AI Categorization**: Smart categorization using OpenAI for construction-specific expenses
- **Project Management**: Track budgets and expenses by project
- **Reporting**: Generate detailed financial reports and analytics
- **Authentication**: Secure login with NextAuth.js

### Construction-Specific Features
- Pre-configured categories for construction businesses (Materials, Subcontractors, Equipment, etc.)
- Vendor recognition for common construction suppliers (Home Depot, Lowe's, etc.)
- Project-based expense tracking
- Budget vs actual reporting
- Tax-ready categorization

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Database**: PostgreSQL (Vercel Postgres)
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **UI**: shadcn/ui + Tailwind CSS
- **Bank Integration**: Plaid
- **AI**: OpenAI API
- **Charts**: Recharts
- **Deployment**: Vercel

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard page
│   ├── transactions/      # Transaction management
│   ├── projects/          # Project management
│   └── reports/           # Reporting and analytics
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── dashboard/        # Dashboard components
│   ├── layout/           # Layout components
│   ├── plaid/            # Plaid integration components
│   ├── projects/         # Project components
│   ├── reports/          # Report components
│   ├── transactions/     # Transaction components
│   └── ui/               # shadcn/ui components
├── lib/                  # Utilities and configurations
│   ├── auth.ts           # NextAuth configuration
│   ├── db.ts             # Database connection
│   ├── plaid.ts          # Plaid client
│   └── ai-categorization.ts # AI categorization logic
└── hooks/                # Custom React hooks
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Plaid account (for bank connections)
- OpenAI API key (for AI categorization)
- Google OAuth app (for authentication)

### Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
# Database
POSTGRES_URL="your-postgres-url"
POSTGRES_PRISMA_URL="your-postgres-prisma-url"  
POSTGRES_URL_NON_POOLING="your-postgres-non-pooling-url"

# NextAuth.js
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="your-google-oauth-client-id"
GOOGLE_CLIENT_SECRET="your-google-oauth-client-secret"

# Plaid
PLAID_CLIENT_ID="your-plaid-client-id"
PLAID_SECRET="your-plaid-secret"
PLAID_ENV="sandbox" # or "development" or "production"

# OpenAI
OPENAI_API_KEY="your-openai-api-key"
```

### Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Set up the database**:
```bash
npx prisma generate
npx prisma db push
```

3. **Run the development server**:
```bash
npm run dev
```

4. **Open your browser**:
Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Database Schema

The application uses the following main entities:
- **Users**: Company information and authentication
- **Accounts**: Connected bank accounts via Plaid
- **Transactions**: Financial transactions with categorization
- **Projects**: Construction projects with budgets
- **Categories**: Expense categories for construction businesses
- **Vendors**: Common construction vendors and suppliers

## 🤖 AI Categorization

The AI categorization system uses OpenAI to automatically categorize transactions based on:
- Merchant names and transaction descriptions
- Construction industry knowledge
- Pre-defined vendor patterns
- Amount patterns and transaction types

Fallback rule-based categorization ensures reliability when AI is unavailable.

## 🏦 Plaid Integration

Bank account integration includes:
- Secure OAuth-based account linking
- Automatic transaction syncing
- Support for multiple account types
- Real-time balance updates
- Transaction history retrieval

## 📊 Reporting Features

Generate comprehensive reports including:
- Monthly expense breakdowns
- Project financial summaries
- Tax preparation reports
- Cash flow analysis
- Budget vs actual comparisons
- Custom date range reports

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy to Vercel**:
- Connect your GitHub repository to Vercel
- Configure environment variables in Vercel dashboard
- Deploy automatically on push

3. **Set up database**:
```bash
npx prisma generate
npx prisma db push
```

### Environment Variables for Production

Ensure all environment variables are configured in your Vercel dashboard:
- Database URLs
- Authentication secrets
- API keys
- Callback URLs

## 🔐 Security Features

- Encrypted data storage
- Secure API routes with authentication
- Input validation and sanitization
- Rate limiting on sensitive endpoints
- Audit logging for financial operations
- HTTPS enforcement
- CSRF protection

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support, please open an issue on GitHub or contact the development team.

---

Built with ❤️ for construction companies looking to streamline their financial operations.
