import { Avatar, Card, CardActionArea, CardContent, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { ApolloAlert } from '../../components/Alert/Alert';
import { ApolloContainer } from '../../components/Container';
import useQuery from '../../hooks/useQuery';
import api from '../../services/api';
import IAlert from '../../types/IAlert';
import IProfissional from '../../types/IProfissional';

const BuscarProfissionais = () => {
  const query = useQuery();
  // const name = query.get('name');
  const city = query.get('city');
  const [alert, setAlert] = useState<IAlert>({ open: false, message: '', severity: undefined });
  const [profissionais, setProfissionais] = useState<IProfissional[]>([]);
  useEffect(() => {
    api
      .get('/professionals/search', {
        params: {
          city: city
        }
      })
      .then((res) => {
        console.log(res.data);
        setProfissionais(res.data);
      })
      .catch((err) => {
        setAlert({ open: true, message: err.message, severity: 'error' });
      });
  }, [query]);
  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };
  return (
    <ApolloContainer>
      <ApolloAlert handleClose={handleCloseAlert} {...alert}></ApolloAlert>
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
                <CardActionArea component={Link} to={`/perfil/profissional/${profissional.id}`}>
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
                          <Avatar alt={profissional.nickname} src={profissional.pictureBase64} />
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
                        <Typography>{`${profissional.workplace.phone1.phone}`}</Typography>
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
