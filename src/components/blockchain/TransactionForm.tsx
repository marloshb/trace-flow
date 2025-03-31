
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BlockchainTransaction } from '@/types/blockchain';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const transactionSchema = z.object({
  productId: z.string().min(1, "ID do produto é obrigatório"),
  lotCode: z.string().min(1, "Código de lote é obrigatório"),
  operation: z.enum(['create', 'transfer', 'process', 'inspect', 'deliver'], {
    required_error: "Selecione uma operação",
  }),
  fromNode: z.string().optional(),
  toNode: z.string().optional(),
  data: z.string().optional(),
});

type TransactionFormValues = z.infer<typeof transactionSchema>;

interface TransactionFormProps {
  onSubmit: (
    productId: string,
    lotCode: string,
    operation: BlockchainTransaction['operation'],
    data: Record<string, any>,
    fromNode?: string,
    toNode?: string
  ) => void;
}

export function TransactionForm({ onSubmit }: TransactionFormProps) {
  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      productId: "",
      lotCode: "",
      operation: "create",
      fromNode: "",
      toNode: "",
      data: "",
    },
  });

  const handleSubmit = (values: TransactionFormValues) => {
    // Parse data string as JSON if provided, or use empty object
    let dataObj: Record<string, any> = {};
    if (values.data) {
      try {
        dataObj = JSON.parse(values.data);
      } catch (e) {
        // If parsing fails, store it as a simple text
        dataObj = { text: values.data };
      }
    }

    onSubmit(
      values.productId,
      values.lotCode,
      values.operation,
      dataObj,
      values.fromNode || undefined,
      values.toNode || undefined
    );

    form.reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registrar Transação na Blockchain</CardTitle>
        <CardDescription>
          Adicione uma nova transação para rastreabilidade do produto
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="productId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID do Produto</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex.: PRD-2023-0584" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="lotCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Código de Lote</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex.: TOM-2025-001" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="operation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Operação</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma operação" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="create">Criação</SelectItem>
                      <SelectItem value="transfer">Transferência</SelectItem>
                      <SelectItem value="process">Processamento</SelectItem>
                      <SelectItem value="inspect">Inspeção</SelectItem>
                      <SelectItem value="deliver">Entrega</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="fromNode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>De (Origem)</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex.: Fazenda Rio Verde" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="toNode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Para (Destino)</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex.: Processadora ABC" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="data"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dados Adicionais</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Informações adicionais (formato JSON ou texto)"
                      className="resize-none"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Pode ser em formato JSON válido ou texto simples
                  </FormDescription>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Registrar Transação
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
