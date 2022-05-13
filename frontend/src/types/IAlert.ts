import { AlertColor } from '@mui/material';

export default interface IAlert {
  open: boolean;
  message: string;
  severity: AlertColor | undefined;
}
