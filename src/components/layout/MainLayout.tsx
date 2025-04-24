
import { cn } from "@/lib/utils";
import { useState } from "react";
import { MenuIcon, X, LineChart, BarChart, Trash2, Zap, Settings, Activity, Calculator, Map, FileText, Recycle } from "lucide-react";
import { Button } from "../ui/button";
import { Link, useLocation } from "react-router-dom";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { title: "Dashboard", href: "/", icon: BarChart },
    { title: "Waste Analysis", href: "/waste-analysis", icon: Recycle },
    { title: "Technology Comparison", href: "/compare", icon: Zap },
    { title: "Site Suggestions", href: "/sites", icon: Map },
    { title: "Scenario Simulation", href: "/simulation", icon: LineChart },
    { title: "Financial Analysis", href: "/financial", icon: Calculator },
    { title: "Environmental Impact", href: "/environmental", icon: Trash2 },
    { title: "Multi-Criteria Analysis", href: "/mcda", icon: Activity },
    { title: "Policy Assistant", href: "/policy", icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Sidebar Toggle */}
      <Button
        variant="ghost"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X /> : <MenuIcon />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 w-64 h-screen transition-transform",
          !sidebarOpen && "-translate-x-full md:translate-x-0"
        )}
      >
        <nav className="h-full px-3 py-4 bg-card border-r">
          <h2 className="mb-6 text-lg font-semibold">CDO MSWIE DSS</h2>
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li key={item.title}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 p-2 text-foreground hover:bg-accent rounded-lg",
                    location.pathname === item.href && "bg-accent/50"
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={cn("p-4 md:ml-64 transition-all")}>
        <div className="container mx-auto">{children}</div>
      </main>
    </div>
  );
};

export default MainLayout;
