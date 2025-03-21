
export interface Driver {
  id: string;
  name: string;
  phone: string;
  email: string;
  vehicle: string;
  licensePlate?: string;
  jobsCompleted: number;
  hoursWorked: number;
  earnings: number;
  isAvailable: boolean;
  coordinates?: {
    lat: number;
    lng: number;
  };
}
