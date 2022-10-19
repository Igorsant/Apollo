import { Button } from '../../../../../components/Button/ApolloButton';
import { Grid } from '@material-ui/core';
import { IAgendamento } from '../../../../../types/IAgendamento';
import { makeStyles } from '@material-ui/core/styles';
import { NotificationContext } from '../../../../../components/NotificationProvider/NotificationProvider';
import { Card, CardActions, CardContent, CardHeader, Chip, Theme } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import api from '../../../../../services/api';
import moment from 'moment';

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
          <Card key={index} variant="elevation" color="secondary">
            <CardHeader
              title={agendamento.customer.nickname}
              subheader={`${moment(agendamento.startTime)
                .locale('pt-br')
                .format('HH:mm')} - ${moment(agendamento.endTime)
                .locale('pt-br')
                .format('HH:mm')} (${moment(agendamento.startTime)
                .locale('pt-br')
                .format('DD/MM/yyyy')})`}
            ></CardHeader>

            <CardContent>
              {agendamento.services.map((service, i) => (
                <Chip key={`service-${i}`} sx={{ margin: '0 0.2rem' }} label={service.name} />
              ))}
            </CardContent>

            <CardActions>
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  acceptScheduling(agendamento.id);
                }}
              >
                Aceitar
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  refuseScheduling(agendamento.id);
                }}
              >
                Cancelar
              </Button>
            </CardActions>
          </Card>
        ))}
      </Grid>
    </Grid>
  );
};
