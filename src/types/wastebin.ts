
export interface WasteBin {
  id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  fillLevel: number; // 0-100 percentage
  lastUpdated: string;
  binType: BinType;
  status: BinStatus;
}

export type BinType = 'general' | 'recyclable' | 'organic' | 'hazardous';
export type BinStatus = 'operational' | 'maintenance' | 'offline';

export const getBinFillStatus = (fillLevel: number): 'empty' | 'medium' | 'full' | 'critical' => {
  if (fillLevel < 30) return 'empty';
  if (fillLevel < 70) return 'medium';
  if (fillLevel < 90) return 'full';
  return 'critical';
};

export const getBinStatusColor = (status: BinStatus): string => {
  switch (status) {
    case 'operational': return 'bg-green-500';
    case 'maintenance': return 'bg-yellow-500';
    case 'offline': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

export const getBinFillColor = (fillLevel: number): string => {
  const status = getBinFillStatus(fillLevel);
  switch (status) {
    case 'empty': return 'bg-bin-empty';
    case 'medium': return 'bg-bin-medium';
    case 'full': return 'bg-bin-full';
    case 'critical': return 'bg-bin-critical';
    default: return 'bg-gray-300';
  }
};

export const getBinTypeLabel = (binType: BinType): string => {
  switch (binType) {
    case 'general': return 'General Waste';
    case 'recyclable': return 'Recyclable';
    case 'organic': return 'Organic';
    case 'hazardous': return 'Hazardous';
    default: return 'Unknown';
  }
};
