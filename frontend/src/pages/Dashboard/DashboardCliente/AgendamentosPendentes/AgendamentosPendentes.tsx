import { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@mui/material';
import { Grid, List } from '@material-ui/core';
import api from '../../../../services/api';
import { IAgendamento } from '../../../../types/IAgendamento';
import { NotificationContext } from '../../../../components/NotificationProvider/NotificationProvider';
import { UserAvatar } from '../../../../components/UserAvatar/UserAvatar';
import { CardAgendamento } from '../../../../components/CardAgendamento';

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
        <Grid item xs={12} md={6}>
          <List className={classes.list}>
            {agendamentos.map((agendamento, index) => (
              <CardAgendamento
                key={index}
                agendamento={agendamento}
                avatar={
                  <UserAvatar
                    picturePath={agendamento.professional.picturePath}
                    alt={agendamento.professional.nickname.toString()}
                  />
                }
                name={agendamento.professional.nickname.toString()}
                onRefuse={() => cancelarAgendamento(agendamento.id)}
              />
            ))}
          </List>
        </Grid>
      </Grid>
    </>
  );
};
