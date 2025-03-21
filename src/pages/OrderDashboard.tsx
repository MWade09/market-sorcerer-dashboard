
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MapIcon, TruckIcon, RefreshCwIcon, SearchIcon, PackageIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import OrderMap from "@/components/OrderMap";
import { Order, OrderStatus } from "@/types/orders";
import { mockOrders } from "@/utils/mockData";

const OrderDashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { toast } = useToast();

  // Load orders (mock data for now)
  useEffect(() => {
    setOrders(mockOrders);
  }, []);

  // Calculate daily totals
  const totalCost = orders.reduce((sum, order) => sum + order.totalCost, 0);
  
  // Handle search
  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.pickupLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.deliveryAddress.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Update order status
  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
    toast({
      title: "Order Updated",
      description: `Order ${orderId} marked as ${status}`,
    });
  };

  const toggleLeased = (orderId: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, isLeased: !order.isLeased } : order
    ));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Order Dashboard</CardTitle>
          <CardDescription>
            Manage and track all bakery delivery orders for Mountain View and San Francisco
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search orders..."
                className="w-[300px] pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm" onClick={() => toast({ title: "Refreshed", description: "Orders have been refreshed" })}>
              <RefreshCwIcon className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
          
          <Table>
            <TableCaption>List of today's bakery delivery orders</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Pickup Location</TableHead>
                <TableHead>Delivery Address</TableHead>
                <TableHead>Items</TableHead>
                <TableHead className="text-right">Cost</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id} className={order.isLeased ? "bg-muted/40" : ""}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <Badge variant={order.pickupLocation === "Mountain View" ? "default" : "secondary"}>
                      {order.pickupLocation}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.deliveryAddress}</TableCell>
                  <TableCell>{order.items.length} items</TableCell>
                  <TableCell className="text-right">${order.totalCost.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={
                      order.status === "delivered" ? "default" :
                      order.status === "in-transit" ? "secondary" : "outline"
                    }>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon" onClick={() => setSelectedOrder(order)}>
                            <MapIcon className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>Tracking Order {selectedOrder?.id}</DialogTitle>
                          </DialogHeader>
                          <div className="h-[400px]">
                            {selectedOrder && <OrderMap order={selectedOrder} />}
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => toggleLeased(order.id)}
                        className={order.isLeased ? "bg-primary text-primary-foreground" : ""}
                      >
                        <PackageIcon className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateOrderStatus(order.id, 
                          order.status === "pending" ? "in-transit" : 
                          order.status === "in-transit" ? "delivered" : "pending"
                        )}
                      >
                        <TruckIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="w-full flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              {filteredOrders.length} orders found
            </div>
            <div className="text-xl font-semibold">
              Daily Total: ${totalCost.toFixed(2)}
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OrderDashboard;
