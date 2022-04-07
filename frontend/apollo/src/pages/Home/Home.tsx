import React from "react";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { Parallax, UpFirstContent, DownFirstContent } from "./style";
import styled from "styled-components";
import {Button } from "../../components/Button/ApolloButton";
import { TextInput } from "../../components/TextInput/TextInput";
import p1 from "../../images/parallax1.png";
import p2 from "../../images/parallax2.png";

import { Link } from "react-router-dom";

const DownGridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  width: 60%;
  gap: 10px;
`;

const FirstParallax = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  min-height: 100vh;
  font-size: 2em;
`;

const SecondParallax = styled(FirstParallax)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: start;
  padding-left: 20px;
`;

const SecondParallaxSubTitle = styled.h2`
  width: 40%;
`;

const Home = () => (
  <>
    <Header> <Button component={Link} to="/cadastrocliente" color="secondary" variant="text" style={{ gridColumnStart: "1", gridColumnEnd: "3" }}>Criar conta</Button>
    <Button component={Link} to="/login" color="secondary" variant="text" style={{ gridColumnStart: "1", gridColumnEnd: "3" }}>Entrar</Button></Header>
    <div id="main">
      <Parallax url={p1}>
        <FirstParallax>
          <UpFirstContent>
            Busque um estilo com os nossos profissionais
          </UpFirstContent>
          <DownFirstContent>
            <DownGridContainer>
              <TextInput hint="Cidade" />
              <TextInput hint="Busque algum profissional" />
              <Button
              variant="contained"
              onClick={()=>{console.log("Clicked")}}
              style={{ gridColumnStart: "1", gridColumnEnd: "3" }}
              >
                Buscar
              </Button>
            </DownGridContainer>
          </DownFirstContent>
        </FirstParallax>
      </Parallax>
      <Parallax url={p2}>
        <SecondParallax>
          <SecondParallaxSubTitle>
            Encontre barbearias próximas à você
          </SecondParallaxSubTitle>
          <Button variant="contained" onClick={()=>{console.log("Clicked")}}>Sou profissional</Button>
        </SecondParallax>
      </Parallax>
    </div>
    <Footer></Footer>
  </>
);

export default Home;
