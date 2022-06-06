import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Box, Theme, Grid } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';

import { Header } from '../../../components/Header/Header';
import { Button } from '../../../components/Button/ApolloButton';
import { TextInputLaranja } from '../../../components/TextInputLaranja/TextInputLaranja';

import api from '../../../services/api';
import { setToken } from '../../../services/auth';
import { NotificationContext } from '../../../components/NotificationProvider/NotificationProvider';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: '40%'
    },
    height: 450,
    backgroundColor: '#FFFFFF',
    margin: '60px auto auto auto',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center'
  }
}));

const Title = styled.h2`
  color: var(--title);
  text-align: center;
`;

const LoginProfissional = () => {
  const classes = useStyles();
  const [form, setForm] = useState({ email: '', password: '' });
  const { showNotification } = useContext(NotificationContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (form.email.length === 0 || form.password.length === 0)
      return showNotification('Por favor preencha os campos do formulário', 'warning');

    api
      .post('professionals/login', form)
      .then((res) => {
        if (res.status === 200) {
          setToken(res.data.jwt);
        }
      })
      .catch((err) => {
        showNotification(err, 'error');
      });
  };

  return (
    <div>
      <Header>
        {' '}
        <Button
          component={Link}
          to="/profissional/cadastro"
          color="secondary"
          variant="text"
          style={{ gridColumnStart: '1', gridColumnEnd: '3' }}
        >
          Criar Conta
        </Button>
      </Header>
      <form onSubmit={handleSubmit}>
        <Box className={classes.root}>
          <Grid
            sx={{ flexGrow: 1 }}
            p={10}
            spacing={4}
            justifyContent="center"
            alignContent="center"
            container
          >
            <Grid item xs={12} md={12}>
              <Title>Login Profissional</Title>
            </Grid>
            <Grid item xs={12} md={12}>
              <TextInputLaranja
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                label="Email:"
              ></TextInputLaranja>
            </Grid>
            <Grid item xs={12} md={12}>
              <TextInputLaranja
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                label="Senha:"
              ></TextInputLaranja>
            </Grid>
            <Grid item xs={12} md={12}>
              <Button type="submit" variant="contained" style={{ width: '100%' }}>
                Entrar
              </Button>
            </Grid>
            <Grid item xs={12} md={12} style={{ textAlign: 'center' }}>
              <Button
                component={Link}
                to="/profissional/cadastro"
                variant="text"
                style={{ textTransform: 'none' }}
              >
                Não possui conta? Clique aqui!
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </div>
  );
};

export default LoginProfissional;
