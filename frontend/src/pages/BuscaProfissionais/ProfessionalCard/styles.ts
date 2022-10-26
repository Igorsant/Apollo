import styled from 'styled-components';

export const Row = styled.div`
  display: flex;
  align-items: center;

  &:nth-child(1) {
    align-items: center;
    gap: 1rem;
  }

  &:nth-child(1) button {
    padding: 0.3rem;
  }
`;

export const MainCardArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
`;

export const ButtonArea = styled.div`
  align-items: flex-end;
  display: flex;
  flex: 2;
  height: 100%;
  justify-content: flex-end;
`;

export const ProfessionalNameArea = styled.div`
  display: grid;

  button svg {
    aspect-ratio: 1 / 1;
  }
`;
