
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Route, RotateCcw, Truck, Leaf } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface RouteOptimizerProps {
  onRouteSelected: (routeId: string | null) => void;
}

export function RouteOptimizer({ onRouteSelected }: RouteOptimizerProps) {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [optimizationCriteria, setOptimizationCriteria] = useState('time');
  
  const handleOptimizeRoute = () => {
    if (!origin || !destination) {
      toast({
        title: "Missing Information",
        description: "Please select both origin and destination points.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real implementation, this would call an API to calculate the optimized route
    toast({
      title: "Route Optimized",
      description: `Route from ${origin} to ${destination} has been optimized for ${optimizationCriteria}.`
    });
    
    // Select the optimized route
    onRouteSelected('route-1');
  };
  
  const handleCompareRoutes = () => {
    if (!origin || !destination) {
      toast({
        title: "Missing Information",
        description: "Please select both origin and destination points.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Routes Compared",
      description: "Original and optimized routes are now displayed on the map."
    });
    
    // In a real implementation, this would load and compare multiple routes
    onRouteSelected(null); // Show all routes
  };
  
  const handleReset = () => {
    setOrigin('');
    setDestination('');
    setOptimizationCriteria('time');
    onRouteSelected(null);
    
    toast({
      title: "Route Optimizer Reset",
      description: "All settings have been reset to default."
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="origin">Origin Point</Label>
          <Select value={origin} onValueChange={setOrigin}>
            <SelectTrigger id="origin">
              <SelectValue placeholder="Select origin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Coffee Farm">Coffee Farm (Brazil)</SelectItem>
              <SelectItem value="Processing Plant">Processing Plant (Brazil)</SelectItem>
              <SelectItem value="Rotterdam Port">Rotterdam Port (Netherlands)</SelectItem>
              <SelectItem value="Manufacturing">Manufacturing (Germany)</SelectItem>
              <SelectItem value="Retail Center">Retail Center (Germany)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="destination">Destination</Label>
          <Select value={destination} onValueChange={setDestination}>
            <SelectTrigger id="destination">
              <SelectValue placeholder="Select destination" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Coffee Farm">Coffee Farm (Brazil)</SelectItem>
              <SelectItem value="Processing Plant">Processing Plant (Brazil)</SelectItem>
              <SelectItem value="Rotterdam Port">Rotterdam Port (Netherlands)</SelectItem>
              <SelectItem value="Manufacturing">Manufacturing (Germany)</SelectItem>
              <SelectItem value="Retail Center">Retail Center (Germany)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Optimization Criteria</Label>
        <RadioGroup 
          value={optimizationCriteria} 
          onValueChange={setOptimizationCriteria}
          className="flex flex-col space-y-1"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="time" id="time" />
            <Label htmlFor="time" className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              <span>Fastest Route</span>
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="cost" id="cost" />
            <Label htmlFor="cost" className="flex items-center gap-2">
              <Route className="h-4 w-4" />
              <span>Lowest Cost</span>
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="emissions" id="emissions" />
            <Label htmlFor="emissions" className="flex items-center gap-2">
              <Leaf className="h-4 w-4" />
              <span>Lowest Emissions</span>
            </Label>
          </div>
        </RadioGroup>
      </div>
      
      <div className="flex flex-col gap-2">
        <Button onClick={handleOptimizeRoute} className="w-full">
          <Route className="h-4 w-4 mr-2" />
          Optimize Route
        </Button>
        <Button variant="outline" onClick={handleCompareRoutes} className="w-full">
          Compare Routes
        </Button>
        <Button variant="ghost" size="sm" onClick={handleReset} className="w-full">
          <RotateCcw className="h-3 w-3 mr-2" />
          Reset
        </Button>
      </div>
    </div>
  );
}
