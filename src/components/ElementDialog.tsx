import { Element, getCategoryColor } from "@/data/elements";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { AtomVisualization } from "./AtomVisualization";

interface ElementDialogProps {
  element: Element | null;
  onClose: () => void;
}

export const ElementDialog = ({ element, onClose }: ElementDialogProps) => {
  if (!element) return null;

  return (
    <Dialog open={!!element} onOpenChange={onClose}>
      <DialogContent
        className="max-w-none w-[98vw] lg:w-[1400px] xl:w-[1700px] min-h-[700px] bg-gradient-card border-border/50 animate-scale-in"
        style={{
          overflow: 'visible',
          maxHeight: 'none',
          zIndex: 9999,
        }}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold text-background"
              style={{ backgroundColor: `hsl(var(--${element.category}))` }}
            >
              {element.symbol}
            </div>
            <div>
              <div className="text-2xl font-bold">{element.name_nb || element.name}</div>
              <div className="text-sm text-muted-foreground">
                Atomnummer {element.atomicNumber}
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6 mt-4">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Grunnleggende egenskaper</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Atommasse:</span>
                  <span>{element.atomicMass} u</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Gruppe:</span>
                  <span>{element.group}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Periode:</span>
                  <span>{element.period}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Kategori:</span>
                  <Badge 
                    variant="secondary"
                    className="text-background"
                    style={{ backgroundColor: `hsl(var(--${element.category}))` }}
                  >
                    {element.category.replace('-', ' ').replace('alkali metal', 'alkalimetall').replace('alkaline earth', 'jordalkalimetall').replace('transition metal', 'overgangsmetall').replace('post transition', 'post-overgangsmetall').replace('metalloid', 'halvmetall').replace('nonmetal', 'ikke-metall').replace('halogen', 'halogen').replace('noble gas', 'edelgass').replace('lanthanide', 'lantanide').replace('actinide', 'aktinide')}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Atomstruktur</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Protoner:</span>
                  <span className="text-primary font-medium">{element.protons}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Elektroner:</span>
                  <span className="text-accent font-medium">{element.electrons}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nøytroner:</span>
                  <span className="text-secondary-foreground font-medium">{element.neutrons}</span>
                </div>
              </div>
            </div>
            
            {(element.electronegativity || element.ionizationEnergy) && (
              <div>
                <h3 className="font-semibold mb-2">Kjemiske egenskaper</h3>
                <div className="space-y-2 text-sm">
                  {element.electronegativity && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Elektronegativitet:</span>
                      <span>{element.electronegativity}</span>
                    </div>
                  )}
                  {element.ionizationEnergy && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ioniseringsenergi:</span>
                      <span>{element.ionizationEnergy} kJ/mol</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-3">Atomvisualisering</h3>
              <div className="bg-background/50 rounded-lg p-4 border border-border/30">
                <AtomVisualization 
                  element={element} 
                  showParticleCount={true}
                  className="scale-110 origin-center"
                />
              </div>
            </div>
            
            {element.description && (
              <div>
                <h3 className="font-semibold mb-2">Beskrivelse</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {element.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};