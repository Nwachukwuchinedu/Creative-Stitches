
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { MailCheck } from "lucide-react";

const formSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits."),
});

export default function VerifyEmailPage() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // In a real app, you'd verify the OTP and activate the user's account.
    toast({
      title: "Email Verified!",
      description: "Your account is now active. You can log in.",
    });
    // Redirect to login page, e.g., router.push('/login');
  }

  function onResend() {
      toast({
          title: "New Code Sent",
          description: "A new verification code has been sent to your email address.",
      })
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] bg-muted/40 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
            <CardHeader className="text-center">
                <div className="mx-auto w-fit bg-primary/10 p-3 rounded-full mb-4">
                    <MailCheck className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold font-headline">Verify Your Email</CardTitle>
                <CardDescription>
                A 6-digit verification code has been sent to your email address. Please enter it below.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                        <FormField
                            control={form.control}
                            name="otp"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Verification Code</FormLabel>
                                <FormControl>
                                <Input
                                    maxLength={6}
                                    placeholder="123456"
                                    className="text-center text-lg tracking-[0.5em]"
                                    {...field}
                                />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">
                            Verify Account
                        </Button>
                    </form>
                </Form>
                <div className="mt-6 text-center text-sm">
                    <p className="text-muted-foreground">Didn't receive a code?</p>
                    <Button variant="link" onClick={onResend}>
                        Resend Code
                    </Button>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
