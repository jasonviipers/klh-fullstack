export interface Car {
  id: string;
  model: string;
  maxSpeed: number;
  features: string[]; // Array of strings
  year?: number; // Optional number or undefined
}

export interface TravelTimeRequest {
  distance: number; // Distance en kilomètres
  model: string;    // Modèle de la voiture
}

export interface TravelTimeResponse {
  hours: number;
  minutes: number;
  car: Car;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}