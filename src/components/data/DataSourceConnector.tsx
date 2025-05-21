
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Database, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

// Mock API connections
const mockConnections = [
  {
    id: 1,
    name: "CDO Municipal Waste Database",
    endpoint: "https://api.cdowaste.gov.ph/data",
    status: "active",
    lastSync: "2024-05-15 08:30",
    dataType: "Waste Collection Records",
  },
  {
    id: 2,
    name: "Environmental Monitoring API",
    endpoint: "https://env-monitoring.cdogov.ph/api/v1",
    status: "active",
    lastSync: "2024-05-14 14:15",
    dataType: "Air & Water Quality",
  },
  {
    id: 3,
    name: "GIS Data Service",
    endpoint: "https://gis.cdogov.ph/data/waste",
    status: "inactive",
    lastSync: "2024-05-10 10:45",
    dataType: "Geospatial Data",
  },
];

const DataSourceConnector = () => {
  const { toast } = useToast();
  const [connections, setConnections] = useState(mockConnections);
  const [newConnection, setNewConnection] = useState({
    name: "",
    endpoint: "",
    apiKey: "",
    dataType: "",
  });
  const [isConnecting, setIsConnecting] = useState(false);
  const [testingId, setTestingId] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewConnection(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddConnection = () => {
    // Validation
    if (!newConnection.name || !newConnection.endpoint) {
      toast({
        title: "Required Fields Missing",
        description: "Name and Endpoint URL are required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsConnecting(true);

    // Simulate API connection
    setTimeout(() => {
      const newConn = {
        id: Date.now(),
        name: newConnection.name,
        endpoint: newConnection.endpoint,
        status: "active",
        lastSync: new Date().toLocaleString(),
        dataType: newConnection.dataType,
      };

      setConnections(prev => [...prev, newConn]);
      setNewConnection({
        name: "",
        endpoint: "",
        apiKey: "",
        dataType: "",
      });

      toast({
        title: "Connection Added",
        description: `Successfully connected to ${newConnection.name}.`,
      });

      setIsConnecting(false);
    }, 2000);
  };

  const handleToggleStatus = (id: number, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    
    setConnections(prev => 
      prev.map(conn => 
        conn.id === id ? { ...conn, status: newStatus } : conn
      )
    );

    toast({
      title: `Connection ${newStatus === "active" ? "Activated" : "Deactivated"}`,
      description: `Connection status updated to ${newStatus}.`,
    });
  };

  const handleTestConnection = (id: number) => {
    setTestingId(id);
    
    // Simulate testing API connection
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% chance of success
      
      if (success) {
        toast({
          title: "Connection Test Successful",
          description: "API endpoint is accessible and responding correctly.",
        });
      } else {
        toast({
          title: "Connection Test Failed",
          description: "Could not connect to the API endpoint. Please check the URL and credentials.",
          variant: "destructive",
        });
      }
      
      setTestingId(null);
    }, 1500);
  };

  const handleSyncNow = (id: number) => {
    setTestingId(id);
    
    // Simulate sync process
    setTimeout(() => {
      setConnections(prev => 
        prev.map(conn => 
          conn.id === id ? { ...conn, lastSync: new Date().toLocaleString() } : conn
        )
      );
      
      toast({
        title: "Synchronization Complete",
        description: "Latest data has been synchronized successfully.",
      });
      
      setTestingId(null);
    }, 2000);
  };

  const handleRemoveConnection = (id: number) => {
    setConnections(prev => prev.filter(conn => conn.id !== id));
    
    toast({
      title: "Connection Removed",
      description: "The data connection has been removed successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Database className="h-5 w-5 mr-2" />
            External Data Sources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-md p-4 space-y-4">
              <h3 className="font-medium">Add New Data Connection</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Connection Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={newConnection.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Municipal Data API"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endpoint">API Endpoint URL</Label>
                  <Input
                    id="endpoint"
                    name="endpoint"
                    value={newConnection.endpoint}
                    onChange={handleInputChange}
                    placeholder="https://api.example.com/data"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apiKey">API Key (if required)</Label>
                  <Input
                    id="apiKey"
                    name="apiKey"
                    type="password"
                    value={newConnection.apiKey}
                    onChange={handleInputChange}
                    placeholder="Enter API key"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dataType">Data Type</Label>
                  <Input
                    id="dataType"
                    name="dataType"
                    value={newConnection.dataType}
                    onChange={handleInputChange}
                    placeholder="e.g., Waste Collection Data"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleAddConnection} disabled={isConnecting}>
                  {isConnecting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    "Add Connection"
                  )}
                </Button>
              </div>
            </div>

            <h3 className="font-medium mt-6">Existing Data Connections</h3>
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Endpoint</TableHead>
                    <TableHead>Data Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Sync</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {connections.length > 0 ? (
                    connections.map((conn) => (
                      <TableRow key={conn.id}>
                        <TableCell>{conn.name}</TableCell>
                        <TableCell className="font-mono text-xs truncate max-w-[150px]">{conn.endpoint}</TableCell>
                        <TableCell>{conn.dataType}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={conn.status === "active"}
                              onCheckedChange={() => handleToggleStatus(conn.id, conn.status)}
                              aria-label="Toggle connection status"
                            />
                            <span className={conn.status === "active" ? "text-green-500" : "text-gray-500"}>
                              {conn.status === "active" ? (
                                <CheckCircle2 className="h-4 w-4" />
                              ) : (
                                <XCircle className="h-4 w-4" />
                              )}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{conn.lastSync}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleTestConnection(conn.id)}
                              disabled={testingId === conn.id}
                            >
                              {testingId === conn.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                "Test"
                              )}
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleSyncNow(conn.id)}
                              disabled={conn.status === "inactive" || testingId === conn.id}
                            >
                              {testingId === conn.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                "Sync Now"
                              )}
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleRemoveConnection(conn.id)}
                              className="text-destructive"
                            >
                              Remove
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                        No data connections configured yet
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>GIS Data Integration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border h-[200px] bg-card flex items-center justify-center">
              <p className="text-muted-foreground">GIS Layer Management Interface will be displayed here</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <Button variant="outline" className="flex items-center">
                <FileUp className="h-4 w-4 mr-2" />
                Upload Shapefile
              </Button>
              <Button variant="outline" className="flex items-center">
                <FileUp className="h-4 w-4 mr-2" />
                Upload GeoJSON
              </Button>
              <Button variant="outline" className="flex items-center">
                <Database className="h-4 w-4 mr-2" />
                Connect to GIS Server
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataSourceConnector;
