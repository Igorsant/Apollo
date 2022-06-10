import React, { Dispatch, SetStateAction } from 'react';
import { HighlightStep, OtherSteps } from '../../style';
import { Line } from '../line';
import 'react-datepicker/dist/react-datepicker.css';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

interface Step3Interface {
  time: Date | null;
  setTime: Dispatch<SetStateAction<Date | null>>;
}

export const Step3 = ({ time, setTime }: Step3Interface) => (
  <>
    <div style={{ display: 'flex' }}>
      <HighlightStep>Definir serviços</HighlightStep>
      <Line />
      <HighlightStep>Definir dia</HighlightStep>
      <Line />
      <HighlightStep>Definir horários</HighlightStep>
      <Line />
      <OtherSteps>Confirmar Agendamentos</OtherSteps>
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', height: '50%', alignItems: 'center' }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TimePicker
          label="Basic example"
          value={time}
          onChange={(newValue) => {
            if (newValue) setTime(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </div>
  </>
);
