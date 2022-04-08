import styled from "styled-components";
import { Link } from "react-router-dom";
import { Box, Theme, Grid, Container } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";

import { Header } from "../../components/Header/Header";
import { Button } from "../../components/Button/ApolloButton";
import { TextInputLaranja } from "../../components/TextInputLaranja/TextInputLaranja";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.up("sm")]: {
      maxWidth: "40%",
    },
    height: 450,
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

const Login = () => {
  const classes = useStyles();
  const [form, setForm] = useState({ cpf: "", senha: "" });

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
      <Header>
        {" "}
        <Button
          component={Link}
          to="/cadastrocliente"
          color="secondary"
          variant="text"
          style={{ gridColumnStart: "1", gridColumnEnd: "3" }}
        >
          Criar Conta
        </Button>
      </Header>
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
              <Title>Login</Title>
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
            <Grid item xs={12} md={12}>
              <Button
                type="submit"
                variant="contained"
                style={{ width: "100%" }}
              >
                Entrar
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

export default Login;
