import React, { FC } from 'react';
import { HeadContainer, NavBar, Logo, ClickableLogo, DropdownContent, Wrapper } from './style';
import LogoImage from '../../images/Logo_apollo.png';
import LogoProfissional from '../../images/Logo_apollo_profissional.png';
import { isAuthenticated, logout } from '../../services/auth';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';

interface HeaderProps {}
export const Header: FC<HeaderProps> = ({ children, ...props }) => {
  const navigate = useNavigate();
  const user = useUser() as any;

  const isProfessionalPath =
    window.location.pathname.includes('/profissional') &&
    !window.location.pathname.includes('/perfil');
  const logo = isProfessionalPath || user?.type === 'PROFESSIONAL' ? LogoProfissional : LogoImage;

  return (
    <HeadContainer>
      <Logo to="/">
        <img src={logo} alt="Logo da Apollo" width={150} />
      </Logo>
      <NavBar style={{ display: 'flex' }} {...props}>
        {isAuthenticated() ? (
          <Wrapper>
            <ClickableLogo>
              <Avatar
                alt="default user"
                src="https://i1.wp.com/terracoeconomico.com.br/wp-content/uploads/2019/01/default-user-image.png?fit=300%2C300&ssl=1"
                style={{ margin: 'auto 0' }}
              ></Avatar>
              <h3 style={{ margin: 'auto 10px' }}>Bem vindo, {user.nickname}</h3>
            </ClickableLogo>
            <DropdownContent>
              <li onClick={() => navigate('/dashboard')}>Dashboard</li>
              <li
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
              >
                Logout
              </li>
            </DropdownContent>
          </Wrapper>
        ) : (
          children
        )}
      </NavBar>
    </HeadContainer>
  );
};
