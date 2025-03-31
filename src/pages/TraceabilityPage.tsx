
import { FilePenLine, QrCode, History, Leaf, ArrowRightLeft } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QRGenerator } from '@/components/traceability/QRGenerator';
import { SupplyChainTimeline } from '@/components/dashboard/SupplyChainTimeline';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const TraceabilityPage = () => {
  const [searchId, setSearchId] = useState('');
  
  // Mock data for supply chain timeline
  const timelineSteps = [
    {
      id: '1',
      title: 'Coffee Harvesting',
      status: 'completed' as const,
      node: 'farmer' as const,
      date: 'April 15, 2023',
      location: 'Campos, Brazil'
    },
    {
      id: '2',
      title: 'Processing & Roasting',
      status: 'completed' as const,
      node: 'processor' as const,
      date: 'May 2, 2023',
      location: 'São Paulo, Brazil'
    },
    {
      id: '3',
      title: 'International Shipping',
      status: 'current' as const,
      node: 'distributor' as const,
      date: 'May 10, 2023',
      location: 'En route to Rotterdam'
    },
    {
      id: '4',
      title: 'Product Manufacturing',
      status: 'upcoming' as const,
      node: 'manufacturer' as const,
      date: 'Expected: May 25, 2023',
      location: 'Hamburg, Germany'
    },
    {
      id: '5',
      title: 'Retail Distribution',
      status: 'upcoming' as const,
      node: 'consumer' as const,
      date: 'Expected: June 10, 2023',
      location: 'Multiple EU Countries'
    }
  ];
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Traceability</h1>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Search Product ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="max-w-[240px]"
            />
            <Button>Search</Button>
          </div>
        </div>
        
        <Tabs defaultValue="generate" className="mb-6">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="generate" className="flex items-center gap-2">
              <QrCode className="h-4 w-4" />
              <span className="hidden sm:inline">Generate</span>
            </TabsTrigger>
            <TabsTrigger value="record" className="flex items-center gap-2">
              <FilePenLine className="h-4 w-4" />
              <span className="hidden sm:inline">Record Events</span>
            </TabsTrigger>
            <TabsTrigger value="track" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              <span className="hidden sm:inline">Track & Trace</span>
            </TabsTrigger>
            <TabsTrigger value="sustainability" className="flex items-center gap-2">
              <Leaf className="h-4 w-4" />
              <span className="hidden sm:inline">Sustainability</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="generate" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Generate Traceability QR Code</h2>
                <p className="text-muted-foreground mb-4">
                  Create QR codes for your products to enable end-to-end traceability in your supply chain. 
                  Consumers can scan these codes to access detailed product information.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <ArrowRightLeft className="h-5 w-5 text-primary" />
                    <p className="text-sm">Enables two-way communication with consumers</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-primary" />
                    <p className="text-sm">Showcase your sustainability credentials</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <History className="h-5 w-5 text-primary" />
                    <p className="text-sm">Complete visibility of product journey</p>
                  </div>
                </div>
              </div>
              <QRGenerator productId="PRD-2023-0584" />
            </div>
          </TabsContent>
          <TabsContent value="record">
            <div className="border rounded-lg p-6 text-center space-y-4">
              <h2 className="text-xl font-semibold">Record Supply Chain Events</h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Document Critical Tracking Events (CTEs) and Key Data Elements (KDEs) for complete supply chain visibility.
              </p>
              <Button className="mx-auto">Record New Event</Button>
            </div>
          </TabsContent>
          <TabsContent value="track">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Track Product Journey</h2>
              <p className="text-muted-foreground">
                Visualize the complete supply chain journey of your products from farm to consumer.
              </p>
              <SupplyChainTimeline steps={timelineSteps} />
            </div>
          </TabsContent>
          <TabsContent value="sustainability">
            <div className="border rounded-lg p-6 text-center space-y-4">
              <h2 className="text-xl font-semibold">Sustainability Metrics</h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Monitor environmental impact, carbon footprint, and social responsibility metrics across your supply chain.
              </p>
              <Button className="mx-auto">View Sustainability Dashboard</Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default TraceabilityPage;
