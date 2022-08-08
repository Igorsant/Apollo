describe('test login costumer', () => {
  it('see if changed location', () => {
    cy.visit('http://localhost:3000/#/login');

    cy.get('[data-cy=createAccountButton]').click();
    cy.url().should('eq', 'http://localhost:3000/#/cadastro');
  });
});
