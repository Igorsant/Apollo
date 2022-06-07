import { Button } from '@mui/material';
import styled from 'styled-components';

export const WorkHourWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 16px;
  width: 100%;
  flex-wrap: wrap;
`;

export const WorkHourDayWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 200px;
  @media (max-width: 1366px) {
    max-width: 150px;
  }
`;

export const WorkHourDayLabel = styled.label`
  text-align: center;
  color: black;
`;

export const WorkHourDay = styled.div`
  border: 4px solid var(--header);
  min-height: 100px;
  height: 100%;
  margin-left: -4px; // overlap na borda esquerda para não ficar com a borda duplicada
`;

export const WorkHourInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  border-bottom: 1px solid gray;
`;

export const WorkHourInput = styled.input`
  border: none;
  display: inline-block;
  flex: 3;
  text-align: center;
  width: 100%;
  height: 100%;
  // max-width: 40px;
  &:focus {
    outline: none;
  }
`;

export const WorkHourInputSeparator = styled.span`
  font-weight: bold;
  color: black;
  flex: 1;
  text-align: center;
  line-height: 30px;
`;

export const WorkHourButton = styled(Button)`
  min-width: 30px !important;
  padding: 0 !important;
  min-height: 30px !important;
  width: 30px !important;
  height: 30px !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
  font-weight: bold !important;
`;

export const DisplayWorkHour = styled.div`
  flex: 3;
  text-align: center;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9em;
`;
