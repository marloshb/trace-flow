
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Check, Calendar, FileText, Building, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface OrganicCertificationProps {
  productId: string;
  certifications: string[];
  isUSDAOrganic: boolean;
  className?: string;
}

export function OrganicCertification({
  productId,
  certifications,
  isUSDAOrganic,
  className,
}: OrganicCertificationProps) {
  // Mock USDA Organic certification data
  const usdaData = {
    certificationNumber: "USDA-84291-OH",
    issuedDate: "2024-10-15",
    expirationDate: "2025-10-14",
    standards: ["NOP (National Organic Program)", "USDA Organic Regulations"],
    certifiedBy: "Ohio Ecological Food and Farm Association",
    inspectionDate: "2024-09-20",
    certifier: {
      name: "Ohio Ecological Food and Farm Association",
      code: "OEFFA-OH-75",
      website: "https://oeffa.org",
    },
    producer: {
      name: "FreshFarm Organic Producers",
      location: "Greene County, Ohio",
      since: "2015",
    },
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-medium flex items-center">
          <Shield className="h-5 w-5 mr-2" />
          Certification Verification
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2 mb-2">
          {certifications.map((cert, index) => (
            <Badge
              key={index}
              variant={cert.includes("USDA") ? "default" : "secondary"}
              className={cn(
                "rounded-full px-3 py-0.5",
                cert.includes("USDA") && "bg-green-600"
              )}
            >
              {cert}
            </Badge>
          ))}
        </div>

        {isUSDAOrganic ? (
          <>
            <div className="p-4 border border-green-200 bg-green-50 dark:bg-green-900/10 dark:border-green-900/30 rounded-lg flex items-start">
              <div className="bg-green-600 text-white p-1.5 rounded-full mr-3">
                <Check className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-green-700 dark:text-green-400">
                  USDA Organic Verified
                </h3>
                <p className="text-sm text-green-600 dark:text-green-500 mt-0.5">
                  This product meets all USDA Organic certification requirements
                  and standards.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Certification Details</h3>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <FileText className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Certification Number
                      </p>
                      <p className="text-sm font-medium">
                        {usdaData.certificationNumber}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Calendar className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Valid Period
                      </p>
                      <p className="text-sm">
                        {usdaData.issuedDate} to {usdaData.expirationDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <User className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Last Inspected
                      </p>
                      <p className="text-sm">{usdaData.inspectionDate}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-medium">Certifying Organization</h3>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <Building className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Certified By
                      </p>
                      <p className="text-sm font-medium">
                        {usdaData.certifier.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Certifier Code: {usdaData.certifier.code}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Organic Standards Met</h3>
              <ul className="space-y-1">
                {usdaData.standards.map((standard, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Check className="h-3.5 w-3.5 text-green-600 mr-2" />
                    {standard}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end">
              <Button variant="outline" size="sm" className="text-xs">
                <FileText className="h-3.5 w-3.5 mr-1.5" />
                View Certificate
              </Button>
            </div>
          </>
        ) : (
          <div className="py-8 text-center">
            <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-40" />
            <h3 className="text-lg font-medium mb-2">No USDA Organic Data</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              This product does not have USDA Organic certification data
              available in our system.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
