import { Container } from '@mui/material';
import React, { FC } from 'react';
import { Button } from '../Button/ApolloButton';
import { Link } from 'react-router-dom';
import { Header } from '../Header/Header';

interface ContainerProps {
  usuarioLogado?: boolean;
  ehCadastro?: boolean;
  ehLogin?: boolean;
}
export const ApolloContainer: FC<ContainerProps> = ({
  children,
  usuarioLogado = false,
  ehCadastro = false,
  ehLogin = false,
  ...props
}) => (
  <Container disableGutters={true} maxWidth={false} {...props}>
    <Header>
      {!ehCadastro && !usuarioLogado && (
        <Button
          component={Link}
          to="/cadastro"
          color="secondary"
          variant="text"
          style={{ gridColumnStart: '1', gridColumnEnd: '3' }}
        >
          Criar Conta
        </Button>
      )}
      {!ehCadastro && !usuarioLogado && (
        <Button
          component={Link}
          to="/login"
          color="secondary"
          variant="text"
          style={{ gridColumnStart: '1', gridColumnEnd: '3' }}
        >
          Entrar
        </Button>
      )}
    </Header>
    {children}
  </Container>
);
