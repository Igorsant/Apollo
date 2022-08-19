import {} from 'cypress';

describe('Validate visitor navigation in application', () => {
  describe('Visitor as customer', () => {
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

    it('should pass if visitor can navigate to professional search page (city only)', () => {
      cy.visit('http://localhost:3000');
      cy.get('[data-cy=queryCityInput]').type(`for`);
      cy.get('[data-cy=searchProfessionalButton]').click();
      cy.wait(5000);
      cy.url().should('equal', 'http://localhost:3000/buscar?city=for&query=');
    });

    it('should pass if visitor can navigate to professional search page (city and professional)', () => {
      cy.visit('http://localhost:3000');
      cy.get('[data-cy=queryCityInput]').type(`for`);
      cy.get('[data-cy=queryProfessionalInput]').type(`fel`);
      cy.get('[data-cy=searchProfessionalButton]').click();
      cy.wait(5000);
      cy.url().should('equal', 'http://localhost:3000/buscar?city=for&query=fel');
    });

    it('should fail if visitor can navigate to professional search page (professional only)', () => {
      cy.visit('http://localhost:3000');
      cy.get('[data-cy=queryProfessionalInput]').type(`fel`);
      cy.get('[data-cy=searchProfessionalButton]').click();
      cy.url().should('not.equal', 'http://localhost:3000/buscar?city=&query=fel');
    });
  });

  describe('Visitor as professional', () => {
    it('should pass if visitor can navigate to professional login page', () => {
      cy.visit('http://localhost:3000');
      cy.get('[data-cy=professionalLoginButton]').click();
      cy.url().should('equal', 'http://localhost:3000/profissional/login');
    });

    it('should pass if visitor can navigate to professional register page', () => {
      cy.visit('http://localhost:3000');
      cy.get('[data-cy=professionalLoginButton]').click();
      cy.get('[data-cy=professionalRegisterButton]').click();
      cy.url().should('equal', 'http://localhost:3000/profissional/cadastro');
    });
  });
});
