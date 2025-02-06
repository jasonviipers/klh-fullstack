"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TravelTimeResponse } from '@/types/car';
import { useCarStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Clock, Car as CarIcon, Gauge, Route } from 'lucide-react';
import { cn } from '@/lib/utils';

const calculatorSchema = z.object({
  model: z.string().min(1, 'Car model is required'),
  distance: z.coerce
    .number()
    .min(0.1, 'Distance must be greater than 0')
    .max(5000, 'Distance must be less than 5000 km'),
});

type CalculatorFormData = z.infer<typeof calculatorSchema>;

export default function CalculatorPage() {
  const { cars } = useCarStore();
  const [result, setResult] = useState<TravelTimeResponse | null>(null);
  const [selectedCar, setSelectedCar] = useState(cars[0]);

  const form = useForm<CalculatorFormData>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      model: '',
      distance: 100,
    },
  });

  const onSubmit = (data: CalculatorFormData) => {
    const car = cars.find((c) => c.model === data.model);
    if (!car) return;

    const timeInHours = data.distance / car.maxSpeed;
    const hours = Math.floor(timeInHours);
    const minutes = Math.round((timeInHours - hours) * 60);

    setResult({
      hours,
      minutes,
      car,
    });
    setSelectedCar(car);
  };

  // Update form when cars change
  useEffect(() => {
    if (cars.length > 0 && !form.getValues('model')) {
      form.setValue('model', cars[0].model);
    }
  }, [cars, form]);

  const distance = form.watch('distance');
  const formattedDistance = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    maximumFractionDigits: 1,
  }).format(distance || 0);

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Travel Time Calculator</h1>
          <p className="text-muted-foreground">
            Calculate your journey time based on distance and vehicle specifications
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Journey Details</CardTitle>
              <CardDescription>
                Select your car and enter the travel distance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="model"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vehicle</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            const car = cars.find((c) => c.model === value);
                            if (car) setSelectedCar(car);
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a car model" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {cars.map((car) => (
                              <SelectItem key={car.id} value={car.model}>
                                {car.model}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="distance"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Distance (km)</FormLabel>
                        <div className="space-y-4">
                          <Slider
                            min={0.1}
                            max={5000}
                            step={0.1}
                            value={[field.value]}
                            onValueChange={([value]) => field.onChange(value)}
                            className="py-4"
                          />
                          <div className="flex items-center space-x-4">
                            <Input
                              type="number"
                              {...field}
                              step={0.1}
                              className="w-24"
                            />
                            <span className="text-sm text-muted-foreground">
                              kilometers
                            </span>
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">
                    Calculate Travel Time
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {selectedCar && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CarIcon className="mr-2 h-5 w-5" />
                    Vehicle Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Model</span>
                      <span>{selectedCar.model}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Max Speed</span>
                      <span className="flex items-center">
                        <Gauge className="mr-2 h-4 w-4" />
                        {selectedCar.maxSpeed} km/h
                      </span>
                    </div>
                    {selectedCar.features && (
                      <div>
                        <span className="text-sm font-medium">Features</span>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {selectedCar.features.map((feature) => (
                            <span
                              key={feature}
                              className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {result && (
              <Card
                className={cn(
                  "transition-all duration-300",
                  result ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-4"
                )}
              >
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="mr-2 h-5 w-5" />
                    Journey Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Distance</span>
                      <span className="flex items-center">
                        <Route className="mr-2 h-4 w-4" />
                        {formattedDistance} km
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Estimated Time</span>
                      <span className="text-xl font-bold">
                        {result.hours}h {result.minutes}m
                      </span>
                    </div>
                    <div className="mt-4 p-4 bg-primary/5 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        This calculation assumes ideal driving conditions and constant speed.
                        Actual travel time may vary due to traffic, weather, and rest stops.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}