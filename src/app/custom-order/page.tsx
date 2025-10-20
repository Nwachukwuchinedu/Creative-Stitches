
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Phone } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  garmentType: z.string().min(1, "Please select a garment type."),
  fabricPreference: z.string().optional(),
  measurements: z.string().min(10, "Please provide detailed measurements."),
  designDescription: z.string().min(20, "Please describe your design in detail."),
  designImage: z.any().optional(),
  requestConsultation: z.boolean().default(false),
});

export default function CustomOrderPage() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      garmentType: "",
      fabricPreference: "",
      measurements: "",
      designDescription: "",
      requestConsultation: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Custom Order Submitted!",
      description: "Thank you! We will review your request and get back to you shortly.",
    });
    form.reset();
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <Card className="border-2 border-accent/50 shadow-lg">
            <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Create Your Unique Piece</CardTitle>
                <p className="mt-2 text-muted-foreground">Fill out the form below to begin your bespoke fashion journey.</p>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Adaeze Nwosu" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                                <Input placeholder="ada@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="garmentType"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Garment Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Select a garment type" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="dress">Dress</SelectItem>
                                <SelectItem value="suit">Suit / Agbada</SelectItem>
                                <SelectItem value="top">Top / Shirt</SelectItem>
                                <SelectItem value="trousers-skirt">Trousers / Skirt</SelectItem>
                                <SelectItem value="complete-outfit">Complete Outfit</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    
                    <FormField
                        control={form.control}
                        name="fabricPreference"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Fabric Preference (Optional)</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., Ankara, Lace, Aso-Oke, Silk" {...field} />
                            </FormControl>
                            <FormDescription>Let us know if you have a specific fabric in mind.</FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                        />

                    <FormField
                        control={form.control}
                        name="measurements"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Measurements</FormLabel>
                            <FormControl>
                            <Textarea
                                placeholder="Please provide your measurements (e.g., Bust: 36in, Waist: 30in, Hips: 40in, Height: 5'8'')."
                                className="min-h-[100px]"
                                {...field}
                            />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="designDescription"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Design Description</FormLabel>
                            <FormControl>
                            <Textarea
                                placeholder="Describe the style, colors, and any specific details you want for your custom piece."
                                className="min-h-[150px]"
                                {...field}
                            />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="designImage"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Inspiration Image (Optional)</FormLabel>
                            <FormControl>
                                <div className="flex items-center justify-center w-full">
                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <Upload className="w-8 h-8 mb-3 text-muted-foreground" />
                                            <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-muted-foreground">PNG, JPG or GIF (MAX. 800x400px)</p>
                                        </div>
                                        <Input id="dropzone-file" type="file" className="hidden" {...field} />
                                    </label>
                                </div> 
                            </FormControl>
                            <FormDescription>Upload a sketch or reference image for your design.</FormDescription>
                            <FormMessage />
                        </FormItem>
                        )}
                        />
                    
                    <FormField
                        control={form.control}
                        name="requestConsultation"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                <FormLabel className="text-base flex items-center gap-2">
                                    <Phone className="w-4 h-4"/>
                                    Request a Consultation
                                </FormLabel>
                                <FormDescription>
                                    Would you like one of our stylists to call you to discuss your design?
                                </FormDescription>
                                </div>
                                <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                                </FormControl>
                            </FormItem>
                        )}
                        />

                    <div className="flex justify-center">
                        <Button type="submit" size="lg" className="w-full md:w-auto rounded-full bg-accent text-accent-foreground hover:bg-accent/90">Submit Request</Button>
                    </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    </div>
  );
}
