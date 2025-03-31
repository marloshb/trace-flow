
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { TransactionForm } from '@/components/blockchain/TransactionForm';
import { TransactionList } from '@/components/blockchain/TransactionList';
import { useBlockchain } from '@/hooks/useBlockchain';
import { QRGenerator } from '@/components/traceability/QRGenerator';
import { Database, FileText, Link2, Shield } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BlockchainTransaction } from '@/types/blockchain';

const BlockchainPage = () => {
  const { transactions, addTransaction, verifyChain } = useBlockchain();
  const isChainValid = verifyChain();

  const handleAddTransaction = (
    productId: string,
    lotCode: string,
    operation: BlockchainTransaction['operation'],
    data: Record<string, any>,
    fromNode?: string,
    toNode?: string
  ) => {
    addTransaction(productId, lotCode, operation, data, fromNode, toNode);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Rastreabilidade com Blockchain</h1>
        </div>

        <Tabs defaultValue="register" className="mb-6">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="register" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span className="hidden sm:inline">Registrar</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Histórico</span>
            </TabsTrigger>
            <TabsTrigger value="qrcode" className="flex items-center gap-2">
              <Link2 className="h-4 w-4" />
              <span className="hidden sm:inline">QR Code</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="register" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <TransactionForm onSubmit={handleAddTransaction} />
              </div>
              <div className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h2 className="text-lg font-medium mb-2 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Sobre Blockchain
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    A tecnologia blockchain garante a imutabilidade e transparência dos registros 
                    de transações na cadeia de suprimentos. Cada transação é validada e 
                    adicionada ao registro de forma permanente.
                  </p>
                </div>

                <Alert>
                  <AlertTitle>Integridade de dados</AlertTitle>
                  <AlertDescription>
                    Todas as transações são criptografadas e vinculadas matematicamente, 
                    garantindo que qualquer alteração maliciosa seja facilmente detectada.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history">
            <TransactionList transactions={transactions} isValid={isChainValid} />
          </TabsContent>

          <TabsContent value="qrcode">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">QR Code de Rastreabilidade</h2>
                <p className="text-muted-foreground mb-4">
                  Gere um QR code para qualquer produto que será utilizado para acessar 
                  o histórico completo de transações na blockchain, permitindo a 
                  verificação da autenticidade e origem.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-primary" />
                    <p className="text-sm">Dados imutáveis garantem a confiabilidade</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <p className="text-sm">Histórico completo e transparente</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <p className="text-sm">Verificação de autenticidade</p>
                  </div>
                </div>
              </div>
              <QRGenerator productId="blockchain/verify" className="w-full" />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default BlockchainPage;
