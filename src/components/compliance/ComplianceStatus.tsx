
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export type ComplianceLevel = 'compliant' | 'partial' | 'non-compliant' | 'pending';

interface ComplianceItem {
  id: string;
  name: string;
  status: ComplianceLevel;
  description: string;
  lastUpdated: string;
}

interface ComplianceStatusProps {
  items: ComplianceItem[];
  className?: string;
}

const statusIcons = {
  compliant: CheckCircle,
  partial: AlertTriangle,
  'non-compliant': XCircle,
  pending: HelpCircle,
};

const statusColors = {
  compliant: 'text-geo-success',
  partial: 'text-geo-warning',
  'non-compliant': 'text-geo-alert',
  pending: 'text-muted-foreground',
};

const statusLabels = {
  compliant: 'Compliant',
  partial: 'Partially Compliant',
  'non-compliant': 'Non-Compliant',
  pending: 'Pending Review',
};

export function ComplianceStatus({ items, className }: ComplianceStatusProps) {
  const compliantCount = items.filter(item => item.status === 'compliant').length;
  const compliancePercentage = Math.round((compliantCount / items.length) * 100);
  
  return (
    <Card className={cn("hover-card", className)}>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Info className="h-5 w-5 mr-2" />
          Compliance Status
        </CardTitle>
        <CardDescription>
          FSMA and EUDR compliance overview
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm">Overall Compliance</span>
            <span className="text-sm font-semibold">{compliancePercentage}%</span>
          </div>
          <Progress 
            value={compliancePercentage} 
            className="h-2" 
          />
          <div className="flex justify-between mt-1 text-xs text-muted-foreground">
            <span>{compliantCount} of {items.length} regulations compliant</span>
            <span>Updated: Today</span>
          </div>
        </div>
        
        <div className="space-y-4">
          {items.map((item) => {
            const Icon = statusIcons[item.status];
            
            return (
              <div key={item.id} className="border-b pb-3 last:border-0">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center">
                      <Icon className={cn("h-4 w-4 mr-2", statusColors[item.status])} />
                      <h3 className="font-medium">{item.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                  </div>
                  <div className={cn(
                    "text-xs px-2 py-1 rounded-full",
                    item.status === 'compliant' ? 'bg-geo-success/10 text-geo-success' :
                    item.status === 'partial' ? 'bg-geo-warning/10 text-geo-warning' :
                    item.status === 'non-compliant' ? 'bg-geo-alert/10 text-geo-alert' :
                    'bg-muted text-muted-foreground'
                  )}>
                    {statusLabels[item.status]}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  Last updated: {item.lastUpdated}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
