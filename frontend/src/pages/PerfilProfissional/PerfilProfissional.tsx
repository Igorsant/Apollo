import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import { Container, Box, Grid, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@mui/material";
import api from "../../services/api";
import IProfissional from "../../types/IProfissional";

import LogoImage from "../../images/Logo_apollo.png";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Button } from "../../components/Button/ApolloButton";
import ApolloTab from "../../components/Tabs/Tabs";

import TabPanel from "../../components/TabPanel/TabPanel";
import ServicosDisponiveis from "./ServicosDisponiveis/ServicosDisponiveis";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.up("sm")]: {
      maxWidth: "80%",
    },
    height: "100%",
    backgroundColor: "#FFFFFF",
    margin: "60px auto auto auto",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    color: "black",
    padding: "2%",
  },

  img: {
    minHeigth: "120px",
    minWidth: "120px",
  },
}));

const Image = styled.img`
  heigth: 120px;
  width: 120px;
`;

const Linha = styled.hr`
    size: 10 
    width: 50%
`;

export default function PerfilProfissional() {
  const classes = useStyles();
  const { id } = useParams();
  const [profissional, setProfissional] = useState<IProfissional | undefined>(
    undefined
  );
  const [tabValue, setTabValue] = useState<number>(0);

  useEffect(() => {
    if (id !== undefined) {
      api
        .post(`professionals/${id}`)
        .then((res) => {
          setProfissional(res.data);
        })
        .catch((err) => {
          setProfissional({
            fullName: "Felipe Gonçalves",
            nickname: "felipe",
            pictureBase64: "",
            aboutMe: "AboutMe Test",
            phone: "85999084524",
            services: [
              { name: "corte de cabelo", startingPrice: 80, estimatedTime: 40 },
            ],
            workplace: {
              street: "Rua das Flores",
              streetNumber: 985,
              complement: "Sala 12",
              phone1: "8536566555",
              isPhone1Whatsapp: false,
              phone2: "8596555521",
              isPhone2Whatsapp: true,
            },
          });
          console.log(err);
        });
    }
  }, [id]);

  return (
    <Container disableGutters={true} maxWidth={false}>
      <Header></Header>
      <Box className={classes.root}>
        <Grid container>
          <Grid container item alignItems="flex-start" xs={12} md={12}>
            <Grid item xs={2} container justify="center" alignItems="center">
              <Image src={LogoImage}></Image>
            </Grid>
            <Grid item direction="column" container xs={8} spacing={2}>
              <Grid item> {profissional?.fullName}</Grid>
              <Grid item>
                {`${profissional?.workplace.street}, ${profissional?.workplace.streetNumber}`}
              </Grid>
              <Grid item>{`${profissional?.workplace.phone1}`}</Grid>
              <Grid item>
                <Button variant="contained" style={{ width: "120px" }}>
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
              <FavoriteIcon></FavoriteIcon>Salvar
            </Grid>
          </Grid>
          <ApolloTab
            value={tabValue}
            setValue={setTabValue}
            opcoes={[
              { value: 0, label: "Sobre Mim" },
              { value: 1, label: "Serviços Disponíveis" },
              { value: 2, label: "Avaliações" },
            ]}
          ></ApolloTab>
          <TabPanel value={tabValue} index={0}>
            {profissional?.aboutMe}
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <ServicosDisponiveis
              servicos={profissional?.services}
            ></ServicosDisponiveis>
          </TabPanel>
        </Grid>
      </Box>
    </Container>
  );
}
