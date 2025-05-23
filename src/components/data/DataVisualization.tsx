
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { ChartLine, ChartBar, ChartPie, Download, FileUp } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from "recharts";

// Available modules
const modules = [
  { id: "wasteAnalysis", name: "Waste Analysis" },
  { id: "technologyComparison", name: "Technology Comparison" },
  { id: "siteSuggestions", name: "Site Suggestions" },
  { id: "scenarioSimulation", name: "Scenario Simulation" },
  { id: "financialAnalysis", name: "Financial Analysis" },
  { id: "environmentalImpact", name: "Environmental Impact" },
  { id: "multiCriteriaAnalysis", name: "Multi-Criteria Analysis" },
];

// Available visualization types
const visualizationTypes = [
  { id: "bar", name: "Bar Chart", icon: ChartBar },
  { id: "line", name: "Line Chart", icon: ChartLine },
  { id: "pie", name: "Pie Chart", icon: ChartPie },
];

// Mock waste generation trend data
const wasteGenerationData = [
  { year: "2018", value: 182000 },
  { year: "2019", value: 189000 },
  { year: "2020", value: 175000 },
  { year: "2021", value: 195000 },
  { year: "2022", value: 203000 },
  { year: "2023", value: 211000 },
  { year: "2024", value: 218000 },
];

// Mock waste composition data
const wasteCompositionData = [
  { name: "Organic", value: 45, color: "hsl(var(--primary))" },
  { name: "Recyclables", value: 30, color: "hsl(var(--accent))" },
  { name: "Inert Waste", value: 15, color: "hsl(var(--muted))" },
  { name: "Hazardous", value: 5, color: "hsl(var(--destructive))" },
  { name: "Others", value: 5, color: "hsl(187 31% 62%)" }
];

// Mock technology comparison data
const technologyComparisonData = [
  { name: "Gasification", efficiency: 75, cost: 85, emissions: 25 },
  { name: "Incineration", efficiency: 65, cost: 60, emissions: 85 },
  { name: "Anaerobic Digestion", efficiency: 60, cost: 50, emissions: 30 },
  { name: "Pyrolysis", efficiency: 70, cost: 80, emissions: 35 },
  { name: "Landfill Gas", efficiency: 40, cost: 30, emissions: 65 },
];

