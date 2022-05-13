import { Grid, FormControlLabel, Checkbox } from '@mui/material';
import React from 'react';
import { TextInputLaranja } from '../../../../components/TextInputLaranja/TextInputLaranja';
import { Subtitle } from '../../components';

export const WorkInfo = ({ formik }: any) => (
  <Grid item xs={12} md={12} sx={{ flexGrow: 1 }} spacing={2} alignContent="center" container>
    <Grid item xs={12} md={12}>
      <Subtitle>Informações do local de trabalho:</Subtitle>
    </Grid>
    <Grid item xs={12} md={12} container spacing={2} rowGap={2}>
      <Grid item xs={12} md={8}>
        <TextInputLaranja
          name="workplace.street"
          value={formik.values.workplace.street}
          onChange={formik.handleChange}
          placeholder="Ex.: Rua Andrade Mello"
          label={'Rua'}
        />
      </Grid>
      <Grid item xs={12} md={4} marginLeft={'auto'}>
        <TextInputLaranja
          name="workplace.streetNumber"
          value={formik.values.workplace.streetNumber}
          onChange={formik.handleChange}
          label={'Número'}
          placeholder="Ex.: 123"
          style={{ width: '100%' }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextInputLaranja
          name="workplace.complement"
          value={formik.values.complemento}
          onChange={formik.handleChange}
          placeholder="Ex.: Do lado do restaurante da esquina"
          label={'Complemento'}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextInputLaranja
          name="workplace.phone1"
          value={formik.values.workplace.phone1}
          onChange={formik.handleChange}
          placeholder="Ex.: 3834 9583"
          label={'Telefone 1'}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextInputLaranja
          name="workplace.phone2"
          value={formik.values.workplace.phone2}
          onChange={formik.handleChange}
          placeholder="Ex.: 9 9834 9583"
          label={'Telefone 2'}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControlLabel
          style={{ color: 'black' }}
          label="É whatsapp?"
          control={
            <Checkbox
              name="workplace.isPhone1Whatsapp"
              checked={formik.values.workplace.isPhone1Whatsapp}
              onChange={formik.handleChange}
            />
          }
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControlLabel
          style={{ color: 'black' }}
          label="É whatsapp?"
          control={
            <Checkbox
              name="workplace.isPhone2Whatsapp"
              checked={formik.values.workplace.isPhone2Whatsapp}
              onChange={formik.handleChange}
            />
          }
        />
      </Grid>
    </Grid>
  </Grid>
);
