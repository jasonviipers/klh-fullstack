import { get } from 'http';
import { NextResponse } from 'next/server';

export async function GET() {
  const spec = {
    openapi: '3.0.0',
    info: {
      title: 'Car Travel Calculator API',
      version: '1.0.0',
      description: 'API for managing cars and calculating travel times',
    },
    servers: [
      {
        url: '/api',
        description: 'API server',
      },
    ],
    paths: {
      '/cars': {
        get: {
          summary: 'Get all cars',
          responses: {
            '200': {
              description: 'List of cars',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      data: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/Car' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          summary: 'Create a new car',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/CarInput',
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'Car created successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      data: { $ref: '#/components/schemas/Car' },
                    },
                  },
                },
              },
            },
            '400': {
              description: 'Invalid input',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                },
              },
            },
          },
        },
      },
      '/cars/{id}': {
        get: {
          summary: 'Get a specific car',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string' },
            },
          ],
          responses: {
            '200': {
              description: 'Car details',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      data: { $ref: '#/components/schemas/Car' },
                    },
                  },
                },
              },
            },
            '404': {
              description: 'Car not found',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                },
              },
            },
          },
        },
        put: {
          summary: 'Update a car',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string' },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/CarInput' },
              },
            },
          },
          responses: {
            '200': {
              description: 'Car updated successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      data: { $ref: '#/components/schemas/Car' },
                    },
                  },
                },
              },
            },
            '404': {
              description: 'Car not found',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                },
              },
            },
          },
        },
        delete: {
          summary: 'Delete a car',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string' },
            },
          ],
          responses: {
            '204': {
              description: 'Car deleted successfully',
            },
            '404': {
              description: 'Car not found',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                },
              },
            },
          },
        },
      },
      '/cars/calculate-time': {
        post: {
          summary: 'Calculate travel time',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/TravelTimeRequest' },
              },
            },
          },
          responses: {
            '200': {
              description: 'Calculated travel time',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      data: { $ref: '#/components/schemas/TravelTimeResponse' },
                    },
                  },
                },
              },
            },
            '404': {
              description: 'Car model not found',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                },
              },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        Car: {
          type: 'object',
          required: ['id', 'model', 'maxSpeed'],
          properties: {
            id: { type: 'string' },
            model: { type: 'string' },
            maxSpeed: { type: 'number' },
            features: {
              type: 'array',
              items: { type: 'string' },
            },
          },
        },
        CarInput: {
          type: 'object',
          required: ['model', 'maxSpeed'],
          properties: {
            model: { type: 'string' },
            maxSpeed: { type: 'number' },
            features: {
              type: 'array',
              items: { type: 'string' },
            },
          },
        },
        TravelTimeRequest: {
          type: 'object',
          required: ['distance', 'model'],
          properties: {
            distance: { type: 'number' },
            model: { type: 'string' },
          },
        },
        TravelTimeResponse: {
          type: 'object',
          required: ['hours', 'minutes', 'car'],
          properties: {
            hours: { type: 'number' },
            minutes: { type: 'number' },
            car: { $ref: '#/components/schemas/Car' },
          },
        },
        Error: {
          type: 'object',
          required: ['error'],
          properties: {
            error: { type: 'string' },
          },
        },
      },
    },
  };

  return NextResponse.json(spec);
}