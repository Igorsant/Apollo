import { Button, Card, Grid, IconButton, Rating } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IProfissional from '../../../types/IProfissional';
import { MainCardArea, ButtonArea, Row, ProfessionalNameArea } from './styles';
import Room from '@mui/icons-material/Room';
import Phone from '@mui/icons-material/Phone';
import WhatsApp from '@mui/icons-material/WhatsApp';
import { formatPhone } from '../../../services/formatPhone';
import { UserAvatar } from '../../../components/UserAvatar/UserAvatar';
import Favorite from '@mui/icons-material/Favorite';
import Star from '@mui/icons-material/Star';

interface ProfessionalCardProps {
  profissional: IProfissional;
  favorite: boolean;
  actions: {
    addFavorite: (id: number) => Promise<boolean>;
    removeFavorite: (id: number) => Promise<boolean>;
  };
}

export const ProfessionalCard = ({ profissional, favorite, actions }: ProfessionalCardProps) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(favorite);

  const favoritarProfissional = async (ev: any) => {
    ev.stopPropagation();

    if (await actions.addFavorite(profissional.id)) setIsFavorite(true);
  };

  const desfavoritarProfissional = async (ev: any) => {
    ev.stopPropagation();

    if (await actions.removeFavorite(profissional.id)) setIsFavorite(false);
  };

  return (
    <Grid key={profissional.id} item sm={12} md={12}>
      <Card
        onClick={() => navigate(`/profissional/perfil/${profissional.id}`)}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          padding: '1em',
          textTransform: 'none',
          alignItems: 'flex-end',
          width: '100%',
          cursor: 'pointer',
          userSelect: 'none'
        }}
      >
        <MainCardArea>
          <Row style={{ gap: '1em' }}>
            <UserAvatar picturePath={profissional.picturePath} alt={profissional.nickname} />
            <ProfessionalNameArea>
              <Row>
                <h3 style={{ fontSize: '1.2em' }}>{profissional.fullName}</h3>
                <IconButton
                  sx={{ padding: '0 0.2em' }}
                  onClick={isFavorite ? desfavoritarProfissional : favoritarProfissional}
                >
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
              navigate(`/profissional/perfil/${profissional.id}?agendar=true`);
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
