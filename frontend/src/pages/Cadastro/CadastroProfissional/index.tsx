import React, { useContext, useEffect } from 'react';
import { Box, Theme, Grid } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { Header } from '../../../components/Header/Header';
import { Button } from '../../../components/Button/ApolloButton';
import { useFormik } from 'formik';
import { ContactInfo, PersonalInfo, ProfileInfo, Title } from '../components';
import { Services } from './components/Services';
import { WorkInfo } from './components/WorkInfo';
import api from '../../../services/api';
import { useNavigate } from 'react-router-dom';
import { NotificationContext } from '../../../components/NotificationProvider/NotificationProvider';
import ITelefone from '../../../types/ITelefone';
import { profissionalSchema } from '../../../schemas/profissionalSchema';
import { WorkHours } from './components/WorkHours/WorkHours';

interface SubmitProfessional {
  cpf: string;
  email: string;
  fullName: string;
  nickname: string;
  aboutMe: string;
  password: string;
  phone: string;
  pictureBase64: string;
  services: {
    name: string;
    startingPrice: string;
    estimatedTime: string;
  }[];
  workHours: {
    weekday: string;
    startTime: string;
    endTime: string;
  }[];
  workplace: {
    street: string;
    streetNumber: string;
    complement: string;
    phones: ITelefone[];
  };
}

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
  useEffect(() => {
    document.title = 'Apollo | Cadastro Profissional';
  }, []);

  const classes = useStyles();
  const navigate = useNavigate();
  const { showNotification } = useContext(NotificationContext);

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
      services: [],
      workHours: [],
      workplace: {
        city: '',
        street: '',
        streetNumber: '',
        complement: '',
        phones: [
          {
            phone: '',
            isPhoneWhatsapp: false
          }
        ]
      }
    },
    validationSchema: profissionalSchema,
    onSubmit: (values) => {
      console.log(values);
      const { confirmPassword, ...profissional } = values;
      handleSubmit({
        ...profissional,
        pictureBase64: formatBase64Image(profissional.pictureBase64)
      });
    },
    validateOnChange: false,
    validateOnBlur: false
  });

  useEffect(() => {
    console.log(formik.errors);
  }, [formik.errors]);

  const formatBase64Image = (value: string | ArrayBuffer | null) => {
    let valueBase64 = '';
    if (typeof value === 'string' || value instanceof String) {
      valueBase64 = (value as String).split(',')[1];
    }
    return valueBase64;
  };

  const handleChangeImage = (value: string | ArrayBuffer | null) => {
    formik.setFieldValue('pictureBase64', value);
  };

  const handleSubmit = (values: SubmitProfessional) => {
    console.log(values);
    api
      .post('professionals', values)
      .then((res) => {
        if (res.status === 201) {
          formik.resetForm();
          showNotification('Profissional cadastrado com sucesso', 'success');
          navigate('/profissional/login', { replace: true });
        }
      })
      .catch((err) => {
        showNotification(err, 'error');
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
              <Title>Cadastro Profissional</Title>
            </Grid>
            <ProfileInfo formik={formik} handleChangeImage={handleChangeImage} profissional />
            <ContactInfo formik={formik} />
            <PersonalInfo formik={formik} />
            <Services formik={formik} />
            <WorkInfo formik={formik} />
            <WorkHours formik={formik} />

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
