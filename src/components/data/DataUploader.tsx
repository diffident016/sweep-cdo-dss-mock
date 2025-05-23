
import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { FileUp, FileDown, Loader2, Import, Database } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

// Available modules for data upload
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

const DataUploader = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedModule, setSelectedModule] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleModuleChange = (value: string) => {
    setSelectedModule(value);
    setSelectedFile(null);
    setValidationErrors([]);
    setUploadProgress(0);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    
    if (file) {
      // Enhanced file type validation
      const fileExt = file.name.split('.').pop()?.toLowerCase();
      if (!['csv', 'xlsx', 'xls'].includes(fileExt || '')) {
        setValidationErrors(['Invalid file format. Please upload CSV or Excel files only.']);
      } else {
        // Show file size warning if needed
        if (file.size > 10 * 1024 * 1024) { // 10MB
          setValidationErrors(['Warning: File size exceeds 10MB. Large files may take longer to process.']);
        } else {
          setValidationErrors([]);
        }
      }
    }
  };

  const handleFileUpload = async () => {
    if (!selectedModule) {
      toast({
        title: "Module Required",
        description: "Please select a module before uploading data.",
        variant: "destructive"
      });
      return;
    }

    if (!selectedFile) {
      toast({
        title: "File Required",
        description: "Please select a file to upload.",
        variant: "destructive"
      });
      return;
    }

    if (validationErrors.length > 0 && !validationErrors[0].startsWith('Warning')) {
      toast({
        title: "Validation Error",
        description: validationErrors[0],
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    
    // Simulate file upload with progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    // Simulate upload completion
    setTimeout(() => {
      setIsUploading(false);
      setUploadProgress(100);
      
      toast({
        title: "Upload Successful",
        description: `${selectedFile.name} has been uploaded to the ${modules.find(m => m.id === selectedModule)?.name} module.`,
      });
      
      // Reset form after successful upload
      setTimeout(() => {
        setSelectedFile(null);
        setUploadProgress(0);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }, 3000);
    }, 3000);
  };

  const handleTemplateDowload = () => {
    toast({
      title: "Template Downloaded",
      description: `Data template for ${modules.find(m => m.id === selectedModule)?.name} has been downloaded.`
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Import className="h-5 w-5" />
            <span>Import Data Files</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="module-select" className="text-sm font-medium">Select Module</label>
            <Select value={selectedModule} onValueChange={handleModuleChange}>
              <SelectTrigger id="module-select" className="w-full">
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
            <>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="file-upload" className="text-sm font-medium">Upload File (CSV or Excel)</label>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleTemplateDowload}
                    disabled={!selectedModule}
                  >
                    <FileDown className="h-4 w-4 mr-2" />
                    Download Template
                  </Button>
                </div>
                
                <div className="flex items-center gap-2">
                  <Input
                    ref={fileInputRef}
                    id="file-upload"
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileSelect}
                    disabled={isUploading}
                  />
                  <Button 
                    onClick={handleFileUpload} 
                    disabled={!selectedFile || isUploading || (validationErrors.length > 0 && !validationErrors[0].startsWith('Warning'))}
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <FileUp className="mr-2 h-4 w-4" />
                        Upload
                      </>
                    )}
                  </Button>
                </div>
                
                {selectedFile && (
                  <p className="text-sm text-muted-foreground">
                    Selected file: {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
                  </p>
                )}
                
                {validationErrors.length > 0 && (
                  <div className={`text-sm ${validationErrors[0].startsWith('Warning') ? 'text-yellow-600' : 'text-destructive'}`}>
                    {validationErrors.map((error, index) => (
                      <p key={index}>{error}</p>
                    ))}
                  </div>
                )}
                
                {isUploading && (
                  <div className="space-y-2">
                    <Progress value={uploadProgress} className="h-2" />
                    <p className="text-xs text-muted-foreground text-right">{uploadProgress}% complete</p>
                  </div>
                )}
              </div>
              
              <div className="mt-4 p-4 bg-muted/50 rounded-md">
                <h4 className="text-sm font-medium mb-2">Upload Guidelines:</h4>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                  <li>File must be in CSV or Excel format</li>
                  <li>Maximum file size: 10MB</li>
                  <li>First row should contain column headers</li>
                  <li>Download the template for the correct data structure</li>
                  <li>Data validation will be performed after upload</li>
                </ul>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DataUploader;
