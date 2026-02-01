// Supabase Database Types - Generated from schema

export interface Database {
  public: {
    Tables: {
      companies: CompaniesTable;
      company_brand_reputation: CompanyBrandReputationTable;
      company_business: CompanyBusinessTable;
      company_compensation: CompanyCompensationTable;
      company_culture: CompanyCultureTable;
      company_financials: CompanyFinancialsTable;
      company_logistics: CompanyLogisticsTable;
      company_people: CompanyPeopleTable;
      company_talent_growth: CompanyTalentGrowthTable;
      company_technologies: CompanyTechnologiesTable;
    };
  };
}

export interface CompaniesTable {
  Row: Company;
  Insert: CompanyInsert;
  Update: CompanyUpdate;
}

export interface Company {
  company_id: number;
  company_type: string | null;
  name: string | null;
  short_name: string | null;
  logo_url: string | null;
  category: string | null;
  incorporation_year: string | null;
  overview_text: string | null;
  nature_of_company: string | null;
  headquarters_address: string | null;
  operating_countries: string | null;
  office_count: string | null;
  office_locations: string | null;
  employee_size: string | null;
  vision_statement: string | null;
  mission_statement: string | null;
  core_values: string | null;
  history_timeline: string | null;
  recent_news: string | null;
  website_url: string | null;
  linkedin_url: string | null;
  twitter_handle: string | null;
  facebook_url: string | null;
  instagram_url: string | null;
  primary_contact_email: string | null;
  primary_phone_number: string | null;
  regulatory_status: string | null;
  legal_issues: string | null;
  esg_ratings: string | null;
  supply_chain_dependencies: string | null;
  geopolitical_risks: string | null;
  macro_risks: string | null;
  carbon_footprint: string | null;
  ethical_sourcing: string | null;
  marketing_video_url: string | null;
  customer_testimonials: string | null;
}

export interface CompanyInsert extends Omit<Company, 'company_id'> {}
export interface CompanyUpdate extends Partial<Company> {}

export interface CompanyBrandReputationTable {
  Row: CompanyBrandReputation;
  Insert: CompanyBrandReputationInsert;
  Update: CompanyBrandReputationUpdate;
}

export interface CompanyBrandReputation {
  company_id: number | null;
  website_quality: string | null;
  website_rating: string | null;
  website_traffic_rank: string | null;
  social_media_followers: string | null;
  glassdoor_rating: string | null;
  indeed_rating: string | null;
  google_rating: string | null;
  awards_recognitions: string | null;
  brand_sentiment_score: string | null;
  event_participation: string | null;
}

export interface CompanyBrandReputationInsert extends Partial<CompanyBrandReputation> {}
export interface CompanyBrandReputationUpdate extends Partial<CompanyBrandReputation> {}

export interface CompanyBusinessTable {
  Row: CompanyBusiness;
  Insert: CompanyBusinessInsert;
  Update: CompanyBusinessUpdate;
}

export interface CompanyBusiness {
  company_id: number | null;
  pain_points_addressed: string | null;
  focus_sectors: string | null;
  offerings_description: string | null;
  top_customers: string | null;
  core_value_proposition: string | null;
  unique_differentiators: string | null;
  competitive_advantages: string | null;
  weaknesses_gaps: string | null;
  key_challenges_needs: string | null;
  key_competitors: string | null;
  market_share_percentage: string | null;
  sales_motion: string | null;
  customer_concentration_risk: string | null;
  exit_strategy_history: string | null;
  benchmark_vs_peers: string | null;
  future_projections: string | null;
  strategic_priorities: string | null;
  industry_associations: string | null;
  case_studies: string | null;
  go_to_market_strategy: string | null;
  innovation_roadmap: string | null;
  product_pipeline: string | null;
  tam: string | null;
  sam: string | null;
  som: string | null;
}

export interface CompanyBusinessInsert extends Partial<CompanyBusiness> {}
export interface CompanyBusinessUpdate extends Partial<CompanyBusiness> {}

export interface CompanyCompensationTable {
  Row: CompanyCompensation;
  Insert: CompanyCompensationInsert;
  Update: CompanyCompensationUpdate;
}

export interface CompanyCompensation {
  company_id: number | null;
  leave_policy: string | null;
  health_support: string | null;
  fixed_vs_variable_pay: string | null;
  bonus_predictability: string | null;
  esops_incentives: string | null;
  family_health_insurance: string | null;
  relocation_support: string | null;
  lifestyle_benefits: string | null;
}

export interface CompanyCompensationInsert extends Partial<CompanyCompensation> {}
export interface CompanyCompensationUpdate extends Partial<CompanyCompensation> {}

export interface CompanyCultureTable {
  Row: CompanyCulture;
  Insert: CompanyCultureInsert;
  Update: CompanyCultureUpdate;
}

