# Quick Reference Card - Supabase Integration

## 🚀 Setup (5 minutes)

```bash
# 1. Add to .env.local
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# 2. Restart dev server
npm run dev

# 3. Test
# Visit: http://localhost:5173/companies
```

## 📚 Import Statements

```tsx
// Get companies data
import { useCompanies, useCompany } from '@/hooks/useCompanies';

// Get complete profile
import { useCompleteCompanyProfile } from '@/hooks/useCompanies';

// Get specific data
import { useCulture, useFinancials, usePeople } from '@/hooks/useCompanies';

// Direct service calls (async)
import { fetchAllCompanies, searchCompanies } from '@/services/companyService';
```

## 🪝 React Hooks Cheat Sheet

### Fetch All Companies
```tsx
const { companies, loading, error } = useCompanies();
// Returns: Company[] with real-time updates
```

### Fetch Single Company
```tsx
const { company, loading, error } = useCompany(1);
// Returns: Single Company or null
```

### Fetch Complete Profile
```tsx
const { profile, loading, error } = useCompleteCompanyProfile(1);
// Returns: {
//   company, brandReputation, businessInfo, compensation,
//   culture, financials, logistics, people, talentGrowth, technologies
// }
```

### Fetch Specific Information
```tsx
const { data: culture } = useCulture(1);           // Culture data
const { data: financials } = useFinancials(1);     // Financial data
const { data: people } = usePeople(1);             // Leadership data
const { data: compensation } = useCompensation(1); // Salary & benefits
const { data: business } = useBusinessInfo(1);     // Business strategy
const { data: growth } = useTalentGrowth(1);       // Career development
const { data: logistics } = useLogistics(1);       // Office & remote policy
const { data: tech } = useTechnologies(1);         // Tech stack & AI/ML
const { data: brand } = useBrandReputation(1);     // Brand metrics
```

## 🔄 Component Usage Examples

### Simple Company List
```tsx
function CompanyList() {
  const { companies, loading } = useCompanies();
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      {companies.map(c => (
        <div key={c.company_id}>{c.name}</div>
      ))}
    </div>
  );
}
```

### Company Detail Page
```tsx
function CompanyDetail({ id }: { id: number }) {
  const { profile, loading, error } = useCompleteCompanyProfile(id);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  const c = profile.company;
  return (
    <div>
      <h1>{c?.name}</h1>
      <p>{profile.businessInfo?.core_value_proposition}</p>
      <p>Culture: {profile.culture?.work_culture_summary}</p>
    </div>
  );
}
```

### Search with Filters
```tsx
function SearchCompanies() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const { companies } = useCompanies();
  
  const filtered = companies.filter(c => 
    (!query || c.name?.includes(query)) &&
    (!category || c.category === category)
  );
  
  return (
    <div>
      <input onChange={e => setQuery(e.target.value)} />
      {filtered.map(c => <div key={c.company_id}>{c.name}</div>)}
    </div>
  );
}
```

## 📊 Database Fields Reference

### Companies Table
```
company_id              integer (PRIMARY KEY)
name                   string
logo_url               string
category               string
headquarters_address   string
employee_size          string
incorporation_year     string
overview_text          string
website_url            string
linkedin_url           string
company_type           string
mission_statement      string
vision_statement       string
core_values            string
... and 20+ more fields
```

### All Tables with Hooks
```
companies                    → useCompany(), useCompanies()
company_brand_reputation     → useBrandReputation()
company_business             → useBusinessInfo()
company_compensation         → useCompensation()
company_culture              → useCulture()
company_financials           → useFinancials()
company_logistics            → useLogistics()
company_people               → usePeople()
company_talent_growth        → useTalentGrowth()
company_technologies         → useTechnologies()
```

## 🎯 Common Tasks

### Filter by Category
```tsx
const companies = companies.filter(c => c.category === 'Technology');
```

### Sort by Name
```tsx
const sorted = [...companies].sort((a, b) => 
  (a.name || '').localeCompare(b.name || '')
);
```

### Search by Text
```tsx
const results = companies.filter(c =>
  c.name?.toLowerCase().includes(query.toLowerCase())
);
```

### Get Company Revenue
```tsx
const { profile } = useCompleteCompanyProfile(1);
console.log(profile.financials?.annual_revenue);
```

### Check Remote Policy
```tsx
const { data: logistics } = useLogistics(1);
console.log(logistics?.remote_policy_details);
```

## ⚠️ Error Handling

```tsx
const { companies, loading, error } = useCompanies();

if (error) {
  console.error('Failed:', error.message);
  return <div className="text-red-500">Error loading companies</div>;
}
```

## 🔐 Security Notes

- ✅ Always use `.env.local` for credentials
- ✅ Never commit `.env.local` to git
- ✅ Use ANON_KEY for frontend (already configured)
- ✅ Supabase connection is HTTPS encrypted
- ✅ Row Level Security (RLS) policies protect data

## 📁 Project Structure

```
src/
├── lib/
│   ├── supabase-client.ts    ← Client config
│   └── supabase.types.ts     ← All types
├── services/
│   └── companyService.ts     ← Database operations
├── hooks/
│   └── useCompanies.ts       ← React hooks
└── pages/
    ├── Companies.tsx          ← Companies list (updated)
    └── CompanyDetail.tsx      ← Detail page (updated)
```

## 🌐 API Response Hints

All hooks return similar structure:
```tsx
{
  data: T | null,           // The actual data
  loading: boolean,         // True while fetching
  error: Error | null       // Error if any
}
```

## 🚀 Deployment Checklist

Before deploying to production:

- [ ] Set `VITE_SUPABASE_URL` in production env
- [ ] Set `VITE_SUPABASE_ANON_KEY` in production env
- [ ] Enable RLS policies in Supabase
- [ ] Test real-time subscriptions
- [ ] Monitor error logs
- [ ] Set up monitoring/alerts

## 📞 Quick Help

**Can't see data?**
→ Check `.env.local` file  
→ Verify Supabase URL and key are correct  
→ Check if database has data in `companies` table

**Real-time not working?**
→ Enable replication in Supabase dashboard  
→ Check browser console for errors  
→ Verify network tab shows WebSocket connections

**Build failing?**
→ Run `npm install` again  
→ Clear `node_modules` and reinstall  
→ Check `.env.local` doesn't have syntax errors

---

**Version**: 1.0  
**Last Updated**: January 31, 2026  
**Status**: ✅ Production Ready
