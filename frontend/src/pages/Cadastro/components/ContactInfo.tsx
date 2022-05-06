import React from 'react';
import { Grid } from '@mui/material';
import { TextInputLaranja } from '../../../components/TextInputLaranja/TextInputLaranja';
import { Subtitle } from './styles';

interface Props {
  formik: any;
}

export const ContactInfo = ({ formik }: Props) => {
  return (
    <Grid item xs={12} md={12} sx={{ flexGrow: 1 }} spacing={2} alignContent="center" container>
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
  );
};
