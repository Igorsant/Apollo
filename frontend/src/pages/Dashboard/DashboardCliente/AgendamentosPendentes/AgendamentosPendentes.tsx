import { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Theme } from '@mui/material';
import { Grid, List, ListItem, Divider } from '@material-ui/core';
import { Cancel } from '@mui/icons-material';
import moment from 'moment';
import api from '../../../../services/api';
import { IAgendamento } from '../../../../types/IAgendamento';
import { NotificationContext } from '../../../../components/NotificationProvider/NotificationProvider';
import { UserAvatar } from '../../../../components/UserAvatar/UserAvatar';

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

export const AgendamentosPendentes = () => {
  const classes = useStyles();
  const { showNotification } = useContext(NotificationContext);

  const [agendamentos, setAgendamentos] = useState<IAgendamento[]>([]);
  const [refreshAgendamentos, setRefreshAgendamentos] = useState(false);

  useEffect(() => {
    obterAgendamentosPendentes();
  }, [refreshAgendamentos]);

  const obterAgendamentosPendentes = () => {
    api
      .get('/schedulings?confirmed=true')
      .then((res) => {
        console.log(res);
        setAgendamentos(res.data);
      })
      .catch((err) => {
        return showNotification(err, 'error');
      });
  };

  const cancelarAgendamento = (id: number) => {
    return () => {
      api
        .delete(`/schedulings/${id}`)
        .then((_) => {
          showNotification('Agendamento cancelado com sucesso', 'info');
          setRefreshAgendamentos(true);
        })
        .catch((err) => showNotification(err, 'error'));
    };
  };

  return (
    <>
      <Grid
        item
        xs={12}
        className={classes.title}
        style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1em' }}
      >
        Agendamentos Pendentes
      </Grid>
      <Grid container justifyContent="flex-start" alignItems="flex-start" className={classes.root}>
        <Grid item xs={12}>
          <List className={classes.list}>
            {agendamentos.map((agendamento, index) => {
              return (
                <div key={index}>
                  <ListItem>
                    <Grid container alignItems="center" justifyContent="space-between">
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

                      <Grid
                        item
                        xs={6}
                        md={4}
                        className={classes.dateTime}
                        style={{ display: 'flex', alignItems: 'center', gap: '1em' }}
                      >
                        <UserAvatar
                          picturePath={agendamento.professional.picturePath}
                          alt={agendamento.professional.nickname}
                        />
                        {agendamento.professional.nickname}
                      </Grid>
                      <Grid item xs={12} md={2} className={classes.services}>
                        {agendamento.services.map((service) => service.name).join(', ')}
                      </Grid>
                      <Grid item xs={6} md={2} className={classes.item}>
                        <Button
                          className={classes.buttonIcon}
                          onClick={cancelarAgendamento(agendamento.id)}
                        >
                          <Cancel fontSize="large" />
                        </Button>
                      </Grid>
                    </Grid>
                  </ListItem>

                  {agendamentos.length > index + 1 && <Divider />}
                </div>
              );
            })}
          </List>
        </Grid>
      </Grid>
    </>
  );
};
