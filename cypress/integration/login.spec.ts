import { visitHome, login } from "../utils";
import { routes } from "../../src/constants";

describe("performs login", () => {
  it("logs in correctly", () => {
    cy.visit(routes.login);
    login({ login: "Robbie", password: "private" });
    visitHome();
  });
});
