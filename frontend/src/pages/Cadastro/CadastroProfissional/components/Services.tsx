import { Button, Grid, IconButton } from '@mui/material';
import { useContext, useState } from 'react';
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
      services
    });

    setCurService({ name: '', startingPrice: '', estimatedTime: '' });
  };

  const handleRemove = (index: number) => {
    const services = formik.values.services;

    if (services.length <= index) return;

    services.splice(index, 1);

    formik.setValues({
      ...formik.values,
      services
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
      services
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
              <span>Clique aqui para cancelar.</span>
            </Button>
          </h4>
        ) : (
          ''
        )}
      </Grid>
      <Grid container spacing={2} rowGap={3}>
        <Grid item md={true} flexGrow={'1'}>
          <TextInputLaranja
            name={`current-service-name`}
            value={curService.name}
            onChange={(ev) => setCurService({ ...curService, name: ev.target.value })}
            data-cy="signinNomeServico"
            label={'Nome do serviço:'}
            placeholder="Ex.: Corte de cabelo"
          />
        </Grid>
        <Grid item md={true} flexGrow={'1'}>
          <TextInputLaranja
            name="current-service-price"
            value={curService.startingPrice}
            onChange={(ev) => setCurService({ ...curService, startingPrice: ev.target.value })}
            data-cy="signinValorServico"
            label={'Valor do serviço:'}
            placeholder="Ex.: 30.00"
            prefix="R$"
          />
        </Grid>
        <Grid item md={true} flexGrow={'1'}>
          <TextInputLaranja
            name={`current-service-time`}
            value={curService.estimatedTime}
            onChange={(ev) => setCurService({ ...curService, estimatedTime: ev.target.value })}
            data-cy="signinTempoEstimado"
            label={'Tempo estimado:'}
            placeholder="Ex.: 30"
            postfix="min."
          />
        </Grid>
        <Grid item sm={true} flexGrow={'1'}>
          <PlusButton
            variant="contained"
            data-cy="signinAddServico"
            onClick={editIndex !== null ? handleEdit : handleAdd}
          >
            {editIndex !== null ? <EditIcon /> : <span>+</span>}
          </PlusButton>
        </Grid>
      </Grid>
      <Grid item xs={12} md={12}>
        <table>
          <tbody
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 3
            }}
          >
            <tr
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)'
              }}
            >
              <th>#</th>
              <th>Nome do serviço</th>
              <th>Preço inicial</th>
              <th>Tempo estimado</th>
              <th>Ações</th>
            </tr>
            <tr>
              {formik.values.services.length > 0 || (
                <td
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    color: '#999',
                    padding: '1rem'
                  }}
                >
                  Nenhum serviço adicionado
                </td>
              )}
            </tr>
          </tbody>

          <tfoot
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              height: 'max-content'
            }}
          >
            {formik.values.services.map((service: any, index: number) => {
              const centeringStyle = {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'stretch'
              };

              return (
                <>
                  <td
                    key={`service-${index}`}
                    style={{
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <span>{index + 1}</span>
                  </td>
                  <td style={centeringStyle}>{service.name}</td>
                  <td style={centeringStyle}>
                    {formatMoney(Number.parseFloat(service.startingPrice))}
                  </td>
                  <td style={centeringStyle}>{service.estimatedTime} min.</td>
                  <td style={centeringStyle}>
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
                </>
              );
            })}
          </tfoot>
        </table>
      </Grid>
    </Grid>
  );
};
