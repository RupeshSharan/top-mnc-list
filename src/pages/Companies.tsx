import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, Building2, MapPin, Users, ArrowUpDown, Loader } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCompanies } from "@/hooks/useCompanies";
import type { Company } from "@/lib/supabase.types";

const Companies = () => {
  const { companies, loading, error } = useCompanies();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");

  // Extract unique categories from companies
  const categories = useMemo(
    () => [...new Set(companies.map((c) => c.category).filter(Boolean))],
    [companies]
  );

  const filteredCompanies = useMemo(() => {
    let result = [...companies];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.name?.toLowerCase().includes(query) ||
          c.category?.toLowerCase().includes(query) ||
          c.headquarters_address?.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      result = result.filter((c) => c.category === selectedCategory);
    }

    // Type filter
    if (selectedType !== "all") {
      result = result.filter((c) => c.company_type === selectedType);
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return (a.name || "").localeCompare(b.name || "");
        default:
          return 0;
      }
    });

    return result;
  }, [searchQuery, selectedCategory, selectedType, sortBy, companies]);

  const companyTypes = ["Product", "Service", "Consulting", "Startup"];

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Companies</h1>
        <p className="text-muted-foreground mt-1">
          Explore {companies.length}+ companies recruiting from SRM
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search companies, categories, locations..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category || ""}>
                {category || "Uncategorized"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Type Filter */}
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-full md:w-40">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {companyTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sort */}
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full md:w-40">
            <ArrowUpDown className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name (A-Z)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
          <p className="font-medium">Failed to load companies</p>
          <p className="text-sm">{error.message}</p>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">Loading companies...</span>
        </div>
      )}

      {/* Results Count */}
      {!loading && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Filter className="h-4 w-4" />
          <span>Showing {filteredCompanies.length} companies</span>
        </div>
      )}

      {/* Companies Grid */}
      {!loading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCompanies.map((company) => (
            <CompanyCard key={company.company_id} company={company} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredCompanies.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="h-12 w-12 mx-auto text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-semibold">No companies found</h3>
          <p className="text-muted-foreground">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
};

function CompanyCard({ company }: { company: Company }) {
  return (
    <Link to={`/companies/${company.company_id}`}>
      <Card className="h-full shadow-card hover:shadow-elevated transition-all hover:-translate-y-1 cursor-pointer">
        <CardContent className="p-5">
          <div className="flex flex-col gap-4">
            {/* Logo & Name */}
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center p-2 shrink-0">
                <img
                  src={company.logo_url || "/placeholder.svg"}
                  alt={company.name || "Company"}
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold truncate">{company.name}</h3>
                <p className="text-sm text-muted-foreground truncate">{company.category}</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 shrink-0" />
              <span className="truncate">{company.headquarters_address || "Location not specified"}</span>
            </div>

            {/* Employee Size */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground">Year</p>
                <p className="font-medium text-primary">
                  {company.incorporation_year || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Size</p>
                <p className="font-medium flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {company.employee_size || "N/A"}
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex gap-2 flex-wrap">
              <Badge variant="secondary">{company.company_type || "Type N/A"}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default Companies;
