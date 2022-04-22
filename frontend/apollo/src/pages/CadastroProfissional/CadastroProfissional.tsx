import styled from "styled-components";
import {
  Box,
  Theme,
  Grid,
  Container,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
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

const TimeLabel = styled.h2`
  color: var(--title);
  height: 100%;
  display: flex;
  align-items: center;
`;

const PlusButton = styled(Button)`
  border-radius: 40px;
  height: 100%;
`;

type ServicesType = {
  name: string;
  price: number;
  time: number;
};

type FormType = {
  fotoPerfil: string;
  nome: string;
  apelido: string;
  email: string;
  telefone: string;
  cpf: string;
  senha: string;
  services: Array<ServicesType>;
  rua: string;
  numero: number;
  complemento: string;
  telefone1: Phone;
  telefone2: Phone;
};

type Phone = {
  number: string;
  isWpp: boolean;
};

const CadastroProfissional = () => {
  const classes = useStyles();
  const [form, setForm] = useState<FormType>({
    fotoPerfil: "",
    nome: "",
    apelido: "",
    email: "",
    telefone: "",
    cpf: "",
    senha: "",
    services: [{ name: "", price: 0, time: 0 }],
    rua: "",
    numero: 0,
    complemento: "",
    telefone1: { number: "", isWpp: false },
    telefone2: { number: "", isWpp: false },
  });

  const handleChangeImage = (
    name: string,
    value: string | ArrayBuffer | null
  ) => {
    var valueBase64 = "";
    if (typeof value === "string" || value instanceof String) {
      valueBase64 = (value as String).split(",")[1];
    }
    setForm({ ...form, [name]: valueBase64 });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(form);
  };

  const handleServicesChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const name = event.target.name;
    const value = event.target.value;

    setForm((current) => {
      const auxArray = current.services.slice();
      auxArray[index] = { ...auxArray[index], [name]: value };
      return {
        ...current,
        services: auxArray,
      };
    });
  };

  const handlePhoneChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: Phone
  ) => {
    const name = event.target.name;
    setForm((current) => ({
      ...current,
      [name]: { ...value },
    }));
  };

  const handlePushService = () => {
    setForm((current) => ({
      ...current,
      services: [...current.services, { name: "", price: 0, time: 0 }],
    }));
  };

  const handleRemoveService = (index: number) => {
    form.services.length > 1 &&
      setForm((current) => ({
        ...current,
        services: current.services.filter((_, i) => index != i),
      }));
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
              <Title>Cadastro Profissional</Title>
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
                  onChangeImage={handleChangeImage}
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
            <Grid item xs={12} md={12} container rowGap={3}>
              <Grid item xs={12} md={12}>
                <Subtitle>Serviços:</Subtitle>
              </Grid>
              {form.services.map((service, index) => (
                <Grid item container xs={12} md={12} spacing={2} rowGap={3}>
                  <Grid item xs={12} md={4}>
                    <TextInputLaranja
                      name="name"
                      value={service.name}
                      onChange={(e) => handleServicesChange(e, index)}
                      label={"Nome do serviço:"}
                    />
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <TextInputLaranja
                      name="price"
                      value={service.price}
                      onChange={(e) => handleServicesChange(e, index)}
                      label={"Valor do serviço:"}
                    />
                  </Grid>
                  <Grid item xs={3} md={2}>
                    <TextInputLaranja
                      name="time"
                      value={service.time}
                      onChange={(e) => handleServicesChange(e, index)}
                      label={"Tempo estimado:"}
                    />
                  </Grid>
                  <Grid item xs={1} md={1}>
                    <TimeLabel>min</TimeLabel>
                  </Grid>
                  <Grid item xs={1} md={1}>
                    <PlusButton variant="contained" onClick={handlePushService}>
                      +
                    </PlusButton>
                  </Grid>
                </Grid>
              ))}
              <Grid item xs={12} md={12}>
                <table>
                  <tr>
                    <th>#</th>
                    <th>Nome do serviço</th>
                    <th>Preço inicial</th>
                    <th>Tempo estimado</th>
                    <th>Ações</th>
                  </tr>

                  {form.services.map((service, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{service.name}</td>
                      <td>{service.price}</td>
                      <td>{service.time}</td>
                      <td>
                        <Button onClick={() => handleRemoveService(index)}>
                          remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </table>
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
                <Subtitle>Informações do local de trabalho:</Subtitle>
              </Grid>

              <Grid item xs={12} md={12} container spacing={2} rowGap={2}>
                <Grid item xs={12} md={8}>
                  <TextInputLaranja
                    name="rua"
                    value={form.rua}
                    onChange={handleChange}
                    label={"Rua"}
                  />
                </Grid>
                <Grid item xs={12} md={4} marginLeft={"auto"}>
                  <TextInputLaranja
                    name="numero"
                    value={form.numero}
                    onChange={handleChange}
                    label={"Número"}
                    style={{ width: "100%" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextInputLaranja
                    name="complemento"
                    value={form.complemento}
                    onChange={handleChange}
                    label={"Complemento"}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextInputLaranja
                    name="telefone1"
                    value={form.telefone1.number}
                    onChange={(e) =>
                      handlePhoneChange(e, {
                        number: e.target.value,
                        isWpp: form.telefone1.isWpp,
                      })
                    }
                    label={"Telefone 1"}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextInputLaranja
                    name="telefone2"
                    value={form.telefone2.number}
                    onChange={(e) =>
                      handlePhoneChange(e, {
                        number: e.target.value,
                        isWpp: form.telefone2.isWpp,
                      })
                    }
                    label={"Telefone 2"}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    style={{ color: "black" }}
                    label="É whatsapp?"
                    control={
                      <Checkbox
                        name="telefone1"
                        checked={form.telefone1.isWpp}
                        onChange={(e) =>
                          handlePhoneChange(e, {
                            number: form.telefone1.number,
                            isWpp: e.target.checked,
                          })
                        }
                      />
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    style={{ color: "black" }}
                    label="É whatsapp?"
                    control={
                      <Checkbox
                        name="telefone2"
                        checked={form.telefone2.isWpp}
                        onChange={(e) =>
                          handlePhoneChange(e, {
                            number: form.telefone2.number,
                            isWpp: e.target.checked,
                          })
                        }
                      />
                    }
                  />
                </Grid>
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
          </Grid>
        </Box>
      </form>
    </div>
  );
};

export default CadastroProfissional;
