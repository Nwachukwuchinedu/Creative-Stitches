
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import Link from "next/link";
  
  export default function AccountDashboardPage() {
    return (
      <>
        <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Welcome Back!</CardTitle>
            <CardDescription>This is your account dashboard. You can manage your profile, orders, and wishlist here.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.</p>
            <div className="mt-4 flex gap-4">
                <Button asChild>
                    <Link href="/account/orders">My Orders</Link>
                </Button>
                 <Button variant="outline" asChild>
                    <Link href="/account/profile">My Profile</Link>
                </Button>
            </div>
          </CardContent>
        </Card>
      </>
    )
  }
