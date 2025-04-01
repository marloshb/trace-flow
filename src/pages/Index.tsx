
import { BarChart, Package, Truck, ShieldCheck, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { StatCard } from '@/components/dashboard/StatCard';
import { SupplyChainTimeline } from '@/components/dashboard/SupplyChainTimeline';
import { ComplianceWidget } from '@/components/dashboard/ComplianceWidget';
import { GeoMap } from '@/components/dashboard/GeoMap';
import { ProductTraceability } from '@/components/dashboard/ProductTraceability';
import { EmissionsByBatchChart } from '@/components/analytics/EmissionsByBatchChart';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();
  
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

  // Mock data for compliance widget with descriptions
  const complianceItems = [
    { 
      id: '1', 
      name: 'FSMA Compliance', 
      status: 'success' as const, 
      percentage: 95,
      description: 'Food Safety Modernization Act requirements for hazard analysis and risk-based preventive controls.' 
    },
    { 
      id: '2', 
      name: 'EUDR Requirements', 
      status: 'warning' as const, 
      percentage: 82,
      description: 'EU Deforestation Regulation requirements for supply chain due diligence and reporting.'
    },
    { 
      id: '3', 
      name: 'GS1 Standards', 
      status: 'success' as const, 
      percentage: 100,
      description: 'Global standards for supply chain visibility, including barcodes and electronic data interchange.'
    },
    { 
      id: '4', 
      name: 'Sustainability KPIs', 
      status: 'alert' as const, 
      percentage: 68,
      description: 'Key performance indicators for measuring environmental impact and sustainable practices.'
    }
  ];

  // Mock data for geo map
  const mapMarkers = [
    { id: '1', lat: -22.9068, lng: -43.1729, type: 'farmer' as const, name: 'Coffee Farm' },
    { id: '2', lat: -23.5505, lng: -46.6333, type: 'processor' as const, name: 'Processing Plant' },
    { id: '3', lat: 51.9244, lng: 4.4777, type: 'distributor' as const, name: 'Rotterdam Port' },
    { id: '4', lat: 53.5511, lng: 9.9937, type: 'manufacturer' as const, name: 'Manufacturing' },
    { id: '5', lat: 52.5200, lng: 13.4050, type: 'consumer' as const, name: 'Retail Center' }
  ];
  
  // Mock data for emissions by batch
  const batchEmissionData = [
    { batchId: 'TOM-2025-001', emissions: 30, production: 500, date: '2025-01-15' },
    { batchId: 'COF-2025-002', emissions: 45, production: 750, date: '2025-01-22' },
    { batchId: 'WHT-2025-003', emissions: 28, production: 1200, date: '2025-01-28' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Button onClick={() => navigate('/analytics')} className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            View Full Analytics
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard 
            title="Total Products"
            value="1,284"
            description="12 new since last month"
            icon={<Package />}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard 
            title="Active Shipments"
            value="37"
            description="5 arriving today"
            icon={<Truck />}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard 
            title="Compliance Score"
            value="86%"
            description="4% improvement"
            icon={<ShieldCheck />}
            trend={{ value: 4, isPositive: true }}
          />
          <StatCard 
            title="Supply Chain Partners"
            value="56"
            description="8 countries"
            icon={<Globe />}
            trend={{ value: 2, isPositive: true }}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <SupplyChainTimeline 
            steps={timelineSteps} 
            className="lg:col-span-1"
          />
          <GeoMap 
            markers={mapMarkers} 
            className="lg:col-span-2"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProductTraceability 
            productId="PRD-2023-0584"
            productName="Premium Arabica Coffee"
            traceabilityScore={78}
            certifications={['Organic', 'Rainforest Alliance', 'Fair Trade']}
          />
          <ComplianceWidget 
            items={complianceItems}
            onViewDetails={() => navigate('/compliance')}
          />
        </div>
        
        <div className="mt-6">
          <EmissionsByBatchChart 
            data={batchEmissionData}
          />
        </div>
      </main>
    </div>
  );
};

export default Index;
