import request from "supertest";
import { server, connectDB } from "./server";
import { db } from "./config/db";

describe("GET / api", () => {
  it("Should send back a json response", async () => {
    const res = await request(server).get("/api");
    expect(res.status).toEqual(200);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.body.message).toBe("API is working");

    expect(res.status).not.toBe(404);
    expect(res.body.message).not.toBe("Not Found");
  });
});

jest.mock("./config/db");

describe("connectDB", () => {
  it("Should handle database connection errors", async () => {
    const spy = jest
      .spyOn(db, "authenticate")
      .mockRejectedValueOnce(
        new Error("Error al conectar a la base de datos.")
      );
    const consoleSpy = jest.spyOn(console, "error");
    await connectDB();
    expect(consoleSpy).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Error al conectar a la base de datos.")
    );
  });

  it("Should connect to the database", async () => {
    const spy = jest.spyOn(db, "authenticate");
    await connectDB();
    expect(spy).toHaveBeenCalled();
  });
});
