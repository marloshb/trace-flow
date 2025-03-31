
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  BarChart3, 
  ClipboardCheck, 
  Database, 
  Home, 
  Menu, 
  PackageSearch,
  Link2
} from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const routes = [
    { href: '/', label: 'Dashboard', icon: Home },
    { href: '/traceability', label: 'Rastreabilidade', icon: PackageSearch },
    { href: '/blockchain', label: 'Blockchain', icon: Link2 },
    { href: '/compliance', label: 'Conformidade', icon: ClipboardCheck },
    { href: '/analytics', label: 'Análises', icon: BarChart3 },
    { href: '/data-registration', label: 'Cadastro de Dados', icon: Database },
  ];
  
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-primary">GeoTraceFlow</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-1">
            {routes.map((route) => {
              const Icon = route.icon;
              const isActive = location.pathname === route.href;
              return (
                <Link 
                  key={route.href}
                  to={route.href}
                >
                  <Button 
                    variant={isActive ? "default" : "ghost"}
                    className="flex items-center space-x-2"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{route.label}</span>
                  </Button>
                </Link>
              );
            })}
          </nav>
          
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-2 mt-6">
                {routes.map((route) => {
                  const Icon = route.icon;
                  const isActive = location.pathname === route.href;
                  return (
                    <Link 
                      key={route.href}
                      to={route.href}
                      onClick={() => setOpen(false)}
                    >
                      <Button 
                        variant={isActive ? "default" : "ghost"}
                        className="w-full justify-start"
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        {route.label}
                      </Button>
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
