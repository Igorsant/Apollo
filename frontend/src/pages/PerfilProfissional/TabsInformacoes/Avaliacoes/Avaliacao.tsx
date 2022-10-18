import { Delete, Edit, Star } from '@mui/icons-material';
import { Grid, IconButton, ListItem, Rating, Typography } from '@mui/material';
import { UserAvatar } from '../../../../components/UserAvatar/UserAvatar';
import IReview from '../../../../types/IReview';
import { Row } from '../../../BuscaProfissionais/ProfessionalCard/styles';
import styled from 'styled-components';
import { Tooltip } from '@material-ui/core';

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

interface AvalicaoProps {
  avaliacao: IReview;
  userOwnsReview: boolean;
  actions: {
    setEditReview: (id: number, rating: number, comment: string) => void;
    deleteReview: (id: number) => void;
  };
}

function formatDate(date: Date): string {
  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ];

  return `${date.getDate().toString().padStart(2, '0')} de ${
    months[date.getMonth()]
  } de ${date.getFullYear()}`;
}

export const Avaliacao = ({ avaliacao, userOwnsReview, actions }: AvalicaoProps) => {
  return (
    <ListItem alignItems="center" divider>
      <Grid
        container
        spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
      >
        <Row style={{ width: '100%' }}>
          <Grid item padding="8px">
            <UserAvatar
              alt={avaliacao.customerName}
              picturePath={avaliacao.customerPicturePath}
            ></UserAvatar>
          </Grid>
          <Column style={{ padding: '8px 0', width: '100%' }}>
            <Row>
              <Row style={{ gap: '1em', flex: '1' }}>
                <Typography>{avaliacao.customerName}</Typography>
                <Rating
                  readOnly
                  value={avaliacao.rating}
                  precision={0.5}
                  icon={<Star color="primary" fontSize="inherit" />}
                  emptyIcon={<Star htmlColor="#FFE3D8" fontSize="inherit" />}
                ></Rating>
              </Row>
            </Row>
            <span style={{ fontSize: '0.8em', color: 'gray' }}>
              {formatDate(new Date(avaliacao.lastModified))}
            </span>
          </Column>
          {userOwnsReview && (
            <Column>
              <Row>
                <Tooltip title="Editar">
                  <IconButton
                    color="info"
                    onClick={() =>
                      actions.setEditReview(avaliacao.id, avaliacao.rating, avaliacao.comment)
                    }
                  >
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Deletar">
                  <IconButton color="error" onClick={() => actions.deleteReview(avaliacao.id)}>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </Row>
            </Column>
          )}
        </Row>
        <Grid item>
          <Typography>{avaliacao.comment}</Typography>
        </Grid>
      </Grid>
    </ListItem>
  );
};
