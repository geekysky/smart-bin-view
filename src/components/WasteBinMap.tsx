
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WasteBin, getBinFillStatus } from '@/types/wastebin';
import { MapPin, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type WasteBinMapProps = {
  bins: WasteBin[];
  selectedBin: WasteBin | null;
  onSelectBin: (bin: WasteBin) => void;
};

const WasteBinMap: React.FC<WasteBinMapProps> = ({ bins, selectedBin, onSelectBin }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapInstanceRef = useRef<any>(null);

  const handleMapboxTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMapboxToken(e.target.value);
    localStorage.setItem('mapbox_token', e.target.value);
  };

  useEffect(() => {
    // Try to load token from localStorage
    const savedToken = localStorage.getItem('mapbox_token');
    if (savedToken) {
      setMapboxToken(savedToken);
    }
  }, []);

  useEffect(() => {
    if (!mapboxToken || !mapRef.current || mapLoaded) return;

    const loadMapbox = async () => {
      try {
        // Dynamically import mapbox-gl
        const mapboxgl = await import('mapbox-gl');
        await import('mapbox-gl/dist/mapbox-gl.css');

        mapboxgl.default.accessToken = mapboxToken;

        // Create the map centered on Pune, India
        const map = new mapboxgl.default.Map({
          container: mapRef.current!,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [73.8567, 18.5204], // Pune, India center coordinates
          zoom: 11
        });

        mapInstanceRef.current = map;

        map.addControl(new mapboxgl.default.NavigationControl(), 'top-right');

        map.on('load', () => {
          setMapLoaded(true);
          toast.success("Map loaded successfully", {
            description: "The map is now showing waste bins in Pune, India.",
          });

          // Add markers for each bin
          bins.forEach(bin => {
            const fillStatus = getBinFillStatus(bin.fillLevel);
            
            const markerElement = document.createElement('div');
            markerElement.className = cn(
              'flex items-center justify-center w-10 h-10 rounded-full cursor-pointer transition-all',
              {
                'bg-bin-empty': fillStatus === 'empty',
                'bg-bin-medium': fillStatus === 'medium',
                'bg-bin-full': fillStatus === 'full',
                'bg-bin-critical': fillStatus === 'critical',
                'animate-pulse-slow': fillStatus === 'critical',
                'border-4 border-blue-500 scale-125': selectedBin?.id === bin.id
              }
            );
            
            const binIcon = document.createElement('span');
            binIcon.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>`;
            markerElement.appendChild(binIcon);

            const marker = new mapboxgl.default.Marker(markerElement)
              .setLngLat([bin.location.longitude, bin.location.latitude])
              .setPopup(
                new mapboxgl.default.Popup({ offset: 25 })
                  .setHTML(`
                    <div class="font-medium">${bin.name}</div>
                    <div class="text-sm">Fill level: ${bin.fillLevel}%</div>
                    <div class="text-xs text-gray-500">${bin.location.address}</div>
                  `)
              )
              .addTo(map);

            markerElement.addEventListener('click', () => {
              onSelectBin(bin);
            });
          });
        });

        // Fly to the selected bin when it changes
        if (selectedBin && mapInstanceRef.current) {
          mapInstanceRef.current.flyTo({
            center: [selectedBin.location.longitude, selectedBin.location.latitude],
            zoom: 14,
            duration: 1500
          });
        }

        return () => map.remove();
      } catch (error) {
        console.error('Failed to load map:', error);
        toast.error("Map failed to load", {
          description: "Please check your Mapbox token and try again.",
        });
      }
    };

    if (mapboxToken) {
      loadMapbox();
    }
  }, [bins, mapboxToken, mapLoaded, onSelectBin]);

  // Effect to handle flying to the selected bin
  useEffect(() => {
    if (selectedBin && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo({
        center: [selectedBin.location.longitude, selectedBin.location.latitude],
        zoom: 14,
        duration: 1500
      });
    }
  }, [selectedBin]);

  return (
    <Card className="col-span-1 h-[600px] lg:col-span-2">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <MapPin className="mr-2 h-5 w-5" />
          Waste Bin Locations in Pune
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!mapboxToken && (
          <div className="p-4 flex flex-col items-center justify-center h-full bg-muted rounded-md">
            <Trash2 className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Mapbox Token Required</h3>
            <p className="text-sm text-muted-foreground text-center mb-4">
              To display the map, please enter your Mapbox public token.
              You can get one for free at <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">mapbox.com</a>.
            </p>
            <input
              type="text"
              value={mapboxToken}
              onChange={handleMapboxTokenChange}
              placeholder="Enter your Mapbox token"
              className="w-full p-2 border rounded-md"
            />
          </div>
        )}
        <div 
          ref={mapRef} 
          className={cn(
            "w-full h-full rounded-md", 
            { "hidden": !mapboxToken }
          )}
        />
      </CardContent>
    </Card>
  );
};

export default WasteBinMap;
