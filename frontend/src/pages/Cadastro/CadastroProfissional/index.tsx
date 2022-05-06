import React from 'react';
import { Box, Theme, Grid } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { Header } from '../../../components/Header/Header';
import { Button } from '../../../components/Button/ApolloButton';
import { useFormik } from 'formik';
import { ContactInfo, PersonalInfo, ProfileInfo, Subtitle, Title } from '../components';
import { Services } from './components/Services';
// import ICliente from '../../../types/ICliente';
// import api from '../../../services/api';
// import { useNavigate } from 'react-router-dom';

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

const CadastroProfissional = () => {
  const classes = useStyles();
  // const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      cpf: '',
      email: '',
      fullName: '',
      nickname: '',
      aboutMe: '',
      password: '',
      phone: '',
      pictureBase64: '',
      confirmPassword: '',
      services: [
        {
          name: 'string',
          startingPrice: 0,
          estimatedTime: 0
        }
      ],
      workHours: [
        {
          weekday: 0,
          startTime: 'string',
          endTime: 'string'
        }
      ],
      workplace: {
        street: 'string',
        streetNumber: 0,
        complement: 'string',
        phone1: 'string',
        isPhone1Whatsapp: true,
        phone2: 'string',
        isPhone2Whatsapp: true
      }
    },
    validationSchema: null,
    onSubmit: (values) => {
      console.log(values);
      // const { confirmPassword, ...profissional } = values;
      // handleSubmit({
      //   ...profissional,
      //   pictureBase64: formatBase64Image(profissional.pictureBase64)
      // });
      // formik.resetForm();
      // navigate('/login/profissional', { replace: true });
    },
    validateOnChange: false,
    validateOnBlur: false
  });

  // const formatBase64Image = (value: string | ArrayBuffer | null) => {
  //   let valueBase64 = '';
  //   if (typeof value === 'string' || value instanceof String) {
  //     valueBase64 = (value as String).split(',')[1];
  //   }
  //   return valueBase64;
  // };

  const handleChangeImage = (value: string | ArrayBuffer | null) => {
    formik.setFieldValue('pictureBase64', value);
  };

  // const handleSubmit = (values: ICliente) => {
  //   console.log(values);
  //   api
  //     .post('professionals', values)
  //     .then((res) => {
  //       if (res.status === 201) {
  //         console.log('Sucesso');
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

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
              <Title>Cadastro Profissional</Title>
            </Grid>
            <ProfileInfo formik={formik} handleChangeImage={handleChangeImage} />
            <ContactInfo formik={formik} />
            <PersonalInfo formik={formik} />
            <Services formik={formik} />
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
                <Subtitle>Informações do local de trabalho:</Subtitle>
              </Grid>

              {/* <Grid item xs={12} md={12} container spacing={2} rowGap={2}>//
                <Grid item xs={12} md={8}>
                  <TextInputLaranja
                    name="rua"
                    value={form.rua}
                    onChange={handleChange}
                    label={'Rua'}
                  />
                </Grid>
                <Grid item xs={12} md={4} marginLeft={'auto'}>
                  <TextInputLaranja
                    name="numero"
                    value={form.numero}
                    onChange={handleChange}
                    label={'Número'}
                    style={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextInputLaranja
                    name="complemento"
                    value={form.complemento}
                    onChange={handleChange}
                    label={'Complemento'}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextInputLaranja
                    name="telefone1"
                    value={form.telefone1.number}
                    onChange={(e) =>
                      handlePhoneChange(e, {
                        number: e.target.value,
                        isWpp: form.telefone1.isWpp
                      })
                    }
                    label={'Telefone 1'}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextInputLaranja
                    name="telefone2"
                    value={form.telefone2.number}
                    onChange={(e) =>
                      handlePhoneChange(e, {
                        number: e.target.value,
                        isWpp: form.telefone2.isWpp
                      })
                    }
                    label={'Telefone 2'}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    style={{ color: 'black' }}
                    label="É whatsapp?"
                    control={
                      <Checkbox
                        name="telefone1"
                        checked={form.telefone1.isWpp}
                        onChange={(e) =>
                          handlePhoneChange(e, {
                            number: form.telefone1.number,
                            isWpp: e.target.checked
                          })
                        }
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
                        name="telefone2"
                        checked={form.telefone2.isWpp}
                        onChange={(e) =>
                          handlePhoneChange(e, {
                            number: form.telefone2.number,
                            isWpp: e.target.checked
                          })
                        }
                      />
                    }
                  />
                </Grid>
              </Grid> */}
            </Grid>
            <Grid item xs={12} md={12} style={{ textAlign: 'center' }}>
              <Button type="submit" variant="contained" style={{ width: '40%' }}>
                Criar conta
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </div>
  );
};

export default CadastroProfissional;
