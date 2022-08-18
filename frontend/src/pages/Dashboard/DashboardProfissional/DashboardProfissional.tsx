import { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@mui/material';
import { Box, Grid } from '@material-ui/core';
import { Agendamentos } from './components/Agendamentos/Agendamentos';
import { AgendamentosPendentes } from './components/AgendamentosPendentes/AgendamentosPendentes';
import api from '../../../services/api';
import { NotificationContext } from '../../../components/NotificationProvider/NotificationProvider';
import { IAgendamento } from '../../../types/IAgendamento';

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

export const DashboardProfissional = () => {
  const { showNotification } = useContext(NotificationContext);
  const [agendamentos, setAgendamentos] = useState<IAgendamento[]>([]);

  useEffect(() => {
    obterAgendamentos();
  }, []);

  const obterAgendamentos = () => {
    api
      .get('/schedulings?confirmed=true')
      .then((res) => {
        setAgendamentos(res.data);
      })
      .catch((err) => {
        return showNotification(err, 'warning');
      });
  };
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Grid container justifyContent="flex-end" spacing={2}>
        <Grid item xs={12} sm={12} md={12}>
          <Agendamentos agendamentos={agendamentos} />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <AgendamentosPendentes onAnswer={obterAgendamentos} />
        </Grid>
      </Grid>
    </Box>
  );
};
