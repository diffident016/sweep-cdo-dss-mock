
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
  Line,
  ScatterChart,
  Scatter,
  ZAxis,
  ComposedChart,
  Area
} from "recharts";

const airEmissionsData = [
  { name: 'Gasification', CO2: 250, NOx: 0.4, SO2: 0.05, PM: 15, Dioxins: 0.025 },
  { name: 'Anaerobic', CO2: 180, NOx: 0.2, SO2: 0.02, PM: 5, Dioxins: 0.005 },
  { name: 'Incineration', CO2: 450, NOx: 0.8, SO2: 0.15, PM: 25, Dioxins: 0.08 },
];

const carbonOffsetData = [
  { name: 'Jan', baseline: 18000, wte: 12600, reduction: 5400 },
  { name: 'Feb', baseline: 17500, wte: 12250, reduction: 5250 },
  { name: 'Mar', baseline: 19200, wte: 13440, reduction: 5760 },
  { name: 'Apr', baseline: 18700, wte: 13090, reduction: 5610 },
  { name: 'May', baseline: 19500, wte: 13650, reduction: 5850 },
  { name: 'Jun', baseline: 20100, wte: 14070, reduction: 6030 },
  { name: 'Jul', baseline: 20400, wte: 14280, reduction: 6120 },
  { name: 'Aug', baseline: 19800, wte: 13860, reduction: 5940 },
  { name: 'Sep', baseline: 18500, wte: 12950, reduction: 5550 },
  { name: 'Oct', baseline: 19100, wte: 13370, reduction: 5730 },
  { name: 'Nov', baseline: 18300, wte: 12810, reduction: 5490 },
  { name: 'Dec', baseline: 20500, wte: 14350, reduction: 6150 },
];

const landUseData = [
  { name: 'Current Landfill', area: 45, capacity: 400, remaining: 5, leachate: 'High', methane: 'High' },
  { name: 'Gasification', area: 12, capacity: 300, remaining: 'N/A', leachate: 'Low', methane: 'None' },
  { name: 'Anaerobic Digestion', area: 15, capacity: 180, remaining: 'N/A', leachate: 'Medium', methane: 'Captured' },
  { name: 'Incineration', area: 10, capacity: 350, remaining: 'N/A', leachate: 'Low', methane: 'None' },
];

const resourceRecoveryData = [
  { name: 'Current System', energy: 0, metals: 25, organics: 10, residual: 65 },
  { name: 'Gasification', energy: 35, metals: 35, organics: 0, residual: 30 },
  { name: 'Anaerobic Digestion', energy: 25, metals: 30, organics: 40, residual: 5 },
  { name: 'Incineration', energy: 40, metals: 30, organics: 0, residual: 30 },
];

const ecosystemImpactData = [
  {
    indicator: 'Air Quality',
    current: 45,
    wte: 75,
    change: '+30',
    positive: true,
    notes: 'Reduced methane emissions and open burning of waste'
  },
  {
    indicator: 'Water Quality',
    current: 40,
    wte: 80,
    change: '+40',
    positive: true,
    notes: 'Reduced leachate production and improved treatment'
  },
  {
    indicator: 'Soil Quality',
    current: 55,
    wte: 70,
    change: '+15',
    positive: true,
    notes: 'Less contamination from uncontrolled disposal'
  },
  {
    indicator: 'Biodiversity',
    current: 60,
    wte: 65,
    change: '+5',
    positive: true,
    notes: 'Smaller footprint but potential local impacts from facility'
  },
  {
    indicator: 'Noise Pollution',
    current: 70,
    wte: 60,
    change: '-10',
    positive: false,
    notes: 'Increased from plant operations but mitigated by proper design'
  }
];

const lifeImpactData = [
  { x: 75, y: 85, z: 250, name: 'Gasification', cat: 'Medium' },
  { x: 90, y: 70, z: 180, name: 'Anaerobic', cat: 'Low' },
  { x: 60, y: 80, z: 300, name: 'Incineration', cat: 'High' },
  { x: 40, y: 40, z: 400, name: 'Landfill', cat: 'Very High' },
];

