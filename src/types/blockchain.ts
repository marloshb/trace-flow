
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
}

export interface TransactionNode {
  id: string;
  name: string;
  type: 'farmer' | 'processor' | 'distributor' | 'manufacturer' | 'retailer' | 'consumer';
  location: string;
}
