import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@mui/material';
import { Grid, Box, IconButton } from '@material-ui/core';
import { NavigateNext, NavigateBefore } from '@mui/icons-material';
import moment from 'moment';
import { IAgendamento } from '../../../../../types/IAgendamento';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#42332b',
    fontSize: '20px'
  },
  root: {
    border: '5px solid #cd6538',
    borderRadius: 7,
    padding: 10
  },
  header: {
    textAlign: 'center',
    margin: 10,
    color: theme.palette.text.secondary
  },
  item: {
    textAlign: 'center',
    backgroundColor: '#EFEFEF',
    color: theme.palette.text.secondary,
    margin: 'auto 20px 20px 20px',
    padding: 15
  }
}));

interface IAgendamentos {
  agendamentos: IAgendamento[];
}

export const Agendamentos = ({ agendamentos }: IAgendamentos) => {
  const classes = useStyles();

  const [data, setData] = useState(new Date());

  const addDay = () => {
    setData(moment(data).add(1, 'day').toDate());
  };

  const subtractDay = () => {
    if (moment(data).isAfter(new Date(), 'day')) {
      setData(moment(data).subtract(1, 'day').toDate());
    }
  };
  return (
    <Grid container justifyContent="flex-start" alignItems="flex-start" className={classes.root}>
      <Grid item xs={12} className={classes.title}>
        Agendamentos
      </Grid>
      <Grid item xs={12} className={classes.header}>
        <IconButton onClick={subtractDay} disabled={moment(data).isSame(new Date(), 'day')}>
          <NavigateBefore />
        </IconButton>
        {moment(data).locale('pt-br').format('DD/MM/YYYY')}
        <IconButton onClick={addDay}>
          <NavigateNext />
        </IconButton>
      </Grid>
      {agendamentos
        .filter((agendamento) => moment(agendamento.startTime).isSame(data, 'day'))
        .map((agendamento, index) => {
          return (
            <Grid key={index} item xs={12} sm={6} md={6}>
              <Box className={classes.item}>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    {' '}
                    {moment(agendamento.startTime).locale('pt-br').format('HH:mm')} -{' '}
                    {moment(agendamento.endTime).locale('pt-br').format('HH:mm')}
                  </Grid>
                  <Grid item>{agendamento.customer.nickname}</Grid>
                </Grid>
              </Box>
            </Grid>
          );
        })}
    </Grid>
  );
};
