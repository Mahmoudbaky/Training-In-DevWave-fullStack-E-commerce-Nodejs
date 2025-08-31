import { Express } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { BASE_URL } from "../lib/constants.js";

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
  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      customCss: `
        @import url("https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css");
      `,
      customSiteTitle: "My API Docs",
    })
  );

  // serve the swagger.json spec separately
  app.get("/docs-json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}
