
import { useState } from 'react';
import { BlockchainTransaction } from '@/types/blockchain';
import { useToast } from '@/hooks/use-toast';

// Função simples para gerar um hash (em um sistema real usaria uma biblioteca criptográfica)
const generateHash = (data: any): string => {
  const jsonString = JSON.stringify(data);
  let hash = 0;
  for (let i = 0; i < jsonString.length; i++) {
    const char = jsonString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16);
};

export const useBlockchain = () => {
  const [transactions, setTransactions] = useState<BlockchainTransaction[]>([]);
  const { toast } = useToast();

  const addTransaction = (
    productId: string,
    lotCode: string,
    operation: BlockchainTransaction['operation'],
    data: Record<string, any>,
    fromNode?: string,
    toNode?: string
  ): BlockchainTransaction => {
    const lastTransaction = transactions.length > 0 
      ? transactions[transactions.length - 1] 
      : undefined;
    
    const timestamp = new Date().toISOString();
    const previousHash = lastTransaction?.hash;
    
    const transactionData = {
      productId,
      lotCode,
      operation,
      timestamp,
      data,
      fromNode,
      toNode,
    };
    
    const hash = generateHash({ ...transactionData, previousHash });
    
    const newTransaction: BlockchainTransaction = {
      id: `tx-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp,
      productId,
      lotCode,
      operation,
      fromNode,
      toNode,
      data,
      hash,
      previousHash
    };
    
    setTransactions((prev) => [...prev, newTransaction]);
    
    toast({
      title: 'Transação Registrada',
      description: `Operação ${operation} registrada com sucesso na blockchain.`,
    });
    
    return newTransaction;
  };

  const getTransactionsForProduct = (productId: string): BlockchainTransaction[] => {
    return transactions.filter(tx => tx.productId === productId);
  };

  const verifyChain = (): boolean => {
    for (let i = 1; i < transactions.length; i++) {
      const currentTx = transactions[i];
      const previousTx = transactions[i - 1];
      
      if (!currentTx.previousHash || currentTx.previousHash !== previousTx.hash) {
        return false;
      }
      
      const calculatedHash = generateHash({
        productId: currentTx.productId,
        lotCode: currentTx.lotCode,
        operation: currentTx.operation,
        timestamp: currentTx.timestamp,
        data: currentTx.data,
        fromNode: currentTx.fromNode,
        toNode: currentTx.toNode,
        previousHash: currentTx.previousHash
      });
      
      if (calculatedHash !== currentTx.hash) {
        return false;
      }
    }
    
    return true;
  };

  return {
    transactions,
    addTransaction,
    getTransactionsForProduct,
    verifyChain
  };
};
