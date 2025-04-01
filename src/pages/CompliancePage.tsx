
import { useState } from 'react';
import { Shield, FileText, AlertTriangle, CheckCircle } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ComplianceStatus, ComplianceLevel } from '@/components/compliance/ComplianceStatus';
import { RegulationCompliance, Regulation } from '@/components/compliance/RegulationCompliance';
import { DocumentValidation, Document } from '@/components/compliance/DocumentValidation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const CompliancePage = () => {
  const { toast } = useToast();
  
  // Mock data for compliance items
  const complianceItems = [
    {
      id: '1',
      name: 'FSMA Section 204',
      status: 'compliant' as ComplianceLevel,
      description: 'Food traceability requirements for high-risk foods',
      lastUpdated: 'May 5, 2023'
    },
    {
      id: '2',
      name: 'EUDR Deforestation-Free Products',
      status: 'partial' as ComplianceLevel,
      description: 'EU regulation for deforestation-free supply chains',
      lastUpdated: 'April 28, 2023'
    },
    {
      id: '3',
      name: 'GS1 EPCIS Standards',
      status: 'compliant' as ComplianceLevel,
      description: 'Standards for sharing supply chain event data',
      lastUpdated: 'May 12, 2023'
    },
    {
      id: '4',
      name: 'Carbon Footprint Reporting',
      status: 'non-compliant' as ComplianceLevel,
      description: 'Emissions tracking and reporting requirements',
      lastUpdated: 'March 15, 2023'
    },
    {
      id: '5',
      name: 'Fair Labor Practices',
      status: 'pending' as ComplianceLevel,
      description: 'Requirements for ethical labor standards',
      lastUpdated: 'May 1, 2023'
    }
  ];
  
  // Regulation cards data
  const regulationCards = [
    {
      id: '1',
      title: 'FSMA Food Traceability Rule',
      description: 'The FDA\'s Food Traceability Rule requires companies to maintain records of Key Data Elements for Critical Tracking Events.',
      deadline: 'January 20, 2026',
      status: 'Active',
      icon: <Shield className="h-5 w-5" />
    },
    {
      id: '2',
      title: 'EU Deforestation Regulation (EUDR)',
      description: 'Requires companies to provide due diligence statements ensuring products are deforestation-free.',
      deadline: 'December 30, 2024',
      status: 'Pending',
      icon: <FileText className="h-5 w-5" />
    },
    {
      id: '3',
      title: 'Supply Chain Due Diligence Act',
      description: 'German law requiring companies to identify and address human rights and environmental risks.',
      deadline: 'January 1, 2023',
      status: 'Active',
      icon: <CheckCircle className="h-5 w-5" />
    }
  ];
  
  // Mock data for regulation compliance
  const [regulations, setRegulations] = useState<Regulation[]>([
    {
      id: '1',
      name: 'FSMA Section 204',
      description: 'Food traceability requirements for high-risk foods',
      status: 'compliant',
      authority: 'FDA',
      deadline: 'January 20, 2026',
      progress: 100,
      documents: ['Traceability Plan', 'Critical Tracking Events Documentation']
    },
    {
      id: '2',
      name: 'EU Deforestation Regulation',
      description: 'Due diligence requirements for deforestation-free supply chains',
      status: 'pending',
      authority: 'European Union',
      deadline: 'December 30, 2024',
      progress: 65,
      documents: ['Due Diligence Statement', 'Supply Chain Risk Assessment']
    },
    {
      id: '3',
      name: 'Carbon Footprint Reporting',
      description: 'Requirements for tracking and reporting emissions data',
      status: 'non-compliant',
      authority: 'EPA',
      deadline: 'June 30, 2023',
      progress: 30,
      documents: ['Emissions Calculation Methodology', 'Annual Emissions Report']
    },
    {
      id: '4',
      name: 'Labor Standards Compliance',
      description: 'Ethical labor requirements throughout supply chain',
      status: 'pending',
      authority: 'Department of Labor',
      progress: 50,
      documents: ['Labor Practices Audit', 'Supplier Code of Conduct']
    }
  ]);

  // Mock data for documents
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Traceability Plan.pdf',
      type: 'Compliance Plan',
      status: 'verified',
      uploadDate: '2023-05-10',
      expiryDate: '2024-05-10',
      issuer: 'Internal',
      notes: 'Approved by compliance officer'
    },
    {
      id: '2',
      name: 'Deforestation Risk Assessment.pdf',
      type: 'Risk Assessment',
      status: 'pending',
      uploadDate: '2023-06-15',
      issuer: 'Third-party Auditor'
    },
    {
      id: '3',
      name: 'Carbon Emissions Report Q1 2023.xlsx',
      type: 'Report',
      status: 'rejected',
      uploadDate: '2023-04-20',
      issuer: 'Sustainability Department',
      notes: 'Incomplete data, needs revision'
    },
    {
      id: '4',
      name: 'Supplier Audit Results.pdf',
      type: 'Audit',
      status: 'pending',
      uploadDate: '2023-05-28',
      issuer: 'External Consultant'
    }
  ]);

  // Handle regulation status update
  const handleUpdateRegulationStatus = (id: string, status: Regulation['status']) => {
    setRegulations(prev => 
      prev.map(reg => 
        reg.id === id ? { ...reg, status } : reg
      )
    );
    
    toast({
      title: "Regulation Updated",
      description: `The regulation status has been updated to ${status}.`,
    });
  };
  
  // Handle document validation
  const handleValidateDocument = (id: string, status: 'verified' | 'rejected', notes?: string) => {
    setDocuments(prev => 
      prev.map(doc => 
        doc.id === id ? { ...doc, status, notes: notes || doc.notes } : doc
      )
    );
  };
  
  // Handle document upload (mock)
  const handleUploadDocument = (file: File) => {
    const newDoc: Document = {
      id: `doc-${Date.now()}`,
      name: file.name,
      type: file.name.split('.').pop()?.toUpperCase() || 'Unknown',
      status: 'pending',
      uploadDate: new Date().toISOString().split('T')[0],
      issuer: 'User Upload'
    };
    
    setDocuments(prev => [...prev, newDoc]);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-6">Compliance</h1>
        
        <Tabs defaultValue="status" className="mb-6">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="status" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Compliance Status</span>
            </TabsTrigger>
            <TabsTrigger value="regulations" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Regulations</span>
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span className="hidden sm:inline">Documents</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="status">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <ComplianceStatus items={complianceItems} className="lg:col-span-2" />
              
              <div className="space-y-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Actions Needed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-full bg-geo-alert/20 text-geo-alert flex items-center justify-center mt-0.5">
                          <AlertTriangle className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">Complete Carbon Reporting</p>
                          <p className="text-sm text-muted-foreground">Due in 5 days</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-full bg-geo-warning/20 text-geo-warning flex items-center justify-center mt-0.5">
                          <AlertTriangle className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">Update Deforestation Risk Assessment</p>
                          <p className="text-sm text-muted-foreground">Due in 12 days</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">View All Actions</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Compliance Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="text-sm text-primary flex items-center">
                        <FileText className="h-4 w-4 mr-2" />
                        <a href="#" className="hover:underline">FSMA Compliance Guide</a>
                      </li>
                      <li className="text-sm text-primary flex items-center">
                        <FileText className="h-4 w-4 mr-2" />
                        <a href="#" className="hover:underline">EUDR Documentation Template</a>
                      </li>
                      <li className="text-sm text-primary flex items-center">
                        <FileText className="h-4 w-4 mr-2" />
                        <a href="#" className="hover:underline">Carbon Reporting Framework</a>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="regulations">
            <div className="grid grid-cols-1 gap-6">
              <RegulationCompliance 
                regulations={regulations} 
                onUpdateStatus={handleUpdateRegulationStatus} 
              />
            </div>
          </TabsContent>

          <TabsContent value="documents">
            <DocumentValidation 
              documents={documents}
              onValidateDocument={handleValidateDocument}
              onUploadDocument={handleUploadDocument}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default CompliancePage;
