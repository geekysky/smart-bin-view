
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WasteBin, getBinFillColor, getBinFillStatus, getBinTypeLabel } from '@/types/wastebin';
import { formatDistanceToNow, format } from 'date-fns';
import { Trash2, MapPin, Clock, Info, BarChart2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface WasteBinDetailProps {
  bin: WasteBin | null;
}

const WasteBinDetail: React.FC<WasteBinDetailProps> = ({ bin }) => {
  if (!bin) {
    return (
      <Card className="col-span-1 h-[600px] flex items-center justify-center">
        <CardContent className="text-center text-muted-foreground">
          <Trash2 className="h-10 w-10 mx-auto mb-4 opacity-30" />
          <p>Select a waste bin to view details</p>
        </CardContent>
      </Card>
    );
  }

  const fillStatus = getBinFillStatus(bin.fillLevel);
  const exactTime = format(new Date(bin.lastUpdated), 'PPpp');
  const relativeTime = formatDistanceToNow(new Date(bin.lastUpdated), { addSuffix: true });

  return (
    <Card className="col-span-1 h-[600px] overflow-auto">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <Trash2 className="mr-2 h-5 w-5" />
          {bin.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-sm font-medium flex items-center mb-2">
            <MapPin className="mr-2 h-4 w-4" />
            Location
          </h3>
          <p className="text-sm">{bin.location.address}</p>
          <div className="text-xs text-muted-foreground mt-1">
            Coordinates: {bin.location.latitude.toFixed(4)}, {bin.location.longitude.toFixed(4)}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-sm font-medium flex items-center mb-2">
            <BarChart2 className="mr-2 h-4 w-4" />
            Fill Status
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Current Fill Level:</span>
              <span className={cn("font-medium", {
                "text-bin-empty": fillStatus === 'empty',
                "text-bin-medium": fillStatus === 'medium',
                "text-bin-full": fillStatus === 'full',
                "text-bin-critical": fillStatus === 'critical',
              })}>
                {bin.fillLevel}%
              </span>
            </div>
            <progress 
              className={cn("w-full rounded h-4", getBinFillColor(bin.fillLevel))} 
              value={bin.fillLevel} 
              max="100" 
            />
            <div className="text-xs text-muted-foreground capitalize">
              Status: {fillStatus}
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-sm font-medium flex items-center mb-2">
            <Clock className="mr-2 h-4 w-4" />
            Last Updated
          </h3>
          <p className="text-sm">{relativeTime}</p>
          <div className="text-xs text-muted-foreground mt-1" title={exactTime}>
            {exactTime}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-sm font-medium flex items-center mb-2">
            <Info className="mr-2 h-4 w-4" />
            Additional Information
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Bin Type:</span>
              <span className="text-sm font-medium capitalize">{getBinTypeLabel(bin.binType)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Status:</span>
              <span className="text-sm font-medium capitalize">{bin.status}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">ID:</span>
              <span className="text-sm font-mono">{bin.id}</span>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-sm font-medium mb-2">Recommended Actions</h3>
          {fillStatus === 'critical' && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 p-3 rounded-md text-sm">
              <strong>Urgent collection required!</strong> This bin is almost full and should be emptied immediately.
            </div>
          )}
          {fillStatus === 'full' && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 p-3 rounded-md text-sm">
              <strong>Collection needed soon.</strong> This bin is filling up and should be included in the next collection route.
            </div>
          )}
          {fillStatus === 'medium' && (
            <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 p-3 rounded-md text-sm">
              <strong>Monitor fill level.</strong> No immediate action required, but this bin should be monitored.
            </div>
          )}
          {fillStatus === 'empty' && (
            <div className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 p-3 rounded-md text-sm">
              <strong>No action needed.</strong> This bin has plenty of capacity remaining.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WasteBinDetail;
