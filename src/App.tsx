import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index.tsx";
import SearchPage from "./pages/SearchPage.tsx";
import GigDetail from "./pages/GigDetail.tsx";
import CategoryPage from "./pages/CategoryPage.tsx";
import Profile from "./pages/Profile.tsx";
import OrdersPage from "./pages/OrdersPage.tsx";
import OrderDetailPage from "./pages/OrderDetailPage.tsx";
import FavoritesPage from "./pages/FavoritesPage.tsx";
import BecomeASeller from "./pages/BecomeASeller.tsx";
import SellerOnboarding from "./pages/SellerOnboarding.tsx";
import SellerDashboard from "./pages/SellerDashboard.tsx";
import SellerSetupPage from "./pages/SellerSetupPage.tsx";
import SellerGigEditPage from "./pages/SellerGigEditPage.tsx";
import SellerSubscriptionPage from "./pages/SellerSubscriptionPage.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";
import MessagesPage from "./pages/MessagesPage.tsx";
import NotificationsPage from "./pages/NotificationsPage.tsx";
import CheckoutPage from "./pages/CheckoutPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.tsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.tsx";
import NotFound from "./pages/NotFound.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import BusinessDashboard from "./pages/BusinessDashboard.tsx";
import TalentLineupPage from "./pages/TalentLineupPage.tsx";
import ProjectManagementPage from "./pages/ProjectManagementPage.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import CareersPage from "./pages/CareersPage.tsx";
import PressPage from "./pages/PressPage.tsx";
import PartnershipsPage from "./pages/PartnershipsPage.tsx";
import HelpPage from "./pages/HelpPage.tsx";
import TrustSafetyPage from "./pages/TrustSafetyPage.tsx";
import TermsPage from "./pages/TermsPage.tsx";
import PrivacyPage from "./pages/PrivacyPage.tsx";
import ProPage from "./pages/ProPage.tsx";
import UserProfilePage from "./pages/UserProfilePage.tsx";
import BlogPage from "./pages/BlogPage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/gig/:id" element={<GigDetail />} />
            <Route path="/categories" element={<CategoryPage />} />
            <Route path="/categories/:id" element={<CategoryPage />} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/dashboard" element={<Navigate to="/seller/dashboard" replace />} />
            <Route path="/seller/dashboard" element={<ProtectedRoute><SellerDashboard /></ProtectedRoute>} />
            <Route path="/seller/setup" element={<ProtectedRoute><SellerSetupPage /></ProtectedRoute>} />
            <Route path="/seller/onboarding" element={<ProtectedRoute><SellerOnboarding /></ProtectedRoute>} />
            <Route path="/seller/gig/:id/edit" element={<ProtectedRoute><SellerGigEditPage /></ProtectedRoute>} />
            <Route path="/seller/subscription" element={<ProtectedRoute><SellerSubscriptionPage /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
            <Route path="/orders/:id" element={<ProtectedRoute><OrderDetailPage /></ProtectedRoute>} />
            <Route path="/favorites" element={<ProtectedRoute><FavoritesPage /></ProtectedRoute>} />
            <Route path="/messages" element={<ProtectedRoute><MessagesPage /></ProtectedRoute>} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/checkout/:id" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
            <Route path="/become-seller" element={<BecomeASeller />} />
            <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
            <Route path="/business/dashboard" element={<ProtectedRoute><BusinessDashboard /></ProtectedRoute>} />
            <Route path="/business/talent-lineup" element={<ProtectedRoute><TalentLineupPage /></ProtectedRoute>} />
            <Route path="/business/projects" element={<ProtectedRoute><ProjectManagementPage /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            {/* Static / informational pages */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/press" element={<PressPage />} />
            <Route path="/partnerships" element={<PartnershipsPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/trust-safety" element={<TrustSafetyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/pro" element={<ProPage />} />
            <Route path="/blog" element={<BlogPage />} />
            {/* Public user profile */}
            <Route path="/user/:username" element={<UserProfilePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
