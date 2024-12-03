import request from "supertest";
import { server } from "./server";

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
