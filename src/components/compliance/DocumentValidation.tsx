
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, XCircle, FileText, Upload, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export type Document = {
  id: string;
  name: string;
  type: string;
  status: 'verified' | 'rejected' | 'pending';
  uploadDate: string;
  expiryDate?: string;
  issuer: string;
  notes?: string;
};

interface DocumentValidationProps {
  documents: Document[];
  onValidateDocument?: (id: string, status: 'verified' | 'rejected', notes?: string) => void;
  onUploadDocument?: (file: File) => void;
}

export function DocumentValidation({ 
  documents, 
  onValidateDocument,
  onUploadDocument 
}: DocumentValidationProps) {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [validationNote, setValidationNote] = useState('');
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  const handleUpload = () => {
    if (selectedFile && onUploadDocument) {
      onUploadDocument(selectedFile);
      toast({
        title: "Document Uploaded",
        description: `${selectedFile.name} has been uploaded for validation.`,
      });
      setSelectedFile(null);
      
      // Reset the file input
      const fileInput = document.getElementById('document-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    }
  };
  
  const handleValidate = (id: string, status: 'verified' | 'rejected') => {
    if (onValidateDocument) {
      onValidateDocument(id, status, validationNote);
      toast({
        title: status === 'verified' ? "Document Verified" : "Document Rejected",
        description: `The document has been ${status === 'verified' ? 'verified' : 'rejected'}.`,
      });
      setValidationNote('');
      setSelectedDocId(null);
    }
  };
  
  return (
    <div className="space-y-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Upload New Document</CardTitle>
          <CardDescription>
            Upload regulatory documents for validation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex items-center gap-4">
              <Input
                id="document-upload"
                type="file"
                onChange={handleFileChange}
                className="flex-1"
              />
              <Button 
                onClick={handleUpload} 
                disabled={!selectedFile || !onUploadDocument}
                className="flex items-center"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
            </div>
            {selectedFile && (
              <p className="text-sm text-muted-foreground">
                Selected file: {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
              </p>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Document Validation</CardTitle>
          <CardDescription>
            Review and validate regulatory documents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Issuer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        {doc.name}
                      </div>
                    </TableCell>
                    <TableCell>{doc.type}</TableCell>
                    <TableCell>{doc.issuer}</TableCell>
                    <TableCell>{doc.uploadDate}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {doc.status === 'verified' ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
                            <span className="text-green-600">Verified</span>
                          </>
                        ) : doc.status === 'rejected' ? (
                          <>
                            <XCircle className="h-4 w-4 mr-1 text-red-600" />
                            <span className="text-red-600">Rejected</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="h-4 w-4 mr-1 text-amber-600" />
                            <span className="text-amber-600">Pending</span>
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {doc.status === 'pending' && onValidateDocument && (
                        <div className="flex justify-end items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 gap-1 text-green-600"
                            onClick={() => setSelectedDocId(selectedDocId === doc.id ? null : doc.id)}
                          >
                            Validate
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {selectedDocId && (
            <div className="mt-4 p-4 border rounded-md">
              <h4 className="font-medium mb-2">
                Validation Notes
              </h4>
              <div className="space-y-4">
                <Input
                  placeholder="Add notes about the validation..."
                  value={validationNote}
                  onChange={(e) => setValidationNote(e.target.value)}
                />
                <div className="flex items-center gap-2">
                  <Button 
                    className="gap-1"
                    onClick={() => handleValidate(selectedDocId, 'verified')}
                  >
                    <CheckCircle className="h-4 w-4" />
                    Approve
                  </Button>
                  <Button 
                    variant="destructive" 
                    className="gap-1"
                    onClick={() => handleValidate(selectedDocId, 'rejected')}
                  >
                    <XCircle className="h-4 w-4" />
                    Reject
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSelectedDocId(null);
                      setValidationNote('');
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
