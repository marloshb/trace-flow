
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
  description?: string; // Added this field
  sustainability?: {
    co2Emissions?: number;
    certifications?: string[];
  }; // Added sustainability data
}

interface SupplyChainTimelineProps {
  steps: TimelineStep[];
  className?: string;
  variant?: 'default' | 'consumer'; // Added consumer variant
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

export function SupplyChainTimeline({ steps, className, variant = 'default' }: SupplyChainTimelineProps) {
  const isConsumerVariant = variant === 'consumer';

  return (
    <Card className={cn("hover-card", className)}>
      <CardHeader>
        <CardTitle className="text-lg">
          {isConsumerVariant ? "Product Journey" : "Supply Chain Timeline"}
        </CardTitle>
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
                    isConsumerVariant ? 
                      (step.status === 'completed' ? 'bg-primary text-primary-foreground' : 
                      step.status === 'current' ? 'bg-primary/70 text-primary-foreground animate-pulse-slow' : 
                      'bg-muted text-muted-foreground') :
                      (step.status === 'completed' ? 'opacity-100' : 
                      step.status === 'current' ? 'animate-pulse-slow' : 'opacity-40')
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
                  {isConsumerVariant && step.description && (
                    <p className="text-sm mt-1">{step.description}</p>
                  )}
                  {isConsumerVariant && step.sustainability && (
                    <div className="mt-2 space-y-1">
                      {step.sustainability.co2Emissions !== undefined && (
                        <p className="text-xs inline-flex items-center bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 px-2 py-1 rounded-full">
                          <span className="font-semibold mr-1">CO₂:</span> {step.sustainability.co2Emissions} kg
                        </p>
                      )}
                      {step.sustainability.certifications && step.sustainability.certifications.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {step.sustainability.certifications.map((cert, i) => (
                            <span key={i} className="text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full">
                              {cert}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
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
