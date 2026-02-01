import { supabase } from '@/lib/supabase-client';
import type {
  Company,
  CompanyBrandReputation,
  CompanyBusiness,
  CompanyCompensation,
  CompanyCulture,
  CompanyFinancials,
  CompanyLogistics,
  CompanyPeople,
  CompanyTalentGrowth,
  CompanyTechnologies,
} from '@/lib/supabase.types';

/**
 * Company Services - Real-time database operations
 */

// ===== COMPANIES TABLE =====

export async function fetchAllCompanies() {
  const { data, error } = await supabase
    .from('companies')
    .select('*');

  if (error) {
    console.error('Error fetching companies:', error);
    throw error;
  }

  return data as Company[];
}

export async function fetchCompanyById(companyId: number) {
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .eq('company_id', companyId)
    .single();

  if (error) {
    console.error('Error fetching company:', error);
    throw error;
  }

  return data as Company;
}

export async function fetchCompaniesByCategory(category: string) {
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .eq('category', category);

  if (error) {
    console.error('Error fetching companies by category:', error);
    throw error;
  }

  return data as Company[];
}

export async function searchCompanies(query: string) {
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .or(`name.ilike.%${query}%,short_name.ilike.%${query}%,headquarters_address.ilike.%${query}%`);

  if (error) {
    console.error('Error searching companies:', error);
    throw error;
  }

  return data as Company[];
}

export function subscribeToCompanies(callback: (data: Company[]) => void) {
  const channel = supabase
    .channel('public:companies')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'companies',
      },
      () => {
        // Re-fetch all companies when any change occurs
        fetchAllCompanies()
          .then(callback)
          .catch(console.error);
      }
    )
    .subscribe();

  return channel;
}

export function subscribeToCompany(
  companyId: number,
  callback: (data: Company) => void
) {
  const channel = supabase
    .channel(`public:companies:company_id=eq.${companyId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'companies',
        filter: `company_id=eq.${companyId}`,
      },
      (payload) => {
        callback(payload.new as Company);
      }
    )
    .subscribe();

  return channel;
}

// ===== BRAND REPUTATION =====

export async function fetchBrandReputation(companyId: number) {
  const { data, error } = await supabase
    .from('company_brand_reputation')
    .select('*')
    .eq('company_id', companyId)
    .single();

  if (error && error.code !== 'PGRST116') {
    // PGRST116 is "no rows returned"
    console.error('Error fetching brand reputation:', error);
  }

  return data ? (data as CompanyBrandReputation) : null;
}

export function subscribeToBrandReputation(
  companyId: number,
  callback: (data: CompanyBrandReputation) => void
) {
  const channel = supabase
    .channel(`public:company_brand_reputation:company_id=eq.${companyId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'company_brand_reputation',
        filter: `company_id=eq.${companyId}`,
      },
      (payload) => {
        callback(payload.new as CompanyBrandReputation);
      }
    )
    .subscribe();

  return channel;
}

// ===== BUSINESS INFORMATION =====

export async function fetchBusinessInfo(companyId: number) {
  const { data, error } = await supabase
    .from('company_business')
    .select('*')
    .eq('company_id', companyId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching business info:', error);
  }

  return data ? (data as CompanyBusiness) : null;
}

export function subscribeToBusinessInfo(
  companyId: number,
  callback: (data: CompanyBusiness) => void
) {
  const channel = supabase
    .channel(`public:company_business:company_id=eq.${companyId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'company_business',
        filter: `company_id=eq.${companyId}`,
      },
      (payload) => {
        callback(payload.new as CompanyBusiness);
      }
    )
    .subscribe();

  return channel;
}

// ===== COMPENSATION =====

export async function fetchCompensation(companyId: number) {
  const { data, error } = await supabase
    .from('company_compensation')
    .select('*')
    .eq('company_id', companyId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching compensation:', error);
  }

  return data ? (data as CompanyCompensation) : null;
}

export function subscribeToCompensation(
  companyId: number,
  callback: (data: CompanyCompensation) => void
) {
  const channel = supabase
    .channel(`public:company_compensation:company_id=eq.${companyId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'company_compensation',
        filter: `company_id=eq.${companyId}`,
      },
      (payload) => {
        callback(payload.new as CompanyCompensation);
      }
    )
    .subscribe();

  return channel;
}

// ===== CULTURE =====

export async function fetchCulture(companyId: number) {
  const { data, error } = await supabase
    .from('company_culture')
    .select('*')
    .eq('company_id', companyId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching culture:', error);
  }

  return data ? (data as CompanyCulture) : null;
}

