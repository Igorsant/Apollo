import { Grid, CircularProgress, Box } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import useQuery from '../../hooks/useQuery';
import api from '../../services/api';
import IProfissional from '../../types/IProfissional';
import { NotificationContext } from '../../components/NotificationProvider/NotificationProvider';
import { useTitle } from '../../hooks/useTitle';
import { ProfessionalCard } from './ProfessionalCard/ProfessionalCard';
import { useUser } from '../../hooks/useUser';
import { useNavigate } from 'react-router-dom';

const BuscarProfissionais = () => {
  useTitle('Busca');
  const user: any = useUser();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [favorites, setFavorites] = useState<number[]>([]);

  const { showNotification } = useContext(NotificationContext);
  const query = useQuery();
  // const name = query.get('name');
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
      navigate('/login');
      showNotification('É necessário estar logado para realizar esta ação', 'error');
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
      navigate('/login');
      showNotification('É necessário estar logado para realizar esta ação', 'error');
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
          minHeight: '100vh',
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
              key={`profissional-${index}`}
              profissional={profissional}
              favorite={favorites.includes(profissional.id)}
              actions={{ addFavorite, removeFavorite }}
            ></ProfessionalCard>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default BuscarProfissionais;
