import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@mui/material';
import { useContext, useEffect, useState } from 'react';

import { CardAgendamento } from '../../../../../components/CardAgendamento';
import { IAgendamento } from '../../../../../types/IAgendamento';
import { NotificationContext } from '../../../../../components/NotificationProvider/NotificationProvider';
import api from '../../../../../services/api';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#42332b',
    fontSize: '20px'
  },
  list: {
    width: '100%',
    color: '#42332b'
  },
  root: {
    border: '5px solid #cd6538',
    borderRadius: 7,
    padding: 10
  },
  dateTime: {
    fontWeight: 'bold',
    textAlign: 'center'
  },
  item: {
    textAlign: 'center'
  },
  buttonIcon: {
    color: theme.palette.error.main
  },
  services: {
    textAlign: 'center',
    color: '#cd6538',
    fontSize: 12
  }
}));

interface IAgendamentosPendentes {
  onAnswer: () => void;
}

export const AgendamentosPendentes = ({ onAnswer }: IAgendamentosPendentes) => {
  const classes = useStyles();
  const { showNotification } = useContext(NotificationContext);

  const [agendamentos, setAgendamentos] = useState<IAgendamento[]>([]);

  useEffect(() => {
    obterAgendamentosPendentes();
  }, []);

  const obterAgendamentosPendentes = () => {
    api
      .get('/schedulings?confirmed=false')
      .then((res) => {
        setAgendamentos(res.data);
      })
      .catch((err) => {
        return showNotification(err, 'error');
      });
  };

  const patchScheduling = (id: number, acceptScheduling: boolean) => {
    const patchSchedulingEndpoint = `/schedulings/${id}/${acceptScheduling ? 'accept' : 'refuse'}`;

    api
      .patch(patchSchedulingEndpoint)
      .then((_) => {
        obterAgendamentosPendentes();
        onAnswer();
      })
      .catch((err) => showNotification(err, 'error'));
  };

  const acceptScheduling = (id: number) => patchScheduling(id, true);
  const refuseScheduling = (id: number) => patchScheduling(id, false);

  return (
    <Grid
      container
      justifyContent="flex-start"
      alignItems="flex-start"
      className={classes.root}
      spacing={2}
    >
      <Grid item xs={12} className={classes.title}>
        Agendamentos Pendentes
      </Grid>

      <Grid item xs={12}>
        {agendamentos.map((agendamento, index) => (
          <CardAgendamento
            key={index}
            agendamento={agendamento}
            name={agendamento.customer.nickname.toString()}
            onAccept={() => acceptScheduling(agendamento.id)}
            onRefuse={() => refuseScheduling(agendamento.id)}
          />
        ))}
      </Grid>
    </Grid>
  );
};
