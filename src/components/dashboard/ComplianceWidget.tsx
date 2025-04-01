
import { CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ComplianceItem {
  id: string;
  name: string;
  status: 'success' | 'warning' | 'alert';
  percentage: number;
  description?: string;
}

interface ComplianceWidgetProps {
  items: ComplianceItem[];
  className?: string;
  onViewDetails?: () => void;
}

const statusIcons = {
  success: CheckCircle,
  warning: AlertTriangle,
  alert: AlertCircle,
};

const statusClasses = {
  success: 'text-geo-success',
  warning: 'text-geo-warning',
  alert: 'text-geo-alert',
};

const progressClasses = {
  success: 'bg-geo-success',
  warning: 'bg-geo-warning',
  alert: 'bg-geo-alert',
};

export function ComplianceWidget({ items, className, onViewDetails }: ComplianceWidgetProps) {
  const overallCompliance = Math.round(
    items.reduce((sum, item) => sum + item.percentage, 0) / items.length
  );

  // Calculate risk level
  const riskLevel = overallCompliance >= 90 
    ? { level: 'Low', color: 'text-geo-success' }
    : overallCompliance >= 75
      ? { level: 'Medium', color: 'text-geo-warning' }
      : { level: 'High', color: 'text-geo-alert' };

  return (
    <Card className={cn("hover-card", className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">Compliance Status</CardTitle>
            <CardDescription>Regulatory compliance overview</CardDescription>
          </div>
          <div className={`flex items-center ${riskLevel.color} text-xs font-medium`}>
            <span className="mr-1">{riskLevel.level} Risk</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm">Overall Compliance</span>
            <span className="text-sm font-semibold">{overallCompliance}%</span>
          </div>
          <Progress value={overallCompliance} className="h-2" />
        </div>
        
        <div className="space-y-3">
          {items.map((item) => {
            const Icon = statusIcons[item.status];
            
            return (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <Icon className={cn("h-4 w-4 mr-2", statusClasses[item.status])} />
                  <div className="flex items-center">
                    <span className="text-sm">{item.name}</span>
                    {item.description && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-3.5 w-3.5 ml-1 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-64 text-xs">{item.description}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-24 mr-2">
                    <Progress value={item.percentage} className={cn("h-1.5", progressClasses[item.status])} />
                  </div>
                  <span className="text-xs font-medium">{item.percentage}%</span>
                </div>
              </div>
            );
          })}
        </div>
        
        {onViewDetails && (
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full mt-4" 
            onClick={onViewDetails}
          >
            View Compliance Details
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
