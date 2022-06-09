import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import { Grid } from '@material-ui/core';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@mui/material';
import api from '../../services/api';
import IProfissional from '../../types/IProfissional';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Button } from '../../components/Button/ApolloButton';
import { TabsInformacoes } from './TabsInformacoes';
import { NotificationContext } from '../../components/NotificationProvider/NotificationProvider';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: '80%'
    },
    height: '100%',
    backgroundColor: '#FFFFFF',
    margin: '60px auto auto auto',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    color: 'black',
    padding: '2%'
  },

  img: {
    minHeigth: '120px',
    minWidth: '120px'
  }
}));

const Image = styled.img`
  height: 120px;
  width: 120px;
`;

const mockProfessional = {
  id: 1,
  fullName: 'Felipe Gonçalves',
  nickname: 'felipe',
  picturePath: '/pictures/default_user.jpg',
  aboutMe: 'AboutMe Test',
  phone: '85999084524',
  services: [{ name: 'corte de cabelo', startingPrice: '80', estimatedTime: '40' }],
  averageRating: null,
  totalReviews: 0,
  workplace: {
    street: 'Rua das Flores',
    streetNumber: '985',
    complement: 'Sala 12',
    phones: [
      { phone: '8536566555', isPhoneWhatsapp: false },
      { phone: '8536566555', isPhoneWhatsapp: true }
    ]
  }
};

export default function PerfilProfissional() {
  const classes = useStyles();
  const { id } = useParams();
  const [profissional, setProfissional] = useState<IProfissional | undefined>(undefined);
  const { showNotification } = useContext(NotificationContext);

  useEffect(() => {
    document.title = `Apollo | ${profissional ? profissional.nickname : 'Profissional'}`;
  }, [profissional]);

  useEffect(() => {
    if (id !== undefined) {
      api
        .get(`professionals/${id}`)
        .then((res) => {
          setProfissional(res.data);
        })
        .catch((err) => {
          setProfissional(mockProfessional);
          showNotification(err, 'error');
        });
    }
  }, [id]);

  const favoritarProfissional = () => {
    console.log('Profissional Favorito');
  };

  return (
    <Box className={classes.root}>
      <Grid container>
        <Grid container item alignItems="flex-start" xs={12} md={12}>
          <Grid item xs={2} container justifyContent="center" alignItems="center">
            <Image src={profissional?.picturePath}></Image>
          </Grid>
          <Grid item direction="column" container xs={8} spacing={2}>
            <Grid item> {profissional?.fullName}</Grid>
            <Grid item>
              {`${profissional?.workplace.street}, ${profissional?.workplace.streetNumber}`}
            </Grid>
            <Grid item>{`${profissional?.workplace.phones[0].phone}`}</Grid>
            <Grid item>
              <Button variant="contained" style={{ width: '120px' }}>
                Agendar
              </Button>
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-start"
            xs={2}
          >
            <Button onClick={favoritarProfissional} variant="outlined" style={{ width: '120px' }}>
              <FavoriteIcon />
              Salvar
            </Button>
          </Grid>
        </Grid>
        <TabsInformacoes id={id} profissional={profissional}></TabsInformacoes>
      </Grid>
    </Box>
  );
}
