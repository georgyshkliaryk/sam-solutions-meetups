import { visitHome, login } from "../utils";

describe("performs login", () => {
  it("logs in correctly", () => {
    cy.visit("/login");
    login({ login: "Sandra", password: "private" });
    visitHome();
  });
});
