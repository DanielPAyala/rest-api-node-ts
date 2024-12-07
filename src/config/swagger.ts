import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    tags: [
      {
        name: "Products",
        description: "API operations related to products"
      }
    ],
    info: {
      title: "REST API Node.js / Express / TypeScript",
      version: "1.0.0",
      description: "API Docs for the products"
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server"
      }
    ]
  },
  apis: ["./src/router.ts"]
};

export const swaggerSpec = swaggerJSDoc(options);
