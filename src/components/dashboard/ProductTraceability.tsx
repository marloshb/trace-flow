
import { ArrowRight, QrCode, Leaf, BarChart3, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ProductTraceabilityProps {
  productId: string;
  productName: string;
  productImage?: string;
  traceabilityScore: number;
  certifications: string[];
  className?: string;
}

export function ProductTraceability({ 
  productId, 
  productName, 
  productImage, 
  traceabilityScore, 
  certifications,
  className 
}: ProductTraceabilityProps) {
  return (
    <Card className={cn("hover-card", className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Product Traceability</CardTitle>
          <Button variant="outline" size="icon">
            <QrCode className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4">
          <div className="h-16 w-16 rounded-md bg-muted flex items-center justify-center">
            {productImage ? (
              <img src={productImage} alt={productName} className="h-full w-full rounded-md object-cover" />
            ) : (
              <Leaf className="h-8 w-8 text-primary" />
            )}
          </div>
          <div>
            <h3 className="font-medium">{productName}</h3>
            <p className="text-sm text-muted-foreground">ID: {productId}</p>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm">Traceability Score</span>
            <span className="text-sm font-semibold">{traceabilityScore}%</span>
          </div>
          <Progress value={traceabilityScore} className="h-2" />
        </div>
        
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2">Certifications</h4>
          <div className="flex flex-wrap gap-2">
            {certifications.map((cert, index) => (
              <Badge key={index} variant="outline" className="bg-muted/50">{cert}</Badge>
            ))}
          </div>
        </div>
        
        <div className="pt-2">
          <h4 className="text-sm font-medium mb-2">Key Data Elements</h4>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Origin</span>
              <span>Campos, Brazil</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Harvest Date</span>
              <span>04/15/2023</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Processing</span>
              <span>São Paulo Facility</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="outline" size="sm" className="gap-1">
          <BarChart3 className="h-4 w-4" />
          Analytics
        </Button>
        <Button variant="default" size="sm" className="gap-1">
          View Details
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
