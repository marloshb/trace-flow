
import { Package, Factory, Truck, Store, Home, Circle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface TimelineStep {
  id: string;
  title: string;
  status: 'completed' | 'current' | 'upcoming';
  node: 'farmer' | 'processor' | 'distributor' | 'manufacturer' | 'consumer';
  date?: string;
  location?: string;
}

interface SupplyChainTimelineProps {
  steps: TimelineStep[];
  className?: string;
}

const nodeIcons = {
  farmer: Package,
  processor: Factory,
  distributor: Truck,
  manufacturer: Store,
  consumer: Home,
};

const nodeClasses = {
  farmer: 'node-farmer',
  processor: 'node-processor',
  distributor: 'node-distributor',
  manufacturer: 'node-manufacturer',
  consumer: 'node-consumer',
};

export function SupplyChainTimeline({ steps, className }: SupplyChainTimelineProps) {
  return (
    <Card className={cn("hover-card", className)}>
      <CardHeader>
        <CardTitle className="text-lg">Supply Chain Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {steps.map((step, index) => {
            const Icon = nodeIcons[step.node] || Circle;
            const isLast = index === steps.length - 1;
            
            return (
              <div key={step.id} className="flex items-start mb-6 last:mb-0">
                <div className="flex flex-col items-center mr-4">
                  <div className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full",
                    nodeClasses[step.node],
                    step.status === 'completed' ? 'opacity-100' : 
                    step.status === 'current' ? 'animate-pulse-slow' : 'opacity-40'
                  )}>
                    <Icon className="h-5 w-5" />
                  </div>
                  {!isLast && (
                    <div className={cn(
                      "w-px h-12 bg-border",
                      step.status === 'completed' ? 'opacity-100' : 'opacity-40'
                    )} />
                  )}
                </div>
                <div className={cn(
                  "pt-1.5 pb-8",
                  step.status === 'completed' ? 'opacity-100' : 
                  step.status === 'current' ? 'opacity-100' : 'opacity-40'
                )}>
                  <h3 className="text-md font-medium">{step.title}</h3>
                  {step.date && (
                    <p className="text-sm text-muted-foreground">{step.date}</p>
                  )}
                  {step.location && (
                    <p className="text-sm text-muted-foreground">{step.location}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
