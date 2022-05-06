import { Grid } from '@mui/material';
import React from 'react';
import { TextInputLaranja } from '../../../components/TextInputLaranja/TextInputLaranja';
import { Subtitle } from './styles';

export const PersonalInfo = ({ formik }: any) => {
  return (
    <Grid item xs={12} md={12} sx={{ flexGrow: 1 }} spacing={2} alignContent="center" container>
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
  );
};
