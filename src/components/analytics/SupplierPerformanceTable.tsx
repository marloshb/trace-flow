
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';

export interface SupplierPerformance {
  id: string;
  name: string;
  complianceScore: number;
  sustainabilityScore: number;
  deliveryPerformance: number;
  qualityScore: number;
  region: string;
}

interface SupplierPerformanceTableProps {
  data?: SupplierPerformance[];
  className?: string;
}

const defaultData: SupplierPerformance[] = [
  { 
    id: "SUP001", 
    name: "EcoFarms Brasil", 
    complianceScore: 95, 
    sustainabilityScore: 92, 
    deliveryPerformance: 98, 
    qualityScore: 94,
    region: "South America" 
  },
  { 
    id: "SUP002", 
    name: "GreenHarvest Co.", 
    complianceScore: 88, 
    sustainabilityScore: 95, 
    deliveryPerformance: 91, 
    qualityScore: 89,
    region: "North America" 
  },
  { 
    id: "SUP003", 
    name: "Sustainable Crops Ltd.", 
    complianceScore: 79, 
    sustainabilityScore: 86, 
    deliveryPerformance: 82, 
    qualityScore: 84,
    region: "Europe" 
  },
  { 
    id: "SUP004", 
    name: "Organic Valley Inc.", 
    complianceScore: 92, 
    sustainabilityScore: 89, 
    deliveryPerformance: 94, 
    qualityScore: 91,
    region: "North America" 
  },
  { 
    id: "SUP005", 
    name: "Natural Farms Kenya", 
    complianceScore: 81, 
    sustainabilityScore: 78, 
    deliveryPerformance: 74, 
    qualityScore: 79,
    region: "Africa" 
  },
];

function getScoreStatus(score: number) {
  if (score >= 90) return { status: 'success', icon: CheckCircle };
  if (score >= 80) return { status: 'warning', icon: AlertTriangle };
  return { status: 'alert', icon: AlertCircle };
}

function getScoreBadge(score: number) {
  const { status } = getScoreStatus(score);
  return (
    <Badge variant={status === 'success' ? 'default' : status === 'warning' ? 'secondary' : 'destructive'}>
      {score}%
    </Badge>
  );
}

export function SupplierPerformanceTable({ data = defaultData, className }: SupplierPerformanceTableProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">Supplier Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>Supplier performance metrics as of February 2025</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Supplier</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Compliance</TableHead>
              <TableHead>Sustainability</TableHead>
              <TableHead>Delivery</TableHead>
              <TableHead>Quality</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((supplier) => {
              const complianceStatus = getScoreStatus(supplier.complianceScore);
              const ComplianceIcon = complianceStatus.icon;
              
              return (
                <TableRow key={supplier.id}>
                  <TableCell className="font-medium">{supplier.name}</TableCell>
                  <TableCell>{supplier.region}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <ComplianceIcon className={`h-4 w-4 ${complianceStatus.status === 'success' ? 'text-geo-success' : complianceStatus.status === 'warning' ? 'text-geo-warning' : 'text-geo-alert'}`} />
                      {getScoreBadge(supplier.complianceScore)}
                    </div>
                  </TableCell>
                  <TableCell>{getScoreBadge(supplier.sustainabilityScore)}</TableCell>
                  <TableCell>{getScoreBadge(supplier.deliveryPerformance)}</TableCell>
                  <TableCell>{getScoreBadge(supplier.qualityScore)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
