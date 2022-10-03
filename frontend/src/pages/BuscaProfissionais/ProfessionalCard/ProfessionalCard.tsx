import { Button, Card, Grid, IconButton, Rating } from '@mui/material';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Favorite from '@mui/icons-material/Favorite';
import Phone from '@mui/icons-material/Phone';
import Room from '@mui/icons-material/Room';
import Star from '@mui/icons-material/Star';
import WhatsApp from '@mui/icons-material/WhatsApp';

import { formatPhone } from '../../../services/formatPhone';
import { MainCardArea, ButtonArea, Row, ProfessionalNameArea } from './styles';
import { NotificationContext } from '../../../components/NotificationProvider/NotificationProvider';
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
    <Grid key={profissional.id} item md={true} width={'100%'} gap={'1rem'}>
      <Card
        onClick={() => navigate(`/profissional/perfil/${profissional.id}`)}
        sx={{
          cursor: 'pointer',
          display: 'grid',
          gridTemplateColumns: 'minmax(400px, 1fr) auto',
          padding: '1rem',
          userSelect: 'none'
        }}
      >
        <MainCardArea>
          <Row>
            <UserAvatar picturePath={profissional.picturePath} alt={profissional.nickname} />
            <ProfessionalNameArea>
              <Row>
                <h3>{profissional.fullName}</h3>
                <IconButton onClick={isFavorite ? desfavoritarProfissional : favoritarProfissional}>
                  <Favorite htmlColor={isFavorite ? '#CD6538' : '#FFE3D8'} />
                </IconButton>
              </Row>
              <Row>
                <Rating
                  readOnly
                  value={Number.parseFloat(profissional.averageRating ?? '0')}
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
                  ({profissional.totalReviews}{' '}
                  {profissional.totalReviews === 1 ? 'avaliação' : 'avaliações'})
                </span>
              </Row>
            </ProfessionalNameArea>
          </Row>
          <Row>
            <Room color="primary" />
            <span style={{ fontWeight: 'bold' }}>
              {`${profissional.workplace.street}, ${profissional.workplace.streetNumber}`}{' '}
            </span>
            {profissional.workplace.complement && profissional.workplace.complement.length > 0 ? (
              <span style={{ marginLeft: '0.5em' }}>({profissional.workplace.complement})</span>
            ) : (
              ''
            )}
          </Row>
          <Row style={{ gap: '1em', fontWeight: 'bold' }}>
            {profissional.workplace.phones.map((p, i) => (
              <div
                key={`phone-${profissional.id}-${i}`}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
              >
                {p.isPhoneWhatsapp ? <WhatsApp color="primary" /> : <Phone color="primary" />}
                <span style={{ lineHeight: '24px', marginLeft: '0.25em' }}>
                  {formatPhone(p.phone)}
                </span>
              </div>
            ))}
          </Row>
        </MainCardArea>
        <ButtonArea>
          <Button
            component={Button}
            variant="contained"
            onClick={(ev: any) => {
              ev.stopPropagation();
              agendarProfissional();
            }}
            sx={{ textTransform: 'none', fontSize: '1.2em' }}
          >
            Agendar
          </Button>
        </ButtonArea>
      </Card>
    </Grid>
  );
};
