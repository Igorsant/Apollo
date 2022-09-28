import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dispatch, SetStateAction } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';

import 'react-datepicker/dist/react-datepicker.css';

interface Step2Interface {
  startDate: Date;
  setStartDate: Dispatch<SetStateAction<Date>>;
}

export const validateStep2 = (args: Step2Interface): boolean => Boolean(args.startDate);

export const Step2 = ({ startDate, setStartDate }: Step2Interface) => (
  <>
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
