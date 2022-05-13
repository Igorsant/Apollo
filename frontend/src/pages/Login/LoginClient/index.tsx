import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Theme, Grid } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { Header } from '../../../components/Header/Header';
import { Button } from '../../../components/Button/ApolloButton';
import { TextInputLaranja } from '../../../components/TextInputLaranja/TextInputLaranja';
import { ApolloAlert } from '../../../components/Alert/Alert';

import api from '../../../services/api';
import { setToken } from '../../../services/auth';
import IAlert from '../../../types/IAlert';

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

const Login = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [form, setForm] = useState({ email: '', password: '' });
  const [alert, setAlert] = useState<IAlert>({ open: false, message: '', severity: undefined });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [name]: value });
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    api
      .post('customers/login', form)
      .then((res) => {
        if (res.status === 200) {
          setToken(res.data.jwt);
          navigate('/dashboard', { replace: true });
        }
      })
      .catch((err) => {
        setAlert({ open: true, message: err.message, severity: 'error' });
      });
  };

  return (
    <div>
      <Header>
        {' '}
        <Button
          component={Link}
          to="/cadastro/cliente"
          color="secondary"
          variant="text"
          style={{ gridColumnStart: '1', gridColumnEnd: '3' }}
        >
          Criar Conta
        </Button>
      </Header>
      <ApolloAlert handleClose={handleCloseAlert} {...alert}></ApolloAlert>
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
              <Title>Login</Title>
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
                name="password"
                type="password"
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
            <Grid item xs={12} md={6} style={{ textAlign: 'center' }}>
              <Button
                component={Link}
                to="/login/profissional"
                variant="text"
                style={{ textTransform: 'none' }}
              >
                Profissional? Clique aqui!
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </div>
  );
};

export default Login;
