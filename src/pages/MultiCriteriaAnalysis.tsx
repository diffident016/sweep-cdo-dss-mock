
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const defaultTechnologies = [
  {
    name: "Gasification", 
    economicScore: 7.5,
    environmentalScore: 8.2,
    socialScore: 6.8,
    technicalScore: 7.8,
    regulatoryScore: 7.0
  },
  {
    name: "Anaerobic Digestion", 
    economicScore: 7.2,
    environmentalScore: 8.8,
    socialScore: 8.5,
    technicalScore: 7.0,
    regulatoryScore: 8.5
  },
  {
    name: "Incineration", 
    economicScore: 8.0,
    environmentalScore: 6.0,
    socialScore: 5.5,
    technicalScore: 8.5,
    regulatoryScore: 6.0
  },
  {
    name: "Pyrolysis", 
    economicScore: 6.8,
    environmentalScore: 7.5,
    socialScore: 6.5,
    technicalScore: 7.0,
    regulatoryScore: 6.5
  },
  {
    name: "RDF", 
    economicScore: 7.0,
    environmentalScore: 7.2,
    socialScore: 7.0,
    technicalScore: 7.5,
    regulatoryScore: 7.2
  }
];

const MultiCriteriaAnalysis = () => {
  const { toast } = useToast();
  const [weights, setWeights] = useState({
    economic: 20,
    environmental: 30,
    social: 15,
    technical: 20,
    regulatory: 15
  });
  const [technologies, setTechnologies] = useState(defaultTechnologies);

  // Calculate weighted scores
  const calculatedResults = technologies.map(tech => {
    const weightedEconomic = tech.economicScore * (weights.economic / 100);
    const weightedEnvironmental = tech.environmentalScore * (weights.environmental / 100);
    const weightedSocial = tech.socialScore * (weights.social / 100);
    const weightedTechnical = tech.technicalScore * (weights.technical / 100);
    const weightedRegulatory = tech.regulatoryScore * (weights.regulatory / 100);
    
    const totalScore = weightedEconomic + weightedEnvironmental + 
                       weightedSocial + weightedTechnical + weightedRegulatory;
    
    return {
      name: tech.name,
      economic: weightedEconomic,
      environmental: weightedEnvironmental,
      social: weightedSocial,
      technical: weightedTechnical,
      regulatory: weightedRegulatory,
      total: totalScore
    };
  });
  
  // Sort by total score
  const rankedResults = [...calculatedResults].sort((a, b) => b.total - a.total);
  
  // Prepare data for radar charts
  const getRadarData = (technology) => {
    return [
      { subject: 'Economic', A: technology.economicScore, fullMark: 10 },
      { subject: 'Environmental', A: technology.environmentalScore, fullMark: 10 },
      { subject: 'Social', A: technology.socialScore, fullMark: 10 },
      { subject: 'Technical', A: technology.technicalScore, fullMark: 10 },
      { subject: 'Regulatory', A: technology.regulatoryScore, fullMark: 10 },
    ];
  };
  
  const handleWeightChange = (category, value) => {
    // Calculate total of all other weights
    const otherWeightsTotal = Object.entries(weights)
      .filter(([key]) => key !== category)
      .reduce((sum, [_, weight]) => sum + weight, 0);
    
    // Make sure total weights = 100%
    const newWeights = { ...weights, [category]: value };
    const total = Object.values(newWeights).reduce((sum, weight) => sum + weight, 0);
    
    if (total !== 100) {
      // Adjust other weights proportionally
      const adjustment = (100 - value) / otherWeightsTotal;
      Object.entries(weights).forEach(([key, weight]) => {
        if (key !== category) {
          newWeights[key] = Math.round(weight * adjustment);
        }
      });
      
      // Fix any rounding issues
      const roundingError = 100 - Object.values(newWeights).reduce((sum, weight) => sum + weight, 0);
      if (roundingError !== 0) {
        // Find the largest weight that's not the one being changed
        const largestOtherKey = Object.entries(newWeights)
          .filter(([key]) => key !== category)
          .sort(([, a], [, b]) => b - a)[0][0];
        newWeights[largestOtherKey] += roundingError;
      }
    }
    
    setWeights(newWeights);
  };
  
  const recalculateScores = () => {
    toast({
      title: "Analysis Updated",
      description: `Top recommendation: ${rankedResults[0].name} with score ${rankedResults[0].total.toFixed(1)}`,
    });
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Multi-Criteria Decision Analysis</h1>
          <p className="text-muted-foreground mt-2">
            Evaluate waste-to-energy technologies across multiple criteria to find the optimal solution
          </p>
        </div>

        <Tabs defaultValue="criteria" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="criteria">Criteria Weighting</TabsTrigger>
            <TabsTrigger value="comparison">Technology Comparison</TabsTrigger>
            <TabsTrigger value="results">Results & Recommendations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="criteria" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Set Criteria Importance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground mb-4">
                  Adjust the weights of each criterion based on your priorities. Total weights must equal 100%.
                </p>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Economic Criteria (Capital cost, ROI, O&M costs)</span>
                    <span className="font-medium">{weights.economic}%</span>
                  </div>
                  <Slider 
                    value={[weights.economic]} 
                    onValueChange={(value) => handleWeightChange("economic", value[0])}
                    min={5}
                    max={50}
                    step={1}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Environmental Criteria (Emissions, resource recovery)</span>
                    <span className="font-medium">{weights.environmental}%</span>
                  </div>
                  <Slider 
                    value={[weights.environmental]} 
                    onValueChange={(value) => handleWeightChange("environmental", value[0])}
                    min={5}
                    max={50}
                    step={1}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Social Criteria (Public acceptance, job creation)</span>
                    <span className="font-medium">{weights.social}%</span>
                  </div>
                  <Slider 
                    value={[weights.social]} 
                    onValueChange={(value) => handleWeightChange("social", value[0])}
                    min={5}
                    max={50}
                    step={1}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Technical Criteria (Reliability, efficiency, maturity)</span>
                    <span className="font-medium">{weights.technical}%</span>
                  </div>
                  <Slider 
                    value={[weights.technical]} 
                    onValueChange={(value) => handleWeightChange("technical", value[0])}
                    min={5}
                    max={50}
                    step={1}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Regulatory Criteria (Compliance, permitting)</span>
                    <span className="font-medium">{weights.regulatory}%</span>
                  </div>
                  <Slider 
                    value={[weights.regulatory]} 
                    onValueChange={(value) => handleWeightChange("regulatory", value[0])}
                    min={5}
                    max={50}
                    step={1}
                  />
                </div>
                
                <Button onClick={recalculateScores} className="w-full">
                  Update Analysis
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Criteria Descriptions</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Criteria</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Key Indicators</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Economic</TableCell>
                      <TableCell>Financial viability and economic impacts</TableCell>
                      <TableCell>Capital cost, ROI, operational costs, revenue generation</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Environmental</TableCell>
                      <TableCell>Environmental impacts and sustainability</TableCell>
                      <TableCell>Emissions reduction, resource recovery, land use</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Social</TableCell>
                      <TableCell>Social acceptability and community benefits</TableCell>
                      <TableCell>Public acceptance, job creation, health impacts</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Technical</TableCell>
                      <TableCell>Technical performance and reliability</TableCell>
                      <TableCell>Efficiency, reliability, technology maturity</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Regulatory</TableCell>
                      <TableCell>Regulatory compliance and permitting</TableCell>
                      <TableCell>Permitting process, compliance requirements, legal risks</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="comparison" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {technologies.map((tech) => (
                <Card key={tech.name}>
                  <CardHeader>
                    <CardTitle>{tech.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={getRadarData(tech)}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis angle={90} domain={[0, 10]} />
                        <Radar
                          name={tech.name}
                          dataKey="A"
                          stroke="hsl(var(--primary))"
                          fill="hsl(var(--primary))"
                          fillOpacity={0.5}
                        />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Detailed Technology Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Technology</TableHead>
                      <TableHead>Economic (1-10)</TableHead>
                      <TableHead>Environmental (1-10)</TableHead>
                      <TableHead>Social (1-10)</TableHead>
                      <TableHead>Technical (1-10)</TableHead>
                      <TableHead>Regulatory (1-10)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {technologies.map((tech) => (
                      <TableRow key={tech.name}>
                        <TableCell className="font-medium">{tech.name}</TableCell>
                        <TableCell>{tech.economicScore.toFixed(1)}</TableCell>
                        <TableCell>{tech.environmentalScore.toFixed(1)}</TableCell>
                        <TableCell>{tech.socialScore.toFixed(1)}</TableCell>
                        <TableCell>{tech.technicalScore.toFixed(1)}</TableCell>
                        <TableCell>{tech.regulatoryScore.toFixed(1)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="results" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Technology Ranking</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rank</TableHead>
                      <TableHead>Technology</TableHead>
                      <TableHead>Economic ({weights.economic}%)</TableHead>
                      <TableHead>Environmental ({weights.environmental}%)</TableHead>
                      <TableHead>Social ({weights.social}%)</TableHead>
                      <TableHead>Technical ({weights.technical}%)</TableHead>
                      <TableHead>Regulatory ({weights.regulatory}%)</TableHead>
                      <TableHead>Total Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rankedResults.map((tech, index) => (
                      <TableRow key={tech.name} className={index === 0 ? "bg-muted" : ""}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell className="font-medium">{tech.name}</TableCell>
                        <TableCell>{tech.economic.toFixed(2)}</TableCell>
                        <TableCell>{tech.environmental.toFixed(2)}</TableCell>
                        <TableCell>{tech.social.toFixed(2)}</TableCell>
                        <TableCell>{tech.technical.toFixed(2)}</TableCell>
                        <TableCell>{tech.regulatory.toFixed(2)}</TableCell>
                        <TableCell className="font-bold">{tech.total.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Recommendation Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg bg-muted">
                  <h3 className="text-lg font-bold mb-2">Top Recommendation: {rankedResults[0]?.name}</h3>
                  <p className="mb-2">Based on the current criteria weighting, {rankedResults[0]?.name} is the optimal waste-to-energy technology for Cagayan de Oro City with a score of {rankedResults[0]?.total.toFixed(2)} out of 10.</p>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Key Strengths:</p>
                      <ul className="pl-5 list-disc">
                        {rankedResults[0]?.name === "Gasification" && (
                          <>
                            <li>High technical reliability</li>
                            <li>Good environmental performance</li>
                            <li>Favorable economics</li>
                          </>
                        )}
                        {rankedResults[0]?.name === "Anaerobic Digestion" && (
                          <>
                            <li>Excellent environmental performance</li>
                            <li>High social acceptance</li>
                            <li>Strong regulatory compliance</li>
                          </>
                        )}
                        {rankedResults[0]?.name === "Incineration" && (
                          <>
                            <li>Strong economic performance</li>
                            <li>High technical reliability</li>
                            <li>Proven operational history</li>
                          </>
                        )}
                        {rankedResults[0]?.name === "Pyrolysis" && (
                          <>
                            <li>Balanced performance across criteria</li>
                            <li>Good environmental profile</li>
                            <li>Adaptable to various feedstocks</li>
                          </>
                        )}
                        {rankedResults[0]?.name === "RDF" && (
                          <>
                            <li>Good technical performance</li>
                            <li>Balanced social and environmental outcomes</li>
                            <li>Flexible implementation options</li>
                          </>
                        )}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Implementation Considerations:</p>
                      <ul className="pl-5 list-disc">
                        {rankedResults[0]?.name === "Gasification" && (
                          <>
                            <li>Requires pre-sorting of waste</li>
                            <li>Skilled operational staff needed</li>
                            <li>Syngas cleaning system required</li>
                          </>
                        )}
                        {rankedResults[0]?.name === "Anaerobic Digestion" && (
                          <>
                            <li>Best for organic-rich waste</li>
                            <li>Longer processing time</li>
                            <li>Digestate management needed</li>
                          </>
                        )}
                        {rankedResults[0]?.name === "Incineration" && (
                          <>
                            <li>Air pollution control required</li>
                            <li>Ash management considerations</li>
                            <li>Public perception challenges</li>
                          </>
                        )}
                        {rankedResults[0]?.name === "Pyrolysis" && (
                          <>
                            <li>Feed preparation important</li>
                            <li>Process control sophistication</li>
                            <li>By-product markets needed</li>
                          </>
                        )}
                        {rankedResults[0]?.name === "RDF" && (
                          <>
                            <li>Preprocessing facility required</li>
                            <li>End-user agreements needed</li>
                            <li>Storage and handling considerations</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Next Steps</h3>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Conduct detailed feasibility study for {rankedResults[0]?.name}</li>
                    <li>Engage with technology providers and request proposals</li>
                    <li>Perform site-specific assessment for implementation</li>
                    <li>Develop procurement and financing strategy</li>
                    <li>Initiate stakeholder engagement and regulatory processes</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default MultiCriteriaAnalysis;
