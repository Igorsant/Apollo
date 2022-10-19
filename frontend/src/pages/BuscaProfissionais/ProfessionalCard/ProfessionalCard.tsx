import {
  Button,
  Tooltip,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Rating,
  CardHeader
} from '@mui/material';
import { Phone, Room, Star, WhatsApp } from '@mui/icons-material';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Favorite from '@mui/icons-material/Favorite';

import { formatPhone } from '../../../services/formatPhone';
import { NotificationContext } from '../../../components/NotificationProvider/NotificationProvider';
import { Row } from './styles';
import { UserAvatar } from '../../../components/UserAvatar/UserAvatar';
import IProfissional from '../../../types/IProfissional';

interface ProfessionalCardProps {
  profissional: IProfissional;
  favorite: boolean;
  actions: {
    addFavorite: (id: number) => Promise<boolean>;
    removeFavorite: (id: number) => Promise<boolean>;
  };
  user: any;
}

export const ProfessionalCard = ({
  user,
  profissional,
  favorite,
  actions
}: ProfessionalCardProps) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(favorite);
  const { showNotification } = useContext(NotificationContext);

  const favoritarProfissional = async (ev: any) => {
    ev.stopPropagation();

    if (await actions.addFavorite(profissional.id)) setIsFavorite(true);
  };

  const desfavoritarProfissional = async (ev: any) => {
    ev.stopPropagation();

    if (await actions.removeFavorite(profissional.id)) setIsFavorite(false);
  };

  const agendarProfissional = () => {
    if (!(user && user?.type === 'CUSTOMER')) {
      showNotification('É necessário estar logado para realizar esta ação', 'error');
      navigate('/login', { replace: true });
      return;
    }

    navigate(`/profissional/perfil/${profissional.id}?agendar=true`);
  };

  return (
    <Grid item xs={12} md={6} key={profissional.id}>
      <Card>
        <CardHeader
          avatar={<UserAvatar picturePath={profissional.picturePath} alt={profissional.nickname} />}
          action={
            <Tooltip title="Favoritar">
              <IconButton onClick={isFavorite ? desfavoritarProfissional : favoritarProfissional}>
                <Favorite htmlColor={isFavorite ? '#CD6538' : '#FFE3D8'} />
              </IconButton>
            </Tooltip>
          }
          title={profissional.fullName}
          subheader={
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Rating
                readOnly
                value={Number.parseFloat(profissional.averageRating ?? '0')}
                precision={0.5}
                icon={<Star color="primary" fontSize="small" />}
                emptyIcon={<Star htmlColor="#FFE3D8" fontSize="small" />}
              ></Rating>
              <span
                style={{
                  fontSize: '0.8em',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                ({profissional.totalReviews}{' '}
                {profissional.totalReviews === 1 ? 'avaliação' : 'avaliações'})
              </span>
            </div>
          }
        />
        <CardContent>
          <Row>
            <Room color="primary" />
            <span style={{ fontWeight: 'bold' }}>
              {`${profissional.workplace.street}, ${profissional.workplace.streetNumber}`}
            </span>
            {profissional.workplace.complement?.length > 0 && (
              <span>({profissional.workplace.complement})</span>
            )}
          </Row>
          <Row style={{ gap: '1rem', fontWeight: 'bold' }}>
            {profissional.workplace.phones.map((p, i) => (
              <Row key={`phone-${profissional.id}-${i}`} style={{ gap: '1rem' }}>
                {p.isPhoneWhatsapp ? <WhatsApp color="primary" /> : <Phone color="primary" />}
                <span style={{ lineHeight: '2rem' }}>{formatPhone(p.phone)}</span>
              </Row>
            ))}
          </Row>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            onClick={(ev: any) => {
              ev.stopPropagation();
              agendarProfissional();
            }}
          >
            Agendar
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate(`/profissional/perfil/${profissional.id}`)}
          >
            Ver perfil
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
