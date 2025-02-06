import { NextRequest, NextResponse } from 'next/server';
import { TravelTimeResponse } from '@/types/car';
import { z } from 'zod';
import { db } from '@/lib/db/db';
import { carTable } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { createTravelTimeRequest, createTravelTimeResponse, getTravelTimeResponse } from '@/lib/db/services';

const TravelTimeSchema = z.object({
  distance: z.number().min(0.1, "Distance must be greater than 0"),
  model: z.string().min(1, "Model is required"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = TravelTimeSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const { distance, model } = validation.data;

    const car = await db.select().from(carTable).where(eq(carTable.model, model)).limit(1);
    if (!car[0]) {
      return NextResponse.json(
        { error: 'Car model not found' },
        { status: 404 }
      );
    }

    // Parse the features field from a JSON string to an array of strings
    // Convert `year` from `null` to `undefined` to match the `Car` type
    const parsedCar = {
      ...car[0],
      features: JSON.parse(car[0].features) as string[],
      year: car[0].year ?? undefined, // Convert `null` to `undefined`
    };

    const timeInHours = distance / parsedCar.maxSpeed;
    const hours = Math.floor(timeInHours);
    const minutes = Math.round((timeInHours - hours) * 60);

    const response: TravelTimeResponse = {
      hours,
      minutes,
      car: parsedCar, // Use the parsed car object
    };

    // Save the travel time request and response
    await createTravelTimeRequest({ distance, model });
    await createTravelTimeResponse({ hours, minutes, carId: parsedCar.id });

    return NextResponse.json({ data: response });
  } catch (error) {
    console.error('Error calculating travel time:', error);
    return NextResponse.json(
      { error: 'Failed to calculate travel time' },
      { status: 500 }
    );
  }
}
