import { Button } from '../../../../../components/Button/ApolloButton';
import { Cancel } from '@mui/icons-material';
import { Grid, List, ListItem, Divider } from '@material-ui/core';
import { IAgendamento } from '../../../../../types/IAgendamento';
import { makeStyles } from '@material-ui/core/styles';
import { NotificationContext } from '../../../../../components/NotificationProvider/NotificationProvider';
import { Theme } from '@mui/material';
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
    <Grid container justifyContent="flex-start" alignItems="flex-start" className={classes.root}>
      <Grid item xs={12} className={classes.title}>
        Agendamentos Pendentes
      </Grid>
      <Grid item xs={12}>
        <List className={classes.list}>
          {agendamentos.map((agendamento, index) => {
            return (
              <>
                <ListItem key={index}>
                  <Grid container alignItems="center" justifyContent="center">
                    <Grid
                      item
                      container
                      direction="column"
                      className={classes.dateTime}
                      xs={4}
                      sm={2}
                    >
                      <Grid item>
                        {`${moment(agendamento.startTime)
                          .locale('pt-br')
                          .format('HH:mm')} - ${moment(agendamento.endTime)
                          .locale('pt-br')
                          .format('HH:mm')}`}
                      </Grid>
                      <Grid item>
                        {moment(agendamento.startTime).locale('pt-br').format('DD/MM/yyyy')}
                      </Grid>
                    </Grid>

                    <Grid item xs={6} md={4} className={classes.dateTime}>
                      {agendamento.customer.nickname}
                    </Grid>
                    <Grid item xs={12} md={2} className={classes.services}>
                      {agendamento.services.map((service) => service.name).join(', ')}
                    </Grid>
                    <Grid item xs={6} md={2} className={classes.item}>
                      <Button
                        onClick={() => {
                          acceptScheduling(agendamento.id);
                        }}
                        variant="contained"
                        style={{ backgroundColor: '#2e7d32' }}
                      >
                        Aceitar
                      </Button>
                    </Grid>
                    <Grid item xs={6} md={2} className={classes.item}>
                      <Button
                        className={classes.buttonIcon}
                        onClick={() => {
                          refuseScheduling(agendamento.id);
                        }}
                      >
                        <Cancel fontSize="large" />
                      </Button>
                    </Grid>
                  </Grid>
                </ListItem>

                {agendamentos.length > index + 1 && <Divider />}
              </>
            );
          })}
        </List>
      </Grid>
    </Grid>
  );
};
