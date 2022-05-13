import { List, ListItem, Typography, Avatar, Grid, Rating, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import api from '../../../../services/api';
import IAlert from '../../../../types/IAlert';
import IReview from '../../../../types/IReview';

interface AvaliacoesProps {
  profissionalId: string | undefined;
  setAlert: React.Dispatch<React.SetStateAction<IAlert>>;
}
export const Avaliacoes: React.FC<AvaliacoesProps> = ({ profissionalId, setAlert }) => {
  const [avaliacoes, setAvaliacoes] = useState<IReview[] | undefined>(undefined);

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
          setAlert({ open: true, message: err.message, severity: 'error' });
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
                      <Avatar alt={avaliacao.customerName} src={avaliacao.customerPicturePath} />
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
