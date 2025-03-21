
export type OrderStatus = 'pending' | 'pickup-pending' | 'pickup-in-progress' | 'pickup-completed' | 'delivery-pending' | 'delivery-in-progress' | 'delivered';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  pickupLocation: string;
  deliveryAddress: string;
  items: OrderItem[];
  totalCost: number;
  status: OrderStatus;
  driverId?: string;
  customerPhone?: string;
  customerEmail?: string;
  customerName?: string;
  estimatedPickupTime?: string;
  actualPickupTime?: string;
  estimatedDeliveryTime?: string;
  actualDeliveryTime?: string;
  isLeased: boolean;
  isBatched?: boolean;
  batchId?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  pickupTask?: {
    started: boolean;
    startTime?: string;
    completed: boolean;
    completionTime?: string;
  };
  deliveryTask?: {
    started: boolean;
    startTime?: string;
    completed: boolean;
    completionTime?: string;
    etaNotificationSent: boolean;
    arrivedNotificationSent: boolean;
  };
}
