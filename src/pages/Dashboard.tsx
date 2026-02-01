import { 
  Search, 
  Building2, 
  Lightbulb, 
  BarChart3, 
  TrendingUp,
  Users,
  IndianRupee,
  ArrowRight,
  Calendar,
  MapPin,
  Loader
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useCompanies } from "@/hooks/useCompanies";
import { supabase } from "@/lib/supabase-client";

const Dashboard = () => {
  const { companies, loading, error } = useCompanies();
  const [compensationData, setCompensationData] = useState<any[]>([]);

  // Fetch compensation data
  useEffect(() => {
    const fetchCompensation = async () => {
      try {
        const { data, error } = await supabase
          .from('company_compensation')
          .select('company_id, average_ctc, highest_ctc, lowest_ctc');
        
        if (error) throw error;
        setCompensationData(data || []);
      } catch (err) {
        console.error('Error fetching compensation:', err);
      }
    };

    fetchCompensation();
  }, []);

  // Calculate dashboard stats from real data
  const stats = (() => {
    if (!companies || companies.length === 0) {
      return {
        total_companies: 0,
        avg_package: 0,
        highest_package: 0,
        total_placements: 0,
        top_sector: "N/A"
      };
    }

    const totalCompanies = companies.length;
    
    // Filter valid compensation data (not null/undefined)
    const validCompensation = compensationData.filter(
      c => c.average_ctc !== null && c.average_ctc !== undefined && c.average_ctc > 0
    );
    
    // Calculate average from compensation data
    const avgPackage = validCompensation.length > 0
      ? Math.round(
          validCompensation.reduce((sum, c) => sum + c.average_ctc, 0) / validCompensation.length
        )
      : 8; // Default average if no data
    
    // Get highest package from compensation data
    const validHighest = compensationData.filter(
      c => c.highest_ctc !== null && c.highest_ctc !== undefined && c.highest_ctc > 0
    );
    const highestPackage = validHighest.length > 0
      ? Math.max(...validHighest.map(c => c.highest_ctc))
      : 20; // Default highest if no data
    
    const topSector = companies[0]?.category || "Technology";

    return {
      total_companies: totalCompanies,
      avg_package: avgPackage,
      highest_package: highestPackage,
      total_placements: totalCompanies * 10, // Placeholder calculation
      top_sector: topSector
    };
  })();

  // Filter featured companies (top companies by compensation)
  const featuredCompanies = companies
    ?.map(company => {
      const comp = compensationData.find(c => c.company_id === company.company_id);
      return { ...company, average_ctc: comp?.average_ctc || 0 };
    })
    .sort((a, b) => (b.average_ctc || 0) - (a.average_ctc || 0))
    .slice(0, 6) || [];

  const statsConfig = [
    { 
      title: "Total Companies", 
      value: stats.total_companies, 
      icon: Building2, 
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    { 
      title: "Average Package", 
      value: `₹${stats.avg_package} LPA`, 
      icon: IndianRupee, 
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    { 
      title: "Highest Package", 
      value: `₹${stats.highest_package} LPA`, 
      icon: TrendingUp, 
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    { 
      title: "Total Placements", 
      value: stats.total_placements, 
      icon: Users, 
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
  ];

  const quickLinks = [
    { title: "Companies", description: "Explore 65+ recruiting companies", icon: Building2, href: "/companies", color: "bg-primary" },
    { title: "Skills", description: "Discover in-demand skills", icon: Lightbulb, href: "/skills", color: "bg-accent" },
    { title: "Analytics", description: "View placement trends", icon: BarChart3, href: "/analytics", color: "bg-green-600" },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome to SRM DCC</h1>
          <p className="text-muted-foreground mt-1">Your Digital Career Compass for placement success</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsConfig.map((stat) => (
          <Card key={stat.title} className="shadow-card hover:shadow-elevated transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Access Tiles */}
      <div className="grid gap-4 md:grid-cols-3">
        {quickLinks.map((link) => (
          <Link key={link.title} to={link.href}>
            <Card className="shadow-card hover:shadow-elevated transition-all hover:-translate-y-1 cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${link.color}`}>
                    <link.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {link.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{link.description}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Featured Companies Carousel */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Featured Companies</h2>
            <p className="text-sm text-muted-foreground">Top recruiters from SRM campus</p>
          </div>
          <Button variant="ghost" asChild>
            <Link to="/companies" className="text-primary">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {loading ? (
          <Card className="flex items-center justify-center p-12">
            <Loader className="h-8 w-8 animate-spin text-primary" />
          </Card>
        ) : error ? (
          <Card className="p-6 bg-red-50 border-red-200">
            <p className="text-red-600">Error loading companies</p>
          </Card>
        ) : featuredCompanies.length === 0 ? (
          <Card className="p-6 text-center text-muted-foreground">
            <p>No companies available</p>
          </Card>
        ) : (
          <Carousel className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {featuredCompanies.map((company) => (
                <CarouselItem key={company.company_id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <Link to={`/companies/${company.company_id}`}>
                    <Card className="shadow-card hover:shadow-elevated transition-all h-full">
                      <CardContent className="p-6">
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center gap-4">
                            <div className="h-14 w-14 rounded-lg bg-secondary flex items-center justify-center p-2">
                              <img 
                                src={company.logo_url || '/placeholder.svg'} 
                                  alt={company.name ?? company.short_name ?? 'Company'}
                                className="max-h-full max-w-full object-contain"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = '/placeholder.svg';
                                }}
                              />
                            </div>
                            <div>
                              <h3 className="font-semibold">{company.name ?? company.short_name}</h3>
                              <p className="text-sm text-muted-foreground">{company.category}</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Avg Package</span>
                            <span className="font-medium text-primary">
                              ₹{company.average_ctc || 0} LPA
                            </span>
                          </div>
                          <Badge variant="secondary" className="w-fit">
                            {company.company_type || "N/A"}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-4" />
            <CarouselNext className="hidden md:flex -right-4" />
          </Carousel>
        )}
      </div>

      {/* Top Hiring Sector */}
      <Card className="gradient-primary text-white shadow-elevated">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">Top Hiring Sector</p>
              <h3 className="text-2xl font-bold mt-1">{stats.top_sector}</h3>
              <p className="text-white/70 mt-2">{stats.total_companies}+ companies recruiting</p>
            </div>
            <div className="p-4 bg-white/10 rounded-full">
              <TrendingUp className="h-8 w-8" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
