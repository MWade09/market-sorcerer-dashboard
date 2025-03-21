
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TruckIcon, MapIcon, UsersIcon, RefreshCwIcon, SearchIcon, HomeIcon, PhoneIcon, PlusIcon } from 'lucide-react';
import LiveOrderMap from "@/components/LiveOrderMap";
import { mockOrders } from "@/utils/mockData";
import { mockDrivers } from "@/utils/mockData";
import { Order } from "@/types/orders";
import { Driver } from "@/types/drivers";

const DispatchDashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Load mock data
    setOrders(mockOrders);
    setDrivers(mockDrivers);
  }, []);

  // Filter orders based on search term
  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.pickupLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.deliveryAddress.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate statistics
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const inTransitOrders = orders.filter(order => order.status === 'in-transit').length;
  const deliveredOrders = orders.filter(order => order.status === 'delivered').length;
  const availableDrivers = drivers.filter(driver => driver.isAvailable).length;

  // Assign driver to order
  const assignDriver = (orderId: string, driverId: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, driverId, status: 'in-transit' } : order
    ));
    
    setDrivers(drivers.map(driver => 
      driver.id === driverId ? { ...driver, isAvailable: false } : driver
    ));
    
    toast({
      title: "Driver Assigned",
      description: `Order ${orderId} assigned to driver`,
      variant: "default"
    });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <header className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapIcon className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">Dispatch Dashboard</h1>
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
            <Link to="/driver-portal" className="text-sm font-medium flex items-center gap-1 hover:text-primary">
              <UsersIcon className="h-4 w-4" />
              Driver Portal
            </Link>
          </nav>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Card - Takes up 2/3 of the space */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle>Live Order Tracking</CardTitle>
            <CardDescription>
              Real-time view of all orders and drivers currently in the field
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[500px] w-full">
              <LiveOrderMap orders={orders} drivers={drivers} />
            </div>
          </CardContent>
        </Card>

        {/* Statistics Card */}
        <Card>
          <CardHeader>
            <CardTitle>Dispatch Statistics</CardTitle>
            <CardDescription>
              Overview of today's delivery operations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <TruckIcon className="h-8 w-8 mx-auto text-primary mb-2" />
                    <h3 className="text-2xl font-bold">{pendingOrders}</h3>
                    <p className="text-muted-foreground text-sm">Pending Orders</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <TruckIcon className="h-8 w-8 mx-auto text-secondary mb-2" />
                    <h3 className="text-2xl font-bold">{inTransitOrders}</h3>
                    <p className="text-muted-foreground text-sm">In Transit</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <TruckIcon className="h-8 w-8 mx-auto text-green-500 mb-2" />
                    <h3 className="text-2xl font-bold">{deliveredOrders}</h3>
                    <p className="text-muted-foreground text-sm">Delivered</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <UsersIcon className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                    <h3 className="text-2xl font-bold">{availableDrivers}</h3>
                    <p className="text-muted-foreground text-sm">Available Drivers</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="pt-4">
              <h3 className="font-semibold mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <Button className="w-full">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  New Order
                </Button>
                <Button variant="outline" className="w-full" onClick={() => toast({
                  title: "Dispatchers Notified",
                  description: "All dispatchers have been alerted",
                  variant: "default"
                })}>
                  <PhoneIcon className="h-4 w-4 mr-2" />
                  Alert Dispatchers
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Orders and Available Drivers Table */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Active Orders</CardTitle>
                <CardDescription>All orders currently in progress</CardDescription>
              </div>
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search orders..."
                  className="w-[250px] pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredOrders
                .filter(order => order.status !== 'delivered')
                .map(order => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <TruckIcon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{order.id}</h4>
                        <p className="text-muted-foreground text-sm">
                          {order.pickupLocation} → {order.deliveryAddress}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={
                        order.status === 'pending' ? 'outline' : 
                        order.status === 'in-transit' ? 'secondary' : 'default'
                      }>
                        {order.status}
                      </Badge>
                      {!order.driverId ? (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">Assign Driver</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Assign Driver to Order {order.id}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              {drivers
                                .filter(driver => driver.isAvailable)
                                .map(driver => (
                                  <div 
                                    key={driver.id} 
                                    className="flex items-center justify-between p-3 hover:bg-muted rounded-md cursor-pointer"
                                    onClick={() => assignDriver(order.id, driver.id)}
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                                        <UsersIcon className="h-5 w-5 text-secondary" />
                                      </div>
                                      <div>
                                        <h4 className="font-medium">{driver.name}</h4>
                                        <p className="text-muted-foreground text-sm">{driver.vehicle}</p>
                                      </div>
                                    </div>
                                    <Button size="sm">Assign</Button>
                                  </div>
                                ))}
                                
                              {drivers.filter(driver => driver.isAvailable).length === 0 && (
                                <div className="text-center py-6">
                                  <p className="text-muted-foreground">No available drivers</p>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                      ) : (
                        <div className="flex items-center text-sm">
                          <UsersIcon className="h-4 w-4 mr-1 text-secondary" />
                          <span>
                            {drivers.find(d => d.id === order.driverId)?.name || "Assigned"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

              {filteredOrders.filter(order => order.status !== 'delivered').length === 0 && (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">No active orders</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Available Drivers</CardTitle>
            <CardDescription>Drivers ready for new assignments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {drivers
                .filter(driver => driver.isAvailable)
                .map(driver => (
                  <div key={driver.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                        <UsersIcon className="h-5 w-5 text-secondary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{driver.name}</h4>
                        <p className="text-muted-foreground text-sm">{driver.vehicle}</p>
                      </div>
                    </div>
                    <Badge variant="outline">Available</Badge>
                  </div>
                ))}

              {drivers.filter(driver => driver.isAvailable).length === 0 && (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">No available drivers</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DispatchDashboard;
