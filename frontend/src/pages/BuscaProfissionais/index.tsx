import { Card, CardActionArea, CardContent, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { ApolloContainer } from '../../components/Container';
import useQuery from '../../hooks/useQuery';
import api from '../../services/api';
import IProfissional from '../../types/IProfissional';
import { UserAvatar } from '../../components/UserAvatar/UserAvatar';
import { NotificationContext } from '../../components/NotificationProvider/NotificationProvider';

const BuscarProfissionais = () => {
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
        console.log(res.data);
        setProfissionais(res.data);
      })
      .catch((err) => {
        showNotification(err, 'error');
      });
  }, [query]);

  return (
    <ApolloContainer>
      <Grid container spacing={2} sx={{ p: 10, color: 'black' }}>
        <Typography variant="h6">
          {profissionais !== undefined &&
            `${profissionais?.length}  ${
              profissionais?.length === 1 ? ' profissional encontrado' : 'profissionais encontrados'
            } `}
        </Typography>
        {profissionais.map((profissional, index) => {
          return (
            <Grid key={profissional.id} item sm={12} md={12}>
              <Card sx={{ width: '100%' }}>
                <CardActionArea component={Link} to={`/profissional/perfil/${profissional.id}`}>
                  <CardContent>
                    <Grid
                      container
                      spacing={2}
                      direction="column"
                      justifyContent="center"
                      alignItems="flex-start"
                    >
                      <Grid
                        item
                        container
                        spacing={2}
                        justifyContent="flex-start"
                        alignItems="center"
                      >
                        <Grid item>
                          <UserAvatar
                            alt={profissional.nickname}
                            picturePath={profissional.picturePath}
                          ></UserAvatar>
                        </Grid>
                        <Grid item>
                          <Typography>{profissional.fullName}</Typography>
                        </Grid>
                        {/* <Grid item>
                        <Rating value={profissional.} readOnly precision={0.1} />
                      </Grid> */}
                      </Grid>
                      <Grid item>
                        <Typography>{`${profissional.workplace.street}, ${profissional.workplace.streetNumber} `}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography>{`${profissional.workplace.phones[0].phone}`}</Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </ApolloContainer>
  );
};

export default BuscarProfissionais;
