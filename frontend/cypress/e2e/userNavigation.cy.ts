import {} from 'cypress';

const localFrontendEndpoint = 'http://localhost:3000';
const localBackendEndpoint = 'http://localhost:3001';

const frontendBaseURL = Cypress.env('PUBLIC_URL') || localFrontendEndpoint;
const backendBaseURL = Cypress.env('REACT_APP_API_URL') || localBackendEndpoint;

describe('Validate visitor navigation in application', () => {
  before(() => {
    console.log(Cypress.env);
  });
  beforeEach(() => {
    cy.visit(frontendBaseURL);
  });

  describe('Visitor as customer', () => {
    it('should pass if visitor can navigate to home page', () => {
      cy.url().should('equal', `${frontendBaseURL}/`);
    });

    it('should pass if visitor can navigate to login page', () => {
      cy.get('[data-cy=loginAccountButton]').click();
      cy.url().should('equal', `${frontendBaseURL}/login`);
    });

    it('should pass if visitor can navigate to register page', () => {
      cy.get('[data-cy=createAccountButton]').click();
      cy.url().should('equal', `${frontendBaseURL}/cadastro`);
    });

    it('should pass if visitor can navigate to professional search page (city only)', () => {
      cy.get('[data-cy=queryCityInput]').type('for');
      cy.intercept({
        method: 'GET',
        url: `${backendBaseURL}/professionals/search?city=for&query=+`
      }).as('getRequest');
      cy.get('[data-cy=searchProfessionalButton]').click();

      cy.wait('@getRequest');
      cy.url().should('equal', `${frontendBaseURL}/buscar?city=for&query=`);
    });

    it('should pass if visitor can navigate to professional search page (city and professional)', () => {
      cy.get('[data-cy=queryCityInput]').type('for');
      cy.get('[data-cy=queryProfessionalInput]').type('fel');
      cy.intercept({
        method: 'GET',
        url: `${backendBaseURL}/professionals/search?city=for&query=fel`
      }).as('getRequest');

      cy.get('[data-cy=searchProfessionalButton]').click();
      cy.wait('@getRequest');

      cy.url().should('equal', `${frontendBaseURL}/buscar?city=for&query=fel`);
    });

    it('should fail if visitor can navigate to professional search page (professional only)', () => {
      cy.get('[data-cy=queryProfessionalInput]').type('fel');
      cy.get('[data-cy=searchProfessionalButton]').click();
      cy.url().should('not.equal', `${frontendBaseURL}/buscar?city=&query=fel`);
    });
  });

  describe('Visitor as professional', () => {
    it('should pass if visitor can navigate to professional login page', () => {
      cy.get('[data-cy=professionalLoginButton]').click();
      cy.url().should('equal', `${frontendBaseURL}/profissional/login`);
    });

    it('should pass if visitor can navigate to professional register page', () => {
      cy.get('[data-cy=professionalLoginButton]').click();
      cy.get('[data-cy=professionalRegisterButton]').click();
      cy.url().should('equal', `${frontendBaseURL}/profissional/cadastro`);
    });
  });
});
