export function login({ login, password }) {
  cy.visit("/login");
  cy.get("[data-cy=login]").type(login);
  cy.get("[data-cy=password]").type(password);
  cy.get("[data-cy=login-button]").click();
}

export function visitHome() {
  cy.visit("/");
}
