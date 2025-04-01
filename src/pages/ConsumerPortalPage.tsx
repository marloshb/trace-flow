
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SupplyChainTimeline } from '@/components/dashboard/SupplyChainTimeline';
import { Badge } from '@/components/ui/badge';
import { Package, Search, MapPin, Leaf, BarChart2, ShieldCheck, Shield } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ConsumerPortalPage = () => {
  const [productId, setProductId] = useState('');
  const [productDetails, setProductDetails] = useState({
    name: 'Organic Coffee Beans',
    brand: 'EcoBean',
    batchNumber: 'EB12345',
    origin: 'Ethiopia',
    certifications: ['Fair Trade', 'Organic'],
    sustainabilityScore: 92,
  });

  // Updated timeline steps with properly typed status and node values
  const timelineSteps = [
    {
      id: 'farmer',
      title: 'Harvesting',
      status: 'completed' as const, // Explicitly type as literal
      node: 'farmer' as const, // Explicitly type as literal
      date: '2024-01-15',
      location: 'Yirgacheffe, Ethiopia',
      description: 'Coffee cherries are hand-picked at peak ripeness.',
      sustainability: {
        co2Emissions: 0.15,
        certifications: ['Fair Trade'],
      },
    },
    {
      id: 'processor',
      title: 'Processing',
      status: 'completed' as const,
      node: 'processor' as const, // Explicitly type as literal
      date: '2024-01-20',
      location: 'Washing Station, Yirgacheffe',
      description: 'Cherries are washed and sun-dried to preserve quality.',
      sustainability: {
        co2Emissions: 0.08,
        certifications: [],
      },
    },
    {
      id: 'distributor',
      title: 'Distribution',
      status: 'completed' as const,
      node: 'distributor' as const, // Explicitly type as literal
      date: '2024-02-01',
      location: 'Addis Ababa to Port of Djibouti',
      description: 'Beans are transported via land to the port for shipping.',
      sustainability: {
        co2Emissions: 0.32,
        certifications: [],
      },
    },
    {
      id: 'manufacturer',
      title: 'Roasting & Packaging',
      status: 'current' as const,
      node: 'manufacturer' as const, // Explicitly type as literal
      date: '2024-02-15',
      location: 'Seattle, WA',
      description: 'Beans are expertly roasted and packaged for retail.',
      sustainability: {
        co2Emissions: 0.25,
        certifications: ['Organic'],
      },
    },
    {
      id: 'consumer',
      title: 'Enjoy Your Coffee',
      status: 'upcoming' as const,
      node: 'consumer' as const, // Explicitly type as literal
      description: 'Brew and enjoy your sustainable, ethically sourced coffee!',
    },
  ];

  const handleSearch = () => {
    if (productId.trim() === '') {
      toast({
        title: 'Error',
        description: 'Please enter a valid product ID.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Success',
      description: `Searching for product ID: ${productId}`,
    });
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Consumer Portal</CardTitle>
          <CardDescription>
            Trace the journey of your product from origin to your hands.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              placeholder="Enter Product ID"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            />
            <Button onClick={handleSearch}>
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
          <Separator />
          <Tabs defaultValue="details" className="w-full">
            <TabsList>
              <TabsTrigger value="details">Product Details</TabsTrigger>
              <TabsTrigger value="traceability">Traceability</TabsTrigger>
              <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-lg font-semibold">
                    {productDetails.name}
                  </h4>
                  <p className="text-muted-foreground">
                    Brand: {productDetails.brand}
                  </p>
                  <p className="text-muted-foreground">
                    Batch Number: {productDetails.batchNumber}
                  </p>
                </div>
                <div>
                  <p>
                    <MapPin className="mr-2 inline-block h-4 w-4" />
                    Origin: {productDetails.origin}
                  </p>
                  <div className="flex items-center mt-2">
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    Certifications:{' '}
                    {productDetails.certifications.map((cert, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="ml-1.5 rounded-full"
                      >
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="traceability">
              <SupplyChainTimeline steps={timelineSteps} variant="consumer" />
            </TabsContent>
            <TabsContent value="sustainability" className="space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-lg font-semibold flex items-center">
                    <Leaf className="mr-2 h-5 w-5" />
                    Sustainability Score
                  </h4>
                  <p className="text-4xl font-bold">
                    {productDetails.sustainabilityScore}
                  </p>
                  <p className="text-muted-foreground">
                    Based on environmental impact and ethical sourcing.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold flex items-center">
                    <BarChart2 className="mr-2 h-5 w-5" />
                    Impact Metrics
                  </h4>
                  <p className="text-muted-foreground">
                    CO2 Emissions: 0.8 kg
                  </p>
                  <p className="text-muted-foreground">
                    Water Usage: 15 liters
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConsumerPortalPage;
