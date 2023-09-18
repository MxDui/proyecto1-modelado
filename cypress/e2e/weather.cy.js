describe("Weather Page", () => {
  beforeEach(() => {
    // Navigate to the main page
    cy.visit("localhost:3000/weather");
  });

  it("should search by cities", () => {
    // Select the "Ciudades" option
    cy.get("select").select("cities");

    // Type in the departure and arrival cities
    cy.get('input[placeholder="Ciudad de Salida"]').type("London");
    cy.get('input[placeholder="Ciudad de Llegada"]').type("Paris");

    // Mock the API response for the cities
    cy.intercept(
      "https://api.openweathermap.org/data/2.5/weather?q=London&appid=*"
    ).as("getLondonWeather");
    cy.intercept(
      "https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=*"
    ).as("getParisWeather");

    // Click on the "Buscar" button
    cy.get("button").contains("Buscar").click();

    // Verify the API calls were made and check the results
    cy.wait("@getLondonWeather");
    cy.wait("@getParisWeather");

    cy.get("div").contains("Resultados").should("be.visible");
    cy.get("div").contains("LONDON").should("be.visible");
    cy.get("div").contains("PARIS").should("be.visible");
  });
  it("should search by boleto", () => {
    // Load the fixture data
    cy.fixture("weather_fixture.json").as("fixtureData");

    // Select the "Boleto" option
    cy.get("select").select("boleto");

    // Type in the boleto (ticket code)
    const ticketCode = "kw9f0kwvZJmsukQy";
    cy.get('input[placeholder="Código de Boleto"]').type(ticketCode);

    cy.get("@fixtureData").then((data) => {
      // Find the matching ticket in the fixture data
      const ticketInfo = data.find((item) => item.num_ticket === ticketCode);

      // Mock the API response based on the fixture data
      cy.intercept(
        `https://api.openweathermap.org/data/2.5/weather?q=${ticketInfo.origin}&appid=*`
      ).as("getDepartureWeather");

      cy.intercept(
        `https://api.openweathermap.org/data/2.5/weather?q=${ticketInfo.destination}&appid=*`
      ).as("getArrivalWeather");
    });

    // Click on the "Buscar" button
    cy.get("button").contains("Buscar").click();

    // Verify the API calls were made and check the results
    cy.wait("@getDepartureWeather");
    cy.wait("@getArrivalWeather");

    cy.get("div").contains("Resultados").should("be.visible");
    cy.get("div")
      .contains(ticketInfo.origin.toUpperCase())
      .should("be.visible");
    cy.get("div")
      .contains(ticketInfo.destination.toUpperCase())
      .should("be.visible");
  });
});
