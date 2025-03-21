
import { Order } from '@/types/orders';
import { Driver } from '@/types/drivers';

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
    status: 'in-transit',
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
    status: 'in-transit',
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