const EnvironmentalImpact = () => {
  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Environmental Impact Assessment</h1>
          <p className="text-muted-foreground mt-2">
            Analyze the potential environmental impacts of waste-to-energy solutions
          </p>
        </div>

        <Tabs defaultValue="emissions" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="emissions">Air Emissions</TabsTrigger>
            <TabsTrigger value="carbon">Carbon Footprint</TabsTrigger>
            <TabsTrigger value="land">Land Use</TabsTrigger>
            <TabsTrigger value="resources">Resource Recovery</TabsTrigger>
            <TabsTrigger value="ecosystem">Ecosystem Impact</TabsTrigger>
          </TabsList>
          
          <TabsContent value="emissions" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Air Pollutant Emissions by Technology</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={airEmissionsData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="CO2" name="CO₂ (kg/ton waste)" fill="hsl(var(--primary))" />
                    <Bar dataKey="NOx" name="NOₓ (kg/ton waste)" fill="hsl(var(--accent))" />
                    <Bar dataKey="SO2" name="SO₂ (kg/ton waste)" fill="hsl(var(--muted))" />
                    <Bar dataKey="PM" name="Particulates (g/ton waste)" fill="hsl(var(--destructive))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Emissions Compliance Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Pollutant</TableHead>
                      <TableHead>Regulatory Limit</TableHead>
                      <TableHead>Gasification</TableHead>
                      <TableHead>Anaerobic Digestion</TableHead>
                      <TableHead>Incineration</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">CO₂ (kg/ton)</TableCell>
                      <TableCell>500</TableCell>
                      <TableCell>250</TableCell>
                      <TableCell>180</TableCell>
                      <TableCell>450</TableCell>
                      <TableCell className="text-green-500">Compliant</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">NOₓ (kg/ton)</TableCell>
                      <TableCell>1.0</TableCell>
                      <TableCell>0.4</TableCell>
                      <TableCell>0.2</TableCell>
                      <TableCell>0.8</TableCell>
                      <TableCell className="text-green-500">Compliant</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">SO₂ (kg/ton)</TableCell>
                      <TableCell>0.2</TableCell>
                      <TableCell>0.05</TableCell>
                      <TableCell>0.02</TableCell>
                      <TableCell>0.15</TableCell>
                      <TableCell className="text-green-500">Compliant</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Particulates (g/ton)</TableCell>
                      <TableCell>30</TableCell>
                      <TableCell>15</TableCell>
                      <TableCell>5</TableCell>
                      <TableCell>25</TableCell>
                      <TableCell className="text-green-500">Compliant</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Dioxins (ng/ton)</TableCell>
                      <TableCell>0.1</TableCell>
                      <TableCell>0.025</TableCell>
                      <TableCell>0.005</TableCell>
                      <TableCell>0.08</TableCell>
                      <TableCell className="text-green-500">Compliant</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="carbon" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Carbon Footprint Comparison</CardTitle>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      data={carbonOffsetData}
                      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    >
                      <CartesianGrid stroke="#f5f5f5" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => `${value.toLocaleString()} tCO₂e`} />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="baseline" 
                        fill="hsl(var(--muted))" 
                        stroke="hsl(var(--muted))" 
                        name="Baseline Emissions"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="wte" 
                        stroke="hsl(var(--primary))" 
                        name="WtE Scenario" 
                      />
                      <Bar 
                        dataKey="reduction" 
                        barSize={20} 
                        fill="hsl(var(--accent))" 
                        name="Emission Reduction" 
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Carbon Reduction Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="p-6 bg-muted rounded-lg text-center">
                    <div className="text-4xl font-bold mb-2">69,879</div>
                    <div className="text-lg text-muted-foreground">tons CO₂e annual reduction</div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Carbon Reduction from WtE Energy Generation</span>
                        <span className="font-medium">42%</span>
                      </div>
                      <Progress value={42} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Carbon Reduction from Avoided Landfill Methane</span>
                        <span className="font-medium">35%</span>
                      </div>
                      <Progress value={35} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Carbon Reduction from Materials Recovery</span>
                        <span className="font-medium">23%</span>
                      </div>
                      <Progress value={23} className="h-2" />
                    </div>
                  </div>
                  
                  <div className="text-center text-muted-foreground">
                    <p>Equivalent to removing <span className="font-medium">15,200</span> cars from the road annually</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Carbon Intensity by Energy Source</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: "Coal", value: 910 },
                      { name: "Oil", value: 710 },
                      { name: "Natural Gas", value: 490 },
                      { name: "WtE (Gasification)", value: 250 },
                      { name: "WtE (Anaerobic)", value: 180 },
                      { name: "Solar PV", value: 45 },
                      { name: "Wind", value: 12 },
                      { name: "Hydro", value: 24 }
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: 'gCO₂e/kWh', angle: -90, position: 'insideLeft' }} />
                    <Tooltip formatter={(value) => `${value} gCO₂e/kWh`} />
                    <Bar dataKey="value" fill="hsl(var(--primary))" name="Carbon Intensity" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="land" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Land Use Comparison</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={landUseData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: 'Hectares', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="area" name="Land Area Required (ha)" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Land Utilization Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>System</TableHead>
                      <TableHead>Land Area (ha)</TableHead>
                      <TableHead>Processing Capacity (tons/day)</TableHead>
                      <TableHead>Land Efficiency (tons/day/ha)</TableHead>
                      <TableHead>Expected Operational Life</TableHead>
                      <TableHead>Post-Closure Land Use</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Current Landfill</TableCell>
                      <TableCell>45</TableCell>
                      <TableCell>400</TableCell>
                      <TableCell>8.9</TableCell>
                      <TableCell>5 years</TableCell>
                      <TableCell>Limited (30+ year monitoring)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Gasification</TableCell>
                      <TableCell>12</TableCell>
                      <TableCell>300</TableCell>
                      <TableCell>25.0</TableCell>
                      <TableCell>20+ years</TableCell>
                      <TableCell>Flexible after decommissioning</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Anaerobic Digestion</TableCell>
                      <TableCell>15</TableCell>
                      <TableCell>180</TableCell>
                      <TableCell>12.0</TableCell>
                      <TableCell>20+ years</TableCell>
                      <TableCell>Flexible after decommissioning</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Incineration</TableCell>
                      <TableCell>10</TableCell>
                      <TableCell>350</TableCell>
                      <TableCell>35.0</TableCell>
                      <TableCell>25+ years</TableCell>
                      <TableCell>Flexible after decommissioning</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                
                <div className="mt-6 text-sm text-muted-foreground">
                  <p className="mb-2">Environmental considerations for land use:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Landfill requires long-term monitoring and management post-closure</li>
                    <li>WtE facilities have higher land efficiency and smaller footprint</li>
                    <li>WtE facilities allow for future flexible land use after decommissioning</li>
                    <li>Current landfill site will require expansion or new site within 5 years</li>
                    <li>Strategic location of WtE facilities can reduce waste transportation impacts</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="resources" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Resource Recovery by System</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={resourceRecoveryData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                    <Bar dataKey="energy" name="Energy Recovery (%)" stackId="a" fill="hsl(var(--primary))" />
                    <Bar dataKey="metals" name="Metals Recovery (%)" stackId="a" fill="hsl(var(--accent))" />
                    <Bar dataKey="organics" name="Organics Recovery (%)" stackId="a" fill="hsl(187 31% 62%)" />
                    <Bar dataKey="residual" name="Residual to Landfill (%)" stackId="a" fill="hsl(var(--muted))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <div className="grid gap-4 md:grid-cols-2 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Material Flow Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Material Flow</TableHead>
                        <TableHead>Current System</TableHead>
                        <TableHead>WtE System</TableHead>
                        <TableHead>Net Benefit</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Energy Recovery (MWh/day)</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>120</TableCell>
                        <TableCell className="text-green-500">+120</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Ferrous Metals (tons/day)</TableCell>
                        <TableCell>6.2</TableCell>
                        <TableCell>10.5</TableCell>
                        <TableCell className="text-green-500">+4.3</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Non-Ferrous Metals (tons/day)</TableCell>
                        <TableCell>1.1</TableCell>
                        <TableCell>2.4</TableCell>
                        <TableCell className="text-green-500">+1.3</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Organic Compost (tons/day)</TableCell>
                        <TableCell>25</TableCell>
                        <TableCell>72</TableCell>
                        <TableCell className="text-green-500">+47</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Landfill Diversion (tons/day)</TableCell>
                        <TableCell>65</TableCell>
                        <TableCell>305</TableCell>
                        <TableCell className="text-green-500">+240</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Resource Efficiency Impact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Landfill Diversion Rate</span>
                      <span className="font-medium">76%</span>
                    </div>
                    <Progress value={76} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Material Recovery Rate</span>
                      <span className="font-medium">42%</span>
                    </div>
                    <Progress value={42} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Energy Recovery Rate</span>
                      <span className="font-medium">35%</span>
                    </div>
                    <Progress value={35} className="h-2" />
                  </div>
                  
                  <div className="p-4 border rounded-lg bg-muted">
                    <h4 className="font-medium mb-2">Annual Resource Conservation</h4>
                    <ul className="space-y-1">
                      <li>• Equivalent to 45,000 MWh electricity production</li>
                      <li>• 3,800 tons of metal recovery (equivalent to 6,200 cars)</li>
                      <li>• 26,000 tons of organic material returned to soils</li>
                      <li>• 87,600 tons of landfill space conserved</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="ecosystem" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Ecosystem Health Indicators</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {ecosystemImpactData.map((item) => (
                    <div key={item.indicator}>
                      <div className="flex justify-between mb-2">
                        <span>{item.indicator}</span>
                        <span className={item.positive ? "text-green-500" : "text-destructive"}>
                          {item.change}%
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs">Current</span>
                        <Progress value={item.current} className="h-2" />
                        <span className="text-xs">WtE</span>
                        <Progress value={item.wte} className="h-2 flex-1" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{item.notes}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Lifecycle Environmental Impact</CardTitle>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart
                      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    >
                      <CartesianGrid />
                      <XAxis type="number" dataKey="x" name="Environmental Score" unit="/100" />
                      <YAxis type="number" dataKey="y" name="Social Score" unit="/100" />
                      <ZAxis type="number" dataKey="z" name="Carbon Score" unit="tCO₂e" />
                      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                      <Legend />
                      <Scatter 
                        name="Lifecycle Environmental Impact" 
                        data={lifeImpactData} 
                        fill="hsl(var(--primary))" 
                        shape="circle"
                      />
                    </ScatterChart>
                  </ResponsiveContainer>
                  <div className="text-sm text-muted-foreground text-center mt-4">
                    <p>Bubble size represents carbon emissions (lower is better)</p>
                    <p>X-axis: Environmental score | Y-axis: Social acceptance score | Z-axis: Carbon emissions</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Environmental Impact Mitigation Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Environmental Aspect</TableHead>
                      <TableHead>Potential Impact</TableHead>
                      <TableHead>Mitigation Measure</TableHead>
                      <TableHead>Effectiveness</TableHead>
                      <TableHead>Monitoring Requirement</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Air Quality</TableCell>
                      <TableCell>Stack emissions, odor</TableCell>
                      <TableCell>Advanced air pollution control systems, negative pressure buildings</TableCell>
                      <TableCell>High</TableCell>
                      <TableCell>Continuous emission monitoring</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Water Resources</TableCell>
                      <TableCell>Wastewater discharge</TableCell>
                      <TableCell>Zero liquid discharge systems, water recycling</TableCell>
                      <TableCell>High</TableCell>
                      <TableCell>Water quality testing, flow metering</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Soil Quality</TableCell>
                      <TableCell>Ash disposal, contamination</TableCell>
                      <TableCell>Ash treatment, beneficial reuse as construction material</TableCell>
                      <TableCell>Medium</TableCell>
                      <TableCell>Leachate testing, soil monitoring</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Noise</TableCell>
                      <TableCell>Equipment operation</TableCell>
                      <TableCell>Acoustic enclosures, buffer zones, operating hour limits</TableCell>
                      <TableCell>High</TableCell>
                      <TableCell>Noise level monitoring</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Visual Impact</TableCell>
                      <TableCell>Facility appearance, stack</TableCell>
                      <TableCell>Architectural design, landscaping, screening</TableCell>
                      <TableCell>Medium</TableCell>
                      <TableCell>Visual inspections, community feedback</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default EnvironmentalImpact;
