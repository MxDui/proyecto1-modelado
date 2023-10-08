describe("Weather Page", () => {
  let tickets = [];

  beforeEach(() => {
    // Navigate to the main page
    cy.visit("localhost:3000/weather");
  });

  it("should search by cities", () => {
    // Select the "Ciudades" option
    cy.get("select").select("cities");

    // Type in the departure and arrival cities
    cy.get('input[placeholder="Ciudad"]').type("London");

    // Mock the API response for the cities
    cy.intercept(
      "https://api.openweathermap.org/data/2.5/weather?q=London&appid=*"
    ).as("getLondonWeather");

    // Click on the "Buscar" button
    cy.get("button").contains("Buscar").click();

    // Verify the API calls were made and check the results
    cy.wait("@getLondonWeather");

    cy.get("div").contains("Resultados").should("be.visible");
    cy.get("div").contains("LONDON").should("be.visible");
  });
  it("should search by boleto using random tickets from fixture", () => {
    // Set up the general intercepts for weather endpoints
    cy.intercept("GET", "https://api.openweathermap.org/data/2.5/weather*").as(
      "getWeather"
    );

    // Load the fixture
    cy.fixture("weather_fixture.json").then((data) => {
      // Shuffle the array and pick the first 10
      const tickets = Cypress._.sampleSize(data, 10);

      tickets.forEach((ticket) => {
        cy.wrap(ticket).then((ticket) => {
          // Wrap the ticket to handle it within Cypress context
          // Select the "Boleto" option
          cy.get("select").select("boleto");

          // Type in the boleto (ticket code)
          cy.get('input[placeholder="Código de Boleto"]')
            .clear()
            .type(ticket.num_ticket);

          // Click on the "Buscar" button
          cy.get("button").contains("Buscar").click();

          // Wait for the weather requests for both cities
          cy.wait("@getWeather").then((xhr) => {
            // Verify the request was made with the right coordinates
            if (xhr.request.url.includes(ticket.origin)) {
              expect(xhr.request.url).to.include(
                `lat=${ticket.origin_latitude}`
              );
              expect(xhr.request.url).to.include(
                `lon=${ticket.origin_longitude}`
              );
            } else if (xhr.request.url.includes(ticket.destination)) {
              expect(xhr.request.url).to.include(
                `lat=${ticket.destination_latitude}`
              );
              expect(xhr.request.url).to.include(
                `lon=${ticket.destination_longitude}`
              );
            }
          });

          // Check the results
          cy.get("div").contains("Resultados").should("be.visible");
          cy.get("div").contains(ticket.origin).should("be.visible");
          cy.get("div").contains(ticket.destination).should("be.visible");
        });
      });
    });
  });
  it("should search by IATA code", () => {
    // Set up the general intercepts for weather endpoints
    cy.intercept("GET", "https://api.openweathermap.org/data/2.5/weather*").as(
      "getWeather"
    );

    // Select the "IATA" option
    cy.get("select").select("iata");

    // Type in the IATA code
    cy.get('input[placeholder="IATA"]').type("LHR");

    // Mock the API response for the IATA code's weather
    cy.intercept("https://api.openweathermap.org/data/2.5/weather?lat=*").as(
      "getIATAWeather"
    );

    // Click on the "Buscar" button
    cy.get("button").contains("Buscar").click();

    // Verify the API call was made and check the results
    cy.wait("@getIATAWeather");

    cy.get("div").contains("Resultados").should("be.visible");
    cy.get("div").contains("LHR").should("be.visible");
  });
});
