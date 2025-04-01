
import {
  BarChart as BarChartIcon,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface EmissionsByBatchProps {
  data?: BatchEmissionData[];
  className?: string;
}

export interface BatchEmissionData {
  batchId: string;
  emissions: number;
  production: number;
  date: string;
}

const defaultData: BatchEmissionData[] = [
  { batchId: 'TOM-2025-001', emissions: 30, production: 500, date: '2025-01-15' },
  { batchId: 'COF-2025-002', emissions: 45, production: 750, date: '2025-01-22' },
  { batchId: 'WHT-2025-003', emissions: 28, production: 1200, date: '2025-01-28' },
  { batchId: 'RCE-2025-004', emissions: 52, production: 850, date: '2025-02-05' },
  { batchId: 'APL-2025-005', emissions: 22, production: 650, date: '2025-02-12' },
  { batchId: 'POT-2025-006', emissions: 38, production: 900, date: '2025-02-18' },
];

export function EmissionsByBatchChart({ data = defaultData, className }: EmissionsByBatchProps) {
  const chartData = data.map(item => ({
    name: item.batchId,
    emissions: item.emissions,
    production: item.production,
  }));

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Emissions by Batch</CardTitle>
            <CardDescription>CO₂ emissions and production per batch</CardDescription>
          </div>
          <BarChartIcon className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="emissions" name="CO₂ Emissions (kg)" fill="#ee8477" />
              <Bar yAxisId="right" dataKey="production" name="Production (kg)" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="flex justify-between items-center w-full">
          <p className="text-xs text-muted-foreground">Source: USDA Crop Production, Global Carbon Project</p>
          <Button variant="outline" size="sm" className="ml-auto">
            <Download className="h-3.5 w-3.5 mr-1" />
            Export Data
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
