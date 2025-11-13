/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    //TODO
    getByHeading(name: string): Chainable;

    //TODO
    getByRole(role: string): Chainable;
  }
}
