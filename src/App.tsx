
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/compare" element={<TechnologyComparison />} />
          <Route path="/sites" element={<SiteSuggestions />} />
          <Route path="/policy" element={<PolicyAssistant />} />
          <Route path="/simulation" element={<ScenarioSimulation />} />
          <Route path="/waste-analysis" element={<WasteAnalysis />} />
          <Route path="/financial" element={<FinancialAnalysis />} />
          <Route path="/mcda" element={<MultiCriteriaAnalysis />} />
          <Route path="/environmental" element={<EnvironmentalImpact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
