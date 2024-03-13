const request = require("supertest");
const { app } = require("../../app");

describe("Test GET /launches", () => {
  // need to run the function to async since we need to wait for the request
  test("It should respond with 200 success", async () => {
    //app came from the app.js
    const response = await request(app)
      .get("/launches")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});
describe("Test POST /launch", () => {
  const completeLaunchData = {
    mission: "ZTM155",
    rocket: "ZTM Experimental IS1",
    launchDate: "January 29, 2050",
    target: "Kepler-186 f",
  };

  const launchDataWithoutDate = {
    mission: "ZTM155",
    rocket: "ZTM Experimental IS1",
    target: "Kepler-186 f",
  };

  const launchInvalidDate = {
    mission: "ZTM155",
    rocket: "ZTM Experimental IS1",
    target: "Kepler-186 f",
    launchDate: "Hello Wrong Date",
  };

  //POST REquest Testing
  test("It should response with 201 created", async () => {
    const response = await request(app)
      .post("/launches")
      .send(completeLaunchData)
      .expect("Content-Type", /json/)
      .expect(201);

    //due to failed testing for launch date which returning wrong value of date
    const requestDate = new Date(completeLaunchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();

    //check if the response date and requested date if equal even though in wrong format
    expect(responseDate).toBe(requestDate);
    //whenver we need to check the body
    expect(response.body).toMatchObject(launchDataWithoutDate);
  });

  //error checking testing
  test("It should catch missing required properties", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDataWithoutDate)
      .expect("Content-Type", /json/)
      .expect(400);

    //this is from the validation of a information is missing
    expect(response.body).toStrictEqual({
      error: "Missing required launch property",
    });
  });
  test("It should catch invalid dates", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchInvalidDate)
      .expect("Content-Type", /json/)
      .expect(400);

    //this is from the validation of invalid date
    expect(response.body).toStrictEqual({
      error: "Invalid launch date",
    });
  });
});
