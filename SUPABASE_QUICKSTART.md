# Quick Start: Supabase Integration

## 5-Minute Setup

### Step 1: Get Your Credentials
1. Go to https://supabase.com and create a project (if not done)
2. Navigate to Settings > API
3. Copy your **Project URL** and **anon public key**

### Step 2: Configure Environment
Create `.env.local` in project root:
```
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### Step 3: Restart Development Server
```bash
npm run dev
```

### Step 4: Test the Integration

**Test Companies List:**
```
http://localhost:5173/companies
```

**Test Company Detail:**
```
http://localhost:5173/companies/1
```

## Data Structure

### Companies Table Fields
```sql
company_id          -- Primary key (integer)
name                -- Company name (string)
logo_url            -- Logo URL (string)
category            -- Business category (string)
headquarters_address -- Location (string)
employee_size       -- Team size (string)
incorporation_year  -- Founded year (string)
overview_text       -- Company description (string)
website_url         -- Company website (string)
company_type        -- Type: Product/Service/etc (string)
... and 30+ more fields for comprehensive company data
```

## Real-Time Magic ✨

### All Changes Auto-Sync
- **No manual refresh needed**
- **Multiple users see updates instantly**
- **Automatic subscriptions manage cleanup**

Example: Edit a company name in Supabase → All users' browsers update instantly!

## File Reference

| File | Purpose |
|------|---------|
| `src/lib/supabase-client.ts` | Client initialization |
| `src/lib/supabase.types.ts` | Database types |
| `src/services/companyService.ts` | API operations |
| `src/hooks/useCompanies.ts` | React hooks |
| `src/pages/Companies.tsx` | Companies list (updated) |
| `src/pages/CompanyDetail.tsx` | Company detail (updated) |

## Common Tasks

### Get All Companies
```tsx
const { companies, loading, error } = useCompanies();
```

### Get Single Company with All Data
```tsx
const { profile, loading, error } = useCompleteCompanyProfile(1);
// Access: profile.company, profile.culture, profile.financials, etc.
```

### Get Specific Information
```tsx
const { data: culture } = useCulture(1);
const { data: financials } = useFinancials(1);
const { data: people } = usePeople(1);
```

## Debugging

### Check if data is loading
```tsx
if (loading) console.log('Fetching...');
if (error) console.log('Error:', error.message);
console.log('Companies:', companies);
```

### Real-time connection status
Open browser DevTools → Application → Local Storage → Look for Supabase entries

### Verify Supabase setup
```tsx
import { supabase } from '@/lib/supabase-client';
console.log('Supabase URL:', supabase.supabaseUrl);
console.log('Connected:', !!supabase.supabaseUrl);
```

## What's Working Now

✅ Real-time company list  
✅ Search and filter companies  
✅ Company detail page with full profile  
✅ All 10 company data tables integrated  
✅ Automatic subscriptions  
✅ Error handling  
✅ Loading states  

## Next Steps

1. **Add data to Supabase**: Use Supabase dashboard to add company records
2. **Customize fields**: Edit component code to show additional fields
3. **Add more pages**: Skills, Analytics, and Dashboard pages can be updated similarly
4. **Set up authentication**: Add login/signup (optional)
5. **Deploy**: Push to production with environment variables set

## Need Help?

See `SUPABASE_SETUP.md` for detailed documentation and troubleshooting.

## Database Tables Available

You can now query these real-time tables:

- `companies` - Main company info
- `company_brand_reputation` - Brand metrics
- `company_business` - Business details
- `company_compensation` - Salary & benefits
- `company_culture` - Work environment
- `company_financials` - Revenue & funding
- `company_logistics` - Office & remote policies
- `company_people` - Leadership contacts
- `company_talent_growth` - Career development
- `company_technologies` - Tech stack

All with real-time updates! 🚀
