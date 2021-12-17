import { visitHome, login } from "../utils";

describe("creates new meetup", () => {
  it("meetup created", () => {
    let themesLength = 0;
    cy.visit("/login");
    login({ login: "Sandra", password: "private" });
    visitHome();
    cy.get("[data-cy=theme-card]").then((card) => {
      themesLength = card.length;
      console.log(themesLength);
    });
    cy.get("[data-cy=create-meetup-button]").click();
    cy.get("[data-cy=create-meetup-input-title]").type("Meetup for e2e test");
    cy.get("[data-cy=create-meetup-input-speakers]").type("Test User");
    cy.get("[data-cy=create-meetup-input-description]").type(
      "Test Description"
    );
    cy.get("[data-cy=create-meetup-button-next]").click();
    cy.get("[data-cy=create-meetup-button-create]").click();
    cy.get("[data-cy=theme-card]")
      .eq(themesLength + 1)
      .should("contain", "Meetup for e2e test");
  });
});
