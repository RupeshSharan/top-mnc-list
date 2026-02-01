import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Globe, 
  MapPin, 
  Calendar, 
  Users, 
  Building2, 
  TrendingUp,
  ExternalLink,
  Linkedin,
  CheckCircle,
  Clock,
  AlertCircle,
  Loader,
  Code,
  Briefcase,
  DollarSign,
  Award
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useCompleteCompanyProfile } from "@/hooks/useCompanies";

const CompanyDetail = () => {
  const { id } = useParams();
  const companyId = id ? parseInt(id) : null;
  const { profile, loading, error } = useCompleteCompanyProfile(companyId);

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[60vh]">
        <Loader className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Loading company details...</span>
      </div>
    );
  }

  if (error || !profile.company) {
    return (
      <div className="p-6 text-center">
        <Building2 className="h-12 w-12 mx-auto text-muted-foreground/50" />
        <h2 className="mt-4 text-xl font-semibold">Company not found</h2>
        {error && <p className="text-destructive text-sm mt-2">{error.message}</p>}
        <Button asChild className="mt-4">
          <Link to="/companies">Back to Companies</Link>
        </Button>
      </div>
    );
  }

  const company = profile.company;

  return (
    <div className="p-6 space-y-6">
      {/* Back Button */}
      <Button variant="ghost" asChild className="gap-2">
        <Link to="/companies">
          <ArrowLeft className="h-4 w-4" />
          Back to Companies
        </Link>
      </Button>

      {/* Company Header */}
      <Card className="shadow-elevated">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="h-24 w-24 rounded-xl bg-secondary flex items-center justify-center p-4 shrink-0">
              <img
                src={company.logo_url || "/placeholder.svg"}
                alt={company.name || "Company"}
                className="max-h-full max-w-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.svg";
                }}
              />
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-bold">{company.name}</h1>
                <Badge variant="secondary">{company.company_type || "Type N/A"}</Badge>
              </div>
              <p className="text-muted-foreground">{company.category}</p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                {company.headquarters_address && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {company.headquarters_address}
                  </span>
                )}
                {company.incorporation_year && (
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Incorporated {company.incorporation_year}
                  </span>
                )}
                {company.employee_size && (
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {company.employee_size} employees
                  </span>
                )}
              </div>
              {company.website_url && (
                <Button asChild className="mt-2">
                  <a href={company.website_url} target="_blank" rel="noopener noreferrer">
                    <Globe className="h-4 w-4 mr-2" />
                    Visit Website
                  </a>
                </Button>
              )}
            </div>
            <div className="flex flex-col gap-2 md:text-right">
              <div className="text-sm text-muted-foreground">About the Company</div>
              <p className="text-muted-foreground text-sm max-w-xs line-clamp-3">
                {company.overview_text || "No description available"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabbed Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="culture">Culture & Team</TabsTrigger>
          <TabsTrigger value="growth">Talent Growth</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Vision</h4>
                <p className="text-muted-foreground text-sm">
                  {company.vision_statement || "Not specified"}
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Mission</h4>
                <p className="text-muted-foreground text-sm">
                  {company.mission_statement || "Not specified"}
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Core Values</h4>
                <p className="text-muted-foreground text-sm">
                  {company.core_values || "Not specified"}
                </p>
              </div>
            </CardContent>
          </Card>

          {profile.financials && (
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardContent className="p-6 text-center">
                  <DollarSign className="h-8 w-8 mx-auto text-primary mb-2" />
                  <div className="text-2xl font-bold">{profile.financials.annual_revenue || "N/A"}</div>
                  <div className="text-sm text-muted-foreground">Annual Revenue</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-8 w-8 mx-auto text-accent mb-2" />
                  <div className="text-2xl font-bold">{profile.financials.yoy_growth_rate || "N/A"}</div>
                  <div className="text-sm text-muted-foreground">YoY Growth</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Award className="h-8 w-8 mx-auto text-green-600 mb-2" />
                  <div className="text-2xl font-bold">{profile.financials.profitability_status || "N/A"}</div>
                  <div className="text-sm text-muted-foreground">Profitability</div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        {/* Business Tab */}
        <TabsContent value="business" className="space-y-6">
          {profile.businessInfo ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Business Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Core Value Proposition</h4>
                    <p className="text-muted-foreground text-sm">
                      {profile.businessInfo.core_value_proposition || "Not specified"}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Pain Points Addressed</h4>
                    <p className="text-muted-foreground text-sm">
                      {profile.businessInfo.pain_points_addressed || "Not specified"}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Focus Sectors</h4>
                    <p className="text-muted-foreground text-sm">
                      {profile.businessInfo.focus_sectors || "Not specified"}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Key Competitors</h4>
                    <p className="text-muted-foreground text-sm">
                      {profile.businessInfo.key_competitors || "Not specified"}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Market Position</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="font-semibold mb-2">TAM (Total Addressable Market)</h4>
                      <p className="text-muted-foreground text-sm">
                        {profile.businessInfo.tam || "Not specified"}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">SAM (Serviceable Market)</h4>
                      <p className="text-muted-foreground text-sm">
                        {profile.businessInfo.sam || "Not specified"}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">SOM (Serviceable Obtainable Market)</h4>
                      <p className="text-muted-foreground text-sm">
                        {profile.businessInfo.som || "Not specified"}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Market Share</h4>
                      <p className="text-muted-foreground text-sm">
                        {profile.businessInfo.market_share_percentage || "Not specified"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">Business information coming soon.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Culture & Team Tab */}
        <TabsContent value="culture" className="space-y-6">
          {profile.culture ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Company Culture</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Work Culture Summary</h4>
                    <p className="text-muted-foreground text-sm">
                      {profile.culture.work_culture_summary || "Not specified"}
                    </p>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="font-semibold mb-2">Diversity & Inclusion</h4>
                      <p className="text-muted-foreground text-sm">
                        {profile.culture.diversity_inclusion_score || "Not specified"}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Employee Turnover</h4>
                      <p className="text-muted-foreground text-sm">
                        {profile.culture.employee_turnover || "Not specified"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {profile.people && (
                <Card>
                  <CardHeader>
                    <CardTitle>Leadership</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">CEO</h4>
                      <div className="flex items-center gap-2">
                        <p className="text-muted-foreground text-sm">{profile.people.ceo_name || "Not specified"}</p>
                        {profile.people.ceo_linkedin_url && (
                          <a
                            href={profile.people.ceo_linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="CEO LinkedIn Profile"
                            aria-label="CEO LinkedIn Profile"
                          >
                            <Linkedin className="h-4 w-4 text-primary" />
                          </a>
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Contact Information</h4>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>Name: {profile.people.contact_person_name || "Not specified"}</p>
                        <p>Title: {profile.people.contact_person_title || "Not specified"}</p>
                        {profile.people.contact_person_email && (
                          <p>Email: <a href={`mailto:${profile.people.contact_person_email}`} className="text-primary hover:underline">{profile.people.contact_person_email}</a></p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">Culture information coming soon.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Talent Growth Tab */}
        <TabsContent value="growth" className="space-y-6">
          {profile.talentGrowth ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Growth & Development Opportunities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="font-semibold mb-2">Learning Culture</h4>
                      <p className="text-muted-foreground text-sm">
                        {profile.talentGrowth.learning_culture || "Not specified"}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Training Spend</h4>
                      <p className="text-muted-foreground text-sm">
                        {profile.talentGrowth.training_spend || "Not specified"}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Mentorship</h4>
                      <p className="text-muted-foreground text-sm">
                        {profile.talentGrowth.mentorship_availability || "Not specified"}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Internal Mobility</h4>
                      <p className="text-muted-foreground text-sm">
                        {profile.talentGrowth.internal_mobility || "Not specified"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {profile.technologies && (
                <Card>
                  <CardHeader>
                    <CardTitle>Technology Stack</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Code className="h-4 w-4" />
                        Tech Stack
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {profile.technologies.tech_stack || "Not specified"}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">AI/ML Adoption</h4>
                      <p className="text-muted-foreground text-sm">
                        {profile.technologies.ai_ml_adoption_level || "Not specified"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">Talent growth information coming soon.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default CompanyDetail;
