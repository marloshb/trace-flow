
import { BarChart, LineChart, PieChart, TrendingUp, Download } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AnalyticsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Analytics & Reports</h1>
          <div className="flex items-center space-x-2">
            <Select defaultValue="last30">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last7">Last 7 days</SelectItem>
                <SelectItem value="last30">Last 30 days</SelectItem>
                <SelectItem value="last90">Last 90 days</SelectItem>
                <SelectItem value="year">This year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="overview" className="mb-6">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="compliance" className="flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              <span className="hidden sm:inline">Compliance</span>
            </TabsTrigger>
            <TabsTrigger value="sustainability" className="flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              <span className="hidden sm:inline">Sustainability</span>
            </TabsTrigger>
            <TabsTrigger value="traceability" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              <span className="hidden sm:inline">Traceability</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="hover-card col-span-full">
                <CardHeader>
                  <CardTitle className="text-lg">Supply Chain Performance Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full bg-muted/30 rounded-md flex items-center justify-center">
                    <div className="text-center">
                      <BarChart className="h-12 w-12 mx-auto text-primary/50" />
                      <p className="text-muted-foreground mt-2">Interactive Chart Will Appear Here</p>
                      <p className="text-xs text-muted-foreground">Key metrics for supply chain performance</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover-card h-[350px]">
                <CardHeader>
                  <CardTitle className="text-lg">Compliance Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 w-full bg-muted/30 rounded-md flex items-center justify-center">
                    <div className="text-center">
                      <PieChart className="h-10 w-10 mx-auto text-primary/50" />
                      <p className="text-muted-foreground mt-2">Compliance Chart</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover-card h-[350px]">
                <CardHeader>
                  <CardTitle className="text-lg">Sustainability Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 w-full bg-muted/30 rounded-md flex items-center justify-center">
                    <div className="text-center">
                      <LineChart className="h-10 w-10 mx-auto text-primary/50" />
                      <p className="text-muted-foreground mt-2">Sustainability Chart</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover-card col-span-full">
                <CardHeader>
                  <CardTitle className="text-lg">Key Performance Indicators</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 border rounded-md bg-muted/10">
                      <p className="text-sm text-muted-foreground">Average Traceability Time</p>
                      <p className="text-2xl font-semibold mt-1">2.4 hours</p>
                      <p className="text-xs text-geo-success mt-1">↓ 12% from last month</p>
                    </div>
                    <div className="p-4 border rounded-md bg-muted/10">
                      <p className="text-sm text-muted-foreground">Compliance Rate</p>
                      <p className="text-2xl font-semibold mt-1">86%</p>
                      <p className="text-xs text-geo-success mt-1">↑ 4% from last month</p>
                    </div>
                    <div className="p-4 border rounded-md bg-muted/10">
                      <p className="text-sm text-muted-foreground">Carbon Footprint</p>
                      <p className="text-2xl font-semibold mt-1">32 kg CO₂e</p>
                      <p className="text-xs text-geo-success mt-1">↓ 8% from last month</p>
                    </div>
                    <div className="p-4 border rounded-md bg-muted/10">
                      <p className="text-sm text-muted-foreground">Supply Chain Visibility</p>
                      <p className="text-2xl font-semibold mt-1">78%</p>
                      <p className="text-xs text-geo-success mt-1">↑ 6% from last month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="compliance">
            <div className="border rounded-lg p-6 text-center space-y-4">
              <h2 className="text-xl font-semibold">Compliance Analytics</h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Detailed reports on FSMA, EUDR, and other regulatory compliance metrics.
              </p>
              <Button className="mx-auto">View Compliance Dashboard</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="sustainability">
            <div className="border rounded-lg p-6 text-center space-y-4">
              <h2 className="text-xl font-semibold">Sustainability Analytics</h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Environmental impact, carbon footprint, and water usage across your supply chain.
              </p>
              <Button className="mx-auto">View Sustainability Dashboard</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="traceability">
            <div className="border rounded-lg p-6 text-center space-y-4">
              <h2 className="text-xl font-semibold">Traceability Analytics</h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Analyze product journey times, traceability completeness, and consumer engagement.
              </p>
              <Button className="mx-auto">View Traceability Dashboard</Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AnalyticsPage;
