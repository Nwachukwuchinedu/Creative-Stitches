
import { MoreHorizontal } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock customer data
const customers = [
  {
    id: "1",
    name: "Adaeze Nwosu",
    email: "ada.nwosu@example.com",
    totalSpent: 120.0,
    orders: 1,
    avatar: "AN",
  },
  {
    id: "2",
    name: "Bolanle Adeboye",
    email: "bola.ade@example.com",
    totalSpent: 325.0,
    orders: 1,
    avatar: "BA",
  },
  {
    id: "3",
    name: "Chidi Okoro",
    email: "chidi.okoro@example.com",
    totalSpent: 220.0,
    orders: 1,
    avatar: "CO",
  },
]

export default function AdminCustomersPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customers</CardTitle>
        <CardDescription>
          View and manage your customers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden md:table-cell">Orders</TableHead>
              <TableHead className="hidden md:table-cell">Total Spent</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map(customer => (
                <TableRow key={customer.id}>
                    <TableCell>
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src={`https://picsum.photos/seed/${customer.id}/40/40`} />
                                <AvatarFallback>{customer.avatar}</AvatarFallback>
                            </Avatar>
                            <div className="font-medium">
                                <div>{customer.name}</div>
                                <div className="text-sm text-muted-foreground">{customer.email}</div>
                            </div>
                        </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{customer.orders}</TableCell>
                    <TableCell className="hidden md:table-cell">${customer.totalSpent.toFixed(2)}</TableCell>
                    <TableCell>
                        <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                            >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View Customer</DropdownMenuItem>
                            <DropdownMenuItem>View Orders</DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
