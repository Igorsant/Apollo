import React, { useEffect, useState } from 'react';
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
import { ApolloContainer } from '../../components/Container';
import IAlert from '../../types/IAlert';
import { ApolloAlert } from '../../components/Alert/Alert';
import { TabsInformacoes } from './TabsInformacoes';

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
  heigth: 120px;
  width: 120px;
`;

const mockProfessional = {
  fullName: 'Felipe Gonçalves',
  nickname: 'felipe',
  pictureBase64: '',
  aboutMe: 'AboutMe Test',
  phone: '85999084524',
  services: [{ name: 'corte de cabelo', startingPrice: 80, estimatedTime: 40 }],
  workplace: {
    street: 'Rua das Flores',
    streetNumber: 985,
    complement: 'Sala 12',
    phone1: '8536566555',
    isPhone1Whatsapp: false,
    phone2: '8596555521',
    isPhone2Whatsapp: true
  }
};

export default function PerfilProfissional() {
  const classes = useStyles();
  const { id } = useParams();
  const [profissional, setProfissional] = useState<IProfissional | undefined>(undefined);
  const [alert, setAlert] = useState<IAlert>({ open: false, message: '', severity: undefined });

  useEffect(() => {
    if (id !== undefined) {
      api
        .get(`professionals/${id}`)
        .then((res) => {
          setProfissional(res.data);
        })
        .catch((err) => {
          setProfissional(mockProfessional);
          setAlert({ open: true, message: err.message, severity: 'error' });
        });
    }
  }, [id]);

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const favoritarProfissional = () => {
    console.log('Profissional Favorito');
  };

  return (
    <ApolloContainer>
      <ApolloAlert handleClose={handleCloseAlert} {...alert}></ApolloAlert>
      <Box className={classes.root}>
        <Grid container>
          <Grid container item alignItems="flex-start" xs={12} md={12}>
            <Grid item xs={2} container justify="center" alignItems="center">
              <Image src={profissional?.pictureBase64}></Image>
            </Grid>
            <Grid item direction="column" container xs={8} spacing={2}>
              <Grid item> {profissional?.fullName}</Grid>
              <Grid item>
                {`${profissional?.workplace.street}, ${profissional?.workplace.streetNumber}`}
              </Grid>
              <Grid item>{`${profissional?.workplace.phone1}`}</Grid>
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
          <TabsInformacoes
            setAlert={setAlert}
            id={id}
            profissional={profissional}
          ></TabsInformacoes>
        </Grid>
      </Box>
    </ApolloContainer>
  );
}
