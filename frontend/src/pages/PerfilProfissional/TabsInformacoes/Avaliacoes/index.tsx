import { List, ListItem, Typography, Grid, Rating, Divider } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { NotificationContext } from '../../../../components/NotificationProvider/NotificationProvider';
import { UserAvatar } from '../../../../components/UserAvatar/UserAvatar';
import api from '../../../../services/api';
import IReview from '../../../../types/IReview';

interface AvaliacoesProps {
  profissionalId: string | undefined;
}
export const Avaliacoes: React.FC<AvaliacoesProps> = ({ profissionalId }) => {
  const [avaliacoes, setAvaliacoes] = useState<IReview[] | undefined>(undefined);
  const { showNotification } = useContext(NotificationContext);

  useEffect(() => {
    if (profissionalId !== undefined) {
      api
        .get(`reviews`, { params: { professionalId: profissionalId } })
        .then((res) => {
          if (res.status === 200) {
            setAvaliacoes(res.data);
          }
        })
        .catch((err) => {
          showNotification(err, 'error');
        });
    }
    console.log(profissionalId);
  }, [profissionalId]);

  return (
    <>
      <Typography>
        {avaliacoes !== undefined &&
          `${avaliacoes?.length}  ${
            avaliacoes?.length === 1 ? 'Avaliação' : 'Avaliações'
          } de clientes `}
      </Typography>
      <List disablePadding sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Divider />
        {avaliacoes?.map((avaliacao, index) => {
          return (
            <>
              <ListItem key={index} alignItems="center" divider>
                <Grid
                  container
                  spacing={2}
                  direction="column"
                  justifyContent="center"
                  alignItems="flex-start"
                >
                  <Grid item container spacing={2} justifyContent="flex-start" alignItems="center">
                    <Grid item>
                      <UserAvatar
                        alt={avaliacao.customerName}
                        picturePath={avaliacao.customerPicturePath}
                      ></UserAvatar>
                    </Grid>
                    <Grid item>
                      <Typography>{avaliacao.customerName}</Typography>
                    </Grid>
                    <Grid item>
                      <Rating value={avaliacao.rating} readOnly precision={0.1} />
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography>{avaliacao.comment}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
            </>
          );
        })}
      </List>
    </>
  );
};
