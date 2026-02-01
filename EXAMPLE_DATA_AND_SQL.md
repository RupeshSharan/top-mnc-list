-- Example: How to populate your Supabase database
-- WARNING: This is example data structure - adapt to your needs

-- Insert example company
INSERT INTO public.companies (
  company_id,
  company_type,
  name,
  short_name,
  logo_url,
  category,
  incorporation_year,
  overview_text,
  headquarters_address,
  employee_size,
  vision_statement,
  mission_statement,
  website_url,
  linkedin_url
) VALUES (
  1,
  'Product',
  'Tech Innovators Inc',
  'TII',
  'https://example.com/logo.png',
  'Technology',
  '2010',
  'Leading provider of innovative technology solutions for enterprises',
  'San Francisco, California, USA',
  '500-1000',
  'To transform businesses through cutting-edge technology',
  'Deliver exceptional value through innovative software',
  'https://techinnovators.com',
  'https://linkedin.com/company/techinnovators'
);

-- Insert brand reputation data
INSERT INTO public.company_brand_reputation (
  company_id,
  website_quality,
  glassdoor_rating,
  google_rating,
  awards_recognitions
) VALUES (
  1,
  'Excellent',
  '4.5',
  '4.7',
  'Best Place to Work 2024, Innovation Award'
);

-- Insert business information
INSERT INTO public.company_business (
  company_id,
  pain_points_addressed,
  focus_sectors,
  core_value_proposition,
  key_competitors,
  market_share_percentage,
  tam,
  sam,
  som
) VALUES (
  1,
  'Enterprise automation, digital transformation',
  'Finance, Healthcare, Retail',
  'Automated workflows that save 40% operational time',
  'Company X, Company Y, Company Z',
  '2.5%',
  '$500B',
  '$50B',
  '$5B'
);

-- Insert compensation data
INSERT INTO public.company_compensation (
  company_id,
  leave_policy,
  health_support,
  fixed_vs_variable_pay,
  family_health_insurance,
  relocation_support,
  lifestyle_benefits
) VALUES (
  1,
  '25 days annual + 10 national holidays',
  'Comprehensive health coverage + wellness program',
  '80% fixed, 20% variable',
  'Yes, for employees and families',
  'Full relocation package + $50K assistance',
  'Gym, therapy, wellness retreats'
);

-- Insert culture data
INSERT INTO public.company_culture (
  company_id,
  work_culture_summary,
  diversity_inclusion_score,
  employee_turnover,
  avg_retention_tenure,
  hiring_velocity,
  ethical_standards,
  sustainability_csr
) VALUES (
  1,
  'Collaborative, fast-paced, innovation-driven culture with focus on employee growth',
  '8.5/10',
  '8%',
  '7.2 years',
  'High - growing 40% YoY',
  'Strong ethics compliance, zero tolerance policy',
  'Carbon neutral by 2030, active in community projects'
);

-- Insert financials data
INSERT INTO public.company_financials (
  company_id,
  annual_revenue,
  annual_profit,
  valuation,
  yoy_growth_rate,
  profitability_status,
  key_investors,
  total_capital_raised,
  burn_rate,
  runway_months
) VALUES (
  1,
  '$450M',
  '$95M',
  '$2.5B',
  '35%',
  'Profitable',
  'Sequoia Capital, Accel, Lightspeed Venture',
  '$250M',
  'N/A - Profitable',
  'N/A'
);

-- Insert logistics data
INSERT INTO public.company_logistics (
  company_id,
  remote_policy_details,
  typical_hours,
  flexibility_level,
  location_centrality,
  public_transport_access,
  office_zone_type,
  area_safety
) VALUES (
  1,
  'Hybrid: 3 days office, 2 days remote. Choose your work arrangement',
  'Core hours 10 AM - 3 PM, flexible rest',
  'Very High - results-oriented approach',
  'Downtown financial district',
  'Excellent - within 2 mins walk of BART station',
  'Premium business district',
  'Extremely Safe - 24/7 security'
);

