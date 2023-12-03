var rest_supertest = require("supertest");
var should = require("should");

var reset_server = rest_supertest.agent("http://localhost:4002");

describe("Unit Tests for the REST Service", function () {
  it("should find the get movies service to be running,", function (done) {
    reset_server.get("/movies").expect("Content-type", /json/).expect(200);
    done();
  });
  it("should find the get users service to be running,", function (done) {
    reset_server.get("/users").expect("Content-type", /json/).expect(200);
    done();
  });
  it("should find the save movie seriv to be running,", function (done) {
    reset_server.post("/movie").expect("Content-type", /json/).expect(201);
    done();
  });
  it("should return 404", function (done) {
    reset_server.get("/notfound").expect("Content-type", /json/).expect(404);
    done();
  });
});
