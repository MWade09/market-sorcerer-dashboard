
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TruckIcon, 
  ClockIcon, 
  UsersIcon, 
  CheckIcon, 
  XIcon, 
  HomeIcon, 
  DollarSignIcon, 
  BarChartIcon,
  PhoneIcon,
  RefreshCwIcon,
  CalendarIcon,
  MapIcon,
  PackageIcon,
  AlertCircleIcon
} from 'lucide-react';
import { Driver } from "@/types/drivers";
import { Order } from "@/types/orders";
import OrderMap from "@/components/OrderMap";
import { mockOrders, mockDrivers } from "@/utils/mockData";
import { calculateETA } from "@/utils/etaCalculator";

const DriverPortal = () => {
  // For a real implementation, this would come from an authentication system
  const [currentDriver, setCurrentDriver] = useState<Driver | null>(null);
  const [driverOrders, setDriverOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [driverStatus, setDriverStatus] = useState<'offline' | 'online' | 'break'>('offline');
  const [activeTab, setActiveTab] = useState("current");
  const { toast } = useToast();

  // Load demo data
  useEffect(() => {
    // Set first driver as current for demo
    const driver = mockDrivers[0];
    setCurrentDriver(driver);
    
    // Get orders assigned to this driver
    const orders = mockOrders.filter(order => order.driverId === driver.id);
    
    // Initialize pickup and delivery tasks if not already set
    const updatedOrders = orders.map(order => ({
      ...order,
      pickupTask: order.pickupTask || {
        started: false,
        completed: false
      },
      deliveryTask: order.deliveryTask || {
        started: false,
        completed: false,
        etaNotificationSent: false,
        arrivedNotificationSent: false
      }
    }));
    
    setDriverOrders(updatedOrders);
  }, []);

  if (!currentDriver) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const currentOrders = driverOrders.filter(order => 
    order.status !== 'delivered' && 
    (!order.pickupTask?.completed || !order.deliveryTask?.completed)
  );
  
  const completedOrders = driverOrders.filter(order => 
    order.status === 'delivered' || 
    (order.pickupTask?.completed && order.deliveryTask?.completed)
  );

  // Handle status change
  const changeStatus = (status: 'offline' | 'online' | 'break') => {
    setDriverStatus(status);
    toast({
      title: "Status Updated",
      description: `You are now ${status}`,
      variant: "default"
    });
  };

  // Start pickup task
  const startPickupTask = (orderId: string) => {
    setDriverOrders(driverOrders.map(order => {
      if (order.id === orderId) {
        const updatedOrder = { 
          ...order,
          status: 'pickup-in-progress',
          pickupTask: {
            ...order.pickupTask,
            started: true,
            startTime: new Date().toISOString()
          }
        };
        
        // Simulate API call to notify internal system
        console.log(`Pickup started for order ${orderId} at ${new Date().toLocaleTimeString()}`);
        
        toast({
          title: "Pickup Started",
          description: `You have started pickup for order ${orderId}`,
          variant: "default"
        });
        
        return updatedOrder;
      }
      return order;
    }));
  };

  // Complete pickup task
  const completePickupTask = (orderId: string) => {
    setDriverOrders(driverOrders.map(order => {
      if (order.id === orderId) {
        const now = new Date();
        const updatedOrder = { 
          ...order,
          status: 'delivery-pending',
          pickupTask: {
            ...order.pickupTask,
            completed: true,
            completionTime: now.toISOString()
          },
          actualPickupTime: now.toISOString()
        };
        
        // Simulate API call to notify internal system
        console.log(`Pickup completed for order ${orderId} at ${now.toLocaleTimeString()}`);
        
        toast({
          title: "Pickup Completed",
          description: `Pickup for order ${orderId} marked as complete`,
          variant: "default"
        });
        
        return updatedOrder;
      }
      return order;
    }));
  };

  // Start delivery task
  const startDeliveryTask = (orderId: string) => {
    setDriverOrders(driverOrders.map(order => {
      if (order.id === orderId) {
        const now = new Date();
        const eta = calculateETA(order.deliveryAddress);
        
        const updatedOrder = { 
          ...order,
          status: 'delivery-in-progress',
          estimatedDeliveryTime: eta.toISOString(),
          deliveryTask: {
            ...order.deliveryTask,
            started: true,
            startTime: now.toISOString(),
            etaNotificationSent: true,
            arrivedNotificationSent: false
          }
        };
        
        // Simulate API call to notify customer with ETA
        console.log(`Delivery started for order ${orderId} at ${now.toLocaleTimeString()}`);
        console.log(`Customer notification sent with ETA: ${eta.toLocaleTimeString()}`);
        
        // Show notification toast for the driver
        toast({
          title: "Delivery Started",
          description: `Customer notified with ETA: ${eta.toLocaleTimeString()}`,
          variant: "default"
        });
        
        return updatedOrder;
      }
      return order;
    }));
  };

  // Mark arrived at customer
  const markArrivedAtCustomer = (orderId: string) => {
    setDriverOrders(driverOrders.map(order => {
      if (order.id === orderId) {
        const updatedOrder = { 
          ...order,
          deliveryTask: {
            ...order.deliveryTask,
            arrivedNotificationSent: true
          }
        };
        
        // Simulate API call to notify customer of arrival
        console.log(`Driver arrived at customer location for order ${orderId} at ${new Date().toLocaleTimeString()}`);
        console.log(`Customer arrival notification sent`);
        
        toast({
          title: "Arrival Marked",
          description: `Customer has been notified of your arrival`,
          variant: "default"
        });
        
        return updatedOrder;
      }
      return order;
    }));
  };

  // Complete delivery task
  const completeDeliveryTask = (orderId: string) => {
    setDriverOrders(driverOrders.map(order => {
      if (order.id === orderId) {
        const now = new Date();
        const updatedOrder = { 
          ...order,
          status: 'delivered',
          deliveryTask: {
            ...order.deliveryTask,
            completed: true,
            completionTime: now.toISOString()
          },
          actualDeliveryTime: now.toISOString()
        };
        
        // Simulate API call to update system
        console.log(`Delivery completed for order ${orderId} at ${now.toLocaleTimeString()}`);
        
        toast({
          title: "Delivery Completed",
          description: `Order ${orderId} has been delivered successfully`,
          variant: "default"
        });
        
        return updatedOrder;
      }
      return order;
    }));
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <header className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TruckIcon className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">Driver Portal</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <div className="font-semibold">{currentDriver.name}</div>
              <div className="text-sm text-muted-foreground">{currentDriver.vehicle}</div>
            </div>
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              {currentDriver.name.charAt(0)}
            </div>
          </div>
        </div>
      </header>

      {/* Status Card */}
      <Card className="mb-6">
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`h-3 w-3 rounded-full ${
                driverStatus === 'online' ? 'bg-green-500' : 
                driverStatus === 'offline' ? 'bg-red-500' : 'bg-yellow-500'
              }`} />
              <div className="font-medium">
                Status: <span className="capitalize">{driverStatus}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant={driverStatus === 'online' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => changeStatus('online')}
              >
                Go Online
              </Button>
              <Button 
                variant={driverStatus === 'break' ? 'secondary' : 'outline'} 
                size="sm"
                onClick={() => changeStatus('break')}
              >
                Take Break
              </Button>
              <Button 
                variant={driverStatus === 'offline' ? 'destructive' : 'outline'} 
                size="sm"
                onClick={() => changeStatus('offline')}
              >
                Go Offline
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Daily Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <TruckIcon className="h-8 w-8 mx-auto text-primary mb-2" />
              <h3 className="text-2xl font-bold">
                {completedOrders.length} / {driverOrders.length}
              </h3>
              <p className="text-muted-foreground text-sm">Completed / Total Orders</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <ClockIcon className="h-8 w-8 mx-auto text-secondary mb-2" />
              <h3 className="text-2xl font-bold">{currentDriver.hoursWorked}h</h3>
              <p className="text-muted-foreground text-sm">Hours Worked Today</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <DollarSignIcon className="h-8 w-8 mx-auto text-green-500 mb-2" />
              <h3 className="text-2xl font-bold">${currentDriver.earnings.toFixed(2)}</h3>
              <p className="text-muted-foreground text-sm">Today's Earnings</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders Tabs */}
      <Tabs defaultValue="current" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="current" className="flex items-center gap-2">
            <TruckIcon className="h-4 w-4" />
            Current Orders
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            <CheckIcon className="h-4 w-4" />
            Completed
          </TabsTrigger>
          <TabsTrigger value="earnings" className="flex items-center gap-2">
            <BarChartIcon className="h-4 w-4" />
            Earnings
          </TabsTrigger>
        </TabsList>
        
        {/* Current Orders */}
        <TabsContent value="current" className="space-y-4">
          {currentOrders.length > 0 ? (
            currentOrders.map(order => (
              <Card key={order.id} className={order.isBatched ? "border-blue-400" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg flex items-center gap-2">
                      Order {order.id}
                      {order.isBatched && (
                        <Badge variant="outline" className="bg-blue-100">
                          Batch #{order.batchId}
                        </Badge>
                      )}
                    </CardTitle>
                    <Badge 
                      variant={
                        order.status === 'delivery-in-progress' ? 'secondary' : 
                        order.status === 'pickup-in-progress' ? 'outline' : 
                        'default'
                      }
                    >
                      {order.status.replace(/-/g, ' ')}
                    </Badge>
                  </div>
                  <CardDescription>{order.items.length} items for delivery</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {/* Pickup Task */}
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <PackageIcon className="h-4 w-4 text-primary" />
                          <div className="font-medium">Pickup Task</div>
                        </div>
                        <Badge 
                          variant={order.pickupTask?.completed ? "default" : order.pickupTask?.started ? "secondary" : "outline"}
                        >
                          {order.pickupTask?.completed ? "Completed" : order.pickupTask?.started ? "In Progress" : "Pending"}
                        </Badge>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <HomeIcon className="h-4 w-4 text-muted-foreground" />
                          <div className="text-sm">
                            <div className="font-medium">Pickup Location</div>
                            <div className="text-muted-foreground">{order.pickupLocation}</div>
                          </div>
                        </div>
                        
                        {!order.pickupTask?.completed && (
                          !order.pickupTask?.started ? (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => startPickupTask(order.id)}
                            >
                              Start Pickup
                            </Button>
                          ) : (
                            <Button 
                              variant="default" 
                              size="sm"
                              onClick={() => completePickupTask(order.id)}
                            >
                              Mark Picked Up
                            </Button>
                          )
                        )}
                      </div>
                    </div>
                    
                    {/* Delivery Task */}
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <TruckIcon className="h-4 w-4 text-secondary" />
                          <div className="font-medium">Delivery Task</div>
                        </div>
                        <Badge 
                          variant={order.deliveryTask?.completed ? "default" : order.deliveryTask?.started ? "secondary" : "outline"}
                        >
                          {order.deliveryTask?.completed ? "Completed" : order.deliveryTask?.started ? "In Progress" : "Pending"}
                        </Badge>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <MapIcon className="h-4 w-4 text-muted-foreground" />
                          <div className="text-sm">
                            <div className="font-medium">Delivery Address</div>
                            <div className="text-muted-foreground">{order.deliveryAddress}</div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end gap-1">
                          {order.estimatedDeliveryTime && (
                            <div className="text-xs text-muted-foreground">
                              ETA: {new Date(order.estimatedDeliveryTime).toLocaleTimeString()}
                            </div>
                          )}
                          
                          {order.pickupTask?.completed && !order.deliveryTask?.completed && (
                            <div className="flex gap-2">
                              {!order.deliveryTask?.started ? (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => startDeliveryTask(order.id)}
                                >
                                  Start Delivery
                                </Button>
                              ) : !order.deliveryTask?.arrivedNotificationSent ? (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => markArrivedAtCustomer(order.id)}
                                >
                                  Mark Arrived
                                </Button>
                              ) : (
                                <Button 
                                  variant="default" 
                                  size="sm"
                                  onClick={() => completeDeliveryTask(order.id)}
                                >
                                  Complete Delivery
                                </Button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <PhoneIcon className="h-4 w-4 mr-2" />
                    Contact Customer
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>
                    <MapIcon className="h-4 w-4 mr-2" />
                    View Map
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground">No current orders</p>
                <Button variant="outline" className="mt-4" onClick={() => toast({
                  title: "Checking for Orders",
                  description: "No new orders available at this time",
                  variant: "default"
                })}>
                  <RefreshCwIcon className="h-4 w-4 mr-2" />
                  Check for New Orders
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        {/* Completed Orders */}
        <TabsContent value="completed" className="space-y-4">
          {completedOrders.length > 0 ? (
            completedOrders.map(order => (
              <Card key={order.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Order {order.id}</CardTitle>
                    <Badge variant="default">Delivered</Badge>
                  </div>
                  <CardDescription>{order.items.length} items delivered</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <HomeIcon className="h-4 w-4 text-primary" />
                        <div className="text-sm">
                          <div className="font-medium">Pickup</div>
                          <div className="text-muted-foreground">{order.pickupLocation}</div>
                        </div>
                      </div>
                      {order.actualPickupTime && (
                        <div className="text-xs text-muted-foreground">
                          Picked up: {new Date(order.actualPickupTime).toLocaleTimeString()}
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <MapIcon className="h-4 w-4 text-secondary" />
                        <div className="text-sm">
                          <div className="font-medium">Delivery</div>
                          <div className="text-muted-foreground">{order.deliveryAddress}</div>
                        </div>
                      </div>
                      {order.actualDeliveryTime && (
                        <div className="text-xs text-muted-foreground">
                          Delivered: {new Date(order.actualDeliveryTime).toLocaleTimeString()}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground">No completed orders today</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        {/* Earnings Tab */}
        <TabsContent value="earnings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Earnings</CardTitle>
              <CardDescription>Your earnings for the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="font-medium">Today</div>
                  <div className="font-semibold">${currentDriver.earnings.toFixed(2)}</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="font-medium">This Week</div>
                  <div className="font-semibold">${(currentDriver.earnings * 5).toFixed(2)}</div>
                </div>
                <div className="h-[200px] w-full bg-muted rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Earnings chart would appear here</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex justify-between w-full">
                <Button variant="outline">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Previous Weeks
                </Button>
                <Button onClick={() => toast({
                  title: "Report Generated",
                  description: "Earnings report has been emailed to you",
                  variant: "default"
                })}>
                  Download Report
                </Button>
              </div>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
              <CardDescription>Your payment information and history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-md border">
                  <div className="text-sm font-medium">Next Payment</div>
                  <div className="text-2xl font-bold mt-1">${(currentDriver.earnings * 5).toFixed(2)}</div>
                  <div className="text-sm text-muted-foreground mt-1">Scheduled for Friday</div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm font-medium">Payment Method</div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <DollarSignIcon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Direct Deposit</h4>
                        <p className="text-muted-foreground text-sm">Account ending in ****1234</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Update</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Map Dialog */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-background/80 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg border shadow-lg w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">Order {selectedOrder.id} Map</h3>
              <Button variant="ghost" size="icon" onClick={() => setSelectedOrder(null)}>
                <XIcon className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-grow overflow-auto p-0 h-[400px]">
              <OrderMap order={selectedOrder} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriverPortal;
