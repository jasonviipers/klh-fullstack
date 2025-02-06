"use server";
import { eq } from "drizzle-orm";
import { db } from "./db";
import { carTable, travelTimeRequestTable, travelTimeResponseTable } from "./schema";

// Helper function to serialize the car data
const serializeCar = (car: any) => ({
  id: car.id,
  model: car.model,
  maxSpeed: car.maxSpeed,
  features: car.features,
  year: car.year
});

export const getAllCars = async () => {
  const cars = await db.select().from(carTable);
  return cars.map(car => serializeCar(car));
};

export const getCarById = async (id: string) => {
  const car = await db.select().from(carTable).where(eq(carTable.id, id));
  if (!car[0]) return null;
  return serializeCar(car[0]);
};

export const deleteCar = async (id: string) => {
  await db.delete(carTable).where(eq(carTable.id, id));
  return { success: true };
};

export const addCar = async (car: {
  model: string; maxSpeed: number; features: string[]; year?: number;
}) => {
  const result = await db.insert(carTable).values({
    model: car.model,
    maxSpeed: car.maxSpeed,
    features: JSON.stringify(car.features),
    year: car.year
  }).returning({ insertedId: carTable.id });
  return result[0].insertedId;
};

export const updateCar = async (id: string, car: {
  model: string; maxSpeed: number; features: string[]; year?: number;
}) => {
  await db.update(carTable).set({
    model: car.model,
    maxSpeed: car.maxSpeed,
    features: JSON.stringify(car.features),
    year: car.year
  }).where(eq(carTable.id, id));
  const updated = await getCarById(id);
  return updated;
};

export const createTravelTimeRequest = async (request: {
  distance: number;
  model: string;
}) => {
  const result = await db.insert(travelTimeRequestTable).values({
    distance: request.distance.toString(),
    model: request.model,
  }).returning({ insertedId: travelTimeRequestTable.id });
  return result[0].insertedId;
};

export const createTravelTimeResponse = async (response: {
  hours: number;
  minutes: number;
  carId: string;
}) => {
  const result = await db.insert(travelTimeResponseTable).values({
    hours: response.hours,
    minutes: response.minutes,
    carId: response.carId,
  }).returning({ insertedId: travelTimeResponseTable.id });
  return result[0].insertedId;
};

export const getTravelTimeResponse = async (id: string) => {
  const response = await db.select().from(travelTimeResponseTable).where(eq(travelTimeResponseTable.id, id));
  if (!response[0]) return null;
  return response[0];
};