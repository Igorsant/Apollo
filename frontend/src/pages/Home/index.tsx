import React from 'react';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import {
  Parallax,
  UpFirstContent,
  DownFirstContent,
  ButtonStyle,
  DownGridContainer,
  FirstParallax,
  SecondParallax,
  SecondParallaxSubTitle
} from './style';
import { Button } from '../../components/Button/ApolloButton';
import { TextInput } from '../../components/TextInput/TextInput';
import p1 from '../../images/parallax1.png';
import p2 from '../../images/parallax2.png';

import { Link } from 'react-router-dom';

const Home = () => (
  <>
    <Header>
      <Button
        component={Link}
        to="/cadastro/cliente"
        color="secondary"
        variant="text"
        style={ButtonStyle}
      >
        Criar conta
      </Button>
      <Button component={Link} to="/login" color="secondary" variant="text" style={ButtonStyle}>
        Entrar
      </Button>
    </Header>
    <div id="main">
      <Parallax url={p1}>
        <FirstParallax>
          <UpFirstContent>Busque um estilo com os nossos profissionais</UpFirstContent>
          <DownFirstContent>
            <DownGridContainer>
              <TextInput hint="Cidade" />
              <TextInput hint="Busque algum profissional" />
              <Button variant="contained" style={{ gridColumnStart: '1', gridColumnEnd: '3' }}>
                Buscar
              </Button>
            </DownGridContainer>
          </DownFirstContent>
        </FirstParallax>
      </Parallax>
      <Parallax url={p2}>
        <SecondParallax>
          <SecondParallaxSubTitle>Encontre barbearias próximas à você</SecondParallaxSubTitle>
          <Button component={Link} to="/login/profissional" variant="contained">
            Sou profissional
          </Button>
        </SecondParallax>
      </Parallax>
    </div>
    <Footer></Footer>
  </>
);

export default Home;
