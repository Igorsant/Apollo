import { Grid } from '@mui/material';
import React from 'react';
import { ImageInput } from '../../../components/ImageInput/ImageInput';
import { TextInputLaranja } from '../../../components/TextInputLaranja/TextInputLaranja';
import { Subtitle } from './styles';
import { FormikProps } from 'formik';

interface ProfileInfoProps {
  handleChangeImage: (value: string | ArrayBuffer | null) => void;
  formik: FormikProps<any>;
}

export const ProfileInfo = ({ handleChangeImage, formik }: ProfileInfoProps) => (
  <Grid item xs={12} md={12} sx={{ flexGrow: 1 }} spacing={2} alignContent="center" container>
    <Grid item xs={12} md={12}>
      <Subtitle>Informações do Perfil</Subtitle>
    </Grid>
    <Grid item xs={12} md={2}>
      <ImageInput
        name="pictureBase64"
        value={formik.values.pictureBase64}
        onChangeImage={handleChangeImage}
        label="Foto de Perfil:"
      ></ImageInput>
    </Grid>
    <Grid item xs={12} md={10}>
      <Grid item xs={12} md={12}>
        <TextInputLaranja
          name="fullName"
          value={formik.values.fullName}
          onChange={formik.handleChange}
          errorMessage={formik.errors.fullName as string}
          label="Nome:"
        ></TextInputLaranja>
      </Grid>
      <Grid item xs={12} md={12}>
        <TextInputLaranja
          style={{ marginTop: '15px' }}
          name="nickname"
          value={formik.values.nickname}
          onChange={formik.handleChange}
          errorMessage={formik.errors.nickname as string}
          label="Apelido:"
        ></TextInputLaranja>
      </Grid>
    </Grid>
  </Grid>
);
