
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface Product {
  id: string;
  lotCode: string;
  productName: string;
  location: string;
  date: string;
}

interface ProductsTableProps {
  products: Product[];
}

export function ProductsTable({ products }: ProductsTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Produtos Cadastrados</CardTitle>
      </CardHeader>
      <CardContent>
        {products.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">
            Nenhum produto cadastrado ainda.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código de Lote</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Localização</TableHead>
                <TableHead>Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.lotCode}</TableCell>
                  <TableCell>{product.productName}</TableCell>
                  <TableCell>{product.location}</TableCell>
                  <TableCell>{product.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
