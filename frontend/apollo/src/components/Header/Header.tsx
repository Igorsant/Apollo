import React, {FC} from 'react'
import { HeadContainer, NavBar, Logo } from './style'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'

interface HeaderProps {
 
}

export const Header:FC<HeaderProps> = ({children, ...props}) => (
  <HeadContainer>
    <Logo>Apollo (logo)</Logo>
    <NavBar {...props}>
      {children}
    </NavBar>
  </HeadContainer>
)