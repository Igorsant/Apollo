import { AuthCheck } from '../../../components/AuthCheck/AuthCheck';
import { Box, Theme } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import { AgendamentosPendentes } from './AgendamentosPendentes/AgendamentosPendentes';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: '80%'
    },
    backgroundColor: '#FFFFFF',
    margin: '60px auto auto auto',
    padding: 20,
    boxSizing: 'border-box'
  }
}));

export const Dashboard = () => {
  const classes = useStyles();

  return (
    <AuthCheck>
      <Box className={classes.root}>
        <AgendamentosPendentes />
      </Box>
    </AuthCheck>
  );
};
