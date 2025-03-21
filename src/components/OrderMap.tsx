
import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPinIcon, TruckIcon, HomeIcon } from 'lucide-react';
import { Order } from "@/types/orders";

interface OrderMapProps {
  order: Order;
}

const OrderMap = ({ order }: OrderMapProps) => {
  const [mapApiKey, setMapApiKey] = useState<string>("");
  const [showApiKeyInput, setShowApiKeyInput] = useState<boolean>(true);
  
  // This is a placeholder component for the map
  // In a real implementation, you would integrate with a mapping API service
  
  return (
    <div className="h-full w-full">
      {showApiKeyInput ? (
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-medium">Map Integration</h3>
            <p className="text-sm text-muted-foreground">
              Enter your Google Maps API key to enable real-time tracking
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
        <div className="space-y-4 h-full">
          <div className="relative h-[300px] bg-muted rounded-md overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-muted-foreground">Map visualization would appear here with the Google Maps API</p>
            </div>
            
            {/* Simulated map elements */}
            <div className="absolute left-1/4 top-1/3">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                <HomeIcon className="h-4 w-4" />
              </div>
              <div className="mt-1 text-xs font-medium bg-background p-1 rounded shadow-sm">
                {order.pickupLocation}
              </div>
            </div>
            
            <div className="absolute right-1/4 bottom-1/3">
              <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground">
                <MapPinIcon className="h-4 w-4" />
              </div>
              <div className="mt-1 text-xs font-medium bg-background p-1 rounded shadow-sm">
                Delivery
              </div>
            </div>
            
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white animate-pulse">
                <TruckIcon className="h-4 w-4" />
              </div>
              <div className="mt-1 text-xs font-medium bg-background p-1 rounded shadow-sm">
                Driver
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <HomeIcon className="h-4 w-4 text-primary" />
                <div className="text-sm">
                  <div className="font-medium">Pickup</div>
                  <div className="text-muted-foreground">{order.pickupLocation} Bakery</div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">10:30 AM</div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <MapPinIcon className="h-4 w-4 text-secondary" />
                <div className="text-sm">
                  <div className="font-medium">Delivery</div>
                  <div className="text-muted-foreground">{order.deliveryAddress}</div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">11:45 AM (estimated)</div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <TruckIcon className="h-4 w-4 text-blue-500" />
                <div className="text-sm">
                  <div className="font-medium">Driver</div>
                  <div className="text-muted-foreground">John Smith • En Route</div>
                </div>
              </div>
              <Button variant="outline" size="sm">Contact</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderMap;
