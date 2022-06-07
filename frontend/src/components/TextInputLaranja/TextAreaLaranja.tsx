import React, { InputHTMLAttributes, ChangeEventHandler } from 'react';
import styled from 'styled-components';
import { Div, Label } from './TextInputLaranja';

const TextArea = styled.textarea`
  &:focus {
    outline: none;
  }
  color: var(--header);
  background-color: var(--input);
  padding: 10px;
  border: none;
  font-family: Merryweather;
  font-size: 1em;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  resize: none;
  min-height: 150px;
  ::placeholder {
    color: var(--header);
    font-family: Merryweather;
    font-weight: 500;
    font-size: 1em;
  }
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 0.7em;
`;

interface ApolloTextAreaLaranjaProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string | number;
  name: string;
  errorMessage?: string;
  onChange: ChangeEventHandler;
}

export const TextAreaLaranja: React.FC<ApolloTextAreaLaranjaProps> = ({
  label,
  name,
  value,
  onChange,
  errorMessage,
  placeholder,
  ...props
}) => {
  return (
    <Div {...props}>
      <Label>{label}</Label>
      <TextArea value={value} name={name} onChange={onChange} placeholder={placeholder} />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Div>
  );
};
