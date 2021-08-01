const app = require("../../../../app");
const request = require("supertest");

describe("GET /api/ping", () => {
  it("should respond with a success message", async () => {
    const response = await request(app).get("/api/ping");
    expect(response.body).toEqual({ success: true });
    expect(response.statusCode).toBe(200);
  });
});

describe("GET /api/ping", () => {
  it("should respond with a success message", async () => {
    const response = await request(app).get("/api/ping");
    expect(response.body).toEqual({ success: true });
    expect(response.statusCode).toBe(200);
  });
});
