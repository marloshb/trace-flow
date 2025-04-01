
import { useState } from 'react';
import { Search, QrCode, Leaf, BarChart3, ArrowRight, Info, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { GeoMap } from '@/components/dashboard/GeoMap';
import { SupplyChainTimeline } from '@/components/dashboard/SupplyChainTimeline';
import { ProductTraceability } from '@/components/dashboard/ProductTraceability';
import { useToast } from '@/hooks/use-toast';

const ConsumerPortalPage = () => {
  const [productId, setProductId] = useState('');
  const [searchedId, setSearchedId] = useState<string | null>(null);
  const { toast } = useToast();

  // Mock product data
  const mockProductData = {
    id: 'TOM-2025-001',
    name: 'Organic Tomatoes',
    image: '/placeholder.svg',
    traceabilityScore: 92,
    certifications: ['USDA Organic', 'Non-GMO', 'Fair Trade'],
    origin: {
      country: 'USA',
      region: 'Ohio'
    },
    sustainability: {
      co2Emissions: 30,
      waterUsage: 120,
      organicCertified: true
    },
    timelineSteps: [
      {
        id: '1',
        title: 'Farm Harvesting',
        status: 'completed' as const,
        node: 'farmer' as const,
        date: 'March 10, 2025',
        location: 'Green Fields Farm, Ohio',
        description: 'Harvested using sustainable farming methods',
        sustainability: {
          co2Emissions: 5,
          certifications: ['USDA Organic']
        }
      },
      {
        id: '2',
        title: 'Processing',
        status: 'completed' as const,
        node: 'processor' as const,
        date: 'March 12, 2025',
        location: 'CleanFood Processing, Ohio',
        description: 'Washed and sorted using minimal water',
        sustainability: {
          co2Emissions: 8,
          certifications: ['ISO 22000']
        }
      },
      {
        id: '3',
        title: 'Distribution',
        status: 'completed' as const,
        node: 'distributor' as const,
        date: 'March 15, 2025',
        location: 'Regional Distribution Center',
        description: 'Electric truck fleet used for transportation',
        sustainability: {
          co2Emissions: 12,
          certifications: ['Green Transport']
        }
      },
      {
        id: '4',
        title: 'Retail Arrival',
        status: 'current' as const,
        node: 'manufacturer' as const,
        date: 'March 17, 2025',
        location: 'FreshMart Store',
        description: 'Available in the organic produce section',
        sustainability: {
          co2Emissions: 5
        }
      },
      {
        id: '5',
        title: 'Consumer Purchase',
        status: 'upcoming' as const,
        node: 'consumer' as const,
        description: 'Ready for your shopping cart'
      }
    ],
    mapMarkers: [
      { id: 'farm', lat: 40.4173, lng: -82.9071, type: 'farmer' as const, name: 'Green Fields Farm' },
      { id: 'processing', lat: 40.3403, lng: -83.2079, type: 'processor' as const, name: 'CleanFood Processing' },
      { id: 'distribution', lat: 39.9623, lng: -83.0007, type: 'distributor' as const, name: 'Distribution Center' },
      { id: 'retail', lat: 39.8106, lng: -82.9168, type: 'consumer' as const, name: 'FreshMart Store' }
    ]
  };

  const handleSearch = () => {
    if (!productId.trim()) {
      toast({
        title: "Please enter a product ID",
        description: "Enter a valid product ID to trace its origin",
        variant: "destructive"
      });
      return;
    }

    // In a real app, you would fetch data from an API here
    // For this demo, we'll just check if the ID matches our mock data
    if (productId === mockProductData.id) {
      setSearchedId(productId);
      toast({
        title: "Product found",
        description: "Traceability information is now available",
      });
    } else {
      setSearchedId(null);
      toast({
        title: "Product not found",
        description: "Try using the sample ID: TOM-2025-001",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto py-6 px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold flex items-center">
                <Globe className="mr-2 h-6 w-6" />
                GeoTraceFlow Consumer Portal
              </h1>
              <p className="text-primary-foreground/80 mt-1">
                Trace the journey of your products from farm to table
              </p>
            </div>
            <div className="flex w-full md:w-auto space-x-2">
              <Input
                placeholder="Enter Product ID (e.g., TOM-2025-001)"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="max-w-[300px] bg-primary-foreground text-primary"
              />
              <Button 
                variant="secondary" 
                onClick={handleSearch}
                className="whitespace-nowrap"
              >
                <Search className="h-4 w-4 mr-2" />
                Trace Product
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-6 px-4">
        {!searchedId ? (
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-2 max-w-2xl mx-auto py-12">
                  <QrCode className="h-16 w-16 mx-auto mb-4 text-primary" />
                  <h2 className="text-2xl font-bold">Trace Your Product's Journey</h2>
                  <p className="text-muted-foreground mb-6">
                    Enter a product ID or scan the QR code on your product to discover its complete supply chain history, 
                    sustainability metrics, and certifications.
                  </p>
                  <div className="bg-muted p-3 rounded-md inline-block">
                    <p className="text-sm font-medium">Try our sample product ID:</p>
                    <code className="font-mono bg-muted-foreground/10 px-2 py-1 rounded">TOM-2025-001</code>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl font-semibold">Trace</CardTitle>
                  <Search className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Discover the complete journey of your product from its source to your hands.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl font-semibold">Verify</CardTitle>
                  <Leaf className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Confirm authenticity, certifications, and sustainability data with blockchain verification.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl font-semibold">Learn</CardTitle>
                  <Info className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Understand the environmental impact and ethical considerations of your purchase.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Product Traceability</h2>
              <Button variant="outline" onClick={() => setSearchedId(null)}>
                Search New Product
              </Button>
            </div>

            <Tabs defaultValue="overview">
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="journey">Supply Chain Journey</TabsTrigger>
                <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
                <TabsTrigger value="map">Origin Map</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ProductTraceability 
                    productId={mockProductData.id}
                    productName={mockProductData.name}
                    productImage={mockProductData.image}
                    traceabilityScore={mockProductData.traceabilityScore}
                    certifications={mockProductData.certifications}
                    origin={mockProductData.origin}
                    sustainability={mockProductData.sustainability}
                    variant="consumer"
                  />

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Blockchain Verification</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="p-4 border rounded-md mb-4 bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-900/50">
                        <div className="flex items-center space-x-2">
                          <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                            <Leaf className="h-4 w-4 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <h3 className="font-medium">Verified Authentic</h3>
                            <p className="text-sm text-muted-foreground">Product data verified on blockchain</p>
                          </div>
                        </div>
                      </div>

                      <h3 className="font-medium mb-2">USDA Organic Certification</h3>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Certificate Number</span>
                          <span>USDA-ORG-2025-11462</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Issuing Body</span>
                          <span>USDA Organic Program</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Valid Until</span>
                          <span>December 31, 2025</span>
                        </div>
                      </div>

                      <Separator className="my-4" />

                      <h3 className="font-medium mb-2">GS1 EPCIS Data</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">GS1 GTIN</span>
                          <span>00859623485920</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Batch/Lot</span>
                          <span>LOT-2025-0358</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Production Date</span>
                          <span>March 12, 2025</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                      <Button variant="outline" size="sm" className="w-full">
                        Verify on Public Registry
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="journey">
                <SupplyChainTimeline 
                  steps={mockProductData.timelineSteps} 
                  variant="consumer"
                />
              </TabsContent>

              <TabsContent value="sustainability">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Environmental Impact</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-muted p-4 rounded-lg text-center">
                          <h3 className="text-3xl font-bold text-green-600">{mockProductData.sustainability.co2Emissions}kg</h3>
                          <p className="text-sm text-muted-foreground">CO₂ Emissions</p>
                        </div>
                        <div className="bg-muted p-4 rounded-lg text-center">
                          <h3 className="text-3xl font-bold text-blue-600">{mockProductData.sustainability.waterUsage}L</h3>
                          <p className="text-sm text-muted-foreground">Water Usage</p>
                        </div>
                      </div>

                      <h3 className="font-medium mb-3">Emission Breakdown</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Farming</span>
                            <span className="text-sm font-medium">5kg (17%)</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: '17%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Processing</span>
                            <span className="text-sm font-medium">8kg (26%)</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: '26%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Transportation</span>
                            <span className="text-sm font-medium">12kg (40%)</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-amber-500 rounded-full" style={{ width: '40%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Retail</span>
                            <span className="text-sm font-medium">5kg (17%)</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-purple-500 rounded-full" style={{ width: '17%' }}></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Certifications & Standards</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-3 border rounded-md bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800/50">
                          <div className="flex items-start space-x-3">
                            <div className="mt-0.5">
                              <Leaf className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <h3 className="font-medium">USDA Organic</h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                This product meets all USDA Organic certification requirements. 
                                No synthetic pesticides or fertilizers were used in production.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="p-3 border rounded-md">
                          <div className="flex items-start space-x-3">
                            <div className="mt-0.5">
                              <Shield className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-medium">Non-GMO Project Verified</h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                This product contains no genetically modified organisms and 
                                has been verified by the Non-GMO Project.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="p-3 border rounded-md">
                          <div className="flex items-start space-x-3">
                            <div className="mt-0.5">
                              <Globe className="h-5 w-5 text-amber-600" />
                            </div>
                            <div>
                              <h3 className="font-medium">Fair Trade Certified</h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                Producers received fair compensation and worked under safe 
                                conditions with environmental protections in place.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="map">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Product Origin & Journey Map</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-0">
                    <div className="h-[400px] relative bg-muted rounded-md overflow-hidden">
                      <GeoMap markers={mockProductData.mapMarkers} />
                    </div>
                  </CardContent>
                  <CardFooter className="border-t mt-6 pt-4">
                    <div className="w-full">
                      <h3 className="text-sm font-medium mb-2">Key Locations:</h3>
                      <div className="flex flex-wrap gap-2">
                        {mockProductData.mapMarkers.map((marker) => (
                          <Badge key={marker.id} variant="outline" className="bg-muted/50">
                            {marker.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>

      <footer className="bg-muted mt-12 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              © 2025 GeoTraceFlow — End-to-End Supply Chain Traceability
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm">About</Button>
              <Button variant="ghost" size="sm">Privacy Policy</Button>
              <Button variant="ghost" size="sm">Terms of Service</Button>
              <Button variant="ghost" size="sm">Contact</Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ConsumerPortalPage;
