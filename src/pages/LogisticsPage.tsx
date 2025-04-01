
import React, { useState } from 'react';
import { Truck, Route, BarChart3, Leaf, Map } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { SupplyChainMap } from '@/components/logistics/SupplyChainMap';
import { RouteOptimizer } from '@/components/logistics/RouteOptimizer';
import { LogisticsMetricsChart } from '@/components/logistics/LogisticsMetricsChart';
import { EmissionsCalculator } from '@/components/logistics/EmissionsCalculator';

const LogisticsPage = () => {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Logistics Optimization</h1>
          <Button className="flex items-center gap-2">
            <Route className="h-4 w-4" />
            Optimize New Route
          </Button>
        </div>
        
        <Tabs defaultValue="map" className="mb-6">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="map" className="flex items-center gap-2">
              <Map className="h-4 w-4" />
              <span className="hidden sm:inline">Supply Chain Map</span>
            </TabsTrigger>
            <TabsTrigger value="routes" className="flex items-center gap-2">
              <Route className="h-4 w-4" />
              <span className="hidden sm:inline">Route Optimization</span>
            </TabsTrigger>
            <TabsTrigger value="metrics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Logistics Metrics</span>
            </TabsTrigger>
            <TabsTrigger value="emissions" className="flex items-center gap-2">
              <Leaf className="h-4 w-4" />
              <span className="hidden sm:inline">Carbon Emissions</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="map">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Supply Chain Geospatial View</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <SupplyChainMap height={500} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="routes">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle>Route Optimizer</CardTitle>
                </CardHeader>
                <CardContent>
                  <RouteOptimizer onRouteSelected={setSelectedRoute} />
                </CardContent>
              </Card>
              
              <Card className="lg:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle>Optimized Route Map</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <SupplyChainMap height={400} selectedRoute={selectedRoute} />
                </CardContent>
                <CardFooter className="bg-muted/20 px-6 py-4">
                  <div className="w-full">
                    <div className="grid grid-cols-4 gap-4 text-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Distance</p>
                        <p className="font-medium">1,456 km</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Est. Time</p>
                        <p className="font-medium">36 hours</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">CO2</p>
                        <p className="font-medium">325 kg</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Fuel</p>
                        <p className="font-medium">128 L</p>
                      </div>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="metrics">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle>Logistics Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <LogisticsMetricsChart />
                </CardContent>
              </Card>
              
              <Card className="lg:col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle>Key Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">On-Time Delivery</span>
                        <span className="text-sm font-semibold">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Route Efficiency</span>
                        <span className="text-sm font-semibold">78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Cost Optimization</span>
                        <span className="text-sm font-semibold">84%</span>
                      </div>
                      <Progress value={84} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Fleet Utilization</span>
                        <span className="text-sm font-semibold">65%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-sm font-medium mb-2">Year-to-Date Savings</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-100">
                        $127,500
                      </Badge>
                      <span className="text-xs text-green-600 dark:text-green-400">↑ 12.4% vs Last Year</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="emissions">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Carbon Emissions Calculator</CardTitle>
              </CardHeader>
              <CardContent>
                <EmissionsCalculator />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default LogisticsPage;
