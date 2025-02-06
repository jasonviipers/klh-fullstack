import { Car } from "@/types/car";

const demoData: Omit<Car, 'id'>[] = [
    {
      model: "Tesla Model S",
      maxSpeed: 322,
      features: ["Autopilot", "Electric", "Luxury Interior", "Long Range"]
    },
    {
      model: "Porsche 911",
      maxSpeed: 330,
      features: ["Sport Mode", "Leather Seats", "PDK Transmission", "Launch Control"]
    },
    {
      model: "Toyota Camry",
      maxSpeed: 220,
      features: ["Hybrid", "Safety Sense", "Apple CarPlay", "Android Auto"]
    },
    {
      model: "BMW M3",
      maxSpeed: 290,
      features: ["M Performance", "Carbon Fiber", "Sport Suspension", "Premium Audio"]
    },
    {
      model: "Audi e-tron GT",
      maxSpeed: 245,
      features: ["Electric", "Quattro", "Matrix LED", "Virtual Cockpit"]
    }
  ];