export function subscribeToCulture(
  companyId: number,
  callback: (data: CompanyCulture) => void
) {
  const channel = supabase
    .channel(`public:company_culture:company_id=eq.${companyId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'company_culture',
        filter: `company_id=eq.${companyId}`,
      },
      (payload) => {
        callback(payload.new as CompanyCulture);
      }
    )
    .subscribe();

  return channel;
}

// ===== FINANCIALS =====

export async function fetchFinancials(companyId: number) {
  const { data, error } = await supabase
    .from('company_financials')
    .select('*')
    .eq('company_id', companyId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching financials:', error);
  }

  return data ? (data as CompanyFinancials) : null;
}

export function subscribeToFinancials(
  companyId: number,
  callback: (data: CompanyFinancials) => void
) {
  const channel = supabase
    .channel(`public:company_financials:company_id=eq.${companyId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'company_financials',
        filter: `company_id=eq.${companyId}`,
      },
      (payload) => {
        callback(payload.new as CompanyFinancials);
      }
    )
    .subscribe();

  return channel;
}

// ===== LOGISTICS =====

export async function fetchLogistics(companyId: number) {
  const { data, error } = await supabase
    .from('company_logistics')
    .select('*')
    .eq('company_id', companyId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching logistics:', error);
  }

  return data ? (data as CompanyLogistics) : null;
}

export function subscribeToLogistics(
  companyId: number,
  callback: (data: CompanyLogistics) => void
) {
  const channel = supabase
    .channel(`public:company_logistics:company_id=eq.${companyId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'company_logistics',
        filter: `company_id=eq.${companyId}`,
      },
      (payload) => {
        callback(payload.new as CompanyLogistics);
      }
    )
    .subscribe();

  return channel;
}

// ===== PEOPLE =====

export async function fetchPeople(companyId: number) {
  const { data, error } = await supabase
    .from('company_people')
    .select('*')
    .eq('company_id', companyId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching people:', error);
  }

  return data ? (data as CompanyPeople) : null;
}

export function subscribeToPeople(
  companyId: number,
  callback: (data: CompanyPeople) => void
) {
  const channel = supabase
    .channel(`public:company_people:company_id=eq.${companyId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'company_people',
        filter: `company_id=eq.${companyId}`,
      },
      (payload) => {
        callback(payload.new as CompanyPeople);
      }
    )
    .subscribe();

  return channel;
}

// ===== TALENT GROWTH =====

export async function fetchTalentGrowth(companyId: number) {
  const { data, error } = await supabase
    .from('company_talent_growth')
    .select('*')
    .eq('company_id', companyId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching talent growth:', error);
  }

  return data ? (data as CompanyTalentGrowth) : null;
}

export function subscribeToTalentGrowth(
  companyId: number,
  callback: (data: CompanyTalentGrowth) => void
) {
  const channel = supabase
    .channel(`public:company_talent_growth:company_id=eq.${companyId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'company_talent_growth',
        filter: `company_id=eq.${companyId}`,
      },
      (payload) => {
        callback(payload.new as CompanyTalentGrowth);
      }
    )
    .subscribe();

  return channel;
}

// ===== TECHNOLOGIES =====

export async function fetchTechnologies(companyId: number) {
  const { data, error } = await supabase
    .from('company_technologies')
    .select('*')
    .eq('company_id', companyId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching technologies:', error);
  }

  return data ? (data as CompanyTechnologies) : null;
}

export function subscribeToTechnologies(
  companyId: number,
  callback: (data: CompanyTechnologies) => void
) {
  const channel = supabase
    .channel(`public:company_technologies:company_id=eq.${companyId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'company_technologies',
        filter: `company_id=eq.${companyId}`,
      },
      (payload) => {
        callback(payload.new as CompanyTechnologies);
      }
    )
    .subscribe();

  return channel;
}

// ===== UTILITY FUNCTIONS =====

/**
 * Fetch complete company profile with all related data
 */
export async function fetchCompleteCompanyProfile(companyId: number) {
  try {
    const [
      company,
      brandReputation,
      businessInfo,
      compensation,
      culture,
      financials,
      logistics,
      people,
      talentGrowth,
      technologies,
    ] = await Promise.all([
      fetchCompanyById(companyId),
      fetchBrandReputation(companyId),
      fetchBusinessInfo(companyId),
      fetchCompensation(companyId),
      fetchCulture(companyId),
      fetchFinancials(companyId),
      fetchLogistics(companyId),
      fetchPeople(companyId),
      fetchTalentGrowth(companyId),
      fetchTechnologies(companyId),
    ]);

    return {
      company,
      brandReputation,
      businessInfo,
      compensation,
      culture,
      financials,
      logistics,
      people,
      talentGrowth,
      technologies,
    };
  } catch (error) {
    console.error('Error fetching complete company profile:', error);
    throw error;
  }
}

/**
 * Unsubscribe from a real-time subscription
 */
export async function unsubscribeFromChannel(subscription: any) {
  if (subscription) {
    await supabase.removeChannel(subscription);
  }
}
