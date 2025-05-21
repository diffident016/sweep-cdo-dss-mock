
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  AlertCircle,
  CheckCircle, 
  Info, 
  Search, 
  Download,
  Database,
  Filter
} from "lucide-react";

type LogLevel = "info" | "warning" | "error" | "success";
type LogCategory = "auth" | "data" | "system" | "api" | "user";

interface LogEntry {
  id: string;
  timestamp: string;
  level: LogLevel;
  category: LogCategory;
  message: string;
  user?: string;
  details?: string;
}

const Logs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState<LogLevel | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<LogCategory | "all">("all");
  
  // Mock log data for demonstration
  const logs: LogEntry[] = [
    {
      id: "log1",
      timestamp: "2025-05-21T09:32:45",
      level: "info",
      category: "auth",
      message: "User login successful",
      user: "admin@example.com",
      details: "Login from IP: 192.168.1.100"
    },
    {
      id: "log2",
      timestamp: "2025-05-21T09:20:12",
      level: "error",
      category: "api",
      message: "API request failed: GIS data fetch error",
      details: "Timeout after 30s - Service unavailable"
    },
    {
      id: "log3",
      timestamp: "2025-05-21T08:45:30",
      level: "warning",
      category: "data",
      message: "Data import partially completed",
      user: "analyst@example.com",
      details: "15 records failed validation"
    },
    {
      id: "log4",
      timestamp: "2025-05-21T08:30:22",
      level: "success",
      category: "data",
      message: "Waste collection data updated successfully",
      user: "analyst@example.com"
    },
    {
      id: "log5",
      timestamp: "2025-05-21T08:15:40",
      level: "info",
      category: "system",
      message: "System backup completed",
      details: "Backup size: 245MB"
    },
    {
      id: "log6",
      timestamp: "2025-05-20T17:55:13",
      level: "error",
      category: "system",
      message: "Low disk space warning",
      details: "System storage below 10% threshold"
    },
    {
      id: "log7",
      timestamp: "2025-05-20T16:40:28",
      level: "info",
      category: "user",
      message: "User profile updated",
      user: "env@example.com"
    },
    {
      id: "log8",
      timestamp: "2025-05-20T15:22:19",
      level: "warning",
      category: "api",
      message: "High API usage detected",
      details: "Rate limit approaching: 950/1000 calls"
    },
    {
      id: "log9",
      timestamp: "2025-05-20T14:15:33",
      level: "success",
      category: "auth",
      message: "New user account created",
      user: "newuser@example.com"
    },
    {
      id: "log10",
      timestamp: "2025-05-20T13:05:51",
      level: "info",
      category: "system",
      message: "System update available",
      details: "Version 1.2.5 ready to install"
    }
  ];
  
  // Filter logs based on search term and filters
  const filteredLogs = logs.filter(log => {
    // Text search
    const matchesSearch = 
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.user && log.user.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (log.details && log.details.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Level filter
    const matchesLevel = levelFilter === "all" || log.level === levelFilter;
    
    // Category filter
    const matchesCategory = categoryFilter === "all" || log.category === categoryFilter;
    
    return matchesSearch && matchesLevel && matchesCategory;
  });
  
  const getLevelIcon = (level: LogLevel) => {
    switch (level) {
      case "info": return <Info className="h-4 w-4 text-blue-500" />;
      case "warning": return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case "error": return <AlertCircle className="h-4 w-4 text-destructive" />;
      case "success": return <CheckCircle className="h-4 w-4 text-emerald-500" />;
    }
  };
  
  const getLevelBadge = (level: LogLevel) => {
    switch (level) {
      case "info": return <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">Info</Badge>;
      case "warning": return <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">Warning</Badge>;
      case "error": return <Badge variant="outline" className="bg-destructive/10 text-destructive hover:bg-destructive/10">Error</Badge>;
      case "success": return <Badge variant="outline" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50">Success</Badge>;
    }
  };
  
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">System Logs</h1>
          <p className="text-muted-foreground mt-2">
            View and analyze system activity logs
          </p>
        </div>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              <span>Activity Logs</span>
            </CardTitle>
            
            <div className="mt-4 flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search logs..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <div className="w-[140px]">
                  <Select 
                    value={levelFilter} 
                    onValueChange={(value) => setLevelFilter(value as LogLevel | "all")}
                  >
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Filter by level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="error">Error</SelectItem>
                      <SelectItem value="success">Success</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="w-[140px]">
                  <Select 
                    value={categoryFilter}
                    onValueChange={(value) => setCategoryFilter(value as LogCategory | "all")}
                  >
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="auth">Authentication</SelectItem>
                      <SelectItem value="data">Data</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                      <SelectItem value="api">API</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button variant="outline" size="icon" className="h-10 w-10">
                  <Filter className="h-4 w-4" />
                </Button>
                
                <Button variant="outline" size="icon" className="h-10 w-10">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Timestamp</TableHead>
                  <TableHead className="w-[100px]">Level</TableHead>
                  <TableHead className="w-[120px]">Category</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-mono text-xs">
                      {formatDate(log.timestamp)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getLevelIcon(log.level)}
                        {getLevelBadge(log.level)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{log.category}</Badge>
                    </TableCell>
                    <TableCell>{log.message}</TableCell>
                    <TableCell>{log.user || "-"}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {log.details || "-"}
                    </TableCell>
                  </TableRow>
                ))}
                
                {filteredLogs.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="flex flex-col items-center gap-2">
                        <div className="rounded-full bg-muted p-3">
                          <Database className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="font-medium">No logs found</h3>
                        <p className="text-sm text-muted-foreground">
                          Try adjusting your search or filters
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Logs;
