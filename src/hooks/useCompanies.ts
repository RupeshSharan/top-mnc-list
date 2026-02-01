import { useEffect, useState } from 'react';
import {
  fetchAllCompanies,
  fetchCompanyById,
  fetchCompleteCompanyProfile,
  subscribeToCompanies,
  subscribeToCompany,
  unsubscribeFromChannel,
  fetchBrandReputation,
  fetchBusinessInfo,
  fetchCompensation,
  fetchCulture,
  fetchFinancials,
  fetchLogistics,
  fetchPeople,
  fetchTalentGrowth,
  fetchTechnologies,
  subscribeToBrandReputation,
  subscribeToBusinessInfo,
  subscribeToCompensation,
  subscribeToCulture,
  subscribeToFinancials,
  subscribeToLogistics,
  subscribeToPeople,
  subscribeToTalentGrowth,
  subscribeToTechnologies,
} from '@/services/companyService';
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

// ===== COMPANIES HOOKS =====

export function useCompanies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let subscription: any = null;

    const loadCompanies = async () => {
      try {
        setLoading(true);
        const data = await fetchAllCompanies();
        setCompanies(data);

        // Subscribe to real-time updates
        subscription = await subscribeToCompanies((updatedData) => {
          setCompanies(updatedData);
        });
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load companies'));
      } finally {
        setLoading(false);
      }
    };

    loadCompanies();

    return () => {
      if (subscription) {
        unsubscribeFromChannel(subscription);
      }
    };
  }, []);

  return { companies, loading, error };
}

export function useCompany(companyId: number | null) {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!companyId) {
      setLoading(false);
      return;
    }

    let subscription: any = null;

    const loadCompany = async () => {
      try {
        setLoading(true);
        const data = await fetchCompanyById(companyId);
        setCompany(data);

        // Subscribe to real-time updates
        subscription = await subscribeToCompany(companyId, (updatedData) => {
          setCompany(updatedData);
        });
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load company'));
      } finally {
        setLoading(false);
      }
    };

    loadCompany();

    return () => {
      if (subscription) {
        unsubscribeFromChannel(subscription);
      }
    };
  }, [companyId]);

  return { company, loading, error };
}

export function useCompleteCompanyProfile(companyId: number | null) {
  const [profile, setProfile] = useState<{
    company: Company | null;
    brandReputation: CompanyBrandReputation | null;
    businessInfo: CompanyBusiness | null;
    compensation: CompanyCompensation | null;
    culture: CompanyCulture | null;
    financials: CompanyFinancials | null;
    logistics: CompanyLogistics | null;
    people: CompanyPeople | null;
    talentGrowth: CompanyTalentGrowth | null;
    technologies: CompanyTechnologies | null;
  }>({
    company: null,
    brandReputation: null,
    businessInfo: null,
    compensation: null,
    culture: null,
    financials: null,
    logistics: null,
    people: null,
    talentGrowth: null,
    technologies: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!companyId) {
      setLoading(false);
      return;
    }

    let subscriptions: any[] = [];

    const loadProfile = async () => {
      try {
        setLoading(true);
        const data = await fetchCompleteCompanyProfile(companyId);
        setProfile(data);

        // Subscribe to individual updates
        const brandSub = await subscribeToBrandReputation(companyId, (data) => {
          setProfile((prev) => ({ ...prev, brandReputation: data }));
        });
        const businessSub = await subscribeToBusinessInfo(companyId, (data) => {
          setProfile((prev) => ({ ...prev, businessInfo: data }));
        });
        const compensationSub = await subscribeToCompensation(companyId, (data) => {
          setProfile((prev) => ({ ...prev, compensation: data }));
        });
        const cultureSub = await subscribeToCulture(companyId, (data) => {
          setProfile((prev) => ({ ...prev, culture: data }));
        });
        const financialsSub = await subscribeToFinancials(companyId, (data) => {
          setProfile((prev) => ({ ...prev, financials: data }));
        });
        const logisticsSub = await subscribeToLogistics(companyId, (data) => {
          setProfile((prev) => ({ ...prev, logistics: data }));
        });
        const peopleSub = await subscribeToPeople(companyId, (data) => {
          setProfile((prev) => ({ ...prev, people: data }));
        });
        const talentSub = await subscribeToTalentGrowth(companyId, (data) => {
          setProfile((prev) => ({ ...prev, talentGrowth: data }));
        });
        const techSub = await subscribeToTechnologies(companyId, (data) => {
          setProfile((prev) => ({ ...prev, technologies: data }));
        });

        subscriptions = [
          brandSub,
          businessSub,
          compensationSub,
          cultureSub,
          financialsSub,
          logisticsSub,
          peopleSub,
          talentSub,
          techSub,
        ];
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load company profile'));
      } finally {
        setLoading(false);
      }
    };

    loadProfile();

    return () => {
      subscriptions.forEach((sub) => {
        if (sub) {
          unsubscribeFromChannel(sub);
        }
      });
    };
  }, [companyId]);

  return { profile, loading, error };
}

// ===== INDIVIDUAL DATA HOOKS =====

