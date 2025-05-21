
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { FileUp, Database, FileSpreadsheet, ChartLine } from "lucide-react";
import DataUploader from "@/components/data/DataUploader";
import DataViewer from "@/components/data/DataViewer";
import DataVisualization from "@/components/data/DataVisualization";
import DataSourceConnector from "@/components/data/DataSourceConnector";

const DataManagement = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const { toast } = useToast();
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Data Management</h1>
          <p className="text-muted-foreground mt-2">
            Upload, view, edit, and visualize data for all modules
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="upload" className="flex items-center space-x-2">
              <FileUp className="h-4 w-4" />
              <span>Upload Data</span>
            </TabsTrigger>
            <TabsTrigger value="view" className="flex items-center space-x-2">
              <FileSpreadsheet className="h-4 w-4" />
              <span>View & Edit Data</span>
            </TabsTrigger>
            <TabsTrigger value="visualize" className="flex items-center space-x-2">
              <ChartLine className="h-4 w-4" />
              <span>Visualize Data</span>
            </TabsTrigger>
            <TabsTrigger value="connect" className="flex items-center space-x-2">
              <Database className="h-4 w-4" />
              <span>Data Sources</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="mt-6">
            <DataUploader />
          </TabsContent>

          <TabsContent value="view" className="mt-6">
            <DataViewer />
          </TabsContent>

          <TabsContent value="visualize" className="mt-6">
            <DataVisualization />
          </TabsContent>

          <TabsContent value="connect" className="mt-6">
            <DataSourceConnector />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default DataManagement;
