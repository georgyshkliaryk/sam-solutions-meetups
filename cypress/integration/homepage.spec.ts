import { visitHome } from "../utils";

describe("renders the homepage", () => {
  it("renders correctly", () => {
    visitHome();
    cy.get("#root").should("exist");
  });
});
