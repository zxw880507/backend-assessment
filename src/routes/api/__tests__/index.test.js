const app = require("../../../../app");
const request = require("supertest");

describe("GET /api/ping", () => {
  it("should respond with a success message", async () => {
    const response = await request(app).get("/api/ping");
    expect(response.body).toEqual({ success: true });
    expect(response.statusCode).toBe(200);
  });
});

describe("GET /api/posts", () => {
  it("should respond with an error if `tags` parameter is not present", async () => {
    const response = await request(app).get("/api/posts");
    expect(response.body).toEqual({ error: "Tags parameter is required" });
    expect(response.statusCode).toBe(404);
  });
  it("should respond with an error if a `sortBy` is an invalid value", async () => {
    const response = await request(app).get("/api/posts?tags=tech&sortBy=age");
    expect(response.body).toEqual({ error: "sortBy parameter is invalid" });
    expect(response.statusCode).toBe(404);
  });
  it("should respond with an error if a `direction` is an invalid value", async () => {
    const response = await request(app).get("/api/posts?tags=tech&sortBy=likes&direction=down");
    expect(response.body).toEqual({ error: "direction parameter is invalid" });
    expect(response.statusCode).toBe(404);
  });
});
