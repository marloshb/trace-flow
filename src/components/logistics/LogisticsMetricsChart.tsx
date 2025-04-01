
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

const data = [
  {
    name: 'Jan',
    distance: 4500,
    time: 120,
    emissions: 2800,
  },
  {
    name: 'Feb',
    distance: 3800,
    time: 110,
    emissions: 2400,
  },
  {
    name: 'Mar',
    distance: 5000,
    time: 145,
    emissions: 3200,
  },
  {
    name: 'Apr',
    distance: 4100,
    time: 125,
    emissions: 2600,
  },
  {
    name: 'May',
    distance: 3900,
    time: 115,
    emissions: 2500,
  },
  {
    name: 'Jun',
    distance: 4700,
    time: 130,
    emissions: 2900,
  }
];

export function LogisticsMetricsChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="distance" name="Distance (km)" fill="#3A86FF" />
        <Bar dataKey="time" name="Time (hours)" fill="#8C6F4B" />
        <Bar dataKey="emissions" name="CO2 (kg)" fill="#55A630" />
      </BarChart>
    </ResponsiveContainer>
  );
}
