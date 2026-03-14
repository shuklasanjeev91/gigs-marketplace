import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

/**
 * Redirects authenticated users to their role-appropriate dashboard:
 *  - Sellers  → /seller/dashboard
 *  - Buyers   → /buyer/dashboard
 */
const RoleBasedDashboard = () => {
  const { profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (profile?.is_seller) {
    return <Navigate to="/seller/dashboard" replace />;
  }

  return <Navigate to="/buyer/dashboard" replace />;
};

export default RoleBasedDashboard;
