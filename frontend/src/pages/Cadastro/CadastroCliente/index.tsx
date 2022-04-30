import React from 'react';
import { Box, Theme, Grid } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../../../components/Header/Header';
import { Button } from '../../../components/Button/ApolloButton';
import { TextInputLaranja } from '../../../components/TextInputLaranja/TextInputLaranja';
import { useFormik } from 'formik';
import { clienteSchema } from '../../../schemas/clienteSchema';
import { ProfileInfo } from '../components/ProfileInfo';

import api from '../../../services/api';
import ICliente from '../../../types/ICliente';
import { Subtitle, Title } from '../components/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: '80%'
    },
    height: '100%',
    backgroundColor: '#FFFFFF',
    margin: '60px auto auto auto',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center'
  }
}));

const CadastroCliente = () => {
  const navigate = useNavigate();
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      cpf: '',
      email: '',
      fullName: '',
      nickname: '',
      password: '',
      phone: '',
      pictureBase64: '',
      confirmPassword: ''
    },
    validationSchema: clienteSchema,
    onSubmit: (values) => {
      console.log(values);
      const { confirmPassword, ...cliente } = values;
      handleSubmit({
        ...cliente,
        pictureBase64: formatBase64Image(cliente.pictureBase64)
      });
      formik.resetForm();
      navigate('/login', { replace: true });
    },
    validateOnChange: false,
    validateOnBlur: false
  });

  const handleChangeImage = (value: string | ArrayBuffer | null) => {
    formik.setFieldValue('pictureBase64', value);
  };

  const formatBase64Image = (value: string | ArrayBuffer | null) => {
    let valueBase64 = '';
    if (typeof value === 'string' || value instanceof String) {
      valueBase64 = (value as String).split(',')[1];
    }
    return valueBase64;
  };

  const handleSubmit = (values: ICliente) => {
    console.log(values);
    api
      .post('customers', values)
      .then((res) => {
        if (res.status === 201) {
          console.log('Sucesso');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Header></Header>
      <form onSubmit={formik.handleSubmit}>
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
              <Title>Cadastro</Title>
            </Grid>
            <ProfileInfo handleChangeImage={handleChangeImage} formik={formik} />
            <Grid
              item
              xs={12}
              md={12}
              sx={{ flexGrow: 1 }}
              spacing={2}
              alignContent="center"
              container
            >
              <Grid item xs={12} md={12}>
                <Subtitle>Informações de Contato</Subtitle>
              </Grid>
              <Grid item xs={12} md={12}>
                <TextInputLaranja
                  name="email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  errorMessage={formik.errors.email}
                  label="Email:"
                ></TextInputLaranja>
              </Grid>
              <Grid item xs={12} md={12}>
                <TextInputLaranja
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  errorMessage={formik.errors.phone}
                  label="Telefone(apenas números):"
                ></TextInputLaranja>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              sx={{ flexGrow: 1 }}
              spacing={2}
              alignContent="center"
              container
            >
              <Grid item xs={12} md={12}>
                <Subtitle>Informações pessoais:</Subtitle>
              </Grid>
              <Grid item xs={12} md={12}>
                <TextInputLaranja
                  name="cpf"
                  value={formik.values.cpf}
                  onChange={formik.handleChange}
                  label="CPF(Apenas números):"
                  errorMessage={formik.errors.cpf}
                ></TextInputLaranja>
              </Grid>
              <Grid item xs={12} md={12}>
                <TextInputLaranja
                  name="password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  errorMessage={formik.errors.password}
                  label="Senha:"
                ></TextInputLaranja>
              </Grid>
              <Grid item xs={12} md={12}>
                <TextInputLaranja
                  name="confirmPassword"
                  type="password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  errorMessage={formik.errors.confirmPassword}
                  label="Confirmar senha:"
                ></TextInputLaranja>
              </Grid>
            </Grid>
            <Grid item xs={12} md={12} style={{ textAlign: 'center' }}>
              <Button type="submit" variant="contained" style={{ width: '40%' }}>
                Criar conta
              </Button>
            </Grid>
            <Grid item xs={12} md={6} style={{ textAlign: 'center' }}>
              <Button
                component={Link}
                to="/cadastroprofissional"
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

export default CadastroCliente;
