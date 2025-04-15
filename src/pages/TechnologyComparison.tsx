
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MainLayout from "@/components/layout/MainLayout";

const TechnologyComparison = () => {
  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Technology Comparison</h1>
          <p className="text-muted-foreground mt-2">
            Compare different waste-to-energy technologies based on efficiency, cost, and environmental impact
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Gasification</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2">High temperature thermal conversion of waste into syngas.</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Energy Output:</span>
                  <span className="font-medium">600-900 kWh/ton</span>
                </div>
                <div className="flex justify-between">
                  <span>CO₂ Reduction:</span>
                  <span className="font-medium">65-85%</span>
                </div>
                <div className="flex justify-between">
                  <span>CAPEX:</span>
                  <span className="font-medium">High</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Anaerobic Digestion</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2">Biological process converting organic waste to biogas.</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Energy Output:</span>
                  <span className="font-medium">250-400 kWh/ton</span>
                </div>
                <div className="flex justify-between">
                  <span>CO₂ Reduction:</span>
                  <span className="font-medium">60-80%</span>
                </div>
                <div className="flex justify-between">
                  <span>CAPEX:</span>
                  <span className="font-medium">Medium</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default TechnologyComparison;