const DataVisualization = () => {
  const { toast } = useToast();
  const [selectedModule, setSelectedModule] = useState("");
  const [visualizationType, setVisualizationType] = useState("bar");
  const [dataMetric, setDataMetric] = useState("");

  // Get available metrics based on selected module
  const getAvailableMetrics = () => {
    switch (selectedModule) {
      case "wasteAnalysis":
        return [
          { id: "wasteTrend", name: "Waste Generation Trend" },
          { id: "wasteComposition", name: "Waste Composition" },
          { id: "collectionEfficiency", name: "Collection Efficiency" },
        ];
      case "technologyComparison":
        return [
          { id: "efficiency", name: "Energy Efficiency" },
          { id: "cost", name: "Cost Comparison" },
          { id: "emissions", name: "Emissions Comparison" },
        ];
      default:
        return [];
    }
  };

  // Get the appropriate data for visualization
  const getVisualizationData = () => {
    if (selectedModule === "wasteAnalysis") {
      if (dataMetric === "wasteTrend") {
        return wasteGenerationData;
      } else if (dataMetric === "wasteComposition") {
        return wasteCompositionData;
      }
    } else if (selectedModule === "technologyComparison") {
      return technologyComparisonData;
    }
    return [];
  };

  // Function to generate appropriate chart based on selections
  const renderChart = () => {
    const data = getVisualizationData();
    
    if (selectedModule === "wasteAnalysis" && dataMetric === "wasteComposition") {
      // Pie chart is best for composition data regardless of visualization type selection
      return (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={140}
              fill="#8884d8"
              paddingAngle={2}
              dataKey="value"
              label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value}%`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      );
    }
    
    if (selectedModule === "wasteAnalysis" && dataMetric === "wasteTrend") {
      if (visualizationType === "bar") {
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip formatter={(value) => `${value.toLocaleString()} tons`} />
              <Legend />
              <Bar dataKey="value" name="Waste Generation" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        );
      } else if (visualizationType === "line") {
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip formatter={(value) => `${value.toLocaleString()} tons`} />
              <Legend />
              <Line type="monotone" dataKey="value" name="Waste Generation" stroke="hsl(var(--primary))" />
            </LineChart>
          </ResponsiveContainer>
        );
      }
    }
    
    if (selectedModule === "technologyComparison") {
      if (visualizationType === "bar") {
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {dataMetric === "efficiency" && <Bar dataKey="efficiency" name="Efficiency %" fill="hsl(var(--primary))" />}
              {dataMetric === "cost" && <Bar dataKey="cost" name="Relative Cost" fill="hsl(var(--destructive))" />}
              {dataMetric === "emissions" && <Bar dataKey="emissions" name="Emissions" fill="hsl(var(--accent))" />}
            </BarChart>
          </ResponsiveContainer>
        );
      } else if (visualizationType === "line") {
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {dataMetric === "efficiency" && <Line type="monotone" dataKey="efficiency" name="Efficiency %" stroke="hsl(var(--primary))" />}
              {dataMetric === "cost" && <Line type="monotone" dataKey="cost" name="Relative Cost" stroke="hsl(var(--destructive))" />}
              {dataMetric === "emissions" && <Line type="monotone" dataKey="emissions" name="Emissions" stroke="hsl(var(--accent))" />}
            </LineChart>
          </ResponsiveContainer>
        );
      } else if (visualizationType === "pie") {
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={140}
                fill="#8884d8"
                dataKey={dataMetric}
                nameKey="name"
                label={(entry) => entry.name}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`hsl(${index * 60}, 70%, 60%)`} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      }
    }
    
    return (
      <div className="flex items-center justify-center h-80 border rounded-md bg-muted/20">
        <p className="text-muted-foreground">Select a module, metric and visualization type</p>
      </div>
    );
  };

  const handleExportImage = () => {
    toast({
      title: "Export Started",
      description: "Chart is being exported as an image.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center">
            <ChartLine className="h-5 w-5 mr-2" />
            Data Visualization
          </CardTitle>
          
          {selectedModule && dataMetric && (
            <Button variant="outline" size="sm" onClick={handleExportImage}>
              <Download className="h-4 w-4 mr-2" />
              Export Image
            </Button>
          )}
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="text-sm font-medium mb-1 block">Select Module</label>
              <Select value={selectedModule} onValueChange={(value) => {
                setSelectedModule(value);
                setDataMetric("");
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a module" />
                </SelectTrigger>
                <SelectContent>
                  {modules.map((module) => (
                    <SelectItem key={module.id} value={module.id}>{module.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {selectedModule && (
              <div>
                <label className="text-sm font-medium mb-1 block">Select Data Metric</label>
                <Select value={dataMetric} onValueChange={setDataMetric}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select data to visualize" />
                  </SelectTrigger>
                  <SelectContent>
                    {getAvailableMetrics().map((metric) => (
                      <SelectItem key={metric.id} value={metric.id}>{metric.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            {selectedModule && dataMetric && !(selectedModule === "wasteAnalysis" && dataMetric === "wasteComposition") && (
              <div>
                <label className="text-sm font-medium mb-1 block">Visualization Type</label>
                <div className="flex space-x-2">
                  {visualizationTypes.map((visType) => {
                    const Icon = visType.icon;
                    return (
                      <Button 
                        key={visType.id}
                        variant={visualizationType === visType.id ? "default" : "outline"}
                        className="flex-1"
                        onClick={() => setVisualizationType(visType.id)}
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        {visType.name}
                      </Button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          
          <div className="border rounded-lg p-4 bg-card min-h-[400px]">
            {renderChart()}
          </div>
          
          {selectedModule && dataMetric && (
            <div className="text-sm text-muted-foreground">
              <p className="font-medium">Data Source:</p>
              <p>CDO Municipal Waste Management Department, last updated May 2024</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DataVisualization;
