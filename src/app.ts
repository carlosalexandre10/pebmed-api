import 'reflect-metadata';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import Keycloak from 'keycloak-connect';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import 'express-async-errors';
import AppError from '@shared/errors/AppError';
import routes from '@shared/routes';

import '@shared/database';
import '@shared/container';

const app = express();

app.use(express.json());

// CORS
app.use(cors());

// SWAGGER
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(
    swaggerJsdoc({
      definition: {
        components: {},
        openapi: '3.0.0',
        info: {
          title: 'PEBMED',
          description: 'API PEBMED - PRONTOMED',
          version: '1.0.0',
        },
      },
      apis: ['./src/modules/**/routes/*.ts'],
    }),
  ),
);

// KEYCLOAK
const memoryStore = new session.MemoryStore();
const keycloak = new Keycloak({ store: memoryStore });
app.use(
  session({
    secret: 'thisShouldBeLongAndSecret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  }),
);
app.use(keycloak.middleware());
app.use(keycloak.middleware({ logout: '/' }));
app.use(keycloak.protect());

// ROUTES
app.use(routes);

// ERRORS
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
  });
});

export default app;
