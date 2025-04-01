
import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  type: 'farmer' | 'processor' | 'distributor' | 'manufacturer' | 'retailer' | 'consumer';
  name: string;
}

interface Route {
  id: string;
  path: { lat: number; lng: number }[];
  optimized: boolean;
}

interface SupplyChainMapProps {
  markers?: MapMarker[];
  routes?: Route[];
  selectedRoute?: string | null;
  height?: number;
  className?: string;
}

// Mock data for supply chain nodes
const mockMarkers: MapMarker[] = [
  { id: '1', lat: -22.9068, lng: -43.1729, type: 'farmer', name: 'Coffee Farm' },
  { id: '2', lat: -23.5505, lng: -46.6333, type: 'processor', name: 'Processing Plant' },
  { id: '3', lat: 51.9244, lng: 4.4777, type: 'distributor', name: 'Rotterdam Port' },
  { id: '4', lat: 53.5511, lng: 9.9937, type: 'manufacturer', name: 'Manufacturing' },
  { id: '5', lat: 52.5200, lng: 13.4050, type: 'consumer', name: 'Retail Center' }
];

// Mock data for routes
const mockRoutes: Route[] = [
  {
    id: 'route-1',
    path: [
      { lat: -22.9068, lng: -43.1729 },
      { lat: -23.5505, lng: -46.6333 },
      { lat: 51.9244, lng: 4.4777 },
      { lat: 53.5511, lng: 9.9937 },
      { lat: 52.5200, lng: 13.4050 }
    ],
    optimized: true
  },
  {
    id: 'route-2',
    path: [
      { lat: -22.9068, lng: -43.1729 },
      { lat: 10.2, lng: -50.5 },
      { lat: 40.7, lng: -10.3 },
      { lat: 51.9244, lng: 4.4777 },
      { lat: 53.5511, lng: 9.9937 },
      { lat: 52.5200, lng: 13.4050 }
    ],
    optimized: false
  }
];

const markerColors = {
  farmer: '#55A630',
  processor: '#8C6F4B',
  distributor: '#3A86FF',
  manufacturer: '#7A7A7A',
  retailer: '#4A4A4A',
  consumer: '#4A4A4A',
};

