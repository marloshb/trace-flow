
import { CheckCircle, AlertCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface ComplianceItem {
  id: string;
  name: string;
  status: 'success' | 'warning' | 'alert';
  percentage: number;
}

interface ComplianceWidgetProps {
  items: ComplianceItem[];
  className?: string;
}

const statusIcons = {
  success: CheckCircle,
  warning: AlertTriangle,
  alert: AlertCircle,
};

const statusClasses = {
  success: 'compliance-success',
  warning: 'compliance-warning',
  alert: 'compliance-alert',
};

const progressClasses = {
  success: 'bg-geo-success',
  warning: 'bg-geo-warning',
  alert: 'bg-geo-alert',
};

export function ComplianceWidget({ items, className }: ComplianceWidgetProps) {
  const overallCompliance = Math.round(
    items.reduce((sum, item) => sum + item.percentage, 0) / items.length
  );

  return (
    <Card className={cn("hover-card", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Compliance Status</CardTitle>
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
                  <span className="text-sm">{item.name}</span>
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
      </CardContent>
    </Card>
  );
}
