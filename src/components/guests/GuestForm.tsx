
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  ticketType: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

interface GuestFormProps {
  guest?: Guest;
  onClose: () => void;
  onSubmit: (data: Omit<Guest, 'id'> & { id?: string }) => void;
  className?: string;
}

const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  ticketType: z.string().min(1, { message: "Please select a ticket type." }),
  status: z.enum(['confirmed', 'pending', 'cancelled'])
});

type FormValues = z.infer<typeof formSchema>;

const GuestForm = ({ guest, onClose, onSubmit, className }: GuestFormProps) => {
  // Initialize form with proper default values to ensure all required fields have values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: guest?.id,
      name: guest?.name || "",
      email: guest?.email || "",
      phone: guest?.phone || "",
      ticketType: guest?.ticketType || "",
      status: guest?.status || "pending"
    }
  });

  const handleSubmit = (data: FormValues) => {
    // Since we've provided default values for all fields, this will always satisfy the type constraints
    onSubmit(data);
    toast.success(guest ? "Guest updated" : "Guest added", {
      description: guest 
        ? "Guest information has been updated successfully" 
        : "New guest has been added successfully",
    });
    onClose();
  };

  return (
    <div className={cn("glass-card rounded-xl p-6 animate-scale-in shadow-lg", className)}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">{guest ? 'Edit Guest' : 'Add New Guest'}</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} className="border-gray-300 focus:border-primary" />
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
                <FormLabel className="text-gray-700">Email Address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john.doe@example.com" {...field} className="border-gray-300 focus:border-primary" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="+1 (123) 456-7890" {...field} className="border-gray-300 focus:border-primary" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="ticketType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Ticket Type</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="border-gray-300 focus:border-primary">
                      <SelectValue placeholder="Select ticket type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="VIP">VIP ($250)</SelectItem>
                    <SelectItem value="Standard">Standard ($100)</SelectItem>
                    <SelectItem value="Early Bird">Early Bird ($85)</SelectItem>
                    <SelectItem value="Group">Group ($75 per person)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Status</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="border-gray-300 focus:border-primary">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="border-gray-300">
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              {guest ? 'Update Guest' : 'Add Guest'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default GuestForm;
