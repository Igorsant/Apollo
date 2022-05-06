import { Button } from '@mui/material';
import styled from 'styled-components';

export const Title = styled.h2`
  color: var(--title);
  text-align: center;
`;

export const Subtitle = styled.h3`
  color: var(--title);
  text-align: left;
`;

export const TimeLabel = styled.h2`
  color: var(--title);
  height: 100%;
  display: flex;
  align-items: center;
`;

export const PlusButton = styled(Button)`
  border-radius: 40px;
  height: 100%;
`;
