import { useState, useMemo, useEffect } from "react";
import { Search, Filter, ExternalLink, TrendingUp, Building2, Loader, Code2, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/lib/supabase-client";

interface Skill {
  id: string;
  name: string;
  category: string;
  demand_level: string;
  companies_count: number;
  related_roles?: string[];
  learning_resources?: any[];
}

const Skills = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDemand, setSelectedDemand] = useState<string>("all");
  const [skillsData, setSkillsData] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch skills from companies tech_stack
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        
        // Fetch all companies and their tech_stack
        const { data, error } = await supabase
          .from('company_technologies')
          .select('company_id, tech_stack, ai_ml_adoption_level');
        
        if (error) {
          console.error('Database error:', error);
          throw error;
        }
        
        if (!data || data.length === 0) {
          console.log('No technologies data found');
          setSkillsData(generateDefaultSkills());
          return;
        }
        
        // Transform database data into skills format
        const skillsMap = new Map<string, Skill>();
        const technologyKeywords = [
          'Python', 'JavaScript', 'Java', 'TypeScript', 'C#', 'C++', 'Go', 'Rust', 'PHP', 'Ruby', 'Swift', 'Kotlin',
          'React', 'Vue', 'Angular', 'Node.js', 'Express', 'Django', 'Flask', 'Spring', 'ASP.NET',
          'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Jenkins', 'GitLab', 'GitHub', 'Terraform',
          'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Elasticsearch', 'Cassandra', 'Firebase',
          'Linux', 'Git', 'CI/CD', 'DevOps', 'Microservices', 'REST', 'GraphQL', 'API', 'ML', 'AI'
        ];
        
        data.forEach((tech: any) => {
          if (tech.tech_stack && typeof tech.tech_stack === 'string') {
            const stackItems = tech.tech_stack.split(/[,;\n|]/).map((s: string) => s.trim()).filter((s: string) => s.length > 0);
            
            stackItems.forEach((item: string) => {
              const matchedTech = technologyKeywords.find(k => item.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(item.toLowerCase())) || item;
              
              if (!skillsMap.has(matchedTech)) {
                skillsMap.set(matchedTech, {
                  id: matchedTech,
                  name: matchedTech,
                  category: categorizeSkill(matchedTech),
                  demand_level: calculateDemandLevel(tech.ai_ml_adoption_level ? 75 : 50),
                  companies_count: 1,
                  related_roles: ['Developer', 'Engineer', 'Specialist'],
                  learning_resources: []
                });
              } else {
                const skill = skillsMap.get(matchedTech);
                if (skill) {
                  skill.companies_count += 1;
                }
              }
            });
          }
        });
        
        const skillsArray = Array.from(skillsMap.values()).sort((a, b) => 
          b.companies_count - a.companies_count
        );
        setSkillsData(skillsArray.length > 0 ? skillsArray : generateDefaultSkills());
        console.log('Loaded skills:', skillsArray.length);
      } catch (err) {
        console.error('Error fetching skills:', err);
        setSkillsData(generateDefaultSkills());
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  // Generate default skills if database is empty
  const generateDefaultSkills = (): Skill[] => [
    { id: 'Python', name: 'Python', category: 'Languages', demand_level: 'High', companies_count: 12, related_roles: ['Developer', 'Data Scientist'] },
    { id: 'JavaScript', name: 'JavaScript', category: 'Languages', demand_level: 'High', companies_count: 15, related_roles: ['Frontend Developer', 'Full Stack Developer'] },
    { id: 'React', name: 'React', category: 'Tools & Frameworks', demand_level: 'High', companies_count: 10, related_roles: ['Frontend Developer'] },
    { id: 'AWS', name: 'AWS', category: 'DevOps & Cloud', demand_level: 'High', companies_count: 8, related_roles: ['DevOps Engineer', 'Cloud Engineer'] },
    { id: 'Java', name: 'Java', category: 'Languages', demand_level: 'High', companies_count: 11, related_roles: ['Backend Developer'] },
    { id: 'Docker', name: 'Docker', category: 'DevOps & Cloud', demand_level: 'Medium', companies_count: 7, related_roles: ['DevOps Engineer'] },
    { id: 'Angular', name: 'Angular', category: 'Tools & Frameworks', demand_level: 'Medium', companies_count: 6, related_roles: ['Frontend Developer'] },
    { id: 'Node.js', name: 'Node.js', category: 'Tools & Frameworks', demand_level: 'High', companies_count: 9, related_roles: ['Backend Developer', 'Full Stack Developer'] },
    { id: 'PostgreSQL', name: 'PostgreSQL', category: 'Databases', demand_level: 'High', companies_count: 7, related_roles: ['Backend Developer', 'DBA'] },
    { id: 'MongoDB', name: 'MongoDB', category: 'Databases', demand_level: 'Medium', companies_count: 5, related_roles: ['Backend Developer', 'Data Engineer'] },
  ];

  // Helper function to categorize skills
  const categorizeSkill = (skillName: string): string => {
    const name = skillName.toLowerCase();
    
    // Programming Languages
    if (['python', 'javascript', 'java', 'cpp', 'c++', 'csharp', 'c#', 'golang', 'go', 'rust', 'typescript', 'php', 'ruby', 'kotlin', 'swift', 'react', 'angular', 'vue'].some(lang => name.includes(lang))) {
      return 'Languages';
    }
    
    // Cloud & DevOps Tools
    if (['aws', 'azure', 'gcp', 'docker', 'kubernetes', 'jenkins', 'ci/cd', 'terraform', 'ansible', 'linux', 'git', 'gitlab', 'github'].some(tool => name.includes(tool))) {
      return 'DevOps & Cloud';
    }
    
    // Soft skills
    if (['communication', 'leadership', 'teamwork', 'collaboration', 'management', 'presentation'].some(soft => name.includes(soft))) {
      return 'Soft Skills';
    }
    
    // Databases
    if (['sql', 'postgresql', 'mysql', 'mongodb', 'redis', 'elasticsearch', 'cassandra', 'oracle', 'firestore', 'dynamodb'].some(db => name.includes(db))) {
      return 'Databases';
    }
    
    // Default to Tools/Frameworks
    return 'Tools & Frameworks';
  };

  // Helper function to calculate demand level
  const calculateDemandLevel = (percentage: number): string => {
    if (percentage >= 70) return 'High';
    if (percentage >= 40) return 'Medium';
    return 'Low';
  };

  const categories = ["Languages", "DevOps & Cloud", "Databases", "Soft Skills", "Tools & Frameworks"];
  const demandLevels = ["High", "Medium", "Low"];

  const filteredSkills = useMemo(() => {
    let result = [...skillsData];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((s) =>
        s.name.toLowerCase().includes(query) ||
        s.category.toLowerCase().includes(query)
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter((s) => s.category === selectedCategory);
    }

    if (selectedDemand !== "all") {
      result = result.filter((s) => s.demand_level === selectedDemand);
    }

    return result.sort((a, b) => b.companies_count - a.companies_count);
  }, [searchQuery, selectedCategory, selectedDemand, skillsData]);

  const getDemandColor = (level: string) => {
    switch (level) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDemandProgress = (level: string) => {
    switch (level) {
      case "High":
        return 90;
      case "Medium":
        return 60;
      case "Low":
        return 30;
      default:
        return 0;
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-screen">
        <Loader className="h-8 w-8 animate-spin text-primary mb-2" />
        <p className="text-muted-foreground">Loading skills data...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Skills & Technologies</h1>
        <p className="text-muted-foreground mt-1">
          In-demand technologies and skills from leading companies
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-100">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{skillsData.filter((s) => s.demand_level === "High").length}</p>
                <p className="text-sm text-muted-foreground">High Demand Skills</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{skillsData.length}</p>
                <p className="text-sm text-muted-foreground">Total Technologies</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-accent/10">
                <Filter className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{categories.length}</p>
                <p className="text-sm text-muted-foreground">Skill Categories</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search skills or roles..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedDemand} onValueChange={setSelectedDemand}>
          <SelectTrigger className="w-full md:w-40">
            <SelectValue placeholder="All Demand Levels" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            {demandLevels.map((level) => (
              <SelectItem key={level} value={level}>
                {level} Demand
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Skills by Category Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Skills ({filteredSkills.length})</TabsTrigger>
          <TabsTrigger value="Languages">Languages</TabsTrigger>
          <TabsTrigger value="DevOps & Cloud">DevOps & Cloud</TabsTrigger>
          <TabsTrigger value="Databases">Databases</TabsTrigger>
          <TabsTrigger value="Soft Skills">Soft Skills</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <SkillsGrid skills={filteredSkills} getDemandColor={getDemandColor} getDemandProgress={getDemandProgress} />
        </TabsContent>

        {categories.map((category) => (
          <TabsContent key={category} value={category} className="space-y-4">
            <SkillsGrid 
              skills={filteredSkills.filter((s) => s.category === category)} 
              getDemandColor={getDemandColor} 
              getDemandProgress={getDemandProgress} 
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

function SkillsGrid({ 
  skills, 
  getDemandColor, 
  getDemandProgress 
}: { 
  skills: Skill[];
  getDemandColor: (level: string) => string;
  getDemandProgress: (level: string) => number;
}) {
  if (skills.length === 0) {
    return (
      <div className="text-center py-12">
        <Filter className="h-12 w-12 mx-auto text-muted-foreground/50" />
        <h3 className="mt-4 text-lg font-semibold">No skills found</h3>
        <p className="text-muted-foreground">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {skills.map((skill) => (
        <Card key={skill.id} className="shadow-card hover:shadow-elevated transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">{skill.name}</CardTitle>
                <CardDescription>{skill.category}</CardDescription>
              </div>
              <Badge className={getDemandColor(skill.demand_level)} variant="outline">
                {skill.demand_level}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Demand Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Industry Demand</span>
                <span className="font-medium">{skill.companies_count} companies</span>
              </div>
              <Progress value={getDemandProgress(skill.demand_level)} className="h-2" />
            </div>

            {/* Related Roles */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">Related Roles:</p>
              <div className="flex flex-wrap gap-1">
                {(skill.related_roles || []).slice(0, 3).map((role, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {role}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default Skills;
