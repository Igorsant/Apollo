import React from 'react'
import { HeadContainer, NavBar, Logo } from './style'

import { Button } from '../Button/ApolloButton'


export const Header = () => (
  <HeadContainer>
    <Logo>Apollo (logo)</Logo>
    <NavBar>
      <Button variant="text" color="secondary" onClick={()=>{console.log("Clicked")}}>Entrar</Button>
      <Button variant="text" color="secondary" onClick={()=>{console.log("Clicked")}}>Criar conta</Button>
    </NavBar>
  </HeadContainer>
)