
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator } from "lucide-react";

const FinancialAnalysis = () => {
  const { toast } = useToast();
  const [technology, setTechnology] = useState("gasification");
  const [capacity, setCapacity] = useState(200);
  const [capitalCost, setCapitalCost] = useState(25000000);
  const [operationalCost, setOperationalCost] = useState(1800000);
  const [energyPrice, setEnergyPrice] = useState(120);
  const [discountRate, setDiscountRate] = useState(8);
  const [projectLife, setProjectLife] = useState(20);
  const [calculationCompleted, setCalculationCompleted] = useState(false);

  // Financial metrics calculations
  const calculateFinancials = () => {
    // Let's generate realistic financial data based on inputs
    let annualRevenue = 0;
    let annualOpex = 0;
    let generatedEnergy = 0;
    let carbonReduction = 0;
    
    // Different calculations based on technology type
    switch (technology) {
      case "gasification":
        generatedEnergy = capacity * 365 * 0.8 * 800; // kWh per year
        annualRevenue = generatedEnergy * (energyPrice / 1000); // Convert to MWh
        annualOpex = operationalCost + (capacity * 365 * 20); // Basic O&M plus $20/ton processing
        carbonReduction = generatedEnergy * 0.0006; // tCO2e per year
        break;
      case "anaerobic":
        generatedEnergy = capacity * 365 * 0.5 * 350; // kWh per year
        annualRevenue = generatedEnergy * (energyPrice / 1000); // Convert to MWh
        annualOpex = operationalCost + (capacity * 365 * 15); // Basic O&M plus $15/ton processing
        carbonReduction = generatedEnergy * 0.0008; // tCO2e per year
        break;
      case "incineration":
        generatedEnergy = capacity * 365 * 0.7 * 550; // kWh per year
        annualRevenue = generatedEnergy * (energyPrice / 1000); // Convert to MWh
        annualOpex = operationalCost + (capacity * 365 * 25); // Basic O&M plus $25/ton processing
        carbonReduction = generatedEnergy * 0.0005; // tCO2e per year
        break;
    }
    
    // Calculate NPV & IRR
    const cashFlows = [-capitalCost];
    const annualProfit = annualRevenue - annualOpex;
    
    for (let i = 1; i <= projectLife; i++) {
      cashFlows.push(annualProfit);
    }
    
    const npv = calculateNPV(cashFlows, discountRate / 100);
    const irr = calculateIRR(cashFlows);
    const paybackPeriod = capitalCost / annualProfit;
    
    // Generate cash flow data for chart
    const cashFlowData = [];
    let cumulativeCashFlow = -capitalCost;
    
    cashFlowData.push({ 
      year: 0, 
      cashFlow: -capitalCost, 
      cumulativeCashFlow: -capitalCost 
    });
    
    for (let i = 1; i <= projectLife; i++) {
      cumulativeCashFlow += annualProfit;
      cashFlowData.push({ 
        year: i, 
        cashFlow: annualProfit, 
        cumulativeCashFlow: cumulativeCashFlow 
      });
    }
    
    setCalculationCompleted(true);
    toast({
      title: "Financial Analysis Complete",
      description: `NPV: $${npv.toLocaleString()} | IRR: ${irr.toFixed(1)}%`,
    });

    return {
      annualRevenue,
      annualOpex,
      annualProfit,
      npv,
      irr,
      paybackPeriod,
      cashFlowData,
      generatedEnergy,
      carbonReduction
    };
  };
  
  // Simplified NPV calculation
  const calculateNPV = (cashFlows, rate) => {
    return cashFlows.reduce((npv, cashFlow, t) => {
      return npv + cashFlow / Math.pow(1 + rate, t);
    }, 0);
  };
  
  // Simplified IRR calculation (basic implementation)
  const calculateIRR = (cashFlows) => {
    // This is a simplified approach - in reality would use numeric methods
    let irr = 0;
    for (let r = 0.01; r < 1; r += 0.01) {
      const npv = calculateNPV(cashFlows, r);
      if (npv <= 0) {
        irr = (r - 0.01) * 100;
        break;
      }
    }
    return irr;
  };
  
  const financials = calculateFinancials();

  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Financial Analysis</h1>
          <p className="text-muted-foreground mt-2">
            Calculate ROI and economic viability of waste-to-energy projects
          </p>
        </div>

        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="calculator">ROI Calculator</TabsTrigger>
            <TabsTrigger value="cashflow">Cash Flow Analysis</TabsTrigger>
            <TabsTrigger value="comparison">Technology Comparison</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calculator" className="space-y-4 mt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-2xl">Project Parameters</CardTitle>
                  <Calculator className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="technology">Technology Type</Label>
                    <Select 
                      value={technology}
                      onValueChange={setTechnology}
                    >
                      <SelectTrigger id="technology">
                        <SelectValue placeholder="Select technology" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gasification">Gasification</SelectItem>
                        <SelectItem value="anaerobic">Anaerobic Digestion</SelectItem>
                        <SelectItem value="incineration">Mass-burn Incineration</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Processing Capacity (tons/day)</Label>
                    <Input 
                      id="capacity" 
                      type="number" 
                      value={capacity}
                      onChange={(e) => setCapacity(Number(e.target.value))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="capitalCost">Capital Cost ($)</Label>
                    <Input 
                      id="capitalCost" 
                      type="number" 
                      value={capitalCost}
                      onChange={(e) => setCapitalCost(Number(e.target.value))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="operationalCost">Annual Fixed O&M Cost ($)</Label>
                    <Input 
                      id="operationalCost" 
                      type="number" 
                      value={operationalCost}
                      onChange={(e) => setOperationalCost(Number(e.target.value))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="energyPrice">Energy Price ($/MWh)</Label>
                    <Input 
                      id="energyPrice" 
                      type="number" 
                      value={energyPrice}
                      onChange={(e) => setEnergyPrice(Number(e.target.value))}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="discountRate">Discount Rate (%)</Label>
                      <Input 
                        id="discountRate" 
                        type="number" 
                        value={discountRate}
                        onChange={(e) => setDiscountRate(Number(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="projectLife">Project Life (years)</Label>
                      <Input 
                        id="projectLife" 
                        type="number" 
                        value={projectLife}
                        onChange={(e) => setProjectLife(Number(e.target.value))}
                      />
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    onClick={() => setCalculationCompleted(true)}>
                    Calculate Financial Metrics
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Financial Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="text-2xl font-bold text-center">
                      ${financials.npv.toLocaleString()}
                      <div className="text-base font-normal text-muted-foreground">Net Present Value</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-xl font-bold">{financials.irr.toFixed(1)}%</div>
                        <div className="text-sm text-muted-foreground">Internal Rate of Return</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold">{financials.paybackPeriod.toFixed(1)} years</div>
                        <div className="text-sm text-muted-foreground">Simple Payback Period</div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Annual Revenue:</span>
                      <span className="font-medium">${financials.annualRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Annual Operational Cost:</span>
                      <span className="font-medium">${financials.annualOpex.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Annual Profit:</span>
                      <span className="font-medium">${financials.annualProfit.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Energy Generated:</span>
                      <span className="font-medium">{Math.round(financials.generatedEnergy / 1000).toLocaleString()} MWh/year</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Carbon Reduction:</span>
                      <span className="font-medium">{Math.round(financials.carbonReduction).toLocaleString()} tCO₂e/year</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Cost per Ton:</span>
                      <span className="font-medium">${Math.round(financials.annualOpex / (capacity * 365)).toLocaleString()}/ton</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="cashflow" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Cash Flow Projection</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={financials.cashFlowData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottomRight', offset: -10 }} />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                    <Legend />
                    <Line type="monotone" dataKey="cumulativeCashFlow" name="Cumulative Cash Flow" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="cashFlow" name="Annual Cash Flow" stroke="hsl(var(--accent))" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Sensitivity Analysis</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: "-20% Energy Price", npv: financials.npv * 0.6 },
                      { name: "-10% Energy Price", npv: financials.npv * 0.8 },
                      { name: "Base Case", npv: financials.npv },
                      { name: "+10% Energy Price", npv: financials.npv * 1.2 },
                      { name: "+20% Energy Price", npv: financials.npv * 1.4 },
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                    <Bar dataKey="npv" name="Net Present Value" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="comparison" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Economic Comparison by Technology</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { 
                        name: "Gasification", 
                        capex: 30, 
                        opex: 25,
                        revenue: 40,
                        payback: 6.2
                      },
                      { 
                        name: "Anaerobic", 
                        capex: 18, 
                        opex: 18,
                        revenue: 25,
                        payback: 5.1
                      },
                      { 
                        name: "Incineration", 
                        capex: 25, 
                        opex: 28,
                        revenue: 35,
                        payback: 7.5
                      },
                      { 
                        name: "Pyrolysis", 
                        capex: 28, 
                        opex: 24,
                        revenue: 38,
                        payback: 6.8
                      },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="capex" name="Capital Cost (Million $/100tpd)" fill="hsl(var(--muted))" />
                    <Bar dataKey="opex" name="Annual O&M ($/ton)" fill="hsl(var(--destructive))" />
                    <Bar dataKey="revenue" name="Revenue ($/ton)" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default FinancialAnalysis;
