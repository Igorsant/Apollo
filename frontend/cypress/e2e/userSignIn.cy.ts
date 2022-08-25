import {} from 'cypress';
import { css } from 'cypress/types/jquery';

describe('Testing User Sign In', () => {
  describe('Creating new Account', () => {
    beforeEach(() => {
      cy.clearLocalStorage();
      cy.visit('http://localhost:3000/');
    });

    // Login de Cliente
    it('Log In Cliente (Sucess)', () => {
      cy.get('[data-cy=loginAccountButton]').click();
      cy.get('[data-cy=loginEmailTextInput]').type('anfitras@ordem.com');
      cy.get('[data-cy=loginPasswordTextInput]').type('12345678');
      cy.get('[data-cy=loginSB]').click();
      cy.url().should('equal', 'http://localhost:3000/dashboard/cliente');
    });

    it('Log In Cliente (Fail - Email Inexistente)', () => {
      cy.get('[data-cy=loginAccountButton]').click();
      cy.get('[data-cy=loginEmailTextInput]').type('magistrada@ordem.com');
      cy.get('[data-cy=loginPasswordTextInput]').type('conhecimento');
      cy.get('[data-cy=loginSB]').click();
      cy.url().should('equal', 'http://localhost:3000/login');
    });

    it('Log In Cliente (Fail - Senha errada)', () => {
      cy.get('[data-cy=loginAccountButton]').click();
      cy.get('[data-cy=loginEmailTextInput]').type('anfitras@ordem.com');
      cy.get('[data-cy=loginPasswordTextInput]').type('errado');
      cy.get('[data-cy=loginSB]').click();
      cy.url().should('equal', 'http://localhost:3000/login');
    });

    it('Log In Cliente (Fail - Pagina de Profisisonais)', () => {
      cy.get('[data-cy=loginAccountButton]').click();
      cy.get('[data-cy=redirProfissional]').click();
      cy.get('[data-cy=loginProfEmailTextInput]').type('anfitras@ordem.com');
      cy.get('[data-cy=loginProfPasswordTextInput]').type('12345678');
      cy.get('[data-cy=loginProfSubmit]').click();
      cy.url().should('equal', 'http://localhost:3000/profissional/login');
    });

    // Login de Profissional
    // TODO

    // Cadastro
    it('Sign In (no Photo)', () => {
      cy.get('[data-cy=createAccountButton]').click();
      cy.get('[data-cy=profileName]').type('BipBop da Silva');
      cy.get('[data-cy=profileAlias]').type('BipBop');
      cy.get('[data-cy=profileEmail]').type('bipbop@email.com');
      // Caso de Teste a Analisar: Testar com e sem espaço
      cy.get('[data-cy=profilePhone]').type('1199589958');
      // Caso de Teste a Analisar: CPF errado
      cy.get('[data-cy=profileNationalId]').type('98718653090');
      // Caso de teste a Analisar: Confirmação de Senha errada
      cy.get('[data-cy=profilePassword]').type('12345678');
      cy.get('[data-cy=profilePasswordConfirm]').type('12345678');
      cy.get('[data-cy=siginBtn]').click();
      cy.wait(5000);
      cy.url().should('equal', 'http://localhost:3000/login');
    });

    // it.only('Sign In (w/ Photo)', () => {
    //   cy.get('[data-cy=createAccountButton]').click();
    //   cy.get('[data-cy=profilePhoto]').selectFile(
    //     './../../backend/static/user_pictures/default_user.jpg'
    //   );
    //   cy.get('[data-cy=profileName]').type('BipBop da Silva');
    //   cy.get('[data-cy=profileAlias]').type('BipBop');
    //   cy.get('[data-cy=profileEmail]').type('bipbop@email.com');
    //   cy.get('[data-cy=profilePhone]').type('11 99589958');
    //   cy.get('[data-cy=profileNationalId]').type('98718653090');
    //   cy.get('[data-cy=profilePassword]').type('12345678');
    //   cy.get('[data-cy=profilePasswordConfirm]').type('12345678');
    //   cy.get('[data-cy=siginBtn]').click();
    //   cy.url().should('equal', 'http://localhost:3000/login');
    // });
  });
});
