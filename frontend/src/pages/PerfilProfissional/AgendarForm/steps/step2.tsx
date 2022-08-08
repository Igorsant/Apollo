import { Dispatch, SetStateAction } from 'react';
import { HighlightStep, OtherSteps } from '../../style';
import { Line } from '../line';
import 'react-datepicker/dist/react-datepicker.css';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface Step2Interface {
  startDate: Date;
  setStartDate: Dispatch<SetStateAction<Date>>;
}

export const Step2 = ({ startDate, setStartDate }: Step2Interface) => (
  <>
    <div style={{ display: 'flex' }}>
      <HighlightStep>Definir serviços</HighlightStep>
      <Line />
      <HighlightStep>Definir dia</HighlightStep>
      <Line />
      <OtherSteps>Definir horários</OtherSteps>
      <Line />
      <OtherSteps>Confirmar Agendamentos</OtherSteps>
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', height: '50%', alignItems: 'center' }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Basic example"
          value={startDate}
          onChange={(newValue) => {
            if (newValue) setStartDate(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </div>
  </>
);
