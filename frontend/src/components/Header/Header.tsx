import React, { FC } from 'react';
import { HeadContainer, NavBar, Logo } from './style';
import LogoImage from '../../images/Logo_apollo.png';

interface HeaderProps {
  usuarioLogado?: boolean;
  ehCadastro?: boolean;
  ehLogin?: boolean;
}
export const Header: FC<HeaderProps> = ({
  children,
  usuarioLogado = false,
  ehCadastro = false,
  ehLogin = false,
  ...props
}) => (
  <HeadContainer>
    <Logo to="/">
      <img src={LogoImage} alt="Logo da Apollo" width={150} />
    </Logo>
    <NavBar {...props}>{children}</NavBar>
  </HeadContainer>
);
