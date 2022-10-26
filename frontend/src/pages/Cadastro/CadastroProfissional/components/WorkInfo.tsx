import { Grid, FormControlLabel, Checkbox } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { TextInputLaranja } from '../../../../components/TextInputLaranja/TextInputLaranja';
import { Subtitle } from '../../components';

export const WorkInfo = ({ formik }: any) => {
  const [phone2, setPhone2] = useState({ phone: '', isPhoneWhatsapp: false });

  const handleChange = (event: ChangeEvent<any>) => {
    const phone = phone2;

    if (event.target.name === 'phone') phone.phone = event.target.value;
    else if (event.target.name === 'isPhoneWhatsapp') phone.isPhoneWhatsapp = event.target.checked;

    setPhone2(phone);

    if (phone.phone.length > 0) {
      formik.setValues({
        ...formik.values,
        workplace: {
          ...formik.values.workplace,
          phones: [formik.values.workplace.phones[0], phone2]
        }
      });
    } else {
      formik.setValues({
        ...formik.values,
        workplace: {
          ...formik.values.workplace,
          phones: [formik.values.workplace.phones[0]]
        }
      });
    }
  };

  return (
    <Grid item xs={12} md={12} sx={{ flexGrow: 1 }} spacing={2} alignContent="center" container>
      <Grid item xs={12} md={12}>
        <Subtitle>Informações do local de trabalho:</Subtitle>
      </Grid>
      <Grid item xs={12} md={12} container spacing={2} rowGap={2}>
        <Grid item xs={12} md={4}>
          <TextInputLaranja
            name="workplace.city"
            value={formik.values.workplace.city}
            onChange={formik.handleChange}
            placeholder="Ex.: Fortaleza"
            data-cy="signinCidade"
            label={'Cidade:'}
            errorMessage={formik.errors.workplace?.city as string}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInputLaranja
            name="workplace.street"
            value={formik.values.workplace.street}
            onChange={formik.handleChange}
            placeholder="Ex.: Rua Andrade Mello"
            data-cy="signinRua"
            label={'Rua:'}
            errorMessage={formik.errors.workplace?.street as string}
          />
        </Grid>
        <Grid item xs={12} md={2} marginLeft={'auto'}>
          <TextInputLaranja
            name="workplace.streetNumber"
            value={formik.values.workplace.streetNumber}
            onChange={formik.handleChange}
            label={'Número:'}
            placeholder="Ex.: 123"
            data-cy="signinNumero"
            style={{ width: '100%' }}
            errorMessage={formik.errors.workplace?.streetNumber as string}
          />
        </Grid>
        <Grid item xs={12}>
          <TextInputLaranja
            name="workplace.complement"
            value={formik.values.complement}
            onChange={formik.handleChange}
            placeholder="Ex.: Do lado do restaurante da esquina"
            data-cy="signinComplemento"
            label={'Complemento:'}
            errorMessage={formik.errors.workplace?.complement as string}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInputLaranja
            name="workplace.phones[0].phone"
            value={formik.values.workplace.phones[0].phone}
            onChange={formik.handleChange}
            placeholder="Ex.: 8512345678"
            data-cy="signinTelefone1"
            label={'Telefone 1:'}
            errorMessage={formik.errors.workplace?.phones[0]?.phone as string}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInputLaranja
            name="phone"
            value={phone2.phone}
            onChange={handleChange}
            placeholder="Ex.: 85912345678"
            data-cy="signinTelefone2"
            label={'Telefone 2:'}
            errorMessage={
              formik.errors.workplace?.phones.length > 1
                ? (formik.errors.workplace?.phones[1]?.phone as string)
                : ''
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControlLabel
            style={{ color: 'black' }}
            data-cy="signinTelefoneWhats1"
            label="É whatsapp?"
            control={
              <Checkbox
                name="workplace.phones[0].isPhoneWhatsapp"
                checked={formik.values.workplace.phones[0].isPhoneWhatsapp}
                onChange={formik.handleChange}
              />
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControlLabel
            style={{ color: 'black' }}
            data-cy="signinTelefoneWhats2"
            label="É whatsapp?"
            control={
              <Checkbox
                name="isPhoneWhatsapp"
                checked={phone2.isPhoneWhatsapp}
                onChange={handleChange}
              />
            }
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