export function useBrandReputation(companyId: number | null) {
  const [data, setData] = useState<CompanyBrandReputation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!companyId) {
      setLoading(false);
      return;
    }

    let subscription: any = null;

    const load = async () => {
      try {
        setLoading(true);
        const result = await fetchBrandReputation(companyId);
        setData(result);

        subscription = await subscribeToBrandReputation(companyId, setData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load brand reputation'));
      } finally {
        setLoading(false);
      }
    };

    load();

    return () => {
      if (subscription) {
        unsubscribeFromChannel(subscription);
      }
    };
  }, [companyId]);

  return { data, loading, error };
}

export function useBusinessInfo(companyId: number | null) {
  const [data, setData] = useState<CompanyBusiness | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!companyId) {
      setLoading(false);
      return;
    }

    let subscription: any = null;

    const load = async () => {
      try {
        setLoading(true);
        const result = await fetchBusinessInfo(companyId);
        setData(result);

        subscription = await subscribeToBusinessInfo(companyId, setData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load business info'));
      } finally {
        setLoading(false);
      }
    };

    load();

    return () => {
      if (subscription) {
        unsubscribeFromChannel(subscription);
      }
    };
  }, [companyId]);

  return { data, loading, error };
}

export function useCompensation(companyId: number | null) {
  const [data, setData] = useState<CompanyCompensation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!companyId) {
      setLoading(false);
      return;
    }

    let subscription: any = null;

    const load = async () => {
      try {
        setLoading(true);
        const result = await fetchCompensation(companyId);
        setData(result);

        subscription = await subscribeToCompensation(companyId, setData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load compensation'));
      } finally {
        setLoading(false);
      }
    };

    load();

    return () => {
      if (subscription) {
        unsubscribeFromChannel(subscription);
      }
    };
  }, [companyId]);

  return { data, loading, error };
}

export function useCulture(companyId: number | null) {
  const [data, setData] = useState<CompanyCulture | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!companyId) {
      setLoading(false);
      return;
    }

    let subscription: any = null;

    const load = async () => {
      try {
        setLoading(true);
        const result = await fetchCulture(companyId);
        setData(result);

        subscription = await subscribeToCulture(companyId, setData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load culture'));
      } finally {
        setLoading(false);
      }
    };

    load();

    return () => {
      if (subscription) {
        unsubscribeFromChannel(subscription);
      }
    };
  }, [companyId]);

  return { data, loading, error };
}

export function useFinancials(companyId: number | null) {
  const [data, setData] = useState<CompanyFinancials | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!companyId) {
      setLoading(false);
      return;
    }

    let subscription: any = null;

    const load = async () => {
      try {
        setLoading(true);
        const result = await fetchFinancials(companyId);
        setData(result);

        subscription = await subscribeToFinancials(companyId, setData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load financials'));
      } finally {
        setLoading(false);
      }
    };

    load();

    return () => {
      if (subscription) {
        unsubscribeFromChannel(subscription);
      }
    };
  }, [companyId]);

  return { data, loading, error };
}

export function useLogistics(companyId: number | null) {
  const [data, setData] = useState<CompanyLogistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!companyId) {
      setLoading(false);
      return;
    }

    let subscription: any = null;

    const load = async () => {
      try {
        setLoading(true);
        const result = await fetchLogistics(companyId);
        setData(result);

        subscription = await subscribeToLogistics(companyId, setData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load logistics'));
      } finally {
        setLoading(false);
      }
    };

    load();

    return () => {
      if (subscription) {
        unsubscribeFromChannel(subscription);
      }
    };
  }, [companyId]);

  return { data, loading, error };
}

export function usePeople(companyId: number | null) {
  const [data, setData] = useState<CompanyPeople | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!companyId) {
      setLoading(false);
      return;
    }

    let subscription: any = null;

    const load = async () => {
      try {
        setLoading(true);
        const result = await fetchPeople(companyId);
        setData(result);

        subscription = await subscribeToPeople(companyId, setData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load people'));
      } finally {
        setLoading(false);
      }
    };

    load();

    return () => {
      if (subscription) {
        unsubscribeFromChannel(subscription);
      }
    };
  }, [companyId]);

  return { data, loading, error };
}

export function useTalentGrowth(companyId: number | null) {
  const [data, setData] = useState<CompanyTalentGrowth | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!companyId) {
      setLoading(false);
      return;
    }

    let subscription: any = null;

    const load = async () => {
      try {
        setLoading(true);
        const result = await fetchTalentGrowth(companyId);
        setData(result);

        subscription = await subscribeToTalentGrowth(companyId, setData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load talent growth'));
      } finally {
        setLoading(false);
      }
    };

    load();

    return () => {
      if (subscription) {
        unsubscribeFromChannel(subscription);
      }
    };
  }, [companyId]);

  return { data, loading, error };
}

export function useTechnologies(companyId: number | null) {
  const [data, setData] = useState<CompanyTechnologies | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!companyId) {
      setLoading(false);
      return;
    }

    let subscription: any = null;

    const load = async () => {
      try {
        setLoading(true);
        const result = await fetchTechnologies(companyId);
        setData(result);

        subscription = await subscribeToTechnologies(companyId, setData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load technologies'));
      } finally {
        setLoading(false);
      }
    };

    load();

    return () => {
      if (subscription) {
        unsubscribeFromChannel(subscription);
      }
    };
  }, [companyId]);

  return { data, loading, error };
}
