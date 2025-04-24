
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MainLayout from "@/components/layout/MainLayout";
import { ArrowUpIcon, ArrowDownIcon, Trash2, Zap, Activity, BarChart, LineChart, Calculator, Map, FileText, Recycle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const wasteData = [
  { month: "Jan", waste: 15000 },
  { month: "Feb", waste: 18000 },
  { month: "Mar", waste: 16000 },
  { month: "Apr", waste: 21000 },
  { month: "May", waste: 19000 },
  { month: "Jun", waste: 22000 },
];

const stats = [
  {
    title: "Total Waste",
    value: "211,000",
    unit: "tons/year",
    change: "+2.5%",
    increasing: true,
    progress: 65,
  },
  {
    title: "CO₂ Emissions",
    value: "79,000",
    unit: "tons/year",
    change: "-5.2%",
    increasing: false,
    progress: 45,
  },
  {
    title: "Energy Potential",
    value: "114",
    unit: "GWh/year",
    change: "+13%",
    increasing: true,
    progress: 78,
  },
];

const dssModules = [
  {
    title: "Waste Analysis",
    description: "Detailed waste characterization and composition analysis",
    icon: Recycle,
    href: "/waste-analysis",
    color: "bg-blue-500/10 text-blue-500"
  },
  {
    title: "Technology Comparison",
    description: "Compare different waste-to-energy technologies",
    icon: Zap,
    href: "/compare",
    color: "bg-amber-500/10 text-amber-500"
  },
  {
    title: "Site Suggestions",
    description: "Optimal locations for waste-to-energy facilities",
    icon: Map,
    href: "/sites",
    color: "bg-green-500/10 text-green-500"
  },
  {
    title: "Scenario Simulation",
    description: "Model different waste management scenarios",
    icon: LineChart,
    href: "/simulation",
    color: "bg-purple-500/10 text-purple-500"
  },
  {
    title: "Financial Analysis",
    description: "Evaluate economic feasibility and ROI",
    icon: Calculator,
    href: "/financial",
    color: "bg-emerald-500/10 text-emerald-500"
  },
  {
    title: "Environmental Impact",
    description: "Assess environmental effects and mitigation",
    icon: Trash2,
    href: "/environmental",
    color: "bg-red-500/10 text-red-500"
  },
  {
    title: "Multi-Criteria Analysis",
    description: "Weighted evaluation of multiple decision factors",
    icon: Activity,
    href: "/mcda",
    color: "bg-indigo-500/10 text-indigo-500"
  },
  {
    title: "Policy Assistant",
    description: "Policy recommendations and compliance guidance",
    icon: FileText,
    href: "/policy",
    color: "bg-cyan-500/10 text-cyan-500"
  },
];

const Dashboard = () => {
  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Waste Management Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Monitor key waste management and energy metrics for Cagayan de Oro City
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.title} className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                {stat.title === "Total Waste" ? (
                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                ) : stat.title === "Energy Potential" ? (
                  <Zap className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Activity className="h-4 w-4 text-muted-foreground" />
                )}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stat.value}
                  <span className="text-sm font-normal text-muted-foreground ml-1">
                    {stat.unit}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <Progress value={stat.progress} className="w-2/3" />
                  <p
                    className={cn(
                      "text-xs flex items-center",
                      stat.increasing
                        ? "text-green-500"
                        : "text-destructive"
                    )}
                  >
                    {stat.increasing ? (
                      <ArrowUpIcon className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDownIcon className="h-3 w-3 mr-1" />
                    )}
                    {stat.change}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Waste Collection Trend</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={wasteData}>
                  <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}t`} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="waste"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Processing Efficiency</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium">Recycling Rate</p>
                  <span className="text-accent font-bold">72%</span>
                </div>
                <Progress value={72} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium">Energy Recovery</p>
                  <span className="text-accent font-bold">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium">Landfill Diversion</p>
                  <span className="text-accent font-bold">63%</span>
                </div>
                <Progress value={63} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Decision Support System Modules</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {dssModules.map((module) => (
                <Link to={module.href} key={module.title} className="block">
                  <div className="border rounded-lg p-4 hover:bg-muted transition-colors h-full flex flex-col">
                    <div className={cn("p-2 rounded-full w-fit mb-3", module.color)}>
                      <module.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-medium">{module.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 mb-3">{module.description}</p>
                    <Button variant="outline" className="w-full mt-auto">
                      Open Module
                    </Button>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
