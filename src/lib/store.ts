import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Car } from '@/types/car';
import { addCar, updateCar, deleteCar, getAllCars } from '@/lib/db/services';

interface CarStore {
  cars: Car[];
  addCar: (car: Omit<Car, 'id'>) => Promise<void>;
  updateCar: (id: string, car: Omit<Car, 'id'>) => Promise<void>;
  deleteCar: (id: string) => Promise<void>;
  getCar: (id: string) => Car | undefined;
  fetchCars: () => Promise<void>;
}

export const useCarStore = create<CarStore>()(
  persist(
    (set, get) => ({
      cars: [],
      fetchCars: async () => {
        try {
          const carsFromDb = await getAllCars();
          const cars = carsFromDb.map((car) => ({
            ...car,
            features: typeof car.features === 'string' 
              ? JSON.parse(car.features) 
              : car.features,
            year: car.year ?? undefined,
          }));
          set({ cars });
        } catch (error) {
          console.error('Error fetching cars:', error);
        }
      },
      addCar: async (car) => {
        try {
          const newCarId = await addCar(car);
          const newCar: Car = {
            id: newCarId,
            ...car,
          };
          set((state) => ({
            cars: [...state.cars, newCar],
          }));
        } catch (error) {
          console.error('Error adding car:', error);
        }
      },
      updateCar: async (id, car) => {
        try {
          await updateCar(id, car);
          set((state) => ({
            cars: state.cars.map((c) =>
              c.id === id
                ? {
                    ...c,
                    ...car,
                  }
                : c
            ),
          }));
        } catch (error) {
          console.error('Error updating car:', error);
        }
      },
      deleteCar: async (id) => {
        try {
          await deleteCar(id);
          set((state) => ({
            cars: state.cars.filter((c) => c.id !== id),
          }));
        } catch (error) {
          console.error('Error deleting car:', error);
        }
      },
      getCar: (id) => {
        return get().cars.find((c) => c.id === id);
      },
    }),
    {
      name: 'car-storage',
    }
  )
);