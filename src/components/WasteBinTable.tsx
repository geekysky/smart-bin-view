
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { WasteBin, getBinFillColor, getBinTypeLabel, getBinStatusColor } from '@/types/wastebin';
import { formatDistanceToNow } from 'date-fns';
import { Trash, ArrowUp, ArrowDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type SortField = 'name' | 'fillLevel' | 'lastUpdated' | 'binType' | 'status';
type SortDirection = 'asc' | 'desc';

interface WasteBinTableProps {
  bins: WasteBin[];
  selectedBin: WasteBin | null;
  onSelectBin: (bin: WasteBin) => void;
}

const WasteBinTable: React.FC<WasteBinTableProps> = ({ bins, selectedBin, onSelectBin }) => {
  const [sortField, setSortField] = useState<SortField>('fillLevel');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortedBins = () => {
    return [...bins].sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'fillLevel':
          comparison = a.fillLevel - b.fillLevel;
          break;
        case 'lastUpdated':
          comparison = new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime();
          break;
        case 'binType':
          comparison = a.binType.localeCompare(b.binType);
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
        default:
          comparison = 0;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  };

  const sortedBins = getSortedBins();

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    
    return sortDirection === 'asc' ? (
      <ArrowUp className="ml-1 h-4 w-4 inline" />
    ) : (
      <ArrowDown className="ml-1 h-4 w-4 inline" />
    );
  };

  return (
    <Card className="col-span-1 h-[600px] overflow-hidden flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <Trash className="mr-2 h-5 w-5" />
          Waste Bin Status
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto p-0">
        <Table>
          <TableHeader className="sticky top-0 bg-background">
            <TableRow>
              <TableHead className="cursor-pointer w-[180px]" onClick={() => handleSort('name')}>
                Bin Name {renderSortIcon('name')}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('fillLevel')}>
                Fill Level {renderSortIcon('fillLevel')}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('lastUpdated')}>
                Last Updated {renderSortIcon('lastUpdated')}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('binType')}>
                Type {renderSortIcon('binType')}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('status')}>
                Status {renderSortIcon('status')}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedBins.map((bin) => (
              <TableRow 
                key={bin.id} 
                className={cn(
                  "cursor-pointer hover:bg-muted/50 transition-colors",
                  { "bg-blue-50 dark:bg-blue-900/20": selectedBin?.id === bin.id }
                )}
                onClick={() => onSelectBin(bin)}
              >
                <TableCell className="font-medium">
                  {bin.name}
                  <div className="text-xs text-muted-foreground">
                    {bin.location.address.split(',')[0]}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <progress 
                      className={cn("w-full rounded", getBinFillColor(bin.fillLevel))} 
                      value={bin.fillLevel} 
                      max="100" 
                    />
                    <span className="text-sm">{bin.fillLevel}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm">
                  {formatDistanceToNow(new Date(bin.lastUpdated), { addSuffix: true })}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-normal">
                    {getBinTypeLabel(bin.binType)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div className={cn("w-2 h-2 rounded-full mr-2", getBinStatusColor(bin.status))}></div>
                    <span className="capitalize">{bin.status}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default WasteBinTable;
