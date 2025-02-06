"use client";

import dynamic from 'next/dynamic';
import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

export default function ApiDocs() {
  return (
    <div className="container mx-auto py-8">
      <div className="prose max-w-none">
        <h1 className="text-3xl font-bold mb-8">API Documentation</h1>
        <SwaggerUI url="/api/docs" />
      </div>
    </div>
  );
}