-- Insert people data
INSERT INTO public.company_people (
  company_id,
  ceo_name,
  ceo_linkedin_url,
  contact_person_name,
  contact_person_title,
  contact_person_email,
  contact_person_phone
) VALUES (
  1,
  'Jane Smith',
  'https://linkedin.com/in/janesmith',
  'John Doe',
  'Talent Acquisition Lead',
  'careers@techinnovators.com',
  '+1-415-555-0100'
);

-- Insert talent growth data
INSERT INTO public.company_talent_growth (
  company_id,
  training_spend,
  onboarding_quality,
  learning_culture,
  mentorship_availability,
  internal_mobility,
  promotion_clarity,
  tools_access,
  early_ownership,
  work_impact,
  skill_relevance,
  external_recognition,
  global_exposure
) VALUES (
  1,
  '$5,000 per employee annually',
  'Comprehensive 4-week program',
  'Excellent - 70% engage in learning',
  'Formal programs + informal mentoring',
  'High - 60% promotions are internal',
  'Clear career paths, transparent criteria',
  'Latest tools and software provided',
  'High - ownership from day 1',
  'Direct impact on business metrics',
  'Market-leading technologies',
  'Featured in industry publications',
  'Work with teams across 15 countries'
);

-- Insert technologies data
INSERT INTO public.company_technologies (
  company_id,
  technology_partners,
  intellectual_property,
  ai_ml_adoption_level,
  tech_stack,
  cybersecurity_posture,
  partnership_ecosystem
) VALUES (
  1,
  'AWS, Google Cloud, Azure partnerships',
  '45 patents filed, 12 patents granted',
  'Advanced - AI models in 60% of products',
  'Node.js, React, Python, PostgreSQL, Kubernetes',
  'SOC 2 Type II, ISO 27001 certified',
  'Strategic partnerships with Fortune 500 companies'
);

---
-- Viewing your data

-- Get a complete company profile
SELECT * FROM companies WHERE company_id = 1;
SELECT * FROM company_business WHERE company_id = 1;
SELECT * FROM company_culture WHERE company_id = 1;
SELECT * FROM company_financials WHERE company_id = 1;

-- Quick statistics across all companies
SELECT 
  COUNT(*) as total_companies,
  COUNT(DISTINCT category) as unique_categories,
  COUNT(DISTINCT company_type) as company_types
FROM companies;

-- Find companies by criteria
SELECT name, category, employee_size 
FROM companies 
WHERE category = 'Technology' 
ORDER BY incorporation_year DESC;

-- Get companies with high growth
SELECT 
  c.name, 
  cf.yoy_growth_rate, 
  cf.annual_revenue
FROM companies c
LEFT JOIN company_financials cf ON c.company_id = cf.company_id
ORDER BY CAST(NULLIF(REPLACE(cf.yoy_growth_rate, '%', ''), '') as NUMERIC) DESC;

---
-- Setting up Real-Time subscriptions in Supabase

-- Enable real-time for companies table
-- Go to Supabase Dashboard > Database > Replication
-- Toggle "Realtime" for these tables:
-- - companies
-- - company_brand_reputation
-- - company_business
-- - company_compensation
-- - company_culture
-- - company_financials
-- - company_logistics
-- - company_people
-- - company_talent_growth
-- - company_technologies

-- After enabling, your React app will automatically sync changes!

---
-- Data Migration Tips

-- If migrating from mock data to Supabase:

-- 1. Export mock data structure
-- 2. Map fields from mock-data.ts to Supabase schema
-- 3. Use data import tools in Supabase dashboard
-- 4. Verify data integrity
-- 5. Test real-time subscriptions
-- 6. Remove mock-data.ts references from code (already done!)

---
-- Monitoring and maintenance

-- Check data volume
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Monitor active connections
SELECT count(*) FROM pg_stat_activity;

-- Check for slow queries (if slow query log is enabled)
-- Available in Supabase dashboard > Database > Logs
