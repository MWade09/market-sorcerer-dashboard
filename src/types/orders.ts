
export type OrderStatus = 'pending' | 'in-transit' | 'delivered';

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
  estimatedDeliveryTime?: string;
  actualDeliveryTime?: string;
  isLeased: boolean;
  coordinates?: {
    lat: number;
    lng: number;
  };
}
