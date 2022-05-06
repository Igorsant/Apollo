import { Button, Grid } from '@mui/material';
import React, { useState } from 'react';
import { TextInputLaranja } from '../../../../components/TextInputLaranja/TextInputLaranja';
import { Subtitle, TimeLabel, PlusButton } from '../../components';

export const Services = ({ formik }: any) => {
  const [index, setIndex] = useState<number>(0);

  const handleAdd = () => {
    formik.setValues({
      ...formik.values,
      services: [...formik.values.services, { name: '', startingPrice: 0, estimatedTime: 0 }]
    });
    setIndex((curr) => curr + 1);
  };

  const handleRemove = (index: number) => {
    const aux = formik.values.services.filter((_: any, i: any) => index !== i);
    console.log(aux);
    formik.values.services.length > 1 &&
      formik.setValues({
        ...formik.values,
        services: aux
      });
  };

  const handleEdit = (index: number) => {
    setIndex(index);
  };

  return (
    <Grid item xs={12} md={12} container rowGap={3}>
      <Grid item xs={12} md={12}>
        <Subtitle>Serviços:</Subtitle>
      </Grid>
      <Grid item container xs={12} md={12} spacing={2} rowGap={3}>
        <Grid item xs={12} md={4}>
          <TextInputLaranja
            name={`services[${index}].name`}
            value={formik.values.services[index].name}
            onChange={formik.handleChange}
            label={'Nome do serviço:'}
            placeholder="Ex.: Corte de cabelo"
          />
        </Grid>
        <Grid item xs={3} md={3}>
          <TextInputLaranja
            name={`services[${index}].startingPrice`}
            value={formik.values.services[index].startingPrice}
            onChange={formik.handleChange}
            label={'Valor do serviço:'}
          />
        </Grid>
        <Grid item xs={3} md={2} sx={{ minWidth: '200px' }}>
          <TextInputLaranja
            name={`services[${index}].estimatedTime`}
            value={formik.values.services[index].estimatedTime}
            onChange={formik.handleChange}
            label={'Tempo estimado:'}
          />
        </Grid>
        <Grid item xs={1} md={1}>
          <TimeLabel>min</TimeLabel>
        </Grid>
        <Grid item xs={1} md={1}>
          <PlusButton variant="contained" onClick={handleAdd}>
            +
          </PlusButton>
        </Grid>
      </Grid>
      <Grid item xs={12} md={12}>
        <table>
          <tr>
            <th>#</th>
            <th>Nome do serviço</th>
            <th>Preço inicial</th>
            <th>Tempo estimado</th>
            <th>Ações</th>
          </tr>

          {formik.values.services.map((service: any, index: number) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{service.name}</td>
              <td>{service.startingPrice}</td>
              <td>{service.estimatedTime}</td>
              <td>
                <Button onClick={() => handleRemove(index)}>remove</Button>
                <Button onClick={() => handleEdit(index)}>editar</Button>
              </td>
            </tr>
          ))}
        </table>
      </Grid>
    </Grid>
  );
};
