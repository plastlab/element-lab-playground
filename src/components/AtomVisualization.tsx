import { Element } from "@/data/elements";
import { cn } from "@/lib/utils";
import { ParticleCount } from "./ParticleCount";

interface AtomVisualizationProps {
  element: Element;
  className?: string;
  showTitle?: boolean;
  showParticleCount?: boolean;
}

export const AtomVisualization = ({ 
  element, 
  className, 
  showTitle = false,
  showParticleCount = true 
}: AtomVisualizationProps) => {
  const { protons, electrons, neutrons } = element;
  
  // Simple electron shell configuration
  const getElectronShells = (electronCount: number) => {
    const shells = [];
    let remaining = electronCount;
    const shellCapacities = [2, 8, 18, 32];
    
    for (let i = 0; i < shellCapacities.length && remaining > 0; i++) {
      const electronsInShell = Math.min(remaining, shellCapacities[i]);
      shells.push(electronsInShell);
      remaining -= electronsInShell;
    }
    
    return shells;
  };
  
  const electronShells = getElectronShells(electrons);
  
  // Calculate sizes based on atom complexity
    // Ekstra stor atomvisualisering, ingen scroll, tillat overlapp
    const baseSize = 520;
    const nucleusSize = Math.max(80, Math.min(200, (protons + neutrons) * 1.5 + 60));
    const particleSize = 16;
  
  // Arrange nucleus particles in a more realistic pattern
  const arrangeNucleusParticles = () => {
    const totalParticles = protons + neutrons;
    const particles = [];
    
    // Create particles array
    for (let i = 0; i < protons; i++) {
      particles.push({ type: 'proton', id: `p-${i}` });
    }
    for (let i = 0; i < neutrons; i++) {
      particles.push({ type: 'neutron', id: `n-${i}` });
    }
    
    // Shuffle for realistic mixing
    for (let i = particles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [particles[i], particles[j]] = [particles[j], particles[i]];
    }
    
    const arranged = [];
    const radius = nucleusSize / 2 - particleSize;
    
    if (totalParticles === 1) {
      arranged.push({ ...particles[0], x: 0, y: 0 });
    } else if (totalParticles <= 4) {
      // Small cluster arrangement
      const positions = [
        { x: -particleSize/2, y: -particleSize/2 },
        { x: particleSize/2, y: -particleSize/2 },
        { x: -particleSize/2, y: particleSize/2 },
        { x: particleSize/2, y: particleSize/2 }
      ];
      
      particles.forEach((particle, index) => {
        if (positions[index]) {
          arranged.push({
            ...particle,
            x: positions[index].x,
            y: positions[index].y
          });
        }
      });
    } else {
      // Circular arrangement for larger nuclei
      particles.forEach((particle, index) => {
        const angle = (index / totalParticles) * 2 * Math.PI;
        const r = radius * 0.7;
        arranged.push({
          ...particle,
          x: r * Math.cos(angle),
          y: r * Math.sin(angle)
        });
      });
    }
    
    return arranged;
  };
  
  const nucleusParticles = arrangeNucleusParticles();
  
  return (
      <div className={cn("flex flex-col items-center w-full overflow-visible", className)}>
      {showTitle && (
          <h3 className="text-2xl font-bold mb-6 text-center">{element.name_nb || element.name}</h3>
      )}
        <div className="relative mb-8 z-[10000] overflow-visible" style={{ width: baseSize, height: baseSize }}>
        {/* Hovedatom-container */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Elektronskall */}
          {electronShells.map((shellElectrons, shellIndex) => {
            const shellRadius = nucleusSize/2 + 32 + shellIndex * 44;
            return (
              <div key={shellIndex}>
                {/* Skallbane */}
                <div 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-foreground/20 rounded-full"
                  style={{
                    width: shellRadius * 2,
                    height: shellRadius * 2,
                  }}
                />
                {/* Elektroner */}
                {Array.from({ length: shellElectrons }).map((_, electronIndex) => {
                  const angle = (electronIndex / shellElectrons) * 360;
                  const radian = (angle * Math.PI) / 180;
                  const x = shellRadius * Math.cos(radian);
                  const y = shellRadius * Math.sin(radian);
                  return (
                    <div
                      key={electronIndex}
                      className="absolute w-3 h-3 bg-blue-400 rounded-full shadow-sm"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                      }}
                    />
                  );
                })}
              </div>
            );
          })}
          {/* Kjerne */}
          <div 
            className="relative border-2 border-foreground/30 rounded-full bg-background/50 flex items-center justify-center"
            style={{
              width: nucleusSize,
              height: nucleusSize,
            }}
          >
            {/* Kjernepartikler */}
            {nucleusParticles.map((particle) => (
              <div
                key={particle.id}
                className={cn(
                  "absolute rounded-full",
                  particle.type === 'proton' 
                    ? "bg-red-500" 
                    : "bg-yellow-500"
                )}
                style={{
                  width: particleSize,
                  height: particleSize,
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) translate(${particle.x}px, ${particle.y}px)`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Partikkelteller */}
      {showParticleCount && (
          <ParticleCount element={element} className="mt-4" />
      )}
    </div>
  );
};