
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TechnologyComparison from "./pages/TechnologyComparison";
import SiteSuggestions from "./pages/SiteSuggestions";
import PolicyAssistant from "./pages/PolicyAssistant";
import NotFound from "./pages/NotFound";
import ScenarioSimulation from "./pages/ScenarioSimulation";
import WasteAnalysis from "./pages/WasteAnalysis";
import FinancialAnalysis from "./pages/FinancialAnalysis";
import MultiCriteriaAnalysis from "./pages/MultiCriteriaAnalysis";
import EnvironmentalImpact from "./pages/EnvironmentalImpact";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/compare" element={<ProtectedRoute><TechnologyComparison /></ProtectedRoute>} />
            <Route path="/sites" element={<ProtectedRoute><SiteSuggestions /></ProtectedRoute>} />
            <Route path="/policy" element={<ProtectedRoute><PolicyAssistant /></ProtectedRoute>} />
            <Route path="/simulation" element={<ProtectedRoute><ScenarioSimulation /></ProtectedRoute>} />
            <Route path="/waste-analysis" element={<ProtectedRoute><WasteAnalysis /></ProtectedRoute>} />
            <Route path="/financial" element={<ProtectedRoute><FinancialAnalysis /></ProtectedRoute>} />
            <Route path="/mcda" element={<ProtectedRoute><MultiCriteriaAnalysis /></ProtectedRoute>} />
            <Route path="/environmental" element={<ProtectedRoute><EnvironmentalImpact /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
