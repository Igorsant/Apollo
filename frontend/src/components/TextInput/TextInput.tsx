import styled from 'styled-components';

const Input = styled.input`
  background-color: var(--input);
  padding: 10px;
  border: none;
  font-size: 0.5em;
  ::placeholder {
    color: var(--header);
  }
`;

export const TextInput = ({ hint }: { hint: string }) => <Input type="text" placeholder={hint} />;
