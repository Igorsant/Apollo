import { mount } from 'cypress/react';
import { Footer } from './Footer';

describe('Footer test', () => {
  it('test text and style of footer', () => {
    mount(<Footer />);
    cy.get('[data-cy=footer]')
      .should('have.text', 'Apollo, todos os direitos reservados')
      .should('have.css', 'background-color', 'rgb(205, 101, 56)');
  });
});
