import React from 'react'
import { HeadContainer, NavBar, NavItem, Logo } from './style'


export const Header = () => (
  <HeadContainer>
    <Logo>Apollo (logo)</Logo>
    <NavBar>
      <NavItem>Entrar</NavItem>
      <NavItem>Criar conta</NavItem>
    </NavBar>
  </HeadContainer>
)