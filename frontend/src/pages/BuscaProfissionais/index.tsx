import { Grid, CircularProgress, Box } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { NotificationContext } from '../../components/NotificationProvider/NotificationProvider';
import { ProfessionalCard } from './ProfessionalCard/ProfessionalCard';
import { useTitle } from '../../hooks/useTitle';
import { useUser } from '../../hooks/useUser';
import api from '../../services/api';
import IProfissional from '../../types/IProfissional';
import useQuery from '../../hooks/useQuery';

const BuscarProfissionais = () => {
  useTitle('Busca');
  const navigate = useNavigate();
  const user: any = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [favorites, setFavorites] = useState<number[]>([]);

  const { showNotification } = useContext(NotificationContext);
  const query = useQuery();
  const city = query.get('city');
  const queryValue = query.get('query') || ' ';
  const [profissionais, setProfissionais] = useState<IProfissional[]>([]);
  useEffect(() => {
    api
      .get('/professionals/search', {
        params: {
          city,
          query: queryValue
        }
      })
      .then((res) => {
        setIsLoading(false);
        setProfissionais(res.data);
      })
      .catch((err) => {
        showNotification(err, 'error');
      });
  }, [query]);

  useEffect(() => {
    if (user === null || user?.type !== 'CUSTOMER') return;

    api.get('/professionals/favorites').then((res) => setFavorites(res.data.map((p: any) => p.id)));
  }, []);

  const addFavorite = async (professionalId: number): Promise<boolean> => {
    if (user === null) {
      showNotification('É necessário estar logado para realizar esta ação', 'error');
      navigate('/login', { replace: true });
      return false;
    }

    if (user?.type !== 'CUSTOMER') {
      showNotification('Somente usuários do tipo cliente podem realizar esta ação', 'warning');
      return false;
    }

    return api
      .post(`/professionals/${professionalId}/favorite`)
      .then((_) => {
        showNotification('Profissional adicionado aos favoritos', 'success');
        return true;
      })
      .catch((err) => {
        showNotification(err, 'error');
        return false;
      });
  };

  const removeFavorite = async (professionalId: number): Promise<boolean> => {
    if (user === null) {
      showNotification('É necessário estar logado para realizar esta ação', 'error');
      navigate('/login', { replace: true });
      return false;
    }
    if (user?.type !== 'CUSTOMER') {
      showNotification('Somente usuários do tipo cliente podem realizar esta ação', 'warning');
      return false;
    }

    return api
      .delete(`/professionals/${professionalId}/favorite`)
      .then((_) => {
        showNotification('Profissional removido dos favoritos', 'info');
        return true;
      })
      .catch((err) => {
        showNotification(err, 'error');
        return false;
      });
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          height: `${window.innerHeight / 1.25}px`,
          alignItems: 'center'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Grid container>
      <Grid
        container
        item
        gap={'0.5rem'}
        sx={{ p: 5, color: 'gray' }}
        md={16}
        gridTemplateColumns={'1fr 1fr'}
      >
        <p style={{ width: '100%' }}>
          {profissionais !== undefined &&
            `${profissionais?.length}  ${
              profissionais?.length === 1 ? ' profissional encontrado' : 'profissionais encontrados'
            } `}
        </p>
        {profissionais.map((profissional, index) => {
          return (
            <ProfessionalCard
              user={user}
              key={`profissional-${index}`}
              profissional={profissional}
              favorite={favorites.includes(profissional.id)}
              actions={{ addFavorite, removeFavorite }}
            />
          );
        })}
      </Grid>
    </Grid>
  );
};

export default BuscarProfissionais;
