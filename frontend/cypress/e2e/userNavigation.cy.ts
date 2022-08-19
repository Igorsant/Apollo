import {} from 'cypress';

describe('Validate visitor navigation in application', () => {
  it('should pass if visitor can navigate to home page', () => {
    cy.visit('http://localhost:3000');
    cy.url().should('equal', 'http://localhost:3000/');
  });

  it('should pass if visitor can navigate to login page', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-cy=loginAccountButton]').click();
    cy.url().should('equal', 'http://localhost:3000/login');
  });

  it('should pass if visitor can navigate to register page', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-cy=createAccountButton]').click();
    cy.url().should('equal', 'http://localhost:3000/cadastro');
  });

  it('should pass if visitor can navigate to professional login page', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-cy=professionalLoginButton]').click();
    cy.url().should('equal', 'http://localhost:3000/profissional/login');
  });
});
