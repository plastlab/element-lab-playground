import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Atom, FlaskConical } from "lucide-react";

export const Navigation = () => {
  const location = useLocation();
  
  return (
    <nav className="border-b border-border/50 bg-gradient-card backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Atom className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Atomic Explorer
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant={location.pathname === "/" ? "default" : "ghost"}
              asChild
            >
              <Link to="/" className="flex items-center gap-2">
                <Atom className="w-4 h-4" />
                Periodic Table
              </Link>
            </Button>
            
            <Button
              variant={location.pathname === "/builder" ? "default" : "ghost"}
              asChild
            >
              <Link to="/builder" className="flex items-center gap-2">
                <FlaskConical className="w-4 h-4" />
                Element Builder
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};