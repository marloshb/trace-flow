
import { useState } from 'react';
import { QrCode, Download, Copy, CheckCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface QRGeneratorProps {
  productId?: string;
  className?: string;
}

export function QRGenerator({ productId = '', className }: QRGeneratorProps) {
  const [id, setId] = useState(productId);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://geotraceflow.com/trace/${id}`);
    setCopied(true);
    toast({
      title: "Link copied",
      description: "Traceability link has been copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    // In a real implementation, this would generate and download a QR code
    toast({
      title: "QR Code downloaded",
      description: "The QR code has been downloaded successfully",
    });
  };

  return (
    <Card className={cn("hover-card", className)}>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <QrCode className="h-5 w-5 mr-2" />
          QR Code Generator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="product-id">Product ID</Label>
            <Input 
              id="product-id" 
              value={id} 
              onChange={(e) => setId(e.target.value)}
              placeholder="Enter product ID"
            />
          </div>
          
          <div className="bg-primary/5 border border-primary/20 rounded-md p-4 flex flex-col items-center">
            {/* Placeholder for QR code - in a real implementation this would generate a real QR code */}
            <div className="h-48 w-48 bg-white flex items-center justify-center border mb-4">
              <div className="h-36 w-36 bg-[#000] flex items-center justify-center">
                <div className="h-28 w-28 bg-white flex items-center justify-center">
                  <QrCode className="h-16 w-16 text-primary" />
                </div>
              </div>
            </div>
            
            <p className="text-sm text-center mb-2">Scan to trace product origin</p>
            <div className="text-xs text-muted-foreground text-center w-full truncate">
              https://geotraceflow.com/trace/{id || '[product-id]'}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-1"
          onClick={handleCopy}
        >
          {copied ? (
            <>
              <CheckCheck className="h-4 w-4" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy Link
            </>
          )}
        </Button>
        <Button 
          variant="default" 
          size="sm" 
          className="gap-1"
          onClick={handleDownload}
        >
          <Download className="h-4 w-4" />
          Download QR
        </Button>
      </CardFooter>
    </Card>
  );
}
