import { Button, Grid, IconButton } from '@mui/material';
import React, { useContext, useState } from 'react';
import { TextInputLaranja } from '../../../../components/TextInputLaranja/TextInputLaranja';
import { Subtitle, PlusButton } from '../../components';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { NotificationContext } from '../../../../components/NotificationProvider/NotificationProvider';
import { formatMoney } from '../../../../services/formatMoney';

export const Services = ({ formik }: any) => {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [curService, setCurService] = useState({ name: '', startingPrice: '', estimatedTime: '' });
  const { showNotification } = useContext(NotificationContext);

  function validateService(): boolean {
    if (
      curService.name.length === 0 ||
      curService.startingPrice.length === 0 ||
      curService.estimatedTime.length === 0
    ) {
      showNotification('Por favor preencha todos os campos do serviço', 'warning');
      return false;
    }

    if (isNaN(Number.parseFloat(curService.startingPrice))) {
      showNotification('Preço do serviço deve ser um número válido', 'warning');
      return false;
    }

    if (
      isNaN(Number.parseFloat(curService.estimatedTime)) ||
      Number.parseFloat(curService.estimatedTime) !== Number.parseInt(curService.estimatedTime)
    ) {
      showNotification('Tempo estimado do serviço deve ser um número inteiro válido', 'warning');
      return false;
    }

    return true;
  }

  const handleAdd = () => {
    if (!validateService()) return;

    const services = formik.values.services;
    services.push(curService);

    formik.setValues({
      ...formik.values,
      services: services
    });

    setCurService({ name: '', startingPrice: '', estimatedTime: '' });
  };

  const handleRemove = (index: number) => {
    const services = formik.values.services;

    if (services.length <= index) return;

    services.splice(index, 1);

    formik.setValues({
      ...formik.values,
      services: services
    });
  };

  const handleEdit = () => {
    if (editIndex === null) return;
    if (!validateService()) return;

    const services = formik.values.services;
    if (services.length <= editIndex) {
      setEditIndex(null);
      setCurService({ name: '', startingPrice: '', estimatedTime: '' });
      return;
    }

    services[editIndex].name = curService.name;
    services[editIndex].startingPrice = curService.startingPrice;
    services[editIndex].estimatedTime = curService.estimatedTime;

    formik.setValues({
      ...formik.values,
      services: services
    });

    setEditIndex(null);
    setCurService({ name: '', startingPrice: '', estimatedTime: '' });
  };

  return (
    <Grid item xs={12} md={12} container rowGap={3}>
      <Grid item xs={12} md={12}>
        <Subtitle>Serviços:</Subtitle>
        {editIndex !== null ? (
          <h4 style={{ color: 'black', fontSize: '12px' }}>
            Editando serviço {editIndex + 1}.
            <Button
              style={{ fontSize: '12px' }}
              variant="text"
              color="error"
              onClick={() => {
                setEditIndex(null);
                setCurService({ name: '', startingPrice: '', estimatedTime: '' });
              }}
            >
              Clique aqui para cancelar.
            </Button>
          </h4>
        ) : (
          ''
        )}
      </Grid>
      <Grid item container xs={12} md={12} spacing={2} rowGap={3}>
        <Grid item xs={12} md={5}>
          <TextInputLaranja
            name={`current-service-name`}
            value={curService.name}
            onChange={(ev) => setCurService({ ...curService, name: ev.target.value })}
            label={'Nome do serviço:'}
            placeholder="Ex.: Corte de cabelo"
          />
        </Grid>
        <Grid item xs={3} md={3}>
          <TextInputLaranja
            name="current-service-price"
            value={curService.startingPrice}
            onChange={(ev) => setCurService({ ...curService, startingPrice: ev.target.value })}
            label={'Valor do serviço:'}
            placeholder="Ex.: 30.00"
            prefix="R$"
          />
        </Grid>
        <Grid item xs={3} md={3} sx={{ minWidth: '200px' }}>
          <TextInputLaranja
            name={`current-service-time`}
            value={curService.estimatedTime}
            onChange={(ev) => setCurService({ ...curService, estimatedTime: ev.target.value })}
            label={'Tempo estimado:'}
            placeholder="Ex.: 30"
            postfix="min."
          />
        </Grid>
        <Grid item xs={1} md={1}>
          <PlusButton variant="contained" onClick={editIndex !== null ? handleEdit : handleAdd}>
            {editIndex !== null ? <EditIcon /> : '+'}
          </PlusButton>
        </Grid>
      </Grid>
      <Grid item xs={12} md={12}>
        <table>
          <thead>
            <tr style={{ display: 'flex' }}>
              <th style={{ flex: 1 }}>#</th>
              <th style={{ flex: 9 }}>Nome do serviço</th>
              <th style={{ flex: 4 }}>Preço inicial</th>
              <th style={{ flex: 4 }}>Tempo estimado</th>
              <th style={{ flex: 2, padding: '10px 0' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {formik.values.services.length > 0 || (
              <tr>
                <td style={{ textAlign: 'center', color: '#999' }} colSpan={5}>
                  Nenhum serviço adicionado
                </td>
              </tr>
            )}
            {formik.values.services.map((service: any, index: number) => (
              <tr key={index} style={{ display: 'flex' }}>
                <td
                  style={{
                    flex: 1,
                    height: 'fit-content',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold'
                  }}
                >
                  {index + 1}
                </td>
                <td style={{ flex: 9, height: 'fit-content' }}>{service.name}</td>
                <td style={{ flex: 4, height: 'fit-content' }}>
                  {formatMoney(Number.parseFloat(service.startingPrice))}
                </td>
                <td style={{ flex: 4, height: 'fit-content' }}>{service.estimatedTime} min.</td>
                <td
                  style={{
                    flex: 2,
                    height: 'fit-content',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <IconButton onClick={() => handleRemove(index)} color="error">
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    color="info"
                    onClick={() => {
                      setEditIndex(index);
                      setCurService(service);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Grid>
    </Grid>
  );
};
