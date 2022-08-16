import {} from 'cypress';

describe('test login customer', () => {
  it('see if changed location', () => {
    cy.visit('http://localhost:3000/login');

    cy.location('pathname', { timeout: 60000 }).should('include', '/login');

    cy.get('[data-cy=createAccountButton]').click();
    cy.url().should('eq', 'http://localhost:3000/cadastro');
  });
});
