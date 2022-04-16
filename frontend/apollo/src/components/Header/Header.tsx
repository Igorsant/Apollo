import React, {FC} from 'react'
import { HeadContainer, NavBar, Logo } from './style'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import LogoImage from '../../images/Logo_apollo.png'

interface HeaderProps {
 
}

export const Header:FC<HeaderProps> = ({children, ...props}) => (
  <HeadContainer>
    <Logo to="/" >
      <img 
        src={LogoImage}
        alt="Logo da Apollo" 
        width={250} 
      />
    </Logo>
    <NavBar {...props}>
      {children}
    </NavBar>
  </HeadContainer>
)