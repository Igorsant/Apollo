import { Button } from '@mui/material';
import styled from 'styled-components';

export const WorkHourWrapper = styled.div`
  display: grid;
  gap: 1.2rem;
  grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
  padding: 1rem;
  text-align: center;
  width: 100%;
`;

export const WorkHourDayWrapper = styled.div`
  border-radius: 0.2rem;
  border: 4px solid var(--header);
  padding: 0.5rem;
  width: 100%;
`;

export const WorkHourDayLabel = styled.label`
  color: black;
  text-align: center;
`;

export const WorkHourDay = styled.div`
  min-height: 100px;
`;

export const WorkHourInputWrapper = styled.div`
  align-items: center;
  border-bottom: 1px dashed gray;
  display: flex;
  justify-items: center;
`;

export const WorkHourInput = styled.input`
  border: none;
  text-align: center;
  width: 100%;
  &:focus {
    outline: none;
  }
`;

export const WorkHourInputSeparator = styled.span`
  font-weight: bold;
  color: black;
  text-align: center;
`;

export const WorkHourButton = styled(Button)`
  font-weight: bold !important;
  min-width: 30px !important;
`;

export const DisplayWorkHour = styled.div`
  align-items: center;
  color: black;
  display: grid;
  font-size: 0.9rem;
  grid-template-columns: repeat(auto-fill, 1fr);
  width: 100%;
`;
