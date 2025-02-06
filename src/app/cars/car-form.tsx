"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useCarStore } from '@/lib/store';
import { useEffect } from 'react';
import { Car } from '@/types/car';

export const carFormSchema = z.object({
  model: z.string().min(1, 'Model is required'),
  maxSpeed: z.coerce.number().min(1, 'Max speed must be greater than 0'),
  featuresString: z.string().optional(),
  year: z.coerce.number().optional(),
});

type CarFormData = {
  model: string;
  maxSpeed: number | string;
  featuresString: string; 
};

interface CarFormProps {
  carId?: string | null;
  onSuccess: () => void;
}

export function CarForm({ carId, onSuccess }: CarFormProps) {
  const { addCar, updateCar, getCar } = useCarStore();
  const car = carId ? getCar(carId) : undefined;

  const defaultValues: CarFormData = {
    model: '',
    maxSpeed: '',
    featuresString: '', 
  };

  const form = useForm<CarFormData>({
    resolver: zodResolver(carFormSchema),
    defaultValues,
    mode: 'onChange'
  });

  useEffect(() => {
    if (car) {
      form.reset({
        model: car.model,
        maxSpeed: car.maxSpeed,
        featuresString: car.features?.join(', ') || '',
      });
    }
  }, [car, form]);

  const onSubmit = (data: CarFormData) => {
    // Ensure featuresString is defined before calling split
    const features = data.featuresString
      ? data.featuresString
          .split(',')
          .map(s => s.trim())
          .filter(s => s !== '')
      : [];

    const carData: Omit<Car, 'id'> = {
      model: data.model,
      maxSpeed: Number(data.maxSpeed),
      features: features,
    };

    if (carId) {
      updateCar(carId, carData);
    } else {
      addCar(carData);
    }
    onSuccess();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maxSpeed"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Max Speed (km/h)</FormLabel>
              <FormControl>
                <Input 
                  type="number"
                  {...field}
                  value={field.value || ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === '' ? '' : Number(value));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="featuresString"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Features (comma-separated)</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {carId ? 'Update Car' : 'Add Car'}
        </Button>
      </form>
    </Form>
  );
}