
import React from 'react';
import { WasteBin, getBinFillStatus } from '@/types/wastebin';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, AlertTriangle, ThumbsUp, BarChart, PercentIcon } from 'lucide-react';

interface WasteBinStatsProps {
  bins: WasteBin[];
}

const WasteBinStats: React.FC<WasteBinStatsProps> = ({ bins }) => {
  // Calculate statistics
  const totalBins = bins.length;
  const criticalBins = bins.filter(bin => getBinFillStatus(bin.fillLevel) === 'critical').length;
  const emptyBins = bins.filter(bin => getBinFillStatus(bin.fillLevel) === 'empty').length;
  
  const averageFillLevel = bins.reduce((sum, bin) => sum + bin.fillLevel, 0) / totalBins;
  
  const needsAttention = bins.filter(bin => 
    getBinFillStatus(bin.fillLevel) === 'critical' || 
    getBinFillStatus(bin.fillLevel) === 'full' ||
    bin.status !== 'operational'
  ).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Bins</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Trash2 className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="text-2xl font-bold">{totalBins}</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Critical Bins</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <AlertTriangle className="mr-2 h-4 w-4 text-red-500" />
            <span className="text-2xl font-bold">{criticalBins}</span>
            <span className="ml-2 text-sm text-muted-foreground">
              ({((criticalBins / totalBins) * 100).toFixed(1)}%)
            </span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Available Capacity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <ThumbsUp className="mr-2 h-4 w-4 text-green-500" />
            <span className="text-2xl font-bold">{emptyBins}</span>
            <span className="ml-2 text-sm text-muted-foreground">
              ({((emptyBins / totalBins) * 100).toFixed(1)}% optimal)
            </span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Average Fill Level</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <PercentIcon className="mr-2 h-4 w-4 text-blue-500" />
            <span className="text-2xl font-bold">{averageFillLevel.toFixed(1)}%</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WasteBinStats;
