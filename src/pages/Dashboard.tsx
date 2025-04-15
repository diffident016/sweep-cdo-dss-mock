
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MainLayout from "@/components/layout/MainLayout";
import { ArrowUpIcon, ArrowDownIcon, Trash2, Zap } from "lucide-react";

const stats = [
  {
    title: "Total Waste",
    value: "211,000",
    unit: "tons/year",
    change: "+2.5%",
    increasing: true,
  },
  {
    title: "CO₂ Emissions",
    value: "79,000",
    unit: "tons/year",
    change: "-5.2%",
    increasing: false,
  },
  {
    title: "Energy Potential",
    value: "114",
    unit: "GWh/year",
    change: "+13%",
    increasing: true,
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
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                {stat.title === "Total Waste" ? (
                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                ) : stat.title === "Energy Potential" ? (
                  <Zap className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ArrowUpIcon className="h-4 w-4 text-muted-foreground" />
                )}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stat.value}
                  <span className="text-sm font-normal text-muted-foreground ml-1">
                    {stat.unit}
                  </span>
                </div>
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
                  {stat.change} from last quarter
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
