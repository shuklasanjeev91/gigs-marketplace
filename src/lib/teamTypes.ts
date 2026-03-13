export type TeamRole = "admin" | "billing_manager" | "member";

export interface TeamMember {
  id: string;
  user_id: string;
  display_name: string;
  email: string;
  avatar_url?: string | null;
  role: TeamRole;
  joined_at: string;
}

export interface TeamProject {
  id: string;
  name: string;
  description: string;
  status: "active" | "completed" | "paused";
  budget: number;
  spent: number;
  due_date: string | null;
  assigned_to: string[];
  created_at: string;
  orders_count: number;
}

export interface TalentEntry {
  id: string;
  seller_id: string;
  display_name: string;
  avatar_url?: string | null;
  specialty: string;
  average_rating: number;
  total_orders: number;
  added_by: string;
  added_at: string;
}

export interface TeamBudget {
  total: number;
  used: number;
  pending: number;
}

export const ROLE_LABELS: Record<TeamRole, string> = {
  admin: "Admin",
  billing_manager: "Billing Manager",
  member: "Member",
};

export const ROLE_DESCRIPTIONS: Record<TeamRole, string> = {
  admin:
    "Full control over the account. Manages members, projects, finances, and approval policies.",
  billing_manager:
    "Manages billing history, payment methods, deposits, and can hire freelancers.",
  member:
    "Can create projects, place orders, and save freelancers. No access to billing.",
};

export const ROLE_COLORS: Record<TeamRole, string> = {
  admin: "bg-primary/10 text-primary",
  billing_manager: "bg-warning/10 text-warning",
  member: "bg-success/10 text-success",
};
