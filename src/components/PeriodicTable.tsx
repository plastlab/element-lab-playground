import { elements, Element } from "@/data/elements";
import { ElementCard } from "./ElementCard";
import { useState } from "react";
import { ElementDialog } from "./ElementDialog";

export const PeriodicTable = () => {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  
  // Lag et rutenett med 18 kolonner og 7 rader
  const renderGrid = () => {
    const grid = [];
    for (let row = 1; row <= 7; row++) {
      const rowElements = [];
      for (let col = 1; col <= 18; col++) {
        const element = elements.find(el => el.period === row && el.group === col && el.category !== 'lanthanide' && el.category !== 'actinide');
        if (element) {
          rowElements.push(
            <div key={element.atomicNumber} className="aspect-square animate-scale-in" style={{ animationDelay: `${Math.random() * 0.5}s`, minWidth: 64, minHeight: 64, maxWidth: 96, maxHeight: 96 }}>
              <ElementCard
                element={{...element, name: element.name_nb || element.name}}
                onClick={() => setSelectedElement(element)}
                className="w-full h-full min-w-[64px] min-h-[64px] md:min-w-[80px] md:min-h-[80px] lg:min-w-[96px] lg:min-h-[96px]"
              />
            </div>
          );
        } else {
          rowElements.push(
            <div key={`${row}-${col}`} className="aspect-square min-w-[64px] min-h-[64px] md:min-w-[80px] md:min-h-[80px] lg:min-w-[96px] lg:min-h-[96px]" />
          );
        }
      }
      grid.push(
        <div key={row} className="grid grid-cols-18 gap-2 md:gap-3">
          {rowElements}
        </div>
      );
    }
    return grid;
  };

  // Gjør f-blokkserier (lantanider og actinider) i egne rader
  const renderSeries = (series: 'lanthanide' | 'actinide') => {
    const items = elements
      .filter(el => el.category === series)
      .sort((a, b) => a.atomicNumber - b.atomicNumber);
    const startCol = 4;
    const totalCols = 18;
    const cols = Array.from({ length: totalCols }, (_, i) => i + 1);
    return (
      <div className="grid grid-cols-18 gap-2 md:gap-3">
        {cols.map(col => {
          if (col < startCol) return <div key={col} className="aspect-square min-w-[64px] min-h-[64px] md:min-w-[80px] md:min-h-[80px] lg:min-w-[96px] lg:min-h-[96px]" />;
          const index = col - startCol;
          const element = items[index];
          if (!element) return <div key={col} className="aspect-square min-w-[64px] min-h-[64px] md:min-w-[80px] md:min-h-[80px] lg:min-w-[96px] lg:min-h-[96px]" />;
          return (
            <div key={element.atomicNumber} className="aspect-square animate-scale-in" style={{ animationDelay: `${Math.random() * 0.5}s`, minWidth: 64, minHeight: 64, maxWidth: 96, maxHeight: 96 }}>
              <ElementCard
                element={element}
                onClick={() => setSelectedElement(element)}
                className="w-full h-full min-w-[64px] min-h-[64px] md:min-w-[80px] md:min-h-[80px] lg:min-w-[96px] lg:min-h-[96px]"
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 animate-fade-in">
      <div className="space-y-1 mb-8">
        {renderGrid()}
      </div>

      {/* Lantanider */}
      <div className="space-y-1 mb-2">
        {renderSeries('lanthanide')}
      </div>
      {/* Aktinider */}
      <div className="space-y-1 mb-8">
        {renderSeries('actinide')}
      </div>

      {/* Forbedret forklaring med animasjoner */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 p-6 bg-gradient-card rounded-xl border border-border/50">
        <h3 className="col-span-full text-lg font-semibold mb-2 text-center">Grunnstoffkategorier</h3>
        {[
          { category: 'alkali-metal', name: 'Alkalimetaller' },
          { category: 'alkaline-earth', name: 'Jordalkalimetaller' },
          { category: 'transition-metal', name: 'Overgangsmetaller' },
          { category: 'post-transition', name: 'Post-overgangsmetaller' },
          { category: 'metalloid', name: 'Halvmetaller' },
          { category: 'nonmetal', name: 'Ikke-metaller' },
          { category: 'halogen', name: 'Halogener' },
          { category: 'noble-gas', name: 'Edelgasser' },
          { category: 'lanthanide', name: 'Lantanider' },
          { category: 'actinide', name: 'Aktinider' }
        ].map(({ category, name }) => (
          <div key={category} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/30 transition-colors">
            <div 
              className="w-5 h-5 rounded border border-white/20 shadow-sm"
              style={{ backgroundColor: `hsl(var(--${category}))` }}
            />
            <span className="text-sm font-medium text-foreground">{name}</span>
          </div>
        ))}
      </div>

      <ElementDialog 
        element={selectedElement} 
        onClose={() => setSelectedElement(null)} 
      />
    </div>
  );
};