
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MainLayout from "@/components/layout/MainLayout";

const PolicyAssistant = () => {
  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Policy Assistant</h1>
          <p className="text-muted-foreground mt-2">
            Generate and customize policy recommendations for waste-to-energy initiatives
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Waste Segregation Ordinance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Mandates separation of biodegradable, non-biodegradable, and special waste at source
              </p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Estimated Impact:</span>
                  <span className="font-medium">30% landfill reduction</span>
                </div>
                <div className="flex justify-between">
                  <span>Implementation Complexity:</span>
                  <span className="font-medium">Medium</span>
                </div>
                <div className="flex justify-between">
                  <span>Timeline:</span>
                  <span className="font-medium">6-12 months</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>WtE Partnership Framework</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Establishes legal framework for public-private partnerships on WtE facilities
              </p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Estimated Impact:</span>
                  <span className="font-medium">20% increase in investments</span>
                </div>
                <div className="flex justify-between">
                  <span>Implementation Complexity:</span>
                  <span className="font-medium">High</span>
                </div>
                <div className="flex justify-between">
                  <span>Timeline:</span>
                  <span className="font-medium">12-18 months</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default PolicyAssistant;