export function SupplyChainMap({ 
  markers = mockMarkers, 
  routes = mockRoutes, 
  selectedRoute = null,
  height = 400,
  className 
}: SupplyChainMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Simple map rendering with SVG
    const renderMap = () => {
      if (!mapContainerRef.current) return;
      
      const container = mapContainerRef.current;
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      // Create SVG
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('width', '100%');
      svg.setAttribute('height', '100%');
      svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
      
      // World map simplified outline
      const mapPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      mapPath.setAttribute('d', 'M50,50 L150,50 L200,100 L250,80 L300,120 L350,90 L400,150 L450,110 L500,130 L550,160 L600,140 L650,180 L700,150 L750,190 L800,170 L850,200 L900,180 L950,210 L1000,190 L1050,220 L1100,200 L1150,230 L1200,210 L1250,170 L1300,200 L1350,170 L1400,190 L1450,160 L1500,180');
      mapPath.setAttribute('stroke', '#d1d5db');
      mapPath.setAttribute('stroke-width', '1');
      mapPath.setAttribute('fill', 'none');
      svg.appendChild(mapPath);
      
      // Render continent outlines
      const continents = [
        'M100,100 C150,80 200,120 250,100 C300,80 350,120 300,150 C250,180 200,160 150,170 C100,180 50,150 100,100',
        'M400,150 C450,130 500,170 550,150 C600,130 650,170 600,200 C550,230 500,210 450,220 C400,230 350,200 400,150',
        'M700,100 C750,80 800,120 850,100 C900,80 950,120 900,150 C850,180 800,160 750,170 C700,180 650,150 700,100',
      ];
      
      continents.forEach((path) => {
        const continent = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        continent.setAttribute('d', path);
        continent.setAttribute('fill', '#f3f4f6');
        continent.setAttribute('stroke', '#d1d5db');
        continent.setAttribute('stroke-width', '0.5');
        svg.appendChild(continent);
      });
      
      // Render routes
      routes.forEach((route) => {
        if (!selectedRoute || selectedRoute === route.id) {
          // Create route line
          const routePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          
          // Convert coordinates to SVG path
          const pathData = route.path.map((point, idx) => {
            // Simple conversion for mockup
            const x = 100 + (idx * 150) % (width - 100);
            const y = 100 + (Math.floor(idx / 5) * 80) % (height - 100);
            return `${idx === 0 ? 'M' : 'L'}${x},${y}`;
          }).join(' ');
          
          routePath.setAttribute('d', pathData);
          routePath.setAttribute('stroke', route.optimized ? '#10b981' : '#ef4444');
          routePath.setAttribute('stroke-width', selectedRoute === route.id ? '3' : '2');
          routePath.setAttribute('stroke-dasharray', route.optimized ? '' : '5,5');
          routePath.setAttribute('fill', 'none');
          routePath.setAttribute('opacity', selectedRoute === route.id ? '1' : '0.6');
          svg.appendChild(routePath);
          
          // Add route labels
          if (selectedRoute === route.id) {
            const midPointIdx = Math.floor(route.path.length / 2);
            const midPoint = route.path[midPointIdx];
            const x = 100 + (midPointIdx * 150) % (width - 100) + 10;
            const y = 100 + (Math.floor(midPointIdx / 5) * 80) % (height - 100) - 10;
            
            const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            label.setAttribute('x', x.toString());
            label.setAttribute('y', y.toString());
            label.setAttribute('font-size', '12');
            label.setAttribute('fill', route.optimized ? '#10b981' : '#ef4444');
            label.setAttribute('font-weight', 'bold');
            label.textContent = route.optimized ? 'Optimized Route' : 'Original Route';
            svg.appendChild(label);
          }
        }
      });
      
      // Add markers
      markers.forEach((marker, index) => {
        // Simplified positioning for mockup
        const x = 100 + (index * 150) % (width - 100);
        const y = 100 + (Math.floor(index / 5) * 80) % (height - 100);
        
        const markerEl = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        markerEl.setAttribute('cx', x.toString());
        markerEl.setAttribute('cy', y.toString());
        markerEl.setAttribute('r', '6');
        markerEl.setAttribute('fill', markerColors[marker.type] || '#4a4a4a');
        markerEl.setAttribute('stroke', 'white');
        markerEl.setAttribute('stroke-width', '2');
        
        // Add pulse effect
        const pulse = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        pulse.setAttribute('cx', x.toString());
        pulse.setAttribute('cy', y.toString());
        pulse.setAttribute('r', '6');
        pulse.setAttribute('fill', 'none');
        pulse.setAttribute('stroke', markerColors[marker.type] || '#4a4a4a');
        pulse.setAttribute('stroke-width', '2');
        pulse.setAttribute('opacity', '0.6');
        
        // Add animation
        const animation = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        animation.setAttribute('attributeName', 'r');
        animation.setAttribute('from', '6');
        animation.setAttribute('to', '15');
        animation.setAttribute('dur', '1.5s');
        animation.setAttribute('begin', '0s');
        animation.setAttribute('repeatCount', 'indefinite');
        pulse.appendChild(animation);
        
        const fadeAnimation = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        fadeAnimation.setAttribute('attributeName', 'opacity');
        fadeAnimation.setAttribute('from', '0.6');
        fadeAnimation.setAttribute('to', '0');
        fadeAnimation.setAttribute('dur', '1.5s');
        fadeAnimation.setAttribute('begin', '0s');
        fadeAnimation.setAttribute('repeatCount', 'indefinite');
        pulse.appendChild(fadeAnimation);
        
        // Add tooltip
        const tooltip = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        tooltip.setAttribute('x', (x + 10).toString());
        tooltip.setAttribute('y', (y - 10).toString());
        tooltip.setAttribute('font-size', '12');
        tooltip.setAttribute('fill', '#4b5563');
        tooltip.textContent = marker.name;
        
        svg.appendChild(pulse);
        svg.appendChild(markerEl);
        svg.appendChild(tooltip);
      });
      
      // Clear previous content and add new SVG
      container.innerHTML = '';
      container.appendChild(svg);
    };
    
    renderMap();
    
    // Re-render on resize
    const handleResize = () => renderMap();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [markers, routes, selectedRoute]);
  
  return (
    <div 
      ref={mapContainerRef} 
      className={cn("w-full bg-slate-50 dark:bg-slate-800 rounded-md overflow-hidden", className)}
      style={{ height: `${height}px` }}
    />
  );
}
