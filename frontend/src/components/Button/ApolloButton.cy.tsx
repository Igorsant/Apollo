/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import { Button } from './ApolloButton';

describe('<ApolloButton />', () => {
  it('text on button', () => {
    cy.mount(<Button data-cy="button">button</Button>);
    cy.get('[data-cy=button]').should('have.text', 'button');
  });
});
