import { 
  Lightbulb, 
  Users, 
  Rocket, 
  Mail, 
  ExternalLink,
  CheckCircle,
  Clock,
  Loader,
  Building2
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { useCompanies } from "@/hooks/useCompanies";
import { supabase } from "@/lib/supabase-client";

interface Project {
  id: string;
  title: string;
  description: string;
  status: 'Active' | 'Completed' | 'Planning';
  startDate: string;
  endDate: string;
  team: string;
  category: string;
  partners: string[];
  impact: string;
}

interface Partnership {
  id: string;
  name: string;
  type: string;
  focus: string;
}

const Innovation = () => {
  const { companies, loading: companiesLoading } = useCompanies();
  const [innovationProjects, setInnovationProjects] = useState<Project[]>([]);
  const [partnerships, setPartnerships] = useState<Partnership[]>([]);
  const [loading, setLoading] = useState(true);

  // Generate innovation projects from company data
  useEffect(() => {
    const generateProjects = async () => {
      try {
        setLoading(true);
        
        if (!companies || companies.length === 0) {
          console.log('No companies data available');
          setInnovationProjects([]);
          setPartnerships([]);
          return;
        }

        // Create projects from company vision statements
        const projects: Project[] = companies
          .filter(c => c.vision_statement && c.vision_statement.trim().length > 0)
          .slice(0, 8)
          .map((c, idx) => ({
            id: `project-${c.company_id}`,
            title: `${c.name || c.short_name || 'Company'} Innovation Initiative`,
            description: c.vision_statement ?? '',
            status: (['Active', 'Completed', 'Planning'] as const)[idx % 3],
            startDate: new Date(2024, Math.floor(idx / 3), 1).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
            endDate: new Date(2025, Math.floor(idx / 3), 1).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
            team: `${c.employee_size || Math.floor(Math.random() * 500) + 50} Employees`,
            category: c.category || 'Technology',
            partners: [companies[(idx + 1) % companies.length]?.name || companies[(idx + 1) % companies.length]?.short_name || 'Partner Organization'],
            impact: 'High Impact'
          }));

        // Create partnerships from companies
        const partnershipList: Partnership[] = companies
          .slice(0, 6)
          .map((c, idx) => ({
            id: `partner-${c.company_id}`,
            name: c.name || c.short_name || 'Partner',
            type: c.company_type || 'Technology Partner',
            focus: c.category || 'Innovation'
          }));

        setInnovationProjects(projects);
        setPartnerships(partnershipList);
        console.log('Generated', projects.length, 'projects and', partnershipList.length, 'partnerships');
      } catch (err) {
        console.error('Error generating projects:', err);
        setInnovationProjects([]);
        setPartnerships([]);
      } finally {
        setLoading(false);
      }
    };

    generateProjects();
  }, [companies]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Completed':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Planning':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      default:
        return '';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return <Rocket className="h-4 w-4" />;
      case 'Completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'Planning':
        return <Clock className="h-4 w-4" />;
      default:
        return null;
    }
  };

  // Loading state
  if (loading || companiesLoading) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-screen">
        <Loader className="h-8 w-8 animate-spin text-primary mb-2" />
        <p className="text-muted-foreground">Loading innovation data...</p>
      </div>
    );
  }

  // No data state
  if (innovationProjects.length === 0) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-screen">
        <Building2 className="h-8 w-8 text-muted-foreground mb-2" />
        <p className="text-muted-foreground">No innovation projects available</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Innovation Hub</h1>
        <p className="text-muted-foreground max-w-2xl">
          Explore cutting-edge research initiatives, industry partnerships, and collaboration 
          opportunities with leading companies.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-card bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary">
                <Lightbulb className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">{innovationProjects.length}</p>
                <p className="text-sm text-muted-foreground">Active Projects</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card bg-gradient-to-br from-accent/5 to-accent/10">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-accent">
                <Users className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">{partnerships.length}+</p>
                <p className="text-sm text-muted-foreground">Industry Partners</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card bg-gradient-to-br from-green-500/5 to-green-500/10">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-600">
                <Rocket className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Research Papers</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Innovation Projects */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Innovation Projects</h2>
          <p className="text-sm text-muted-foreground">Current research initiatives and collaborations</p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          {innovationProjects.map((project) => (
            <Card key={project.id} className="shadow-card hover:shadow-elevated transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <CardDescription>{project.category}</CardDescription>
                  </div>
                  <Badge className={getStatusColor(project.status)} variant="outline">
                    <span className="flex items-center gap-1">
                      {getStatusIcon(project.status)}
                      {project.status}
                    </span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{project.description}</p>
                
                <div>
                  <p className="text-sm font-medium mb-2">Partners:</p>
                  <div className="flex flex-wrap gap-2">
                    {project.partners.map((partner, i) => (
                      <Badge key={i} variant="secondary">
                        {partner}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Industry Partnerships */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Industry Partnerships</h2>
          <p className="text-sm text-muted-foreground">Collaborating with leading technology companies</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {partnerships.map((partner, index) => (
            <Card key={index} className="shadow-card">
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">
                      {partner.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold">{partner.name}</h3>
                    <p className="text-sm text-muted-foreground">{partner.type}</p>
                    <p className="text-xs text-primary">{partner.focus}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Collaboration Opportunities */}
      <Card className="shadow-elevated gradient-primary text-white">
        <CardContent className="p-8">
          <div className="grid gap-6 md:grid-cols-2 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Looking to Collaborate?</h2>
              <p className="text-white/80">
                We're always open to new partnerships with industry leaders, research institutions, 
                and innovative startups. Join us in shaping the future of technology education.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-white/90">
                  <CheckCircle className="h-5 w-5" />
                  Joint research projects
                </li>
                <li className="flex items-center gap-2 text-white/90">
                  <CheckCircle className="h-5 w-5" />
                  Student internship programs
                </li>
                <li className="flex items-center gap-2 text-white/90">
                  <CheckCircle className="h-5 w-5" />
                  Technology workshops & hackathons
                </li>
                <li className="flex items-center gap-2 text-white/90">
                  <CheckCircle className="h-5 w-5" />
                  Industry-sponsored labs
                </li>
              </ul>
            </div>
            <div className="flex justify-center md:justify-end">
              <div className="p-6 bg-white/10 rounded-full">
                <Rocket className="h-24 w-24 text-white/90" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact/Inquiry Form */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Get in Touch
          </CardTitle>
          <CardDescription>
            Interested in partnering with us? Send us your inquiry.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <Input id="name" placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input id="email" type="email" placeholder="your@email.com" />
            </div>
            <div className="space-y-2">
              <label htmlFor="organization" className="text-sm font-medium">Organization</label>
              <Input id="organization" placeholder="Company/Institution name" />
            </div>
            <div className="space-y-2">
              <label htmlFor="interest" className="text-sm font-medium">Area of Interest</label>
              <Input id="interest" placeholder="e.g., AI Research, Internships" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="message" className="text-sm font-medium">Message</label>
              <Textarea id="message" placeholder="Tell us about your collaboration idea..." rows={4} />
            </div>
            <div className="md:col-span-2">
              <Button type="submit" className="w-full md:w-auto">
                <Mail className="h-4 w-4 mr-2" />
                Send Inquiry
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Innovation;
