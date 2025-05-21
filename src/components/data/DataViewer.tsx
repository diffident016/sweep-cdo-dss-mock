
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { 
  FileSpreadsheet,  
  Download, 
  Search, 
  X, 
  FileDown, 
  Save
} from "lucide-react";

// Available modules
const modules = [
  { id: "wasteAnalysis", name: "Waste Analysis" },
  { id: "technologyComparison", name: "Technology Comparison" },
  { id: "siteSuggestions", name: "Site Suggestions" },
  { id: "scenarioSimulation", name: "Scenario Simulation" },
  { id: "financialAnalysis", name: "Financial Analysis" },
  { id: "environmentalImpact", name: "Environmental Impact" },
  { id: "multiCriteriaAnalysis", name: "Multi-Criteria Analysis" },
  { id: "policyAssistant", name: "Policy Assistant" },
];

// Mock waste analysis data
const mockWasteData = [
  { id: 1, district: "District 1", wasteType: "Organic", amount: "45.2", unit: "tons/day", collectionRate: 92, lastUpdated: "2024-05-12" },
  { id: 2, district: "District 2", wasteType: "Recyclables", amount: "18.7", unit: "tons/day", collectionRate: 88, lastUpdated: "2024-05-12" },
  { id: 3, district: "District 3", wasteType: "Inert Waste", amount: "12.9", unit: "tons/day", collectionRate: 85, lastUpdated: "2024-05-12" },
  { id: 4, district: "District 4", wasteType: "Organic", amount: "36.5", unit: "tons/day", collectionRate: 78, lastUpdated: "2024-05-10" },
  { id: 5, district: "District 5", wasteType: "Recyclables", amount: "23.1", unit: "tons/day", collectionRate: 83, lastUpdated: "2024-05-10" },
];

// Mock technology data
const mockTechData = [
  { id: 1, technology: "Gasification", energyOutput: "600-900", unit: "kWh/ton", co2Reduction: "65-85", capex: "High", lastUpdated: "2024-04-22" },
  { id: 2, technology: "Anaerobic Digestion", energyOutput: "250-400", unit: "kWh/ton", co2Reduction: "60-80", capex: "Medium", lastUpdated: "2024-04-22" },
  { id: 3, technology: "Incineration", energyOutput: "500-600", unit: "kWh/ton", co2Reduction: "10-25", capex: "Medium-High", lastUpdated: "2024-04-20" },
  { id: 4, technology: "Pyrolysis", energyOutput: "400-600", unit: "kWh/ton", co2Reduction: "50-70", capex: "High", lastUpdated: "2024-04-20" },
];

