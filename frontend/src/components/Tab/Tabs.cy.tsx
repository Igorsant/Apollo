import { useState } from 'react';
import ApolloTab from './Tabs';

const TestTab = () => {
  const [value, setValue] = useState(0);
  return (
    <ApolloTab
      value={value}
      setValue={setValue}
      opcoes={[
        {
          label: 'test1',
          value: 0
        },
        {
          label: 'test2',
          value: 1
        }
      ]}
    />
  );
};
describe('Testing Tab', () => {
  it('test render', () => {
    cy.mount(<TestTab />);
  });
});
