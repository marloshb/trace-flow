
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileCheck, AlertTriangle, Clock, CheckCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

export type Regulation = {
  id: string;
  name: string;
  description: string;
  status: 'compliant' | 'non-compliant' | 'pending' | 'expired';
  authority: string;
  deadline?: string;
  progress: number;
  documents: string[];
};

interface RegulationComplianceProps {
  regulations: Regulation[];
  onUpdateStatus?: (id: string, status: Regulation['status']) => void;
}

export function RegulationCompliance({ regulations, onUpdateStatus }: RegulationComplianceProps) {
  const { toast } = useToast();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };
  
  const statusConfig = {
    'compliant': {
      label: 'Compliant',
      color: 'bg-green-100 text-green-800',
      icon: CheckCircle
    },
    'non-compliant': {
      label: 'Non-Compliant',
      color: 'bg-red-100 text-red-800',
      icon: AlertTriangle
    },
    'pending': {
      label: 'Pending Review',
      color: 'bg-yellow-100 text-yellow-800',
      icon: Clock
    },
    'expired': {
      label: 'Expired',
      color: 'bg-gray-100 text-gray-800',
      icon: AlertTriangle
    }
  };
  
  const handleUpdate = (id: string, status: Regulation['status']) => {
    if (onUpdateStatus) {
      onUpdateStatus(id, status);
      toast({
        title: "Status Updated",
        description: `Regulation status has been updated to ${statusConfig[status].label}`,
      });
    }
  };
  
  const overallCompliance = Math.round(
    regulations.filter(r => r.status === 'compliant').length / regulations.length * 100
  );
  
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium">Overall Compliance</h3>
          <span className="font-semibold">{overallCompliance}%</span>
        </div>
        <Progress value={overallCompliance} className="h-2" />
      </div>
      
      <div className="grid gap-4">
        {regulations.map((regulation) => {
          const StatusIcon = statusConfig[regulation.status].icon;
          const isExpanded = expandedId === regulation.id;
          
          return (
            <Card key={regulation.id} className="overflow-hidden border-l-4" 
                  style={{ borderLeftColor: regulation.status === 'compliant' ? '#10b981' : 
                                          regulation.status === 'pending' ? '#f59e0b' : '#ef4444' }}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileCheck className="h-5 w-5" />
                      {regulation.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{regulation.description}</p>
                  </div>
                  <Badge className={statusConfig[regulation.status].color}>
                    <StatusIcon className="h-3.5 w-3.5 mr-1" />
                    {statusConfig[regulation.status].label}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Compliance Progress</span>
                    <span>{regulation.progress}%</span>
                  </div>
                  <Progress value={regulation.progress} className="h-1.5" />
                </div>
                
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>Authority: {regulation.authority}</span>
                  {regulation.deadline && (
                    <span>Deadline: {regulation.deadline}</span>
                  )}
                </div>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mt-2 text-xs"
                  onClick={() => toggleExpand(regulation.id)}
                >
                  {isExpanded ? 'View Less' : 'View Details'}
                </Button>
                
                {isExpanded && (
                  <div className="mt-4 space-y-4 pt-4 border-t">
                    {regulation.documents.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium mb-2">Required Documents</h4>
                        <ul className="text-sm space-y-1">
                          {regulation.documents.map((doc, index) => (
                            <li key={index} className="flex items-center">
                              <FileCheck className="h-4 w-4 mr-2 text-muted-foreground" />
                              {doc}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {onUpdateStatus && (
                      <div className="flex flex-wrap gap-2">
                        <Button 
                          size="sm" 
                          variant={regulation.status === 'compliant' ? 'default' : 'outline'}
                          onClick={() => handleUpdate(regulation.id, 'compliant')}
                        >
                          Mark Compliant
                        </Button>
                        <Button 
                          size="sm" 
                          variant={regulation.status === 'pending' ? 'default' : 'outline'}
                          onClick={() => handleUpdate(regulation.id, 'pending')}
                        >
                          Mark Pending
                        </Button>
                        <Button 
                          size="sm" 
                          variant={regulation.status === 'non-compliant' ? 'default' : 'outline'}
                          onClick={() => handleUpdate(regulation.id, 'non-compliant')}
                        >
                          Mark Non-Compliant
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
