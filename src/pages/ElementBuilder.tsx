import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AtomVisualization } from "@/components/AtomVisualization";
import { getElementByAtomicNumber, Element } from "@/data/elements";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, Minus, RotateCcw } from "lucide-react";

export const ElementBuilder = () => {
  const [protons, setProtons] = useState(1);
  const [electrons, setElectrons] = useState(1);
  const [neutrons, setNeutrons] = useState(0);
  
  // Create a custom element based on current values
  const customElement: Element = {
    atomicNumber: protons,
    symbol: "?",
    name: "Custom Element",
    atomicMass: protons + neutrons,
    group: 0,
    period: 0,
    category: "unknown",
    electrons,
    protons,
    neutrons,
  };
  
  // Check if this matches a known element
  const knownElement = getElementByAtomicNumber(protons);
  const isKnownElement = knownElement && knownElement.neutrons === neutrons && knownElement.electrons === electrons;
  const isIon = knownElement && knownElement.electrons !== electrons;
  const isIsotope = knownElement && knownElement.neutrons !== neutrons && knownElement.electrons === electrons;
  
  const adjustValue = (current: number, delta: number, min: number = 0, max: number = 200) => {
    return Math.max(min, Math.min(max, current + delta));
  };
  
  const resetToHydrogen = () => {
    setProtons(1);
    setElectrons(1);
    setNeutrons(0);
  };
  
  const getElementStatus = () => {
    if (isKnownElement) {
      return {
        type: "Known Element",
        description: `This is ${knownElement.name} (${knownElement.symbol}) in its neutral state.`,
        color: "bg-green-500",
      };
    } else if (isIon && knownElement) {
      const charge = protons - electrons;
      const chargeStr = charge > 0 ? `+${charge}` : `${charge}`;
      return {
        type: "Ion",
        description: `This is a ${knownElement.name} ion with a ${chargeStr} charge.`,
        color: "bg-blue-500",
      };
    } else if (isIsotope && knownElement) {
      return {
        type: "Isotope",
        description: `This is an isotope of ${knownElement.name} with ${neutrons} neutrons.`,
        color: "bg-purple-500",
      };
    } else if (knownElement) {
      return {
        type: "Variant",
        description: `This is a variant of ${knownElement.name} with different electron/neutron configuration.`,
        color: "bg-orange-500",
      };
    } else {
      return {
        type: "Hypothetical Element",
        description: "This element does not exist in nature or has not been discovered yet.",
        color: "bg-red-500",
      };
    }
  };
  
  const status = getElementStatus();
  
  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Atomic Element Builder
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Build your own atoms by adjusting protons, electrons, and neutrons. Discover how atomic structure determines element properties and behavior.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Controls */}
          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Atomic Controls
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetToHydrogen}
                  className="flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Protons */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-red-400">
                  Protons (Atomic Number)
                </Label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setProtons(adjustValue(protons, -1, 1))}
                    disabled={protons <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <Input
                    type="number"
                    value={protons}
                    onChange={(e) => setProtons(adjustValue(parseInt(e.target.value) || 1, 0, 1))}
                    className="text-center font-mono"
                    min="1"
                    max="200"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setProtons(adjustValue(protons, 1))}
                    disabled={protons >= 200}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              {/* Electrons */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-blue-400">
                  Electrons
                </Label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setElectrons(adjustValue(electrons, -1, 0))}
                    disabled={electrons <= 0}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <Input
                    type="number"
                    value={electrons}
                    onChange={(e) => setElectrons(adjustValue(parseInt(e.target.value) || 0, 0, 0))}
                    className="text-center font-mono"
                    min="0"
                    max="200"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setElectrons(adjustValue(electrons, 1))}
                    disabled={electrons >= 200}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              {/* Neutrons */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-yellow-400">
                  Neutrons
                </Label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setNeutrons(adjustValue(neutrons, -1, 0))}
                    disabled={neutrons <= 0}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <Input
                    type="number"
                    value={neutrons}
                    onChange={(e) => setNeutrons(adjustValue(parseInt(e.target.value) || 0, 0, 0))}
                    className="text-center font-mono"
                    min="0"
                    max="200"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setNeutrons(adjustValue(neutrons, 1))}
                    disabled={neutrons >= 200}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              {/* Summary */}
              <div className="space-y-4">
                {/* Chemical Display - Large and prominent */}
                <div className="p-4 bg-gradient-primary rounded-xl text-center">
                  <div className="text-3xl font-bold text-primary-foreground mb-2">
                    {knownElement ? knownElement.symbol : "?"}
                  </div>
                  <div className="text-lg text-primary-foreground/90">
                    {knownElement ? knownElement.name : "Unknown Element"}
                  </div>
                  {(isIon || isIsotope) && (
                    <div className="text-sm text-primary-foreground/80 mt-1">
                      {isIon && `Charge: ${protons - electrons > 0 ? `+${protons - electrons}` : protons - electrons}`}
                      {isIsotope && `Isotope with ${neutrons} neutrons`}
                    </div>
                  )}
                </div>
                
                <div>
                  <Badge className={`${status.color} text-white mb-3 text-sm px-3 py-1`}>
                    {status.type}
                  </Badge>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {status.description}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 p-3 bg-secondary/30 rounded-lg">
                  <div className="text-center">
                    <span className="text-xs text-muted-foreground block">Atomic Mass</span>
                    <div className="text-xl font-bold text-primary">{protons + neutrons} u</div>
                  </div>
                  <div className="text-center">
                    <span className="text-xs text-muted-foreground block">Net Charge</span>
                    <div className="text-xl font-bold text-accent">
                      {protons - electrons > 0 ? `+${protons - electrons}` : protons - electrons}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Visualization */}
          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle>Atom Visualization</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center min-h-[720px] p-6">
              {/* Large Chemical Symbol Display */}
              <div className="mb-6 text-center">
                <div 
                  className="inline-flex items-center justify-center w-20 h-20 rounded-xl text-3xl font-bold text-white shadow-lg mb-3"
                  style={{ backgroundColor: `hsl(var(--${knownElement?.category || 'primary'}))` }}
                >
                  {knownElement ? knownElement.symbol : "?"}
                </div>
                <div className="text-lg font-bold">
                  {knownElement ? knownElement.name : "Custom Element"}
                </div>
                <div className="text-sm text-muted-foreground">
                  Atomic Number: {protons}
                </div>
              </div>
              
              {/* Enhanced Atom Visualization */}
              <div className="bg-gradient-to-br from-background/50 to-secondary/20 rounded-xl p-6 border border-border/30 mb-6">
                <AtomVisualization 
                  element={customElement} 
                  showTitle={false}
                  showParticleCount={true}
                  className="scale-110"
                />
              </div>
              
              {/* Quick presets */}
              <div className="w-full max-w-md space-y-2">
                <h3 className="text-xs font-semibold text-center text-muted-foreground">Quick Presets</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    className="px-2 py-1 text-xs bg-secondary hover:bg-secondary/80 rounded-md transition-colors border border-border/50"
                    onClick={() => {
                      setProtons(1); setElectrons(1); setNeutrons(0);
                    }}
                  >
                    Hydrogen
                  </button>
                  <button
                    className="px-2 py-1 text-xs bg-secondary hover:bg-secondary/80 rounded-md transition-colors border border-border/50"
                    onClick={() => {
                      setProtons(2); setElectrons(2); setNeutrons(2);
                    }}
                  >
                    Helium
                  </button>
                  <button
                    className="px-2 py-1 text-xs bg-secondary hover:bg-secondary/80 rounded-md transition-colors border border-border/50"
                    onClick={() => {
                      setProtons(6); setElectrons(6); setNeutrons(6);
                    }}
                  >
                    Carbon
                  </button>
                  <button
                    className="px-2 py-1 text-xs bg-secondary hover:bg-secondary/80 rounded-md transition-colors border border-border/50"
                    onClick={() => {
                      setProtons(8); setElectrons(8); setNeutrons(8);
                    }}
                  >
                    Oxygen
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        </div>
      </div>
    </div>
  );
};