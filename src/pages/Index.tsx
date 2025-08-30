import { Navigation } from "@/components/Navigation";
import { PeriodicTable } from "@/components/PeriodicTable";

const Index = () => {
  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Navigation />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Interactive Periodic Table
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Explore the fundamental building blocks of the universe. Click on any element to discover its atomic structure, properties, and fascinating characteristics.
            </p>
          </div>
          
          <PeriodicTable />
        </div>
      </main>
    </div>
  );
};

export default Index;
