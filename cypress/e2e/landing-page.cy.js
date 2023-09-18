describe("Landing Page", () => {
  beforeEach(() => {
    // Navigate to the landing page (adjust the URL if necessary)
    cy.visit("localhost:3000");
  });

  it("should load the landing page correctly", () => {
    // Check that the main title is displayed
    cy.get("h2").contains("Clima Aeropuerto").should("be.visible");

    // Hover over the image and check the interactions
    cy.get("div.bg-illustration-stroke").trigger("mouseover");
    // Add assertions for the hover effects if necessary

    // Check the "Empezar" button and its functionality
    cy.get("button").contains("Empezar").should("be.visible").click();
    cy.url().should("include", "localhost:3000/weather");
  });
});
