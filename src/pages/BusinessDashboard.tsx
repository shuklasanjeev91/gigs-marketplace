import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Users,
  DollarSign,
  FolderOpen,
  Heart,
  BarChart2,
  Shield,
  ChevronDown,
  Plus,
  Settings,
  CreditCard,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  TeamRole,
  TeamMember,
  TeamProject,
  TeamBudget,
  ROLE_LABELS,
  ROLE_COLORS,
} from "@/lib/teamTypes";

/* ── Demo data ─────────────────────────────────────────────────────────────── */
const DEMO_MEMBERS: TeamMember[] = [
  {
    id: "1",
    user_id: "u1",
    display_name: "Alex Johnson",
    email: "alex@company.com",
    role: "admin",
    joined_at: "2024-01-10",
  },
  {
    id: "2",
    user_id: "u2",
    display_name: "Sara Lee",
    email: "sara@company.com",
    role: "billing_manager",
    joined_at: "2024-02-15",
  },
  {
    id: "3",
    user_id: "u3",
    display_name: "Mike Chen",
    email: "mike@company.com",
    role: "member",
    joined_at: "2024-03-20",
  },
  {
    id: "4",
    user_id: "u4",
    display_name: "Priya Nair",
    email: "priya@company.com",
    role: "member",
    joined_at: "2024-04-05",
  },
];

const DEMO_PROJECTS: TeamProject[] = [
  {
    id: "p1",
    name: "Website Redesign",
    description: "Full redesign of the company website",
    status: "active",
    budget: 50000,
    spent: 22000,
    due_date: "2025-09-01",
    assigned_to: ["u3", "u4"],
    created_at: "2024-06-01",
    orders_count: 4,
  },
  {
    id: "p2",
    name: "Mobile App Development",
    description: "iOS & Android app for product catalog",
    status: "active",
    budget: 80000,
    spent: 35000,
    due_date: "2025-11-30",
    assigned_to: ["u3"],
    created_at: "2024-07-15",
    orders_count: 6,
  },
  {
    id: "p3",
    name: "Marketing Campaign Q1",
    description: "Social media and content marketing for Q1",
    status: "completed",
    budget: 20000,
    spent: 18500,
    due_date: "2025-03-31",
    assigned_to: ["u4"],
    created_at: "2025-01-01",
    orders_count: 8,
  },
];

const DEMO_BUDGET: TeamBudget = {
  total: 150000,
  used: 75500,
  pending: 12000,
};

const PROJECT_STATUS_COLORS: Record<string, string> = {
  active: "bg-primary/10 text-primary",
  completed: "bg-success/10 text-success",
  paused: "bg-warning/10 text-warning",
};

