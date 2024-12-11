import axiosInstance from "../../lib/axiosInstance"
import { Button } from "../../components/ui/button"; // Adjust based on your directory structure
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { CalendarDays, DollarSign, Scissors, PlusCircle, Users } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const response = await axiosInstance({
    url: 'http://localhost:3000/api/orders',
    method: 'get',
  });
  const { orders, services } = response.data;

  const servicesMap = Object.fromEntries(
    services.map((service) => [service.$id, service])
  );

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex flex-col space-y-3">
  <Link href={"/"}>
    <Button className="w-full">
      <PlusCircle className="mr-2 h-4 w-4" /> Make A Booking
    </Button>
  </Link>
  <Button className="w-full">
    <PlusCircle className="mr-2 h-4 w-4" /> Add New Service
  </Button>
</div>

        
        
       
      </div>
      

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reservations</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,250</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Popular Service</CardTitle>
            <Scissors className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Haircut</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Services</TableHead>
                {/* <TableHead>Total</TableHead> */}
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => {
                // Split selectedServices into an array of service IDs
                const serviceIds = order.selectedServices.split(",").filter(Boolean);

                // Map the service IDs to their corresponding service details
                const matchedServices = serviceIds
                  .map((id) => servicesMap[id])
                  .filter(Boolean); // Filter out unmatched IDs

                return (
                  <TableRow key={order.$id}>
                    <TableCell>{order.userName}</TableCell>
                    <TableCell>{order.userEmail}</TableCell>
                    <TableCell>{order.userPhone}</TableCell>

                    <TableCell>
                      {matchedServices.length > 0 ? (
                        matchedServices.map((service) => (
                          <div key={service.$id}>
                            <strong>{service.name}</strong>
                          </div>
                        ))
                      ) : (
                        <span>No services selected</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {order.selectedDate
                        ? new Date(order.selectedDate).toLocaleDateString()
                        : "N/A"}
                    </TableCell>
                    <TableCell>{order.selectedTime || "N/A"}</TableCell>
                    <TableCell>{order.status || "N/A"}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="text-black">
                        View
                      </Button>
                    </TableCell>

                  </TableRow>
                );
              })}
            </TableBody>

          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
