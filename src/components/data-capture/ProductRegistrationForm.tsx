
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

const productSchema = z.object({
  lotCode: z.string().min(3, "Código de lote deve ter pelo menos 3 caracteres"),
  productName: z.string().min(2, "Nome do produto é obrigatório"),
  location: z.string().min(2, "Localização é obrigatória"),
  date: z.string().min(2, "Data é obrigatória"),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductRegistrationFormProps {
  onSubmit: (data: ProductFormValues) => void;
}

export function ProductRegistrationForm({ onSubmit }: ProductRegistrationFormProps) {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      lotCode: "",
      productName: "",
      location: "",
      date: new Date().toISOString().split("T")[0], // Default to today
    },
  });

  const handleSubmit = (data: ProductFormValues) => {
    onSubmit(data);
    toast({
      title: "Produto registrado",
      description: `${data.productName} (${data.lotCode}) foi registrado com sucesso.`,
    });
    form.reset();
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          form.setValue(
            "location",
            `Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`
          );
        },
        (error) => {
          console.error("Error getting location:", error);
          toast({
            title: "Erro de Localização",
            description: "Não foi possível obter sua localização atual.",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Geolocalização não suportada",
        description: "Seu navegador não suporta geolocalização.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cadastro de Produto</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="lotCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código de Lote</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: TOM-2025-001" {...field} />
                  </FormControl>
                  <FormDescription>
                    Código único para o lote do produto
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Produto</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: Tomate Orgânico" {...field} />
                  </FormControl>
                  <FormDescription>Nome do produto a ser registrado</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Localização</FormLabel>
                  <div className="flex gap-2">
                    <FormControl>
                      <Input placeholder="ex: Ohio" {...field} />
                    </FormControl>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={getCurrentLocation}
                    >
                      Usar GPS
                    </Button>
                  </div>
                  <FormDescription>
                    Local de origem do produto
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormDescription>
                    Data de produção/colheita
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Registrar Produto
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
