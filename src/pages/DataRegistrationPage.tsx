
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Navbar from "@/components/layout/Navbar";
import { ProductRegistrationForm } from "@/components/data-capture/ProductRegistrationForm";
import { ProductsTable, Product } from "@/components/data-capture/ProductsTable";

const DataRegistrationPage = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      lotCode: "TOM-2025-001",
      productName: "Tomate Orgânico",
      location: "Ohio (lat: 39.9612, lon: -82.9988)",
      date: "2025-03-31",
    },
  ]);

  const handleAddProduct = (data: Omit<Product, "id">) => {
    const newProduct = {
      id: uuidv4(),
      ...data,
    };
    setProducts([...products, newProduct]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-6">Cadastro e Captura de Dados</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ProductRegistrationForm onSubmit={handleAddProduct} />
          
          <div className="flex flex-col gap-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <h2 className="text-lg font-medium mb-2">Sobre Cadastro de Produtos</h2>
              <p className="text-sm text-muted-foreground">
                Este módulo permite o cadastro de produtos e a captura de Elementos de Dados Chave (KDEs) 
                como código de lote, nome do produto, localização e data. Os dados registrados 
                serão utilizados para rastreabilidade e conformidade regulatória.
              </p>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-lg">
              <h2 className="text-lg font-medium mb-2">Exemplo</h2>
              <p className="text-sm text-muted-foreground">
                <strong>Produto:</strong> Tomate Orgânico<br />
                <strong>Código:</strong> TOM-2025-001<br />
                <strong>Localização:</strong> Ohio<br />
                <strong>Data:</strong> 31/03/2025
              </p>
            </div>
          </div>
        </div>

        <ProductsTable products={products} />
      </main>
    </div>
  );
};

export default DataRegistrationPage;
