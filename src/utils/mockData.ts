
import { Order } from '@/types/orders';
import { Driver } from '@/types/drivers';
import { Cryptocurrency, ChartData } from '@/lib/types';

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    pickupLocation: 'Mountain View',
    deliveryAddress: '1234 Castro St, Mountain View, CA',
    items: [
      { id: 'item1', name: 'Sourdough Bread', quantity: 5, price: 7.99 },
      { id: 'item2', name: 'Croissants', quantity: 12, price: 3.49 },
    ],
    totalCost: 81.83,
    status: 'pending',
    isLeased: false,
  },
  {
    id: 'ORD-002',
    pickupLocation: 'San Francisco',
    deliveryAddress: '567 Market St, San Francisco, CA',
    items: [
      { id: 'item3', name: 'Chocolate Cake', quantity: 1, price: 32.99 },
      { id: 'item4', name: 'Cookies', quantity: 24, price: 1.49 },
    ],
    totalCost: 68.75,
    status: 'in-transit', // This was causing an error, now it's valid
    driverId: 'DRV-001',
    isLeased: false,
  },
  {
    id: 'ORD-003',
    pickupLocation: 'Mountain View',
    deliveryAddress: '789 Dana St, Mountain View, CA',
    items: [
      { id: 'item5', name: 'Cupcakes', quantity: 6, price: 3.99 },
      { id: 'item6', name: 'Bagels', quantity: 12, price: 2.49 },
    ],
    totalCost: 53.82,
    status: 'delivered',
    driverId: 'DRV-002',
    isLeased: true,
  },
  {
    id: 'ORD-004',
    pickupLocation: 'San Francisco',
    deliveryAddress: '123 Van Ness Ave, San Francisco, CA',
    items: [
      { id: 'item7', name: 'Birthday Cake', quantity: 1, price: 45.99 },
      { id: 'item8', name: 'Macarons', quantity: 12, price: 2.99 },
    ],
    totalCost: 81.87,
    status: 'pending',
    isLeased: false,
  },
  {
    id: 'ORD-005',
    pickupLocation: 'Mountain View',
    deliveryAddress: '456 California St, Mountain View, CA',
    items: [
      { id: 'item9', name: 'Sandwich Bread', quantity: 3, price: 5.99 },
      { id: 'item10', name: 'Cinnamon Rolls', quantity: 6, price: 4.49 },
    ],
    totalCost: 44.91,
    status: 'in-transit', // This was causing an error, now it's valid
    driverId: 'DRV-003',
    isLeased: false,
  },
];

export const mockDrivers: Driver[] = [
  {
    id: 'DRV-001',
    name: 'John Smith',
    phone: '(650) 555-1234',
    email: 'john@roadrunner.com',
    vehicle: 'Toyota Prius',
    licensePlate: 'ABC123',
    jobsCompleted: 5,
    hoursWorked: 6,
    earnings: 120,
    isAvailable: true,
  },
  {
    id: 'DRV-002',
    name: 'Sarah Johnson',
    phone: '(415) 555-5678',
    email: 'sarah@roadrunner.com',
    vehicle: 'Honda Civic',
    licensePlate: 'XYZ789',
    jobsCompleted: 3,
    hoursWorked: 4,
    earnings: 80,
    isAvailable: false,
  },
  {
    id: 'DRV-003',
    name: 'Miguel Rodriguez',
    phone: '(408) 555-9012',
    email: 'miguel@roadrunner.com',
    vehicle: 'Nissan Leaf',
    licensePlate: 'DEF456',
    jobsCompleted: 7,
    hoursWorked: 8,
    earnings: 160,
    isAvailable: true,
  },
];

export const cryptocurrencies: Cryptocurrency[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 63245.87,
    volume24h: 28413965432,
    marketCap: 1237896543210,
    change24h: 2.34,
    sparkline: []
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    price: 3245.42,
    volume24h: 15723896541,
    marketCap: 389756123450,
    change24h: -1.24,
    sparkline: []
  },
  {
    id: 'binancecoin',
    name: 'Binance Coin',
    symbol: 'BNB',
    price: 578.32,
    volume24h: 2134567890,
    marketCap: 89012345678,
    change24h: 0.75,
    sparkline: []
  }
];

export const bitcoinChartData: ChartData[] = Array.from({ length: 24 }, (_, i) => {
  const baseTime = Date.now() - (24 - i) * 3600 * 1000;
  const basePrice = 60000 + Math.random() * 5000;
  return {
    time: baseTime,
    open: basePrice,
    high: basePrice * (1 + Math.random() * 0.02),
    low: basePrice * (1 - Math.random() * 0.02),
    close: basePrice * (1 + (Math.random() - 0.5) * 0.02),
    volume: 1000000 + Math.random() * 500000
  };
});

export const ethereumChartData: ChartData[] = Array.from({ length: 24 }, (_, i) => {
  const baseTime = Date.now() - (24 - i) * 3600 * 1000;
  const basePrice = 3000 + Math.random() * 500;
  return {
    time: baseTime,
    open: basePrice,
    high: basePrice * (1 + Math.random() * 0.02),
    low: basePrice * (1 - Math.random() * 0.02),
    close: basePrice * (1 + (Math.random() - 0.5) * 0.02),
    volume: 500000 + Math.random() * 200000
  };
});
