import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Dispatch, SetStateAction } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import TextField from '@mui/material/TextField';

import 'react-datepicker/dist/react-datepicker.css';

interface Step3Interface {
  time: Date | null;
  setTime: Dispatch<SetStateAction<Date | null>>;
}

export const validateStep3 = (args: Step3Interface): boolean =>
  Boolean(args.time && Date.parse(args.time.toString()));

export const Step3 = ({ time, setTime }: Step3Interface) => (
  <>
    <div style={{ display: 'flex', justifyContent: 'center', height: '50%', alignItems: 'center' }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TimePicker
          label="Horário de início"
          value={time}
          onChange={(newValue: Date | null) => {
            if (!(newValue instanceof Date)) return;

            if (!newValue) return;
            setTime(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </div>
  </>
);
