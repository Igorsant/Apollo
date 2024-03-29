import { Button } from '../../../components/Button/ApolloButton';
import { Close } from '@mui/icons-material';
import styled from 'styled-components';

export const AgendarModalBackground = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0px;
  position: fixed;
  top: 0px;
  width: 100vw;
`;

export const AgendarModal = styled.div`
  align-items: center;
  background-color: white;
  border-radius: 5px;
  color: black;
  display: grid;
  gap: 12px;
  grid-template-rows: auto auto auto 2fr auto;
  grid-template-areas:
    'close'
    'title'
    'progress'
    'steps'
    'buttons';
  justify-content: center;
  padding: 15px;
`;

export const ModalCloseButton = styled(Close)`
  align-self: end;
  border-radius: 50%;
  color: var(--header);
  cursor: pointer;
  display: flex;
  grid-area: close;
  margin-top: auto;
  margin-left: auto;
  padding: 5px;
  &:hover {
    background: rgba(0, 0, 0, 0.03);
  }
`;

export const ModalTitle = styled.h2`
  font-weight: bold;
  display: block;
  text-align: center;
  grid-area: title;
`;

export const ModalStepProgress = styled.div`
  align-items: center;
  display: grid;
  grid-area: progress;
  justify-content: center;
  padding: 10px;
  text-align: center;
`;

export const ModalCurrentStep = styled.div`
  grid-area: steps;
  padding: 15px 10px;
`;

export const ModalUserButtons = styled.div`
  display: grid;
  gap: 15px;
  grid-area: buttons;
  grid-template-areas: 'previous next';
`;

export const ModalNextStepButton = styled(Button)`
  grid-area: next;
`;

export const ModalPreviousStepButton = styled(Button)`
  background-color: #cd3838 !important; /* Sobrescrever o estilo de tema do Button */
  grid-area: previous;
`;
