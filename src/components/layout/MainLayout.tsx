
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
  FileText,
  LogOut
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/sonner";

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
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("You have been logged out");
    navigate("/login");
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        {/* Apply proper z-index to ensure sidebar appears above content on mobile */}
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
              
              {/* Logout button */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Logout"
                  className="hover:bg-primary/10 transition-colors duration-200 mt-auto"
                  onClick={handleLogout}
                >
                  <div className="flex items-center gap-3 w-full text-destructive">
                    <LogOut className="h-5 w-5" />
                    <span className="font-medium">Logout</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        {/* Add proper padding and ensure main content doesn't get overlapped */}
        <main className="flex-1 overflow-hidden md:ml-0">
          <div className="container mx-auto p-4">
            {/* Make the trigger more visible on mobile */}
            <SidebarTrigger className="mb-4 md:mb-6" />
            <div className="mt-2">
              {children}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
