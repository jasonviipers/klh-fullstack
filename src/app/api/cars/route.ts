import { NextRequest, NextResponse } from 'next/server';
import { addCar, getAllCars } from '@/lib/db/services';
import { carSchema } from '@/lib/validate';

export async function GET() {
  try {
    const allCars = await getAllCars();
    if (!allCars) {
      return NextResponse.json({ error: 'No cars found' }, { status: 404 });
    }
    return NextResponse.json({ data: allCars });
  } catch (error) {
    console.error('Error fetching cars:', error);
    return NextResponse.json({ error: 'Failed to fetch cars' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = carSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const carId = await addCar(validation.data);
    return NextResponse.json({ data: { id: carId, ...validation.data } }, { status: 201 });
  } catch (error) {
    console.error('Error adding car:', error);
    return NextResponse.json({ error: 'Failed to add car' }, { status: 500 });
  }
}