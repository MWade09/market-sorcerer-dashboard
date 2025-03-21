
import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPinIcon, TruckIcon, HomeIcon, UsersIcon } from 'lucide-react';
import { Order } from "@/types/orders";
import { Driver } from "@/types/drivers";

interface LiveOrderMapProps {
  orders: Order[];
  drivers: Driver[];
}

const LiveOrderMap = ({ orders, drivers }: LiveOrderMapProps) => {
  const [mapApiKey, setMapApiKey] = useState<string>("");
  const [showApiKeyInput, setShowApiKeyInput] = useState<boolean>(true);
  
  // This is a placeholder component for the map
  // In a real implementation, you would integrate with a mapping API service
  
  return (
    <div className="h-full w-full">
      {showApiKeyInput ? (
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-medium">Live Dispatch Map</h3>
            <p className="text-sm text-muted-foreground">
              Enter your Google Maps API key to enable real-time tracking of all deliveries
            </p>
          </div>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="password"
              placeholder="Enter Google Maps API Key"
              value={mapApiKey}
              onChange={(e) => setMapApiKey(e.target.value)}
            />
            <Button 
              onClick={() => setShowApiKeyInput(false)}
              disabled={!mapApiKey}
            >
              Save
            </Button>
          </div>
          <p className="text-xs text-muted-foreground max-w-sm text-center">
            For production use, you should securely store your API keys using Supabase or environment variables.
          </p>
        </div>
      ) : (
        <div className="relative h-full w-full bg-muted rounded-md overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            <p>Dispatch map visualization with all orders and drivers</p>
          </div>
          
          {/* Simulated map elements */}
          {orders.map((order, index) => (
            <div key={order.id} className="absolute" style={{ 
              left: `${(index * 15) % 80 + 10}%`, 
              top: `${(index * 10) % 70 + 15}%` 
            }}>
              <div className={`h-8 w-8 rounded-full ${
                order.status === 'pending' ? 'bg-primary' : 
                order.status === 'in-transit' ? 'bg-secondary' : 'bg-green-500'
              } flex items-center justify-center text-white`}>
                <MapPinIcon className="h-4 w-4" />
              </div>
              <div className="mt-1 text-xs font-medium bg-background p-1 rounded shadow-sm">
                Order {order.id}
              </div>
            </div>
          ))}
          
          {drivers.map((driver, index) => (
            <div key={driver.id} className="absolute" style={{ 
              left: `${(index * 20) % 80 + 10}%`, 
              top: `${(index * 15) % 70 + 15}%` 
            }}>
              <div className={`h-10 w-10 rounded-full ${
                driver.isAvailable ? 'bg-blue-500' : 'bg-yellow-500'
              } flex items-center justify-center text-white ${
                !driver.isAvailable ? 'animate-pulse' : ''
              }`}>
                <TruckIcon className="h-5 w-5" />
              </div>
              <div className="mt-1 text-xs font-medium bg-background p-1 rounded shadow-sm">
                {driver.name}
              </div>
            </div>
          ))}
          
          {/* Legend */}
          <div className="absolute bottom-4 right-4 bg-background p-3 rounded-md shadow-md">
            <div className="text-xs font-medium mb-2">Map Legend</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-primary"></div>
                <span className="text-xs">Pending Order</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-secondary"></div>
                <span className="text-xs">In Transit</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-green-500"></div>
                <span className="text-xs">Delivered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                <span className="text-xs">Available Driver</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-yellow-500"></div>
                <span className="text-xs">Busy Driver</span>
              </div>
            </div>
          </div>
          
          {/* Controls */}
          <div className="absolute top-4 right-4 space-y-2">
            <Button size="sm" variant="secondary" className="w-8 h-8 p-0 rounded-full">+</Button>
            <Button size="sm" variant="secondary" className="w-8 h-8 p-0 rounded-full">-</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveOrderMap;
