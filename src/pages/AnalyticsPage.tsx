
import { useState } from 'react';
import { BarChart, LineChart, PieChart, TrendingUp, Download, FileSpreadsheet, CheckCircle, AlertTriangle } from 'lucide-react';
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
import { EmissionsByBatchChart } from '@/components/analytics/EmissionsByBatchChart';
import { SupplierPerformanceTable } from '@/components/analytics/SupplierPerformanceTable';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import {
  Bar,
  BarChart as RechartsBarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart
} from "recharts";

const AnalyticsPage = () => {
  const [timePeriod, setTimePeriod] = useState('last30');

  // Compliance trend data
  const complianceTrendData = [
    { month: 'Sep', fsma: 78, eudr: 65, gs1: 82 },
    { month: 'Oct', fsma: 82, eudr: 68, gs1: 87 },
    { month: 'Nov', fsma: 86, eudr: 75, gs1: 90 },
    { month: 'Dec', fsma: 89, eudr: 79, gs1: 95 },
    { month: 'Jan', fsma: 92, eudr: 82, gs1: 98 },
    { month: 'Feb', fsma: 95, eudr: 85, gs1: 100 },
  ];

  // Sustainability metrics data
  const sustainabilityMetricsData = [
    { quarter: 'Q1', carbon: 45, water: 38, waste: 28 },
    { quarter: 'Q2', carbon: 42, water: 36, waste: 25 },
    { quarter: 'Q3', carbon: 38, water: 34, waste: 22 },
    { quarter: 'Q4', carbon: 35, water: 32, waste: 20 },
  ];

  // Chart configurations
  const complianceChartConfig = {
    fsma: { label: "FSMA", theme: { light: "#4f46e5", dark: "#818cf8" } },
    eudr: { label: "EUDR", theme: { light: "#0ea5e9", dark: "#38bdf8" } },
    gs1: { label: "GS1", theme: { light: "#10b981", dark: "#34d399" } },
  };

  const sustainabilityChartConfig = {
    carbon: { label: "Carbon Footprint", theme: { light: "#f59e0b", dark: "#fbbf24" } },
    water: { label: "Water Usage", theme: { light: "#0ea5e9", dark: "#38bdf8" } },
    waste: { label: "Waste Reduction", theme: { light: "#10b981", dark: "#34d399" } },
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Analytics & Reports</h1>
          <div className="flex items-center space-x-2">
            <Select 
              defaultValue={timePeriod} 
              onValueChange={setTimePeriod}
            >
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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
                  
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <Card className="flex-1">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Emissions By Product Category</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ChartContainer 
                          config={sustainabilityChartConfig} 
                          className="aspect-auto h-[180px]"
                        >
                          <RechartsBarChart data={[
                            { category: "Fruits", value: 35 },
                            { category: "Vegetables", value: 28 },
                            { category: "Grains", value: 42 },
                            { category: "Dairy", value: 58 },
                            { category: "Coffee", value: 45 }
                          ]}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="category" />
                            <YAxis />
                            <ChartTooltip
                              content={<ChartTooltipContent />}
                            />
                            <Bar dataKey="value" name="carbon" />
                          </RechartsBarChart>
                        </ChartContainer>
                      </CardContent>
                    </Card>
                    
                    <Card className="flex-1">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Compliance Trend</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ChartContainer 
                          config={complianceChartConfig} 
                          className="aspect-auto h-[180px]"
                        >
                          <RechartsLineChart data={complianceTrendData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <ChartTooltip
                              content={<ChartTooltipContent />}
                            />
                            <ChartLegend content={<ChartLegendContent />} />
                            <Line type="monotone" dataKey="fsma" stroke="#4f46e5" />
                            <Line type="monotone" dataKey="eudr" stroke="#0ea5e9" />
                            <Line type="monotone" dataKey="gs1" stroke="#10b981" />
                          </RechartsLineChart>
                        </ChartContainer>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
              
              <EmissionsByBatchChart />
              <SupplierPerformanceTable />
              
            </div>
          </TabsContent>
          
          <TabsContent value="compliance">
            <div className="grid grid-cols-1 gap-6">
              <Card className="hover-card">
                <CardHeader>
                  <CardTitle className="text-lg">Compliance Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer 
                    config={complianceChartConfig} 
                    className="aspect-[2/1] h-[350px]"
                  >
                    <RechartsLineChart data={complianceTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip
                        content={<ChartTooltipContent />}
                      />
                      <ChartLegend content={<ChartLegendContent />} />
                      <Line type="monotone" dataKey="fsma" stroke="#4f46e5" />
                      <Line type="monotone" dataKey="eudr" stroke="#0ea5e9" />
                      <Line type="monotone" dataKey="gs1" stroke="#10b981" />
                    </RechartsLineChart>
                  </ChartContainer>
                  
                  <div className="mt-4 p-4 border rounded-md bg-muted/10">
                    <h3 className="text-sm font-medium mb-2">Compliance Insights</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-geo-success mt-0.5 mr-2" />
                        <span>FSMA compliance has increased by 17% over the last 6 months, exceeding industry average by 12%</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-geo-success mt-0.5 mr-2" />
                        <span>Documentation completeness score has improved from 78% to 94% since implementing automated validation</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="h-4 w-4 text-geo-warning mt-0.5 mr-2" />
                        <span>EUDR requirements show steady improvement but require attention to reach target compliance level of 90%</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="hover-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Compliance by Region</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 w-full bg-muted/30 rounded-md flex items-center justify-center">
                      <div className="text-center">
                        <PieChart className="h-10 w-10 mx-auto text-primary/50" />
                        <p className="text-muted-foreground mt-2">Regional Compliance Chart</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button className="w-full" variant="outline">View Detailed Report</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="hover-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Documentation Audit Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 w-full bg-muted/30 rounded-md flex items-center justify-center">
                      <div className="text-center">
                        <FileSpreadsheet className="h-10 w-10 mx-auto text-primary/50" />
                        <p className="text-muted-foreground mt-2">Documentation Audit Chart</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button className="w-full" variant="outline">View Documentation</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="sustainability">
            <div className="grid grid-cols-1 gap-6">
              <Card className="hover-card">
                <CardHeader>
                  <CardTitle className="text-lg">Sustainability Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer 
                    config={sustainabilityChartConfig} 
                    className="aspect-[2/1] h-[350px]"
                  >
                    <RechartsBarChart data={sustainabilityMetricsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="quarter" />
                      <YAxis />
                      <ChartTooltip
                        content={<ChartTooltipContent />}
                      />
                      <ChartLegend content={<ChartLegendContent />} />
                      <Bar dataKey="carbon" fill="#f59e0b" />
                      <Bar dataKey="water" fill="#0ea5e9" />
                      <Bar dataKey="waste" fill="#10b981" />
                    </RechartsBarChart>
                  </ChartContainer>
                  
                  <div className="mt-4 p-4 border rounded-md bg-muted/10">
                    <h3 className="text-sm font-medium mb-2">Sustainability Insights</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-geo-success mt-0.5 mr-2" />
                        <span>Carbon footprint reduced by 22% year-over-year, based on data from Global Carbon Project</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-geo-success mt-0.5 mr-2" />
                        <span>Water usage efficiency improved by 16% following implementation of new conservation methods</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-geo-success mt-0.5 mr-2" />
                        <span>Waste reduction initiatives have decreased overall waste by 29% compared to benchmark</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="traceability">
            <div className="grid grid-cols-1 gap-6">
              <Card className="hover-card">
                <CardHeader>
                  <CardTitle className="text-lg">Traceability Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full bg-muted/30 rounded-md flex items-center justify-center">
                    <div className="text-center">
                      <BarChart className="h-12 w-12 mx-auto text-primary/50" />
                      <p className="text-muted-foreground mt-2">Traceability Performance Chart</p>
                      <p className="text-xs text-muted-foreground">Track traceability metrics across the supply chain</p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button className="w-full">View Traceability Dashboard</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AnalyticsPage;
