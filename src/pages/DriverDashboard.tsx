
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { UsersIcon, UserPlusIcon, ClockIcon, PackageIcon, DollarSignIcon, PercentIcon, TrendingUpIcon } from 'lucide-react';
import { Driver } from "@/types/drivers";
import { mockDrivers } from "@/utils/mockData";

const DriverDashboard = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    setDrivers(mockDrivers);
  }, []);

  // Calculate totals
  const totalDriverPay = drivers.reduce((sum, driver) => sum + driver.earnings, 0);
  const totalEarnings = 2600; // Mock total earnings for the day
  const profitMargin = totalEarnings - totalDriverPay;
  const profitPercentage = (profitMargin / totalEarnings) * 100;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold">Driver Dashboard</CardTitle>
              <CardDescription>
                Track driver performance and manage payments
              </CardDescription>
            </div>
            <Button variant="default">
              <UserPlusIcon className="mr-2 h-4 w-4" />
              Add Driver
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {drivers.map((driver) => (
              <Card key={driver.id} className="hover:shadow-lg transition-all">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{driver.name}</CardTitle>
                  <CardDescription>{driver.vehicle}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <PackageIcon className="mr-2 h-4 w-4" />
                        Jobs Completed
                      </div>
                      <Badge variant="outline">{driver.jobsCompleted}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <ClockIcon className="mr-2 h-4 w-4" />
                        Hours Worked
                      </div>
                      <Badge variant="outline">{driver.hoursWorked}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <DollarSignIcon className="mr-2 h-4 w-4" />
                        Earnings
                      </div>
                      <Badge variant="outline">${driver.earnings.toFixed(2)}</Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View Details</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
        <CardFooter className="border-t">
          <div className="w-full">
            <h3 className="font-semibold mb-4">Daily Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <DollarSignIcon className="mr-2 h-4 w-4" />
                    Total Driver Pay
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${totalDriverPay.toFixed(2)}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <TrendingUpIcon className="mr-2 h-4 w-4" />
                    Total Earnings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${totalEarnings.toFixed(2)}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <PercentIcon className="mr-2 h-4 w-4" />
                    Profit Margin
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col">
                    <div className="text-2xl font-bold">${profitMargin.toFixed(2)}</div>
                    <div className="text-sm text-muted-foreground">{profitPercentage.toFixed(1)}% of revenue</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DriverDashboard;
