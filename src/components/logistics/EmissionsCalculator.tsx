
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Calculator, BarChart, Download } from 'lucide-react';

export function EmissionsCalculator() {
  const [distance, setDistance] = useState(1000);
  const [transportType, setTransportType] = useState('truck');
  const [cargoWeight, setCargoWeight] = useState(10);
  const [fuelEfficiency, setFuelEfficiency] = useState([50]); // Percentage of average efficiency
  const [calculated, setCalculated] = useState(false);
  
  const calculateEmissions = () => {
    // This would contain the actual emission calculation logic in a real implementation
    setCalculated(true);
  };
  
  // Base emissions factors by transport type (CO2 kg per tonne-km)
  const emissionFactors = {
    truck: 0.135,
    ship: 0.022,
    rail: 0.028,
    air: 1.1,
  };
  
  // Calculate mock emissions based on the inputs
  const estimatedEmissions = calculated ? 
    Math.round(distance * (cargoWeight / 1000) * emissionFactors[transportType as keyof typeof emissionFactors] * 
    (100 / fuelEfficiency[0])) : 0;
  
  // Calculate emission reduction percentage based on the fuel efficiency slider
  const emissionReduction = Math.round(100 - fuelEfficiency[0]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="space-y-6 lg:col-span-1">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="distance">Distance (km)</Label>
            <Input 
              id="distance"
              type="number" 
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              min={1}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="transport-type">Transport Type</Label>
            <Select value={transportType} onValueChange={setTransportType}>
              <SelectTrigger id="transport-type">
                <SelectValue placeholder="Select transport type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="truck">Truck</SelectItem>
                <SelectItem value="ship">Ship</SelectItem>
                <SelectItem value="rail">Rail</SelectItem>
                <SelectItem value="air">Air Freight</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cargo-weight">Cargo Weight (tonnes)</Label>
            <Input 
              id="cargo-weight"
              type="number" 
              value={cargoWeight}
              onChange={(e) => setCargoWeight(Number(e.target.value))}
              min={0.1}
              step={0.1}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Fuel Efficiency</Label>
              <span className="text-sm text-muted-foreground">{fuelEfficiency[0]}%</span>
            </div>
            <Slider 
              defaultValue={[50]} 
              max={100} 
              step={1}
              value={fuelEfficiency}
              onValueChange={setFuelEfficiency}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Less Efficient</span>
              <span>More Efficient</span>
            </div>
          </div>
        </div>
        
        <Button onClick={calculateEmissions} className="w-full">
          <Calculator className="h-4 w-4 mr-2" />
          Calculate Emissions
        </Button>
      </div>
      
      <div className="lg:col-span-2">
        {calculated ? (
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 text-center">
                  <h3 className="text-lg font-medium">Estimated CO2 Emissions</h3>
                  <p className="text-4xl font-bold mt-2 text-primary">{estimatedEmissions} kg CO2</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Equivalent to {Math.round(estimatedEmissions / 2.3)} trees needed to offset
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div>
                    <p className="text-sm font-medium">Transport Type</p>
                    <p className="text-sm text-muted-foreground capitalize">{transportType}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Distance</p>
                    <p className="text-sm text-muted-foreground">{distance} km</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Cargo Weight</p>
                    <p className="text-sm text-muted-foreground">{cargoWeight} tonnes</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Efficiency</p>
                    <p className="text-sm text-muted-foreground">{fuelEfficiency[0]}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Emission Reduction Potential</h3>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Current Efficiency Level</span>
                    <span className="text-sm font-semibold">{fuelEfficiency[0]}%</span>
                  </div>
                  <Progress value={fuelEfficiency[0]} className="h-2 mb-4" />
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    Increasing efficiency to 100% could reduce emissions by {emissionReduction}%, 
                    saving approximately {Math.round(estimatedEmissions * (emissionReduction / 100))} kg CO2.
                  </p>
                  
                  <div className="flex gap-4">
                    <Button variant="outline" className="flex-1">
                      <BarChart className="h-4 w-4 mr-2" />
                      View Detailed Report
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Export Data
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-center p-6 border rounded-lg">
            <div>
              <h3 className="text-lg font-medium mb-2">Carbon Emissions Calculator</h3>
              <p className="text-muted-foreground mb-4">
                Enter your logistics details to calculate the carbon footprint of your supply chain operations.
              </p>
              <p className="text-sm text-muted-foreground">
                Results will appear here after you complete the calculation.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
