import { mount } from 'cypress/react';
import { useState } from 'react';
import { ImageInput } from './ImageInput';

const TestImageInput = () => {
  const [value, setValue] = useState('');
  const onChangeImage = (value) => {
    setValue(value);
  };
  return <ImageInput onChangeImage={onChangeImage} value={value} />;
};

describe('ImageInput Test', () => {
  it('Test', () => {
    mount(<TestImageInput />);
    cy.get('[data-cy=fileUpload]').selectFile('cypress/fixtures/screenshot.png');
  });
});
