import { visitHome, login } from "../utils";

describe("tests meetups functionality", () => {
  const themeTitle = "Meetup for e2e test";
  const themeDescription = "Test Description";
  const themeSpeaker = "Test User";

  beforeEach(() => {
    login({ login: "Sandra", password: "private" });
    visitHome();
  });

  it("meetup created", () => {
    cy.get("[data-cy=create-meetup-button]").click();
    cy.get("[data-cy=create-meetup-input-title]").type(themeTitle);
    cy.get("[data-cy=create-meetup-input-speakers]").type(themeSpeaker);
    cy.get("[data-cy=create-meetup-input-description]").type(themeDescription);
    cy.get("[data-cy=create-meetup-button-next]").click();
    cy.get("[data-cy=create-meetup-button-create]").click();
    cy.get("[data-cy=theme-card-title]").last().contains(themeTitle);
    cy.get("[data-cy=theme-card-description]")
      .last()
      .contains(themeDescription);
  });

  it("theme opened and approved", () => {
    cy.get("[data-cy=theme-card-title]").last().click();
    cy.get("[data-cy=view-theme-button-approve]").click();
    cy.get("[data-cy=view-theme-modal-button-approve]").click();
  });

  it("meetup opened and published", () => {
    cy.visit("/meetups/drafts");
    cy.get("[data-cy=meetup-card-title]").last().click();
    cy.get("[data-cy=view-meetup-button-publish]").click();
    cy.get("[data-cy=view-meetup-modal-button-publish]").click();
  });

  it("meetup deleted", () => {
    cy.visit("/meetups/future");
    cy.get("[data-cy=meetup-card-button-delete]").last().click();
    cy.get("[data-cy=meetup-card-modal-button-delete]").last().click();
  });

  it("logs out", () => {
    cy.get("[data-cy=header-button-logout]").click();
    cy.get("[data-cy=login]").should("exist").should("be.empty");
    cy.get("[data-cy=password]").should("exist").should("be.empty");
    cy.get("[data-cy=login-button]").should("exist").should("be.disabled");
  });
});