const DataViewer = () => {
  const { toast } = useToast();
  const [selectedModule, setSelectedModule] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [editableCell, setEditableCell] = useState({ rowId: 0, column: "" });
  const [cellValue, setCellValue] = useState("");
  
  // Function to get appropriate data based on selected module
  const getModuleData = () => {
    switch (selectedModule) {
      case "wasteAnalysis":
        return mockWasteData;
      case "technologyComparison":
        return mockTechData;
      default:
        return [];
    }
  };

  // Get table headers based on selected module
  const getTableHeaders = () => {
    if (selectedModule === "wasteAnalysis") {
      return ["District", "Waste Type", "Amount", "Unit", "Collection Rate (%)", "Last Updated", "Actions"];
    } else if (selectedModule === "technologyComparison") {
      return ["Technology", "Energy Output", "Unit", "CO₂ Reduction (%)", "CAPEX", "Last Updated", "Actions"];
    }
    return [];
  };

  // Function to edit cell
  const handleCellEdit = (rowId: number, column: string, value: string) => {
    setEditableCell({ rowId, column });
    setCellValue(value);
  };

  // Function to save edited cell
  const handleSaveEdit = () => {
    toast({
      title: "Data Updated",
      description: `Value updated to: ${cellValue}`,
    });
    setEditableCell({ rowId: 0, column: "" });
    setCellValue("");
  };

  // Function to cancel edit
  const handleCancelEdit = () => {
    setEditableCell({ rowId: 0, column: "" });
    setCellValue("");
  };

  // Function to download data as CSV
  const handleDownloadCSV = () => {
    toast({
      title: "Download Started",
      description: `${modules.find(m => m.id === selectedModule)?.name} data is being downloaded as CSV.`,
    });
  };

  const filteredData = getModuleData().filter(item => {
    if (!searchQuery) return true;
    
    return Object.values(item).some(val => 
      val.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center">
            <FileSpreadsheet className="h-5 w-5 mr-2" />
            Data Browser
          </CardTitle>
          
          {selectedModule && (
            <Button variant="outline" size="sm" onClick={handleDownloadCSV}>
              <FileDown className="h-4 w-4 mr-2" />
              Download CSV
            </Button>
          )}
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="flex-1">
              <Select value={selectedModule} onValueChange={setSelectedModule}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a module to view data" />
                </SelectTrigger>
                <SelectContent>
                  {modules.map((module) => (
                    <SelectItem key={module.id} value={module.id}>{module.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {selectedModule && (
              <div className="flex-1 relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search data..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
                {searchQuery && (
                  <button 
                    className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground hover:text-foreground"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            )}
          </div>
          
          {selectedModule && (
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    {getTableHeaders().map((header, index) => (
                      <TableHead key={index}>{header}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.length > 0 ? (
                    filteredData.map((row) => (
                      <TableRow key={row.id}>
                        {selectedModule === "wasteAnalysis" && (
                          <>
                            <TableCell>{row.district}</TableCell>
                            <TableCell>{row.wasteType}</TableCell>
                            <TableCell>
                              {editableCell.rowId === row.id && editableCell.column === "amount" ? (
                                <div className="flex items-center space-x-1">
                                  <Input 
                                    value={cellValue} 
                                    onChange={(e) => setCellValue(e.target.value)}
                                    className="h-8 w-20"
                                  />
                                  <Button variant="ghost" size="icon" onClick={handleSaveEdit}>
                                    <Save className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" onClick={handleCancelEdit}>
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              ) : (
                                <span 
                                  className="cursor-pointer hover:underline hover:text-primary"
                                  onClick={() => handleCellEdit(row.id, "amount", row.amount)}
                                >
                                  {row.amount}
                                </span>
                              )}
                            </TableCell>
                            <TableCell>{row.unit}</TableCell>
                            <TableCell>
                              {editableCell.rowId === row.id && editableCell.column === "collectionRate" ? (
                                <div className="flex items-center space-x-1">
                                  <Input 
                                    value={cellValue} 
                                    onChange={(e) => setCellValue(e.target.value)}
                                    className="h-8 w-20"
                                  />
                                  <Button variant="ghost" size="icon" onClick={handleSaveEdit}>
                                    <Save className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" onClick={handleCancelEdit}>
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              ) : (
                                <span 
                                  className="cursor-pointer hover:underline hover:text-primary"
                                  onClick={() => handleCellEdit(row.id, "collectionRate", row.collectionRate.toString())}
                                >
                                  {row.collectionRate}
                                </span>
                              )}
                            </TableCell>
                            <TableCell>{row.lastUpdated}</TableCell>
                          </>
                        )}
                        
                        {selectedModule === "technologyComparison" && (
                          <>
                            <TableCell>{row.technology}</TableCell>
                            <TableCell>
                              {editableCell.rowId === row.id && editableCell.column === "energyOutput" ? (
                                <div className="flex items-center space-x-1">
                                  <Input 
                                    value={cellValue} 
                                    onChange={(e) => setCellValue(e.target.value)}
                                    className="h-8 w-24"
                                  />
                                  <Button variant="ghost" size="icon" onClick={handleSaveEdit}>
                                    <Save className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" onClick={handleCancelEdit}>
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              ) : (
                                <span 
                                  className="cursor-pointer hover:underline hover:text-primary"
                                  onClick={() => handleCellEdit(row.id, "energyOutput", row.energyOutput)}
                                >
                                  {row.energyOutput}
                                </span>
                              )}
                            </TableCell>
                            <TableCell>{row.unit}</TableCell>
                            <TableCell>
                              {editableCell.rowId === row.id && editableCell.column === "co2Reduction" ? (
                                <div className="flex items-center space-x-1">
                                  <Input 
                                    value={cellValue} 
                                    onChange={(e) => setCellValue(e.target.value)}
                                    className="h-8 w-20"
                                  />
                                  <Button variant="ghost" size="icon" onClick={handleSaveEdit}>
                                    <Save className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" onClick={handleCancelEdit}>
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              ) : (
                                <span 
                                  className="cursor-pointer hover:underline hover:text-primary"
                                  onClick={() => handleCellEdit(row.id, "co2Reduction", row.co2Reduction)}
                                >
                                  {row.co2Reduction}
                                </span>
                              )}
                            </TableCell>
                            <TableCell>{row.capex}</TableCell>
                            <TableCell>{row.lastUpdated}</TableCell>
                          </>
                        )}
                        
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Button variant="ghost" size="sm">Validate</Button>
                            <Button variant="ghost" size="sm" className="text-destructive">Delete</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={getTableHeaders().length} className="text-center py-8 text-muted-foreground">
                        {searchQuery ? "No results match your search" : "No data available for this module"}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
          
          {!selectedModule && (
            <div className="flex items-center justify-center h-40 border rounded-md bg-muted/20">
              <p className="text-muted-foreground">Select a module to view its data</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DataViewer;
