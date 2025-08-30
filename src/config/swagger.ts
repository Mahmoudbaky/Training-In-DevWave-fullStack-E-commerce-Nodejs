import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { BASE_URL } from "../lib/constants";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API Docs",
      version: "1.0.0",
      description: "API documentation using Swagger",
    },
    servers: [
      {
        url: `${BASE_URL}`, // update to match your base URL
      },
    ],
  },
  // Path to the API docs
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"], // adjust as needed
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
