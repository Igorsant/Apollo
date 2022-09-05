import { useContext } from 'react';
import { Box, Theme, Grid } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../../components/Button/ApolloButton';
import { useFormik } from 'formik';
import { clienteSchema } from '../../../schemas/clienteSchema';
import { ProfileInfo, ContactInfo, PersonalInfo } from '../components';

import api from '../../../services/api';
import ICliente from '../../../types/ICliente';
import { Title } from '../components/styles';
import { NotificationContext } from '../../../components/NotificationProvider/NotificationProvider';
import { useTitle } from '../../../hooks/useTitle';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
    alignContent: 'center',
    backgroundColor: '#FFFFFF',
    display: 'grid',
    height: '100%',
    justifyContent: 'center',
    margin: '60px auto'
  }
}));

const CadastroCliente = () => {
  useTitle('Cadastro');
  const navigate = useNavigate();
  const classes = useStyles();
  const { showNotification } = useContext(NotificationContext);

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
          formik.resetForm();
          showNotification('Usuário cadastrado com sucesso', 'success');
          navigate('/login', { replace: true });
        }
      })
      .catch((err) => {
        showNotification(err, 'error');
      });
  };

  return (
    <div>
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
            <ContactInfo formik={formik} />
            <PersonalInfo formik={formik} />
            <Grid item xs={12} md={12} style={{ textAlign: 'center' }}>
              <Button type="submit" variant="contained" data-cy="siginBtn" style={{ width: '40%' }}>
                Criar conta
              </Button>
            </Grid>
            <Grid item xs={12} md={6} style={{ textAlign: 'center' }}>
              <Button
                component={Link}
                to="/profissional/cadastro"
                variant="text"
                style={{ textTransform: 'none' }}
                data-cy="siginRedirect"
                onClick={() => console.log(formik.errors)}
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
