import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  FolderOpen,
  Plus,
  Search,
  Clock,
  Users,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Loader2,
  MoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TeamProject } from "@/lib/teamTypes";

/* ── Demo data ─────────────────────────────────────────────────────────────── */
const DEMO_PROJECTS: TeamProject[] = [
  {
    id: "p1",
    name: "Website Redesign",
    description: "Full redesign of the company website including new branding.",
    status: "active",
    budget: 50000,
    spent: 22000,
    due_date: "2025-09-01",
    assigned_to: ["Mike Chen", "Priya Nair"],
    created_at: "2024-06-01",
    orders_count: 4,
  },
  {
    id: "p2",
    name: "Mobile App Development",
    description: "iOS & Android app for product catalog and online ordering.",
    status: "active",
    budget: 80000,
    spent: 35000,
    due_date: "2025-11-30",
    assigned_to: ["Mike Chen"],
    created_at: "2024-07-15",
    orders_count: 6,
  },
  {
    id: "p3",
    name: "Marketing Campaign Q1",
    description: "Social media and content marketing for Q1 2025.",
    status: "completed",
    budget: 20000,
    spent: 18500,
    due_date: "2025-03-31",
    assigned_to: ["Priya Nair"],
    created_at: "2025-01-01",
    orders_count: 8,
  },
  {
    id: "p4",
    name: "Brand Refresh",
    description: "New logo, style guide, and visual identity assets.",
    status: "paused",
    budget: 15000,
    spent: 4000,
    due_date: null,
    assigned_to: ["Sara Lee"],
    created_at: "2025-02-14",
    orders_count: 2,
  },
];

const STATUS_COLORS: Record<string, string> = {
  active: "bg-primary/10 text-primary",
  completed: "bg-success/10 text-success",
  paused: "bg-warning/10 text-warning",
};

const STATUS_ICONS: Record<string, React.ReactNode> = {
  active: <Loader2 className="h-3.5 w-3.5 animate-spin" />,
  completed: <CheckCircle className="h-3.5 w-3.5" />,
  paused: <AlertCircle className="h-3.5 w-3.5" />,
};

/* ── Component ─────────────────────────────────────────────────────────────── */
const ProjectManagementPage = () => {
  const [projects, setProjects] = useState<TeamProject[]>(DEMO_PROJECTS);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filtered = projects.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchesTab =
      activeTab === "all" || p.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const totalBudget = projects.reduce((s, p) => s + p.budget, 0);
  const totalSpent = projects.reduce((s, p) => s + p.spent, 0);
  const totalOrders = projects.reduce((s, p) => s + p.orders_count, 0);

  const updateStatus = (id: string, status: TeamProject["status"]) =>
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status } : p))
    );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground mb-1">
              Project Management
            </h1>
            <p className="text-muted-foreground">
              Create, assign, and track all projects and orders in one place.
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="h-4 w-4 mr-2" /> New Project
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 shadow-card">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                <FolderOpen className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xl font-display font-bold text-foreground">
                  {projects.filter((p) => p.status === "active").length}
                </p>
                <p className="text-xs text-muted-foreground">Active</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 shadow-card">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-success/10 flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-success" />
              </div>
              <div>
                <p className="text-xl font-display font-bold text-foreground">
                  {projects.filter((p) => p.status === "completed").length}
                </p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 shadow-card">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-warning/10 flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-warning" />
              </div>
              <div>
                <p className="text-xl font-display font-bold text-foreground">
                  ₹{(totalSpent / 1000).toFixed(0)}k
                </p>
                <p className="text-xs text-muted-foreground">
                  of ₹{(totalBudget / 1000).toFixed(0)}k
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-4 shadow-card">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xl font-display font-bold text-foreground">
                  {totalOrders}
                </p>
                <p className="text-xs text-muted-foreground">Total Orders</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Search */}
        <div className="relative max-w-md mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">All ({projects.length})</TabsTrigger>
            <TabsTrigger value="active">
              Active ({projects.filter((p) => p.status === "active").length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({projects.filter((p) => p.status === "completed").length})
            </TabsTrigger>
            <TabsTrigger value="paused">
              Paused ({projects.filter((p) => p.status === "paused").length})
            </TabsTrigger>
          </TabsList>

          {["all", "active", "completed", "paused"].map((tab) => (
            <TabsContent key={tab} value={tab}>
              {filtered.length > 0 ? (
                <div className="space-y-4">
                  {filtered.map((project) => (
                    <Card
                      key={project.id}
                      className="p-5 shadow-card hover:shadow-card-hover transition-shadow"
                    >
                      <div className="flex items-start gap-4">
                        <div className="h-11 w-11 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">
                          {project.name[0]}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="text-sm font-semibold text-foreground">
                              {project.name}
                            </h3>
                            <Badge
                              className={`${STATUS_COLORS[project.status]} border-0 text-xs flex items-center gap-1`}
                            >
                              {STATUS_ICONS[project.status]}
                              <span className="capitalize">{project.status}</span>
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mb-3">
                            {project.description}
                          </p>

                          {/* Budget bar */}
                          <div className="mb-2">
                            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                              <span>
                                Budget: ₹{project.spent.toLocaleString()} / ₹
                                {project.budget.toLocaleString()}
                              </span>
                              <span>
                                {Math.round(
                                  (project.spent / project.budget) * 100
                                )}
                                %
                              </span>
                            </div>
                            <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                              <div
                                className="h-full rounded-full bg-primary"
                                style={{
                                  width: `${Math.min(
                                    100,
                                    Math.round(
                                      (project.spent / project.budget) * 100
                                    )
                                  )}%`,
                                }}
                              />
                            </div>
                          </div>

                          <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
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
                              {project.assigned_to.join(", ")}
                            </span>
                          </div>
                        </div>

                        <div className="shrink-0 flex items-center gap-2">
                          <Link to="/orders">
                            <Button variant="outline" size="sm" className="text-xs">
                              View Orders
                            </Button>
                          </Link>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-3.5 w-3.5" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit Project</DropdownMenuItem>
                              <DropdownMenuItem>Assign Members</DropdownMenuItem>
                              {project.status !== "active" && (
                                <DropdownMenuItem
                                  onClick={() => updateStatus(project.id, "active")}
                                >
                                  Mark Active
                                </DropdownMenuItem>
                              )}
                              {project.status !== "completed" && (
                                <DropdownMenuItem
                                  onClick={() => updateStatus(project.id, "completed")}
                                >
                                  Mark Completed
                                </DropdownMenuItem>
                              )}
                              {project.status !== "paused" && (
                                <DropdownMenuItem
                                  onClick={() => updateStatus(project.id, "paused")}
                                >
                                  Pause Project
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem className="text-destructive">
                                Delete Project
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                    No projects found
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {search
                      ? "No projects match your search."
                      : "Create your first project to get started."}
                  </p>
                  {!search && (
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      <Plus className="h-4 w-4 mr-2" /> New Project
                    </Button>
                  )}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default ProjectManagementPage;