export interface CompanyCulture {
  company_id: number | null;
  hiring_velocity: string | null;
  employee_turnover: string | null;
  avg_retention_tenure: string | null;
  diversity_metrics: string | null;
  work_culture_summary: string | null;
  manager_quality: string | null;
  psychological_safety: string | null;
  feedback_culture: string | null;
  diversity_inclusion_score: string | null;
  ethical_standards: string | null;
  burnout_risk: string | null;
  layoff_history: string | null;
  mission_clarity: string | null;
  sustainability_csr: string | null;
  crisis_behavior: string | null;
}

export interface CompanyCultureInsert extends Partial<CompanyCulture> {}
export interface CompanyCultureUpdate extends Partial<CompanyCulture> {}

export interface CompanyFinancialsTable {
  Row: CompanyFinancials;
  Insert: CompanyFinancialsInsert;
  Update: CompanyFinancialsUpdate;
}

export interface CompanyFinancials {
  company_id: number | null;
  annual_revenue: string | null;
  annual_profit: string | null;
  revenue_mix: string | null;
  valuation: string | null;
  yoy_growth_rate: string | null;
  profitability_status: string | null;
  key_investors: string | null;
  recent_funding_rounds: string | null;
  total_capital_raised: string | null;
  customer_acquisition_cost: string | null;
  customer_lifetime_value: string | null;
  cac_ltv_ratio: string | null;
  churn_rate: string | null;
  net_promoter_score: string | null;
  burn_rate: string | null;
  runway_months: string | null;
  burn_multiplier: string | null;
}

export interface CompanyFinancialsInsert extends Partial<CompanyFinancials> {}
export interface CompanyFinancialsUpdate extends Partial<CompanyFinancials> {}

export interface CompanyLogisticsTable {
  Row: CompanyLogistics;
  Insert: CompanyLogisticsInsert;
  Update: CompanyLogisticsUpdate;
}

export interface CompanyLogistics {
  company_id: number | null;
  remote_policy_details: string | null;
  typical_hours: string | null;
  overtime_expectations: string | null;
  weekend_work: string | null;
  flexibility_level: string | null;
  location_centrality: string | null;
  public_transport_access: string | null;
  cab_policy: string | null;
  airport_commute_time: string | null;
  office_zone_type: string | null;
  area_safety: string | null;
  safety_policies: string | null;
  infrastructure_safety: string | null;
  emergency_preparedness: string | null;
}

export interface CompanyLogisticsInsert extends Partial<CompanyLogistics> {}
export interface CompanyLogisticsUpdate extends Partial<CompanyLogistics> {}

export interface CompanyPeopleTable {
  Row: CompanyPeople;
  Insert: CompanyPeopleInsert;
  Update: CompanyPeopleUpdate;
}

export interface CompanyPeople {
  company_id: number | null;
  ceo_name: string | null;
  ceo_linkedin_url: string | null;
  key_leaders: string | null;
  warm_intro_pathways: string | null;
  decision_maker_access: string | null;
  contact_person_name: string | null;
  contact_person_title: string | null;
  contact_person_email: string | null;
  contact_person_phone: string | null;
  board_members: string | null;
}

export interface CompanyPeopleInsert extends Partial<CompanyPeople> {}
export interface CompanyPeopleUpdate extends Partial<CompanyPeople> {}

export interface CompanyTalentGrowthTable {
  Row: CompanyTalentGrowth;
  Insert: CompanyTalentGrowthInsert;
  Update: CompanyTalentGrowthUpdate;
}

export interface CompanyTalentGrowth {
  company_id: number | null;
  training_spend: string | null;
  onboarding_quality: string | null;
  learning_culture: string | null;
  exposure_quality: string | null;
  mentorship_availability: string | null;
  internal_mobility: string | null;
  promotion_clarity: string | null;
  tools_access: string | null;
  role_clarity: string | null;
  early_ownership: string | null;
  work_impact: string | null;
  execution_thinking_balance: string | null;
  automation_level: string | null;
  cross_functional_exposure: string | null;
  company_maturity: string | null;
  brand_value: string | null;
  client_quality: string | null;
  exit_opportunities: string | null;
  skill_relevance: string | null;
  external_recognition: string | null;
  network_strength: string | null;
  global_exposure: string | null;
}

export interface CompanyTalentGrowthInsert extends Partial<CompanyTalentGrowth> {}
export interface CompanyTalentGrowthUpdate extends Partial<CompanyTalentGrowth> {}

export interface CompanyTechnologiesTable {
  Row: CompanyTechnologies;
  Insert: CompanyTechnologiesInsert;
  Update: CompanyTechnologiesUpdate;
}

export interface CompanyTechnologies {
  company_id: number | null;
  technology_partners: string | null;
  intellectual_property: string | null;
  r_and_d_investment: string | null;
  ai_ml_adoption_level: string | null;
  tech_stack: string | null;
  cybersecurity_posture: string | null;
  partnership_ecosystem: string | null;
  tech_adoption_rating: string | null;
}

export interface CompanyTechnologiesInsert extends Partial<CompanyTechnologies> {}
export interface CompanyTechnologiesUpdate extends Partial<CompanyTechnologies> {}
