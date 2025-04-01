
export interface BlockchainTransaction {
  id: string;
  timestamp: string;
  productId: string;
  lotCode: string;
  operation: 'create' | 'transfer' | 'process' | 'inspect' | 'deliver';
  fromNode?: string;
  toNode?: string;
  data: Record<string, any>;
  hash: string;
  previousHash?: string;
  // Adding geospatial data
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  distance?: number; // Distance traveled in km
  estimatedArrival?: string; // ISO date string
}

export interface TransactionNode {
  id: string;
  name: string;
  type: 'farmer' | 'processor' | 'distributor' | 'manufacturer' | 'retailer' | 'consumer';
  location: string;
  // Adding geospatial data
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface RouteOptimization {
  routeId: string;
  startNodeId: string;
  endNodeId: string;
  intermediateNodes: string[];
  distance: number; // Total distance in km
  estimatedTime: number; // In minutes
  co2Emission: number; // In kg
  fuelConsumption: number; // In liters
}

export interface LogisticsMetrics {
  totalDistance: number;
  averageTime: number;
  co2Emissions: number;
  costSavings: number;
  onTimeDeliveryRate: number;
}