/* ── Component ─────────────────────────────────────────────────────────────── */
const BusinessDashboard = () => {
  const { profile } = useAuth();
  // Demo: current user acts as admin
  const [currentRole] = useState<TeamRole>("admin");
  const [members] = useState<TeamMember[]>(DEMO_MEMBERS);
  const [projects] = useState<TeamProject[]>(DEMO_PROJECTS);
  const budget = DEMO_BUDGET;

  const availableBudget = budget.total - budget.used - budget.pending;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-display font-bold text-foreground">
                Business Dashboard
              </h1>
              <Badge className={`${ROLE_COLORS[currentRole]} border-0`}>
                {ROLE_LABELS[currentRole]}
              </Badge>
            </div>
            <p className="text-muted-foreground">
              {profile?.display_name
                ? `Welcome back, ${profile.display_name}.`
                : "Welcome back."}{" "}
              Manage your team, projects, and freelance work.
            </p>
          </div>

          {currentRole === "admin" && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Plus className="h-4 w-4 mr-2" /> Add <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Invite Member</DropdownMenuItem>
                <DropdownMenuItem>New Project</DropdownMenuItem>
                <DropdownMenuItem>Allocate Budget</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-5 shadow-card">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold text-foreground">
                  {members.length}
                </p>
                <p className="text-xs text-muted-foreground">Team Members</p>
              </div>
            </div>
          </Card>

          <Card className="p-5 shadow-card">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center">
                <FolderOpen className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold text-foreground">
                  {projects.filter((p) => p.status === "active").length}
                </p>
                <p className="text-xs text-muted-foreground">Active Projects</p>
              </div>
            </div>
          </Card>

          {(currentRole === "admin" || currentRole === "billing_manager") && (
            <>
              <Card className="p-5 shadow-card">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-warning/10 flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-warning" />
                  </div>
                  <div>
                    <p className="text-2xl font-display font-bold text-foreground">
                      ₹{(budget.used / 1000).toFixed(0)}k
                    </p>
                    <p className="text-xs text-muted-foreground">Total Spent</p>
                  </div>
                </div>
              </Card>

              <Card className="p-5 shadow-card">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-display font-bold text-foreground">
                      ₹{(availableBudget / 1000).toFixed(0)}k
                    </p>
                    <p className="text-xs text-muted-foreground">Available Budget</p>
                  </div>
                </div>
              </Card>
            </>
          )}

          {currentRole === "member" && (
            <Card className="p-5 shadow-card col-span-2">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-display font-bold text-foreground">12</p>
                  <p className="text-xs text-muted-foreground">Saved Freelancers</p>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Main tabs */}
        <Tabs defaultValue="projects">
          <TabsList className="mb-6">
            <TabsTrigger value="projects">
              <FolderOpen className="h-4 w-4 mr-1.5" /> Projects
            </TabsTrigger>
            <TabsTrigger value="talent">
              <Heart className="h-4 w-4 mr-1.5" /> Talent Lineup
            </TabsTrigger>
            {(currentRole === "admin" || currentRole === "billing_manager") && (
              <TabsTrigger value="billing">
                <CreditCard className="h-4 w-4 mr-1.5" /> Billing
              </TabsTrigger>
            )}
            {currentRole === "admin" && (
              <TabsTrigger value="team">
                <Users className="h-4 w-4 mr-1.5" /> Team
              </TabsTrigger>
            )}
          </TabsList>

          {/* Projects tab */}
          <TabsContent value="projects">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-display font-semibold text-foreground">
                All Projects
              </h2>
              <Link to="/business/projects">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
              {projects.map((project) => (
                <Card key={project.id} className="p-5 shadow-card hover:shadow-card-hover transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="h-11 w-11 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">
                      {project.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="text-sm font-semibold text-foreground">{project.name}</h3>
                        <Badge
                          className={`${PROJECT_STATUS_COLORS[project.status]} border-0 text-xs capitalize`}
                        >
                          {project.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {project.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <FolderOpen className="h-3 w-3" />
                          {project.orders_count} orders
                        </span>
                        {project.due_date && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Due {project.due_date}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {project.assigned_to.length} members
                        </span>
                      </div>
                    </div>
                    {(currentRole === "admin" || currentRole === "billing_manager") && (
                      <div className="text-right shrink-0">
                        <p className="text-sm font-semibold text-foreground">
                          ₹{project.spent.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          of ₹{project.budget.toLocaleString()}
                        </p>
                        {/* Budget progress bar */}
                        <div className="w-24 h-1.5 rounded-full bg-secondary mt-1.5">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{
                              width: `${Math.min(100, Math.round((project.spent / project.budget) * 100))}%`,
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Talent Lineup tab */}
          <TabsContent value="talent">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-display font-semibold text-foreground">
                Team Talent Lineup
              </h2>
              <Link to="/business/talent-lineup">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>
            <div className="text-center py-16">
              <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                No talent saved yet
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Save freelancers to your team's shared lineup for easy re-hiring
              </p>
              <Link to="/search">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Find Freelancers
                </Button>
              </Link>
            </div>
          </TabsContent>

          {/* Billing tab */}
          {(currentRole === "admin" || currentRole === "billing_manager") && (
            <TabsContent value="billing">
              <div className="space-y-6">
                {/* Budget overview */}
                <Card className="p-6 shadow-card">
                  <h3 className="text-base font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                    <BarChart2 className="h-5 w-5 text-primary" /> Budget Overview
                  </h3>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Total Budget</p>
                      <p className="text-xl font-display font-bold text-foreground">
                        ₹{budget.total.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Used</p>
                      <p className="text-xl font-display font-bold text-warning">
                        ₹{budget.used.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Available</p>
                      <p className="text-xl font-display font-bold text-success">
                        ₹{availableBudget.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  {/* Budget bar */}
                  <div className="h-3 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{
                        width: `${Math.round(((budget.used + budget.pending) / budget.total) * 100)}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {Math.round(((budget.used + budget.pending) / budget.total) * 100)}% of
                    total budget allocated
                  </p>
                </Card>

                {/* Payment methods */}
                <Card className="p-6 shadow-card">
                  <h3 className="text-base font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" /> Payment Methods
                  </h3>
                  <div className="space-y-3">
                    {[
                      { label: "Visa •••• 4242", primary: true },
                      { label: "Team Balance Account", primary: false },
                    ].map((pm) => (
                      <div
                        key={pm.label}
                        className="flex items-center justify-between p-3 rounded-lg border border-border"
                      >
                        <span className="text-sm text-foreground">{pm.label}</span>
                        {pm.primary && (
                          <Badge className="bg-primary/10 text-primary border-0 text-xs">
                            Primary
                          </Badge>
                        )}
                      </div>
                    ))}
                    <Button variant="outline" size="sm">
                      <Plus className="h-3.5 w-3.5 mr-1.5" /> Add Payment Method
                    </Button>
                  </div>
                </Card>
              </div>
            </TabsContent>
          )}

          {/* Team tab (admin only) */}
          {currentRole === "admin" && (
            <TabsContent value="team">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-display font-semibold text-foreground">
                  Team Members
                </h2>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" size="sm">
                  <Plus className="h-3.5 w-3.5 mr-1.5" /> Invite Member
                </Button>
              </div>
              <div className="space-y-3">
                {members.map((member) => (
                  <Card key={member.id} className="p-4 shadow-card hover:shadow-card-hover transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">
                        {member.display_name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-foreground">
                            {member.display_name}
                          </p>
                          <Badge className={`${ROLE_COLORS[member.role]} border-0 text-xs`}>
                            {ROLE_LABELS[member.role]}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{member.email}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <p className="text-xs text-muted-foreground hidden sm:block">
                          Joined {member.joined_at}
                        </p>
                        {member.role !== "admin" && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Settings className="h-3.5 w-3.5" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Change Role</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                Remove Member
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Permissions info */}
              <Card className="p-5 shadow-card mt-6">
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" /> Role Permissions
                </h3>
                <div className="space-y-2 text-sm">
                  {(
                    [
                      {
                        role: "admin" as TeamRole,
                        perms: ["Full account control", "Manage members & roles", "Billing & payments", "Approve spending"],
                      },
                      {
                        role: "billing_manager" as TeamRole,
                        perms: ["Billing history", "Payment methods", "Deposits", "Hire freelancers"],
                      },
                      {
                        role: "member" as TeamRole,
                        perms: ["Create projects", "Place orders", "Save freelancers", "No billing access"],
                      },
                    ] as { role: TeamRole; perms: string[] }[]
                  ).map(({ role, perms }) => (
                    <div key={role} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/40">
                      <Badge className={`${ROLE_COLORS[role]} border-0 text-xs shrink-0 mt-0.5`}>
                        {ROLE_LABELS[role]}
                      </Badge>
                      <div className="flex flex-wrap gap-x-4 gap-y-1">
                        {perms.map((p) => (
                          <span key={p} className="flex items-center gap-1 text-xs text-muted-foreground">
                            <CheckCircle className="h-3 w-3 text-success" /> {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default BusinessDashboard;
