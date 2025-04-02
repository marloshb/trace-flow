
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SupplyChainTimeline } from '@/components/dashboard/SupplyChainTimeline';
import { Badge } from '@/components/ui/badge';
import { Package, Search, MapPin, Leaf, BarChart2, ShieldCheck, Shield, Info } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { TraceabilityMap } from '@/components/traceability/TraceabilityMap';
import { OrganicCertification } from '@/components/traceability/OrganicCertification';

const ConsumerPortalPage = () => {
  const [productId, setProductId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
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

  // Sample example product data to demonstrate GS1 EPCIS integration
  const exampleProducts = {
    'TOM-2025-001': {
      name: 'Organic Tomatoes',
      brand: 'FreshFarm',
      batchNumber: 'TOM-2025-001',
      origin: 'Ohio, USA',
      certifications: ['USDA Organic'],
      sustainabilityScore: 85,
      co2Emissions: 30,
      waterUsage: 45,
      timeline: [
        {
          id: 'farm',
          title: 'Farming',
          status: 'completed' as const,
          node: 'farmer' as const,
          date: '2025-03-10',
          location: 'Greene County, Ohio',
          description: 'Tomatoes grown using organic practices.',
          sustainability: {
            co2Emissions: 0.1,
            certifications: ['USDA Organic'],
          },
        },
        {
          id: 'processing',
          title: 'Processing & Packaging',
          status: 'completed' as const,
          node: 'processor' as const,
          date: '2025-03-15',
          location: 'Columbus, Ohio',
          description: 'Tomatoes washed, sorted and packaged.',
          sustainability: {
            co2Emissions: 0.2,
            certifications: [],
          },
        },
        {
          id: 'distribution',
          title: 'Distribution',
          status: 'completed' as const,
          node: 'distributor' as const,
          date: '2025-03-20',
          location: 'Midwest Distribution Center',
          description: 'Transported to regional supermarkets.',
          sustainability: {
            co2Emissions: 0.3,
            certifications: [],
          },
        },
        {
          id: 'retail',
          title: 'Retail',
          status: 'current' as const,
          node: 'manufacturer' as const,
          date: '2025-03-25',
          location: 'Supermarket Chain',
          description: 'Available for purchase at your local store.',
          sustainability: {
            co2Emissions: 0.1,
            certifications: [],
          },
        },
        {
          id: 'consumer',
          title: 'Consumer',
          status: 'upcoming' as const,
          node: 'consumer' as const,
          description: 'Enjoy your fresh, sustainably grown tomatoes!',
        },
      ]
    },
    'EB12345': {
      name: 'Organic Coffee Beans',
      brand: 'EcoBean',
      batchNumber: 'EB12345',
      origin: 'Ethiopia',
      certifications: ['Fair Trade', 'Organic'],
      sustainabilityScore: 92,
      co2Emissions: 45,
      waterUsage: 60,
      timeline: timelineSteps
    }
  };

  const handleSearch = () => {
    if (productId.trim() === '') {
      toast({
        title: 'Error',
        description: 'Please enter a valid product ID.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call with timeout
    setTimeout(() => {
      const foundProduct = exampleProducts[productId as keyof typeof exampleProducts];
      
      if (foundProduct) {
        setProductDetails(foundProduct);
        setIsSearched(true);
        toast({
          title: 'Product Found',
          description: `Successfully retrieved data for ${foundProduct.name}`,
        });
      } else {
        toast({
          title: 'Product Not Found',
          description: 'No data available for this product ID.',
          variant: 'destructive',
        });
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const totalEmissions = productDetails.timeline?.reduce((total, step) => {
    return total + (step.sustainability?.co2Emissions || 0);
  }, 0) || 0;

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
              placeholder="Enter Product ID (try 'TOM-2025-001' or 'EB12345')"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            />
            <Button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? (
                <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2" />
              ) : (
                <Search className="mr-2 h-4 w-4" />
              )}
              {isLoading ? 'Searching...' : 'Search'}
            </Button>
          </div>
          <Separator />
          <Tabs defaultValue="details" className="w-full">
            <TabsList>
              <TabsTrigger value="details">Product Details</TabsTrigger>
              <TabsTrigger value="traceability">Traceability</TabsTrigger>
              <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
              <TabsTrigger value="certification">Certification</TabsTrigger>
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
              
              {isSearched && (
                <div className="mt-4 p-3 bg-muted/40 rounded-lg">
                  <div className="flex items-start">
                    <Info className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">GS1 EPCIS Integration</p>
                      <p className="text-xs text-muted-foreground">
                        This product has complete traceability data verified through GS1 EPCIS standards.
                        All supply chain events are recorded and verified.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>
            <TabsContent value="traceability">
              <div className="mb-4">
                <TraceabilityMap 
                  productId={productDetails.batchNumber}
                  originLocation={productDetails.timeline?.[0]?.location || ''}
                  currentLocation={productDetails.timeline?.find(step => step.status === 'current')?.location || ''}
                />
              </div>
              <SupplyChainTimeline 
                steps={productDetails.timeline || timelineSteps} 
                variant="consumer" 
              />
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
                    CO2 Emissions: {productDetails.co2Emissions || 0.8} kg
                  </p>
                  <p className="text-muted-foreground">
                    Water Usage: {productDetails.waterUsage || 15} liters
                  </p>
                </div>
              </div>
              
              <div className="mt-4 bg-muted/30 p-4 rounded-lg">
                <h4 className="text-md font-medium mb-2">Emissions Breakdown</h4>
                <div className="space-y-2">
                  {productDetails.timeline?.filter(step => step.sustainability?.co2Emissions)?.map((step, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-sm">{step.title}</span>
                      <div className="flex items-center">
                        <div 
                          className="h-2 bg-primary/60 rounded-full mr-2" 
                          style={{ 
                            width: `${Math.round((step.sustainability?.co2Emissions || 0) / totalEmissions * 100)}px`,
                            minWidth: '20px'
                          }}
                        ></div>
                        <span className="text-sm font-medium">{step.sustainability?.co2Emissions} kg</span>
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-sm font-medium">Total CO2</span>
                    <span className="text-sm font-bold">{totalEmissions.toFixed(2)} kg</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="certification">
              <OrganicCertification 
                productId={productDetails.batchNumber}
                certifications={productDetails.certifications}
                isUSDAOrganic={productDetails.certifications.includes('USDA Organic')}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4">
          <p className="text-xs text-muted-foreground">
            Powered by GeoTraceFlow
          </p>
          <Button variant="outline" size="sm">
            <Shield className="mr-2 h-4 w-4" />
            Verify Authenticity
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ConsumerPortalPage;
