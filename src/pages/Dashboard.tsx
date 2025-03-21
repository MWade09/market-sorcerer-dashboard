
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrderDashboard from './OrderDashboard';
import DriverDashboard from './DriverDashboard';
import { useToast } from "@/hooks/use-toast";
import { TruckIcon, UsersIcon, HomeIcon, MapIcon } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const { toast } = useToast();
  
  return (
    <div className="container mx-auto px-4 py-6">
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TruckIcon className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">RoadRunner Delivery</h1>
          </div>
          <nav className="flex gap-4">
            <Link to="/" className="text-sm font-medium flex items-center gap-1 hover:text-primary">
              <HomeIcon className="h-4 w-4" />
              Dashboard
            </Link>
            <Link to="/orders" className="text-sm font-medium flex items-center gap-1 hover:text-primary">
              <TruckIcon className="h-4 w-4" />
              Orders
            </Link>
            <Link to="/drivers" className="text-sm font-medium flex items-center gap-1 hover:text-primary">
              <UsersIcon className="h-4 w-4" />
              Drivers
            </Link>
            <Link to="/dispatch" className="text-sm font-medium flex items-center gap-1 hover:text-primary">
              <MapIcon className="h-4 w-4" />
              Dispatch
            </Link>
            <Link to="/driver-portal" className="text-sm font-medium flex items-center gap-1 hover:text-primary">
              <UsersIcon className="h-4 w-4" />
              Driver Portal
            </Link>
          </nav>
        </div>
      </header>

      <Tabs defaultValue="orders" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <TruckIcon className="h-4 w-4" />
            Order Dashboard
          </TabsTrigger>
          <TabsTrigger value="drivers" className="flex items-center gap-2">
            <UsersIcon className="h-4 w-4" />
            Driver Dashboard
          </TabsTrigger>
        </TabsList>
        <TabsContent value="orders" className="space-y-4">
          <OrderDashboard />
        </TabsContent>
        <TabsContent value="drivers" className="space-y-4">
          <DriverDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
