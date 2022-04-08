import styled from "styled-components";
import { Box, Theme, Grid, Container } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";

import { Header } from "../../components/Header/Header";
import { Button } from "../../components/Button/ApolloButton";
import { TextInputLaranja } from "../../components/TextInputLaranja/TextInputLaranja";
import { ImageInput } from "../../components/ImageInput/ImageInput";

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
  },
}));

const Title = styled.h2`
  color: var(--title);
  text-align: center;
`;

const Subtitle = styled.h3`
  color: var(--title);
  text-align: left;
`;

const CadastroCliente = () => {
  const classes = useStyles();
  const [form, setForm] = useState({
    fotoPerfil: "",
    nome: "",
    apelido: "",
    email: "",
    telefone: "",
    cpf: "",
    senha: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(form);
  };

  return (
    <div>
      <Header></Header>
      <form onSubmit={handleSubmit}>
        <Box className={classes.root}>
          <Grid
            sx={{ flexGrow: 1 }}
            p={10}
            spacing={4}
            justifyContent="center"
            alignContent="center"
            container
          >
            <Grid item xs={12} md={12}>
              <Title>Cadastro</Title>
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              sx={{ flexGrow: 1 }}
              spacing={2}
              alignContent="center"
              container
            >
              <Grid item xs={12} md={12}>
                <Subtitle>Informações do Perfil</Subtitle>
              </Grid>
              <Grid item xs={12} md={2}>
                <ImageInput
                  name="fotoperfil"
                  value={form.fotoPerfil}
                  onChange={handleChange}
                  label="Foto de Perfil:"
                ></ImageInput>
              </Grid>
              <Grid item xs={12} md={10}>
                <Grid item xs={12} md={12}>
                  <TextInputLaranja
                    name="nome"
                    value={form.nome}
                    onChange={handleChange}
                    label="Nome:"
                  ></TextInputLaranja>
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextInputLaranja
                    name="apelido"
                    value={form.apelido}
                    onChange={handleChange}
                    label="Apelido:"
                  ></TextInputLaranja>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              sx={{ flexGrow: 1 }}
              spacing={2}
              alignContent="center"
              container
            >
              <Grid item xs={12} md={12}>
                <Subtitle>Informações de Contato</Subtitle>
              </Grid>
              <Grid item xs={12} md={12}>
                <TextInputLaranja
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  label="Email:"
                ></TextInputLaranja>
              </Grid>
              <Grid item xs={12} md={12}>
                <TextInputLaranja
                  name="telefone"
                  value={form.telefone}
                  onChange={handleChange}
                  label="Telefone(apenas números):"
                ></TextInputLaranja>
              </Grid>
            </Grid>{" "}
            <Grid
              item
              xs={12}
              md={12}
              sx={{ flexGrow: 1 }}
              spacing={2}
              alignContent="center"
              container
            >
              <Grid item xs={12} md={12}>
                <Subtitle>Informações pessoais:</Subtitle>
              </Grid>
              <Grid item xs={12} md={12}>
                <TextInputLaranja
                  name="cpf"
                  value={form.cpf}
                  onChange={handleChange}
                  label="CPF(Apenas números):"
                ></TextInputLaranja>
              </Grid>
              <Grid item xs={12} md={12}>
                <TextInputLaranja
                  name="senha"
                  value={form.senha}
                  onChange={handleChange}
                  label="Senha:"
                ></TextInputLaranja>
              </Grid>
            </Grid>
            <Grid item xs={12} md={12} style={{ textAlign: "center" }}>
              <Button
                type="submit"
                variant="contained"
                style={{ width: "40%" }}
              >
                Criar conta
              </Button>
            </Grid>
            <Grid item xs={12} md={6} style={{ textAlign: "center" }}>
              <Button variant="text" style={{ textTransform: "none" }}>
                Profissional? Clique aqui!
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </div>
  );
};

export default CadastroCliente;
