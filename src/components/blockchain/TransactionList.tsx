
import React from 'react';
import { BlockchainTransaction } from '@/types/blockchain';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface TransactionListProps {
  transactions: BlockchainTransaction[];
  isValid: boolean;
}

export function TransactionList({ transactions, isValid }: TransactionListProps) {
  const getOperationLabel = (operation: BlockchainTransaction['operation']) => {
    const labels = {
      create: 'Criação',
      transfer: 'Transferência',
      process: 'Processamento',
      inspect: 'Inspeção',
      deliver: 'Entrega'
    };
    return labels[operation];
  };

  const getOperationColor = (operation: BlockchainTransaction['operation']) => {
    const colors = {
      create: 'bg-green-100 text-green-800',
      transfer: 'bg-blue-100 text-blue-800',
      process: 'bg-purple-100 text-purple-800',
      inspect: 'bg-amber-100 text-amber-800',
      deliver: 'bg-indigo-100 text-indigo-800'
    };
    return colors[operation];
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Histórico de Transações</CardTitle>
        <div className="flex items-center gap-2">
          {isValid ? (
            <>
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span className="text-sm text-green-600">Blockchain Íntegra</span>
            </>
          ) : (
            <>
              <XCircle className="h-5 w-5 text-red-500" />
              <span className="text-sm text-red-600">Blockchain Corrompida</span>
            </>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            Nenhuma transação registrada ainda.
          </div>
        ) : (
          <div className="space-y-4">
            {transactions.map((transaction, index) => (
              <div key={transaction.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <Badge variant="outline" className={getOperationColor(transaction.operation)}>
                    {getOperationLabel(transaction.operation)}
                  </Badge>
                  <div className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(transaction.timestamp), { addSuffix: true, locale: ptBR })}
                  </div>
                </div>
                
                <div className="grid gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ID do Produto:</span>
                    <span className="font-mono">{transaction.productId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Código de Lote:</span>
                    <span>{transaction.lotCode}</span>
                  </div>
                  
                  {(transaction.fromNode || transaction.toNode) && (
                    <div className="flex items-center gap-2 py-1">
                      {transaction.fromNode && <span>{transaction.fromNode}</span>}
                      {transaction.fromNode && transaction.toNode && (
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      )}
                      {transaction.toNode && <span>{transaction.toNode}</span>}
                    </div>
                  )}
                  
                  <div className="mt-2 pt-2 border-t text-xs">
                    <div className="text-muted-foreground mb-1">Hash:</div>
                    <div className="font-mono overflow-x-auto">{transaction.hash}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
