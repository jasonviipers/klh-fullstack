import { Metadata } from 'next';
import Link from 'next/link';
import { Car } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Car Travel Calculator',
  description: 'Calculate travel times based on car specifications',
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <Car className="mx-auto h-16 w-16 text-primary" />
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Car Travel Calculator
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Manage your cars and calculate travel times based on distance and speed
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          <Link
            href="/cars"
            className="relative group bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <Car className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Car Management
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Add, edit, and manage your car collection
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/calculator"
            className="relative group bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <Car className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Travel Calculator
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Calculate travel times based on distance and car model
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}