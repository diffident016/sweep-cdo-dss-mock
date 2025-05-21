
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Import, FileSpreadsheet, Database, Upload } from "lucide-react";
import DataUploader from "@/components/data/DataUploader";

// Form schema for manual data entry
const manualDataSchema = z.object({
  module: z.string({
    required_error: "Please select a module",
  }),
  dataName: z.string({
    required_error: "Please enter a data name",
  }).min(3, {
    message: "Data name must be at least 3 characters",
  }),
  description: z.string().optional(),
  jsonData: z.string({
    required_error: "Please enter valid JSON data",
  }).refine((val) => {
    try {
      JSON.parse(val);
      return true;
    } catch (e) {
      return false;
    }
  }, {
    message: "Invalid JSON format",
  }),
});

type ManualDataFormValues = z.infer<typeof manualDataSchema>;

// Available modules
const modules = [
  { id: "wasteAnalysis", label: "Waste Analysis" },
  { id: "technologyComparison", label: "Technology Comparison" },
  { id: "siteSuggestions", label: "Site Suggestions" },
  { id: "scenarioSimulation", label: "Scenario Simulation" },
  { id: "financialAnalysis", label: "Financial Analysis" },
  { id: "environmentalImpact", label: "Environmental Impact" },
  { id: "multiCriteriaAnalysis", label: "Multi-Criteria Analysis" },
  { id: "policyAssistant", label: "Policy Assistant" },
];

const ImportData = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("import");
  
  // Form for manual data entry
  const form = useForm<ManualDataFormValues>({
    resolver: zodResolver(manualDataSchema),
    defaultValues: {
      module: "",
      dataName: "",
      description: "",
      jsonData: "",
    },
  });

  // Handle form submission
  const onSubmit = (data: ManualDataFormValues) => {
    console.log("Form submitted:", data);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Data Added Successfully",
        description: `${data.dataName} has been added to the ${modules.find(m => m.id === data.module)?.label} module.`,
      });
      
      // Reset form
      form.reset();
    }, 1000);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Import Data</h1>
          <p className="text-muted-foreground mt-2">
            Add data to the system by importing files or manual entry
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="import" className="flex items-center space-x-2">
              <FileSpreadsheet className="h-4 w-4" />
              <span>Import from Excel/CSV</span>
            </TabsTrigger>
            <TabsTrigger value="manual" className="flex items-center space-x-2">
              <Database className="h-4 w-4" />
              <span>Manual Data Entry</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="import" className="mt-6">
            <DataUploader />
          </TabsContent>

          <TabsContent value="manual" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  <span>Manual Data Entry</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="module"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Module</FormLabel>
                          <select
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            {...field}
                          >
                            <option value="" disabled>Select a module</option>
                            {modules.map((module) => (
                              <option key={module.id} value={module.id}>
                                {module.label}
                              </option>
                            ))}
                          </select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dataName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Data Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter a name for this data" {...field} />
                          </FormControl>
                          <FormDescription>
                            A descriptive name for this dataset
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description (Optional)</FormLabel>
                          <FormControl>
                            <textarea 
                              className="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              placeholder="Enter a description for this data"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="jsonData"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>JSON Data</FormLabel>
                          <FormControl>
                            <textarea 
                              className="flex min-h-[200px] font-mono w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              placeholder='{"key": "value", "items": [1, 2, 3]}'
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Enter valid JSON data. Arrays and objects are supported.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="gap-2">
                      <Upload className="h-4 w-4" />
                      <span>Submit Data</span>
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ImportData;
