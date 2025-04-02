
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, LocateFixed } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';

interface TraceabilityMapProps {
  productId: string;
  originLocation: string;
  currentLocation?: string;
  className?: string;
}

export function TraceabilityMap({ 
  productId, 
  originLocation, 
  currentLocation, 
  className 
}: TraceabilityMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  
  // Parse location strings to get rough latitude/longitude
  // In a real implementation, we would use geocoding services
  const getCoordinates = (location: string): [number, number] => {
    if (location.includes('Ethiopia')) return [9.145, 40.489];
    if (location.includes('Seattle')) return [47.606, -122.332];
    if (location.includes('Ohio')) return [40.417, -82.907];
    if (location.includes('Columbus')) return [39.961, -82.999];
    if (location.includes('Midwest')) return [41.850, -87.650];
    if (location.includes('Yirgacheffe')) return [6.130, 38.210];
    if (location.includes('Addis Ababa')) return [9.033, 38.750];
    if (location.includes('Djibouti')) return [11.825, 42.590];
    
    // Default coordinates if location isn't recognized
    return [0, 0];
  };
  
  // Get coordinates for origin and current locations
  const originCoords = getCoordinates(originLocation);
  const currentCoords = currentLocation ? getCoordinates(currentLocation) : originCoords;
  
  useEffect(() => {
    if (!mapRef.current) return;
    
    // Clear previous map content
    mapRef.current.innerHTML = '';
    
    // Create simple SVG-based map showing product journey
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 360 180');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    
    // Simple world map outline (simplified for demonstration)
    const mapOutline = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    mapOutline.setAttribute('d', 'M0,90 C60,40 120,20 180,50 C240,80 300,60 360,90 C300,120 240,140 180,110 C120,80 60,100 0,90 Z');
    mapOutline.setAttribute('fill', 'none');
    mapOutline.setAttribute('stroke', '#d1d5db');
    mapOutline.setAttribute('stroke-width', '1');
    svg.appendChild(mapOutline);
    
    // Add continent shapes (simplified)
    const continents = [
      {
        // Africa
        path: 'M180,70 C200,50 220,60 210,90 C200,110 180,100 170,80 C170,60 180,70 180,70 Z',
        fill: '#f3f4f6'
      },
      {
        // North America
        path: 'M60,60 C80,40 100,50 90,70 C70,90 50,80 60,60 Z',
        fill: '#f3f4f6'
      },
      {
        // South America
        path: 'M90,100 C100,90 110,100 100,120 C90,130 80,120 90,100 Z',
        fill: '#f3f4f6'
      },
      {
        // Europe
        path: 'M170,50 C180,40 200,45 190,60 C180,70 160,65 170,50 Z',
        fill: '#f3f4f6'
      },
      {
        // Asia
        path: 'M220,60 C260,40 280,60 260,80 C230,90 210,70 220,60 Z',
        fill: '#f3f4f6'
      },
      {
        // Australia
        path: 'M280,110 C290,100 300,110 290,120 C280,130 270,120 280,110 Z',
        fill: '#f3f4f6'
      }
    ];
    
    continents.forEach(continent => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', continent.path);
      path.setAttribute('fill', continent.fill);
      path.setAttribute('stroke', '#d1d5db');
      path.setAttribute('stroke-width', '0.5');
      svg.appendChild(path);
    });
    
    // Convert lat/long to SVG coordinates (simplified)
    const latLongToSvgCoords = (latLong: [number, number]): [number, number] => {
      // Map latitude (-90 to 90) to y (180 to 0)
      const y = 90 - latLong[0];
      // Map longitude (-180 to 180) to x (0 to 360)
      const x = latLong[1] + 180;
      return [x, y];
    };
    
    // Draw origin point
    const [originX, originY] = latLongToSvgCoords(originCoords);
    const originPoint = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    originPoint.setAttribute('cx', originX.toString());
    originPoint.setAttribute('cy', originY.toString());
    originPoint.setAttribute('r', '4');
    originPoint.setAttribute('fill', '#22c55e');
    originPoint.setAttribute('stroke', 'white');
    originPoint.setAttribute('stroke-width', '1');
    svg.appendChild(originPoint);
    
    // Draw origin label
    const originLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    originLabel.setAttribute('x', (originX + 8).toString());
    originLabel.setAttribute('y', (originY + 4).toString());
    originLabel.setAttribute('font-size', '8');
    originLabel.setAttribute('fill', '#4b5563');
    originLabel.textContent = 'Origin';
    svg.appendChild(originLabel);
    
    // Draw current location if different from origin
    if (currentLocation && currentLocation !== originLocation) {
      const [currentX, currentY] = latLongToSvgCoords(currentCoords);
      
      // Draw line connecting origin to current
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', `M${originX},${originY} L${currentX},${currentY}`);
      path.setAttribute('stroke', '#3b82f6');
      path.setAttribute('stroke-width', '2');
      path.setAttribute('stroke-dasharray', '4,2');
      path.setAttribute('fill', 'none');
      svg.appendChild(path);
      
      // Draw current point
      const currentPoint = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      currentPoint.setAttribute('cx', currentX.toString());
      currentPoint.setAttribute('cy', currentY.toString());
      currentPoint.setAttribute('r', '4');
      currentPoint.setAttribute('fill', '#3b82f6');
      currentPoint.setAttribute('stroke', 'white');
      currentPoint.setAttribute('stroke-width', '1');
      svg.appendChild(currentPoint);
      
      // Add pulse effect
      const pulse = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      pulse.setAttribute('cx', currentX.toString());
      pulse.setAttribute('cy', currentY.toString());
      pulse.setAttribute('r', '4');
      pulse.setAttribute('fill', 'none');
      pulse.setAttribute('stroke', '#3b82f6');
      pulse.setAttribute('stroke-width', '2');
      
      // Add animation
      const animation = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
      animation.setAttribute('attributeName', 'r');
      animation.setAttribute('from', '4');
      animation.setAttribute('to', '12');
      animation.setAttribute('dur', '1.5s');
      animation.setAttribute('repeatCount', 'indefinite');
      pulse.appendChild(animation);
      
      const fadeAnimation = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
      fadeAnimation.setAttribute('attributeName', 'opacity');
      fadeAnimation.setAttribute('from', '1');
      fadeAnimation.setAttribute('to', '0');
      fadeAnimation.setAttribute('dur', '1.5s');
      fadeAnimation.setAttribute('repeatCount', 'indefinite');
      pulse.appendChild(fadeAnimation);
      
      svg.appendChild(pulse);
      
      // Draw current location label
      const currentLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      currentLabel.setAttribute('x', (currentX + 8).toString());
      currentLabel.setAttribute('y', (currentY + 4).toString());
      currentLabel.setAttribute('font-size', '8');
      currentLabel.setAttribute('fill', '#4b5563');
      currentLabel.textContent = 'Current';
      svg.appendChild(currentLabel);
    }
    
    // Append the SVG to the map container
    mapRef.current.appendChild(svg);
  }, [originLocation, currentLocation, originCoords, currentCoords]);
  
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="py-3">
        <CardTitle className="text-sm font-medium flex items-center">
          <MapPin className="h-4 w-4 mr-1.5" />
          Product Journey Map
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div 
          ref={mapRef} 
          className="w-full h-[200px] bg-muted/20 flex items-center justify-center"
        />
        <div className="p-3 bg-muted/10 border-t flex justify-between text-xs text-muted-foreground">
          <div className="flex items-center">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
            Origin: {originLocation}
          </div>
          {currentLocation && currentLocation !== originLocation && (
            <div className="flex items-center">
              <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-1.5"></span>
              Current: {currentLocation}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
