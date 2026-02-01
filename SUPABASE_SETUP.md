# Supabase Real-Time Integration Guide

## Overview
This guide walks you through setting up real-time data synchronization with Supabase for your SRM DCC Portal application.

## Prerequisites
- A Supabase project (https://supabase.com)
- Your Supabase URL and Anon Key
- Database schema already created in Supabase (provided in your setup)

## Installation

### 1. Environment Variables Setup

Create a `.env.local` file in your project root with your Supabase credentials:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Important**: Never commit `.env.local` to version control. Add it to `.gitignore`.

### 2. Verify Supabase Client Installation

The following packages should already be installed:
- `@supabase/supabase-js` - Supabase JavaScript client
- `@supabase/auth-helpers-react` - React authentication helpers

If not installed, run:
```bash
npm install @supabase/supabase-js @supabase/auth-helpers-react
```

## Project Structure

### New Files Created

1. **`src/lib/supabase.types.ts`**
   - TypeScript types for all database tables
   - Matches your Supabase schema exactly
   - Auto-complete support in IDE

2. **`src/lib/supabase-client.ts`**
   - Supabase client initialization
   - Exports for convenience

3. **`src/services/companyService.ts`**
   - Database operations for companies table
   - Real-time subscription functions
   - Complete profile fetching

4. **`src/hooks/useCompanies.ts`**
   - React hooks for fetching and subscribing to data
   - Automatic real-time updates
   - Loading and error states

### Updated Files

1. **`src/pages/Companies.tsx`**
   - Now uses `useCompanies()` hook
   - Real-time data filtering and search
   - Loading and error states

2. **`src/pages/CompanyDetail.tsx`**
   - Uses `useCompleteCompanyProfile()` hook
   - Displays all company information from database
   - Real-time updates across tabs

## Database Schema Mapping

### Main Tables

| Supabase Table | Purpose | React Hook |
|---|---|---|
| `companies` | Core company information | `useCompany()` / `useCompanies()` |
| `company_brand_reputation` | Brand metrics and ratings | `useBrandReputation()` |
| `company_business` | Business model and strategy | `useBusinessInfo()` |
| `company_compensation` | Salary and benefits | `useCompensation()` |
| `company_culture` | Work culture details | `useCulture()` |
| `company_financials` | Revenue, funding, profitability | `useFinancials()` |
| `company_logistics` | Remote policy, office locations | `useLogistics()` |
| `company_people` | Leadership and contacts | `usePeople()` |
| `company_talent_growth` | Career development opportunities | `useTalentGrowth()` |
| `company_technologies` | Tech stack, innovation | `useTechnologies()` |

## Usage Examples

### Fetching All Companies

```tsx
import { useCompanies } from '@/hooks/useCompanies';

function CompanyList() {
  const { companies, loading, error } = useCompanies();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {companies.map((company) => (
        <div key={company.company_id}>{company.name}</div>
      ))}
    </div>
  );
}
```

### Fetching Single Company with Full Profile

```tsx
import { useCompleteCompanyProfile } from '@/hooks/useCompanies';

function CompanyDetails({ companyId }: { companyId: number }) {
  const { profile, loading, error } = useCompleteCompanyProfile(companyId);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{profile.company?.name}</h1>
      <p>{profile.businessInfo?.offerings_description}</p>
      <p>Culture: {profile.culture?.work_culture_summary}</p>
    </div>
  );
}
```

### Fetching Specific Company Data

```tsx
import { useCulture, useFinancials } from '@/hooks/useCompanies';

function CultureAndFinance({ companyId }: { companyId: number }) {
  const { data: culture } = useCulture(companyId);
  const { data: financials } = useFinancials(companyId);

  return (
    <div>
      <p>Turnover: {culture?.employee_turnover}</p>
      <p>Revenue: {financials?.annual_revenue}</p>
    </div>
  );
}
```

## Real-Time Features

### Automatic Real-Time Sync

All hooks automatically subscribe to Supabase real-time updates. When data changes in the database:

1. **Instant updates** - Your UI reflects changes within milliseconds
2. **Automatic refetch** - No manual refresh needed
3. **Automatic cleanup** - Subscriptions are cleaned up when components unmount

### Manual Subscriptions

For advanced use cases, you can subscribe directly:

```tsx
import { subscribeToCompanies, unsubscribeFromChannel } from '@/services/companyService';

// In useEffect
const subscription = await subscribeToCompanies((companies) => {
  console.log('Companies updated:', companies);
  setCompanies(companies);
});

// Cleanup
return () => {
  unsubscribeFromChannel(subscription);
};
```

## Service Functions Reference

### Company Operations

```tsx
import {
  fetchAllCompanies,           // Get all companies
  fetchCompanyById,            // Get single company
  fetchCompaniesByCategory,    // Filter by category
  searchCompanies,             // Search companies
} from '@/services/companyService';

// Usage
const companies = await fetchAllCompanies();
const google = await fetchCompanyById(1);
const techCompanies = await fetchCompaniesByCategory('Technology');
const results = await searchCompanies('Google');
```

### Real-Time Subscriptions

```tsx
import {
  subscribeToCompanies,        // Subscribe to all companies
  subscribeToCompany,          // Subscribe to single company updates
  subscribeToBusinessInfo,     // Subscribe to business info changes
  // ... and more for each table
} from '@/services/companyService';
```

### Complete Profile

```tsx
import { fetchCompleteCompanyProfile } from '@/services/companyService';

// Fetches all related data for a company in parallel
const profile = await fetchCompleteCompanyProfile(1);
// Returns: {
//   company,
//   brandReputation,
//   businessInfo,
//   compensation,
//   culture,
//   financials,
//   logistics,
//   people,
//   talentGrowth,
//   technologies
// }
```

## Troubleshooting

### "Supabase credentials not configured"
- Ensure `.env.local` file exists with correct URLs
- Check that `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set
- Restart dev server after adding env variables

### No data appearing
- Verify your Supabase database has data in the `companies` table
- Check browser console for API errors
- Ensure Row Level Security (RLS) policies allow SELECT access

### Real-time updates not working
- Enable Realtime in Supabase: Database > Replication
- Ensure tables have replication enabled
- Check Supabase status page for incidents

### Type errors
- Run `npx tsc --noEmit` to check for TypeScript errors
- Ensure `supabase.types.ts` is up-to-date with schema
- Clear `node_modules` and reinstall if needed

## Advanced Configuration

### Custom Real-Time Subscriptions

```tsx
// Subscribe to specific events
const subscription = supabase
  .from('companies')
  .on('UPDATE', payload => {
    console.log('Company updated:', payload.new);
  })
  .subscribe();
```

### Filtering and Sorting

```tsx
// Custom filtered fetch
const { data, error } = await supabase
  .from('companies')
  .select('*')
  .eq('category', 'Technology')
  .order('name', { ascending: true });
```

### Error Handling

```tsx
try {
  const companies = await fetchAllCompanies();
} catch (error) {
  if (error instanceof Error) {
    console.error('Failed to fetch companies:', error.message);
  }
}
```

## Performance Optimization

### Lazy Loading
Use hooks only when you need the data:

```tsx
// Only loads when component mounts
const { companies } = useCompanies();
```

### Pagination (Coming Soon)
For large datasets, implement pagination:

```tsx
// Example structure for future implementation
const { data, page, nextPage, prevPage } = useCompaniesPaginated(pageSize: 10);
```

### Data Caching
Supabase client automatically caches data. Clear cache if needed:

```tsx
await supabase.removeAllChannels();
```

## Security Best Practices

1. **Never expose Service Role Key** - Only use Anon Key in frontend
2. **Enable RLS** - Set up Row Level Security policies in Supabase
3. **Validate data** - Always validate user inputs before queries
4. **Use HTTPS only** - Supabase connections are always encrypted
5. **Rotate keys** - Rotate credentials if exposed

## Next Steps

1. ✅ Populate your Supabase database with company data
2. ✅ Set environment variables
3. ✅ Test the Companies page to verify data loading
4. ✅ Test CompanyDetail page for real-time updates
5. ✅ Add error boundaries in production
6. ✅ Set up monitoring and logging

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [Real-time Subscriptions](https://supabase.com/docs/guides/realtime)
- [React with Supabase](https://supabase.com/docs/guides/getting-started/quickstarts/reactjs)

## Support

For issues or questions:
1. Check the Supabase dashboard for data
2. Review browser console for errors
3. Verify network requests in DevTools
4. Check Supabase real-time status

---

**Last Updated**: January 31, 2026
**Supabase Client Version**: Latest
**React Version**: Latest
