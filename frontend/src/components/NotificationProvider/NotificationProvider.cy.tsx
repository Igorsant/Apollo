import { useContext } from 'react';
import { NotificationContext, NotificationProvider } from './NotificationProvider';

const TestNotification = () => {
  const { showNotification } = useContext(NotificationContext);

  return (
    <div>
      <button data-cy="greenId" onClick={() => showNotification('green one', 'success')}>
        green notification
      </button>
      <button data-cy="redId" onClick={() => showNotification('red one', 'error')}>
        red notification
      </button>
    </div>
  );
};
describe('Test Notification', () => {
  it('testing green notification', () => {
    cy.mount(
      <NotificationProvider>
        <TestNotification />
      </NotificationProvider>
    );

    cy.get('[data-cy=greenId]').click();
    cy.get('[data-cy=notification-test-id]')
      .should('be.visible')
      .should('have.css', 'background-color', 'rgb(46, 125, 50)');

    cy.wait(3000);
    cy.get('[data-cy=notification-test-id]').should('not.exist');
  });

  it('testing red notification', () => {
    cy.mount(
      <NotificationProvider>
        <TestNotification />
      </NotificationProvider>
    );
    cy.get('[data-cy=redId]').click();
    cy.get('[data-cy=notification-test-id]')
      .should('be.visible')
      .should('have.css', 'background-color', 'rgb(211, 47, 47)');

    cy.wait(3000);
    cy.get('[data-cy=notification-test-id]').should('not.exist');
  });
});
