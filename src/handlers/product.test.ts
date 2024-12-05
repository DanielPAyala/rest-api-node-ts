import request from "supertest";
import { server } from "../server";

describe("POST /api/products", () => {
  it("Should validate that the price is greater than 0", async () => {
    const response = await request(server).post("/api/products").send({
      name: "Test Product",
      price: 0
    });

    expect(response.status).toEqual<number>(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);

    expect(response.status).not.toEqual<number>(404);
    expect(response.body.errors).not.toHaveLength(2);
  });

  it("Should validate that the price is a number and greater than 0", async () => {
    const response = await request(server).post("/api/products").send({
      name: "Test Product",
      price: "abc"
    });

    expect(response.status).toEqual<number>(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(2);

    expect(response.status).not.toEqual<number>(404);
    expect(response.body.errors).not.toHaveLength(1);
  });

  it("Should display validation error", async () => {
    const response = await request(server).post("/api/products").send({});
    expect(response.status).toEqual<number>(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(4);

    expect(response.status).not.toEqual<number>(404);
    expect(response.body.errors).not.toHaveLength(2);
  });

  it("Should create a new product", async () => {
    const response = await request(server).post("/api/products").send({
      name: "Test Product",
      price: 100
    });

    expect(response.status).toEqual<number>(201);
    expect(response.body).toHaveProperty("data");

    expect(response.status).not.toBe(404);
    expect(response.status).not.toBe(500);
    expect(response.body).not.toHaveProperty("error");

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body.data.name).toBe("Test Product");
    expect(response.body.data.price).toBe(100);
    expect(response.body.data.availability).toBe(true);
  });
});

describe("GET /api/products", () => {
  it("Should check if api/products url exists", async () => {
    const response = await request(server).get("/api/products");

    expect(response.status).not.toBe(404);
  });

  it("Should return a list of products", async () => {
    const response = await request(server).get("/api/products");

    expect(response.status).toEqual<number>(200);
    expect(response.body).toHaveProperty("data");

    expect(response.status).not.toBe(500);
    expect(response.body).not.toHaveProperty("error");

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.data).toHaveLength(1);
  });
});

describe("GET /api/products/:id", () => {
  it("Should return 404 if product does not exist", async () => {
    const productId = 200;
    const response = await request(server).get(`/api/products/${productId}`);

    expect(response.status).toEqual<number>(404);
    expect(response.body).toHaveProperty("error");

    expect(response.status).not.toBe(500);
    expect(response.body).not.toHaveProperty("data");

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body.error).toBe("Producto no encontrado.");
  });

  it("Should check a valid ID in the URL", async () => {
    const productId = "abc";
    const response = await request(server).get(`/api/products/${productId}`);

    expect(response.status).toEqual<number>(400);
    expect(response.body).toHaveProperty("errors");

    expect(response.status).not.toBe(500);
    expect(response.body).not.toHaveProperty("data");

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body.errors[0].msg).toBe("ID no válido");
  });

  it("Should return a single product", async () => {
    const productId = 1;
    const response = await request(server).get(`/api/products/${productId}`);

    expect(response.status).toEqual<number>(200);
    expect(response.body).toHaveProperty("data");

    expect(response.status).not.toBe(500);
    expect(response.body).not.toHaveProperty("error");

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body.data).toBeInstanceOf(Object);
    expect(response.body.data.id).toBe(1);
  });
});

describe("PUT /api/products/:id", () => {
  it("Should display validation error messages when updating a product", async () => {
    const productId = 1;
    const response = await request(server)
      .put(`/api/products/${productId}`)
      .send({});

    expect(response.status).toEqual<number>(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(5);

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");

    expect(response.body.errors[0].msg).toBe("El nombre es obligatorio");
    expect(response.body.errors[1].msg).toBe("El precio debe ser un número");
    expect(response.body.errors[2].msg).toBe("El precio es obligatorio");
    expect(response.body.errors[3].msg).toBe("El precio debe ser mayor a 0");
    expect(response.body.errors[4].msg).toBe("La disponibilidad no es válida");
  });

  it("Should return 404 if product does not exist", async () => {
    const productId = 200;
    const response = await request(server)
      .put(`/api/products/${productId}`)
      .send({
        name: "Test Product",
        price: 100,
        availability: true
      });

    expect(response.status).toEqual<number>(404);
    expect(response.body).toHaveProperty("error");

    expect(response.status).not.toBe(500);
    expect(response.body).not.toHaveProperty("data");

    expect(response.body.error).toBe("Producto no encontrado.");
  });

  it("Should check a valid ID in the URL", async () => {
    const productId = "abc";
    const response = await request(server)
      .put(`/api/products/${productId}`)
      .send({
        name: "Test Product",
        price: 100,
        availability: true
      });

    expect(response.status).toEqual<number>(400);
    expect(response.body).toHaveProperty("errors");

    expect(response.status).not.toBe(500);
    expect(response.body).not.toHaveProperty("data");

    expect(response.body.errors[0].msg).toBe("ID no válido");
  });

  it("Should update a product", async () => {
    const productId = 1;
    const response = await request(server)
      .put(`/api/products/${productId}`)
      .send({
        name: "Test Product",
        price: 100,
        availability: true
      });

    expect(response.status).toEqual<number>(200);
    expect(response.body).toHaveProperty("data");

    expect(response.status).not.toBe(500);
    expect(response.body).not.toHaveProperty("error");

    expect(response.body.data).toBeInstanceOf(Object);
    expect(response.body.data.id).toBe(1);
    expect(response.body.data.name).toBe("Test Product");
    expect(response.body.data.price).toBe(100);
  });
});
