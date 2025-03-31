
import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  type: 'farmer' | 'processor' | 'distributor' | 'manufacturer' | 'consumer';
  name: string;
}

interface GeoMapProps {
  markers: MapMarker[];
  className?: string;
}

const markerColors = {
  farmer: '#55A630',
  processor: '#8C6F4B',
  distributor: '#3A86FF',
  manufacturer: '#7A7A7A',
  consumer: '#4A4A4A',
};

export function GeoMap({ markers, className }: GeoMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Simple map rendering with mockup SVG
    // In a real implementation, we would integrate with OpenStreetMap or Leaflet
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
      
      // World map simplified outline (placeholder)
      const mapPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      mapPath.setAttribute('d', 'M50,50 L150,50 L200,100 L250,80 L300,120 L350,90 L400,150 L450,110 L500,130 L550,160 L600,140 L650,180 L700,150 L750,190 L800,170 L850,200 L900,180 L950,210 L1000,190 L1050,220 L1100,200 L1150,230 L1200,210 L1250,170 L1300,200 L1350,170 L1400,190 L1450,160 L1500,180');
      mapPath.setAttribute('stroke', '#d1d5db');
      mapPath.setAttribute('stroke-width', '1');
      mapPath.setAttribute('fill', 'none');
      svg.appendChild(mapPath);
      
      // Render continent outlines (simplified placeholders)
      const continents = [
        'M100,100 C150,80 200,120 250,100 C300,80 350,120 300,150 C250,180 200,160 150,170 C100,180 50,150 100,100',
        'M400,150 C450,130 500,170 550,150 C600,130 650,170 600,200 C550,230 500,210 450,220 C400,230 350,200 400,150',
        'M700,100 C750,80 800,120 850,100 C900,80 950,120 900,150 C850,180 800,160 750,170 C700,180 650,150 700,100',
      ];
      
      continents.forEach((path, index) => {
        const continent = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        continent.setAttribute('d', path);
        continent.setAttribute('fill', '#f3f4f6');
        continent.setAttribute('stroke', '#d1d5db');
        continent.setAttribute('stroke-width', '0.5');
        svg.appendChild(continent);
      });
      
      // Clear previous content and add new SVG
      container.innerHTML = '';
      container.appendChild(svg);
      
      // Add markers (in a real implementation, these would be positioned based on actual lat/lng)
      markers.forEach((marker, index) => {
        // Simplified positioning for mockup
        const x = 100 + (index * 150) % (width - 100);
        const y = 100 + (Math.floor(index / 5) * 80) % (height - 100);
        
        const markerEl = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        markerEl.setAttribute('cx', x.toString());
        markerEl.setAttribute('cy', y.toString());
        markerEl.setAttribute('r', '6');
        markerEl.setAttribute('fill', markerColors[marker.type]);
        markerEl.setAttribute('stroke', 'white');
        markerEl.setAttribute('stroke-width', '2');
        
        // Add pulse effect for emphasis
        const pulse = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        pulse.setAttribute('cx', x.toString());
        pulse.setAttribute('cy', y.toString());
        pulse.setAttribute('r', '6');
        pulse.setAttribute('fill', 'none');
        pulse.setAttribute('stroke', markerColors[marker.type]);
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
        
        // Add tooltip text
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
    };
    
    renderMap();
    
    // Re-render on resize
    const handleResize = () => renderMap();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [markers]);
  
  return (
    <Card className={cn("hover-card", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Supply Chain Geomap</CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={mapContainerRef} className="w-full h-[300px] bg-slate-50 dark:bg-slate-800 rounded-md" />
      </CardContent>
    </Card>
  );
}
