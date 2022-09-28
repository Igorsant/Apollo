import { Favorite, Phone, Room, Star, WhatsApp } from '@mui/icons-material';
import { Rating, Theme } from '@mui/material';
import Box from '@mui/material/Box';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { AgendarForm, ServiceType } from './AgendarForm';
import { Button } from '../../components/Button/ApolloButton';
import { formatPhone } from '../../services/formatPhone';
import { NotificationContext } from '../../components/NotificationProvider/NotificationProvider';
import { ProfessionalNameArea, Row } from '../BuscaProfissionais/ProfessionalCard/styles';
import { TabsInformacoes } from './TabsInformacoes';
import { useUser } from '../../hooks/useUser';
import api from '../../services/api';
import IProfissional from '../../types/IProfissional';
import useQuery from '../../hooks/useQuery';

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
    alignContent: 'center',
    color: 'black',
    padding: '2%'
  },

  img: {
    minHeigth: '120px',
    minWidth: '120px'
  }
}));

const Image = styled.img`
  height: 200px;
  width: 200px;
`;

const ProfilePicture = styled.div`
  display: flex;
`;

export default function PerfilProfissional() {
  const classes = useStyles();
  const { id } = useParams();
  const [showAgendar, setShowAgendar] = useState(false);
  const [profissional, setProfissional] = useState<IProfissional | undefined>(undefined);
  const [services, setServices] = useState<ServiceType[]>([]);
  const { showNotification } = useContext(NotificationContext);
  const navigate = useNavigate();
  const user: any = useUser();
  const [isFavorite, setIsFavorite] = useState(false);
  const query = useQuery();
  const isAgendar = query.get('agendar');

  useEffect(() => {
    if (user && user.type === 'CUSTOMER') {
      api
        .get(`/professionals/favorites`)
        .then((res) => {
          if (res.data.includes(id)) setIsFavorite(true);
        })
        .catch((err) => showNotification(err, 'error'));
    }
  }, []);

  useEffect(() => {
    document.title = `Apollo | ${profissional ? profissional.nickname : 'Profissional'}`;
  }, [profissional]);

  useEffect(() => {
    if (id !== undefined) {
      api
        .get(`professionals/${id}`)
        .then((res) => {
          setProfissional(res.data);
          setServices(
            res.data.services.map((service: any) => ({
              id: service.id,
              name: service.name,
              time: service.estimatedTime
            }))
          );
          if (isAgendar === 'true') {
            console.log(profissional, services);
            setShowAgendar(true);
          }
        })
        .catch((err) => {
          navigate('/');
          showNotification(err, 'error');
        });
    }
  }, [id]);

  const validarFavorito = () => {
    if (user === null) {
      showNotification('É necessário estar logado para realizar esta ação', 'error');
      navigate('/login', { replace: true });
      return false;
    }
    if (user?.type !== 'CUSTOMER') {
      showNotification('Somente usuários do tipo cliente podem realizar esta ação', 'warning');
      return false;
    }

    return true;
  };

  const favoritarProfissional = () => {
    if (!validarFavorito()) return;

    api
      .post(`/professionals/${id}/favorite`)
      .then((_) => {
        setIsFavorite(true);
        showNotification('Profissional adicionado aos favoritos', 'success');
      })
      .catch((err) => showNotification(err, 'error'));
  };

  const desfavoritarProfissional = () => {
    if (!validarFavorito()) return;

    return api
      .delete(`/professionals/${id}/favorite`)
      .then((_) => {
        setIsFavorite(false);
        showNotification('Profissional removido dos favoritos', 'info');
      })
      .catch((err) => showNotification(err, 'error'));
  };

  const agendarProfissional = () => {
    if (!(user && user.type === 'CUSTOMER')) {
      showNotification('É necessário estar logado para realizar esta ação', 'error');
      navigate('/login', { replace: true });
      return;
    }

    setShowAgendar(true);
  };

  return (
    <Box className={classes.root}>
      <Grid container>
        <Grid
          container
          item
          alignItems="flex-start"
          xs={12}
          md={12}
          style={{ marginBottom: '1.2em', gap: '1em' }}
        >
          <ProfilePicture>
            <Image src={api.defaults.baseURL! + profissional?.picturePath}></Image>
          </ProfilePicture>
          <ProfessionalNameArea style={{ height: '100%', gap: '1em' }}>
            <Row>
              <ProfessionalNameArea style={{ gap: '0' }}>
                <Row style={{ justifyContent: 'space-between' }}>
                  <h3 style={{ fontSize: '1.2em', display: 'flex', alignItems: 'center' }}>
                    {profissional?.fullName}
                  </h3>
                  <Button
                    variant="text"
                    startIcon={<Favorite htmlColor={isFavorite ? '#CD6538' : '#FFE3D8'} />}
                    onClick={isFavorite ? desfavoritarProfissional : favoritarProfissional}
                    style={{
                      textTransform: 'none',
                      fontWeight: 'bold',
                      fontFamily: 'Merriweather'
                    }}
                    size="large"
                  >
                    Salvar
                  </Button>
                </Row>
                <Row>
                  <Rating
                    readOnly
                    value={Number.parseFloat(profissional?.averageRating ?? '0')}
                    precision={0.5}
                    icon={<Star color="primary" fontSize="inherit" />}
                    emptyIcon={<Star htmlColor="#FFE3D8" fontSize="inherit" />}
                  ></Rating>
                  <span
                    style={{
                      marginLeft: '0.5em',
                      fontSize: '0.8em',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    ({profissional?.totalReviews}{' '}
                    {profissional?.totalReviews === 1 ? 'avaliação' : 'avaliações'})
                  </span>
                </Row>
              </ProfessionalNameArea>
            </Row>
            <Row>
              <Room color="primary" />
              <span style={{ fontWeight: 'bold' }}>
                {`${profissional?.workplace.street}, ${profissional?.workplace.streetNumber}`}{' '}
              </span>
              {profissional?.workplace.complement &&
              profissional?.workplace.complement.length > 0 ? (
                <span style={{ marginLeft: '0.5em' }}>({profissional?.workplace.complement})</span>
              ) : (
                ''
              )}
            </Row>
            <Row style={{ gap: '1em', fontWeight: 'bold' }}>
              {profissional?.workplace.phones.map((p, i) => (
                <div
                  key={`phone-${profissional?.id}-${i}`}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
                >
                  {p.isPhoneWhatsapp ? <WhatsApp color="primary" /> : <Phone color="primary" />}
                  <span style={{ lineHeight: '24px', marginLeft: '0.25em' }}>
                    {formatPhone(p.phone)}
                  </span>
                </div>
              ))}
            </Row>
            <Row>
              <Button variant="contained" onClick={() => agendarProfissional()}>
                Agendar
              </Button>
            </Row>
          </ProfessionalNameArea>
        </Grid>
        <TabsInformacoes id={id} profissional={profissional}></TabsInformacoes>
      </Grid>
      {showAgendar && (
        <AgendarForm
          setShowAgendar={setShowAgendar}
          services={services}
          professionalId={id}
          servicesIds={profissional?.services.map((service) => service.id)}
        />
      )}
    </Box>
  );
}
