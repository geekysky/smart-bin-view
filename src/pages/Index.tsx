
import React, { useState } from 'react';
import { wasteBinData } from '@/data/wastebins';
import { WasteBin } from '@/types/wastebin';
import WasteBinMap from '@/components/WasteBinMap';
import WasteBinTable from '@/components/WasteBinTable';
import WasteBinDetail from '@/components/WasteBinDetail';
import WasteBinStats from '@/components/WasteBinStats';
import { Toaster } from '@/components/ui/sonner';

const Index = () => {
  const [bins] = useState<WasteBin[]>(wasteBinData);
  const [selectedBin, setSelectedBin] = useState<WasteBin | null>(null);

  const handleSelectBin = (bin: WasteBin) => {
    setSelectedBin(bin.id === selectedBin?.id ? null : bin);
  };

  return (
    <div className="container mx-auto py-6 px-4 space-y-6">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Smart Waste Management Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Monitor waste bin fill levels and plan efficient collection routes
        </p>
      </header>

      <WasteBinStats bins={bins} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <WasteBinMap 
          bins={bins} 
          selectedBin={selectedBin} 
          onSelectBin={handleSelectBin} 
        />
        <WasteBinDetail bin={selectedBin} />
      </div>

      <WasteBinTable 
        bins={bins} 
        selectedBin={selectedBin} 
        onSelectBin={handleSelectBin} 
      />

      <Toaster />
    </div>
  );
};

export default Index;
