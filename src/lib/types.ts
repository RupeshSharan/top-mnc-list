// SRM DCC Portal - Type Definitions

export interface Sector {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  sector_id: string;
  sector: Sector;
  description: string;
  headquarters: string;
  founded_year: number;
  employee_count: string;
  website: string;
  company_type: 'Product' | 'Service' | 'Consulting' | 'Startup';
  min_package: number;
  max_package: number;
  avg_package: number;
  hiring_volume: number;
  is_featured: boolean;
}

export interface Skill {
  id: string;
  name: string;
  category: 'Technical' | 'Soft Skills' | 'Tools';
  demand_level: 'High' | 'Medium' | 'Low';
  related_roles: string[];
  learning_resources: { title: string; url: string }[];
  companies_requiring: number;
}

export interface PlacementStat {
  id: string;
  company_id: string;
  year: number;
  students_hired: number;
  avg_package: number;
  max_package: number;
  min_package: number;
}

export interface SelectionProcess {
  id: string;
  company_id: string;
  rounds: { name: string; description: string; duration: string }[];
  eligibility_criteria: string[];
  preparation_tips: string[];
}

export interface Alumni {
  id: string;
  name: string;
  company_id: string;
  role: string;
  batch: number;
  linkedin_url?: string;
  profile_image?: string;
}

export interface PlacementDrive {
  id: string;
  company_id: string;
  company: Company;
  date: string;
  roles: string[];
  eligibility: string;
  registration_deadline: string;
  status: 'Upcoming' | 'Ongoing' | 'Completed';
}

export interface InnovationProject {
  id: string;
  title: string;
  description: string;
  partners: string[];
  category: string;
  status: 'Active' | 'Completed' | 'Planning';
  image?: string;
}

export interface HiringTrend {
  year: number;
  total_offers: number;
  avg_package: number;
  highest_package: number;
  sectors: { sector_id: string; offers: number }[];
}

export interface DashboardStats {
  total_companies: number;
  avg_package: number;
  highest_package: number;
  total_placements: number;
  top_sector: string;
}
