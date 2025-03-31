
import { Shield, FileText, AlertTriangle, CheckCircle } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ComplianceStatus, ComplianceLevel } from '@/components/compliance/ComplianceStatus';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const CompliancePage = () => {
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
            <TabsTrigger value="alerts" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span className="hidden sm:inline">Alerts</span>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regulationCards.map((regulation) => (
                <Card key={regulation.id} className="hover-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{regulation.title}</CardTitle>
                      {regulation.icon}
                    </div>
                    <CardDescription>
                      Deadline: {regulation.deadline}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{regulation.description}</p>
                    <div className="mt-4 flex items-center">
                      <span className="text-xs font-medium inline-flex items-center rounded-full px-2.5 py-1 bg-primary/10 text-primary">
                        {regulation.status}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">View Details</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="alerts">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Compliance Alerts</CardTitle>
                <CardDescription>
                  Stay informed about upcoming regulations and compliance issues
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-md">
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-geo-alert/20 text-geo-alert flex items-center justify-center mt-0.5">
                        <AlertTriangle className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Carbon Reporting Deadline Approaching</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          The quarterly carbon emissions report is due in 5 days. Please ensure all data is submitted.
                        </p>
                        <div className="mt-2">
                          <Button variant="outline" size="sm">Take Action</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-geo-warning/20 text-geo-warning flex items-center justify-center mt-0.5">
                        <AlertTriangle className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">EUDR Documentation Update Required</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          New EU Deforestation Regulation requirements will take effect next month. Update risk assessments.
                        </p>
                        <div className="mt-2">
                          <Button variant="outline" size="sm">View Details</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center mt-0.5">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">FSMA Traceability Rule Updates</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          FDA has released new guidance on the Food Traceability Rule implementation.
                        </p>
                        <div className="mt-2">
                          <Button variant="outline" size="sm">Read Update</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default CompliancePage;
