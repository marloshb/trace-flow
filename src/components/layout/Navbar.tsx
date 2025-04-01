
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BarChart, Package, ShieldCheck, History, FileText, LayoutGrid, Truck } from 'lucide-react';
import { ThemeModeToggle } from '@/components/ui/theme-mode-toggle'; 

const Navbar = () => {
  const { pathname } = useLocation();

  // Define navigation items
  const navItems = [
    { path: '/', label: 'Dashboard', icon: <LayoutGrid className="mr-2 h-4 w-4" /> },
    { path: '/traceability', label: 'Traceability', icon: <History className="mr-2 h-4 w-4" /> },
    { path: '/compliance', label: 'Compliance', icon: <ShieldCheck className="mr-2 h-4 w-4" /> },
    { path: '/analytics', label: 'Analytics', icon: <BarChart className="mr-2 h-4 w-4" /> },
    { path: '/data-registration', label: 'Data Registration', icon: <FileText className="mr-2 h-4 w-4" /> },
    { path: '/blockchain', label: 'Blockchain', icon: <Package className="mr-2 h-4 w-4" /> },
    { path: '/logistics', label: 'Logistics', icon: <Truck className="mr-2 h-4 w-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-14 items-center">
        <div className="mr-6 flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Package className="h-6 w-6 text-primary" />
            <span className="font-bold">Supply Chain Trace</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex flex-1 items-center space-x-1">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Button 
                key={item.path}
                variant={isActive ? "default" : "ghost"} 
                size="sm"
                asChild
              >
                <Link to={item.path} className="flex items-center">
                  {item.icon}
                  {item.label}
                </Link>
              </Button>
            );
          })}
        </nav>
        
        <div className="ml-auto flex items-center gap-2">
          <ThemeModeToggle />
          <Button size="sm" variant="outline">
            Log out
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
