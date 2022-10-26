/* eslint-disable no-undef */
import {} from 'cypress';

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

    // Fluxo 1 - Pelo "Entrar"
    it('Log In Profissional - Normal (Sucesso)', () => {
      cy.get('[data-cy=loginAccountButton]').click();
      cy.get('[data-cy=redirProfissional]').click();
      cy.get('[data-cy=loginProfEmailTextInput]').type('marcz@mail.com');
      cy.get('[data-cy=loginProfPasswordTextInput]').type('12345678');
      cy.get('[data-cy=loginProfSubmit]').click();
      cy.url().should('equal', 'http://localhost:3000/dashboard/profissional');
    });
    it('Log In Profissional - Normal (Fail - Senha Errada)', () => {
      cy.get('[data-cy=loginAccountButton]').click();
      cy.get('[data-cy=redirProfissional]').click();
      cy.get('[data-cy=loginProfEmailTextInput]').type('marcz@mail.com');
      cy.get('[data-cy=loginProfPasswordTextInput]').type('errada');
      cy.get('[data-cy=loginProfSubmit]').click();
      cy.url().should('equal', 'http://localhost:3000/profissional/login');
    });
    it('Log In Profissional - Normal (Fail- Email Inexistente)', () => {
      cy.get('[data-cy=loginAccountButton]').click();
      cy.get('[data-cy=redirProfissional]').click();
      cy.get('[data-cy=loginProfEmailTextInput]').type('inexistente@mail.com');
      cy.get('[data-cy=loginProfPasswordTextInput]').type('12345678');
      cy.get('[data-cy=loginProfSubmit]').click();
      cy.url().should('equal', 'http://localhost:3000/profissional/login');
    });

    // Fluxo 2 - Pela Pagina Principal
    it('Log In Profissional - Pagina Principal (ALT)(Sucesso)', () => {
      cy.get('[data-cy=redirProfissional]').click();
      cy.get('[data-cy=loginProfEmailTextInput]').type('marcz@mail.com');
      cy.get('[data-cy=loginProfPasswordTextInput]').type('12345678');
      cy.get('[data-cy=loginProfSubmit]').click();
      cy.url().should('equal', 'http://localhost:3000/dashboard/profissional');
    });
    it('Log In Profissional - Pagina Principal (ALT)(Fail - Senha Errada)', () => {
      cy.get('[data-cy=redirProfissional]').click();
      cy.get('[data-cy=loginProfEmailTextInput]').type('marcz@mail.com');
      cy.get('[data-cy=loginProfPasswordTextInput]').type('errado');
      cy.get('[data-cy=loginProfSubmit]').click();
      cy.url().should('equal', 'http://localhost:3000/profissional/login');
    });
    it('Log In Profissional - Pagina Principal (ALT)(Fail - Email Inexistente)', () => {
      cy.get('[data-cy=redirProfissional]').click();
      cy.get('[data-cy=loginProfEmailTextInput]').type('inexistente@mail.com');
      cy.get('[data-cy=loginProfPasswordTextInput]').type('12345678');
      cy.get('[data-cy=loginProfSubmit]').click();
      cy.url().should('equal', 'http://localhost:3000/profissional/login');
    });

    // Cadastro
    // Cliente
    // SE DER ERRO, CHECA SE O USUÁRIO JÁ EXISTE NO BD; SE SIM, DELETA!
    it('Sign In Cliente (no Photo)', () => {
      cy.get('[data-cy=createAccountButton]').click();
      cy.get('[data-cy=profileName]').type('BipBop da Silva');
      cy.get('[data-cy=profileAlias]').type('BipBop');
      cy.get('[data-cy=profileEmail]').type('bipbop@email.com');
      // Caso de Teste a Analisar: Testar com e sem espaço
      cy.get('[data-cy=profilePhone]').type('1199589958');
      // Caso de Teste a Analisar: CPF errado
      cy.get('[data-cy=profileNationalId]').type('10619442042');
      // Caso de teste a Analisar: Confirmação de Senha errada
      cy.get('[data-cy=profilePassword]').type('12345678');
      cy.get('[data-cy=profilePasswordConfirm]').type('12345678');
      cy.get('[data-cy=siginBtn]').click();
      cy.wait(5000);
      cy.url().should('equal', 'http://localhost:3000/login');
    });

    it('Sign In Cliente (Fail - Repetido)', () => {
      cy.get('[data-cy=createAccountButton]').click();
      cy.get('[data-cy=profileName]').type('BipBop da Silva');
      cy.get('[data-cy=profileAlias]').type('BipBop');
      cy.get('[data-cy=profileEmail]').type('bipbop@email.com');
      // Caso de Teste a Analisar: Testar com e sem espaço
      cy.get('[data-cy=profilePhone]').type('1199589958');
      // Caso de Teste a Analisar: CPF errado
      cy.get('[data-cy=profileNationalId]').type('10619442042');
      // Caso de teste a Analisar: Confirmação de Senha errada
      cy.get('[data-cy=profilePassword]').type('12345678');
      cy.get('[data-cy=profilePasswordConfirm]').type('12345678');
      cy.get('[data-cy=siginBtn]').click();
      cy.wait(5000);
      cy.url().should('equal', 'http://localhost:3000/cadastro');
    });

    it('Sign In Cliente (Fail - CPF Invalido)', () => {
      cy.get('[data-cy=createAccountButton]').click();
      cy.get('[data-cy=profileName]').type('BipBip da Silva');
      cy.get('[data-cy=profileAlias]').type('BipBip');
      cy.get('[data-cy=profileEmail]').type('bipbip@email.com');
      // Caso de Teste a Analisar: Testar com e sem espaço
      cy.get('[data-cy=profilePhone]').type('1199589958');
      // Caso de Teste a Analisar: CPF errado
      cy.get('[data-cy=profileNationalId]').type('11111111111');
      // Caso de teste a Analisar: Confirmação de Senha errada
      cy.get('[data-cy=profilePassword]').type('12345678');
      cy.get('[data-cy=profilePasswordConfirm]').type('12345678');
      cy.get('[data-cy=siginBtn]').click();
      cy.wait(5000);
      cy.url().should('equal', 'http://localhost:3000/cadastro');
    });

    // Profissional
    it('Sign In Profissional (no Photo)', () => {
      cy.get('[data-cy=redirProfissional]').click();
      cy.get('[data-cy=redirSignInProfissional]').click();
      cy.get('[data-cy=profileName]').type('Bibdi Babdi Bu');
      cy.get('[data-cy=profileAlias]').type('Bibdi');
      cy.get('[data-cy=profileEmail]').type('bibdbbu@email.com');
      cy.get('[data-cy=profilePhone]').type('1199589999');
      cy.get('[data-cy=profileNationalId]').type('20151341079');
      // Add Corte de Cabelo
      cy.get('[data-cy=signinNomeServico]').type('Corte Cabelo');
      cy.get('[data-cy=signinValorServico]').type('50');
      cy.get('[data-cy=signinTempoEstimado]').type('30');
      cy.get('[data-cy=signinAddServico]').click();
      // Add Corte Barba
      cy.get('[data-cy=signinNomeServico]').type('Corte Barba');
      cy.get('[data-cy=signinValorServico]').type('40');
      cy.get('[data-cy=signinTempoEstimado]').type('30');
      cy.get('[data-cy=signinAddServico]').click();
      // Local de trabalho
      cy.get('[data-cy=signinCidade]').type('João Pessoa');
      cy.get('[data-cy=signinRua]').type('Rua Ficticia Fantasiosa');
      cy.get('[data-cy=signinNumero]').type('0');
      cy.get('[data-cy=signinComplemento]').type('Próximo a Maquina do Tempo');
      cy.get('[data-cy=signinTelefone1]').type('83245367507');
      cy.get('[data-cy=signinTelefoneWhats1]').click();
      cy.get('[data-cy=signinTelefone2]').type('83245367507');
      // Horários de Trabalho
      // Finally
      cy.get('[data-cy=profilePassword]').type('12345678');
      cy.get('[data-cy=profilePasswordConfirm]').type('12345678');
      cy.get('[data-cy=signinButton]').click();
      cy.wait(5000);
      cy.url().should('equal', 'http://localhost:3000/profissional/login');
    });

    it('Sign In Profissional (Fail - Repetido)', () => {
      cy.get('[data-cy=redirProfissional]').click();
      cy.get('[data-cy=redirSignInProfissional]').click();
      cy.get('[data-cy=profileName]').type('Bibdi Babdi Bu');
      cy.get('[data-cy=profileAlias]').type('Bibdi');
      cy.get('[data-cy=profileEmail]').type('bibdbbu@email.com');
      cy.get('[data-cy=profilePhone]').type('1199589999');
      cy.get('[data-cy=profileNationalId]').type('20151341079');
      // Add Corte de Cabelo
      cy.get('[data-cy=signinNomeServico]').type('Corte Cabelo');
      cy.get('[data-cy=signinValorServico]').type('50');
      cy.get('[data-cy=signinTempoEstimado]').type('30');
      cy.get('[data-cy=signinAddServico]').click();
      // Add Corte Barba
      cy.get('[data-cy=signinNomeServico]').type('Corte Barba');
      cy.get('[data-cy=signinValorServico]').type('40');
      cy.get('[data-cy=signinTempoEstimado]').type('30');
      cy.get('[data-cy=signinAddServico]').click();
      // Local de trabalho
      cy.get('[data-cy=signinCidade]').type('João Pessoa');
      cy.get('[data-cy=signinRua]').type('Rua Ficticia Fantasiosa');
      cy.get('[data-cy=signinNumero]').type('0');
      cy.get('[data-cy=signinComplemento]').type('Próximo a Maquina do Tempo');
      cy.get('[data-cy=signinTelefone1]').type('83245367507');
      cy.get('[data-cy=signinTelefoneWhats1]').click();
      cy.get('[data-cy=signinTelefone2]').type('83245367507');
      // Horários de Trabalho
      // Finally
      cy.get('[data-cy=profilePassword]').type('12345678');
      cy.get('[data-cy=profilePasswordConfirm]').type('12345678');
      cy.get('[data-cy=signinButton]').click();
      cy.wait(5000);
      cy.url().should('equal', 'http://localhost:3000/profissional/cadastro');
    });

    it('Sign In Profissional (Fail - CPF invalido)', () => {
      cy.get('[data-cy=redirProfissional]').click();
      cy.get('[data-cy=redirSignInProfissional]').click();
      cy.get('[data-cy=profileName]').type('Majimbu');
      cy.get('[data-cy=profileAlias]').type('Majimbu');
      cy.get('[data-cy=profileEmail]').type('majimbu@email.com');
      cy.get('[data-cy=profilePhone]').type('1199589999');
      cy.get('[data-cy=profileNationalId]').type('11111111111');
      // Add Corte de Cabelo
      cy.get('[data-cy=signinNomeServico]').type('Corte Cabelo');
      cy.get('[data-cy=signinValorServico]').type('50');
      cy.get('[data-cy=signinTempoEstimado]').type('30');
      cy.get('[data-cy=signinAddServico]').click();
      // Add Corte Barba
      cy.get('[data-cy=signinNomeServico]').type('Corte Barba');
      cy.get('[data-cy=signinValorServico]').type('40');
      cy.get('[data-cy=signinTempoEstimado]').type('30');
      cy.get('[data-cy=signinAddServico]').click();
      // Local de trabalho
      cy.get('[data-cy=signinCidade]').type('João Pessoa');
      cy.get('[data-cy=signinRua]').type('Rua Ficticia Fantasiosa');
      cy.get('[data-cy=signinNumero]').type('0');
      cy.get('[data-cy=signinComplemento]').type('Próximo a Maquina do Tempo');
      cy.get('[data-cy=signinTelefone1]').type('83245367507');
      cy.get('[data-cy=signinTelefoneWhats1]').click();
      cy.get('[data-cy=signinTelefone2]').type('83245367507');
      // Horários de Trabalho
      // Finally
      cy.get('[data-cy=profilePassword]').type('12345678');
      cy.get('[data-cy=profilePasswordConfirm]').type('12345678');
      cy.get('[data-cy=signinButton]').click();
      cy.wait(5000);
      cy.url().should('equal', 'http://localhost:3000/profissional/cadastro');
    });
  });
});
