import { Grid } from '@mui/material';
import React from 'react';
import { ImageInput } from '../../../components/ImageInput/ImageInput';
import { TextInputLaranja } from '../../../components/TextInputLaranja/TextInputLaranja';
import { Subtitle } from './styles';
import { FormikProps } from 'formik';
import { TextAreaLaranja } from '../../../components/TextInputLaranja/TextAreaLaranja';

interface ProfileInfoProps {
  handleChangeImage: (value: string | ArrayBuffer | null) => void;
  formik: FormikProps<any>;
  profissional?: boolean;
}

export const ProfileInfo = ({ handleChangeImage, formik, profissional }: ProfileInfoProps) => (
  <Grid item xs={12} md={12} sx={{ flexGrow: 1 }} spacing={1} alignContent="center" container>
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
          placeholder="Ex.: Felipe Gonçalves"
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
          placeholder="Ex.: Felipe312"
        ></TextInputLaranja>
      </Grid>
    </Grid>
    {profissional ? (
      <Grid item xs={12}>
        <TextAreaLaranja
          label="Sobre mim:"
          name="aboutMe"
          value={formik.values.aboutMe}
          onChange={formik.handleChange}
          placeholder="Conte um pouco sobre você para seus clientes"
        />
      </Grid>
    ) : (
      ''
    )}
  </Grid>
);
