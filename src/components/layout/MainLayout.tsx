
import { cn } from "@/lib/utils";
import { 
  Sidebar,
  SidebarContent,
  SidebarProvider,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { 
  BarChart, 
  Recycle, 
  Zap, 
  Map, 
  LineChart, 
  Calculator, 
  Trash2, 
  Activity, 
  FileText 
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface MainLayoutProps {
  children: React.ReactNode;
}

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

const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar>
          <SidebarContent>
            <div className="mb-6 px-4 text-lg font-semibold">CDO MSWIE DSS</div>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.href}
                    tooltip={item.title}
                    className="hover:bg-primary/10 transition-colors duration-200"
                  >
                    <Link 
                      to={item.href} 
                      className="flex items-center gap-3 w-full"
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 overflow-hidden">
          <div className="container mx-auto p-4">
            <SidebarTrigger className="mb-4" />
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
