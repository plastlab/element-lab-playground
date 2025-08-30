import { Element } from "@/data/elements";

interface ParticleCountProps {
  element: Element;
  className?: string;
}

export const ParticleCount = ({ element, className }: ParticleCountProps) => {
  const { protons, neutrons, electrons } = element;
  
  return (
    <div className={`space-y-2 text-sm ${className}`}>
      <div className="flex items-center gap-3">
        <span className="font-semibold text-foreground w-4">{protons}</span>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <span className="text-red-400 font-medium">Protoner</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-semibold text-foreground w-4">{neutrons}</span>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full" />
          <span className="text-yellow-400 font-medium">Nøytroner</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-semibold text-foreground w-4">{electrons}</span>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-400 rounded-full" />
          <span className="text-blue-400 font-medium">Elektroner</span>
        </div>
      </div>
    </div>
  );
};