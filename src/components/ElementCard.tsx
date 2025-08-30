import { Element, getCategoryColor } from "@/data/elements";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ElementCardProps {
  element: Element;
  onClick?: () => void;
  className?: string;
}

export const ElementCard = ({ element, onClick, className }: ElementCardProps) => {
  const categoryColor = getCategoryColor(element.category);
  
  return (
    <Card
      className={cn(
        "relative p-3 cursor-pointer transition-all duration-300 border backdrop-blur-sm",
        "hover:scale-110 hover:shadow-xl hover:border-white/40 hover:z-10",
        "group min-h-[90px] flex flex-col justify-between transform-gpu",
        "shadow-lg border-white/20",
        className
      )}
      style={{
        backgroundColor: `hsl(var(--${element.category.replace('-', '-')}) / 0.9)`,
        boxShadow: `0 8px 32px hsl(var(--${element.category.replace('-', '-')}) / 0.3)`
      }}
      onClick={onClick}
      title={element.name_nb || element.name}
    >
      <div className="absolute top-1 left-1 text-xs text-white/90 font-semibold">
        {element.atomicNumber}
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-white mb-1 drop-shadow-lg">
            {element.symbol}
          </div>
          <div className="text-xs text-white/95 leading-tight font-semibold tracking-wide">
            {element.name_nb || element.name}
          </div>
        </div>
      </div>

      <div className="text-xs text-white/90 text-center font-bold">
        {element.atomicMass.toFixed(2)} u
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none" />
    </Card>
  );
};