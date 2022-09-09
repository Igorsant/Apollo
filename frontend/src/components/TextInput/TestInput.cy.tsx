import { TextInput } from './TextInput';
import '../../index.css';

describe('Testing Text Input', () => {
  it('Test if text is ok', () => {
    cy.mount(<TextInput />);
    cy.get('[data-cy=text-input]').type('something');
    cy.get('[data-cy=text-input]').should('have.value', 'something');
  });
});
