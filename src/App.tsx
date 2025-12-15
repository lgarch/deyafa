import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import KYC from "./pages/KYC";
import Search from "./pages/Search";
import HostProfile from "./pages/HostProfile";
import Booking from "./pages/Booking";
import DashboardTourist from "./pages/DashboardTourist";
import DashboardHost from "./pages/DashboardHost";
import Settings from "./pages/Settings";
import Emergency from "./pages/Emergency";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/kyc" element={<KYC />} />
              <Route path="/search" element={<Search />} />
              <Route path="/host/:id" element={<HostProfile />} />
              <Route path="/booking/:id" element={<Booking />} />
              <Route path="/dashboard-tourist" element={<DashboardTourist />} />
              <Route path="/dashboard-host" element={<DashboardHost />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/emergency" element={<Emergency />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
