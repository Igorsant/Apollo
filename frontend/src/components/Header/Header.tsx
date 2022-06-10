import React, { FC } from 'react';
import { HeadContainer, NavBar, Logo, ClickableLogo, DropdownContent, Wrapper } from './style';
import LogoImage from '../../images/Logo_apollo.png';
import LogoProfissional from '../../images/Logo_apollo_profissional.png';
import { isAuthenticated, logout } from '../../services/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { UserAvatar } from '../UserAvatar/UserAvatar';
import { Button } from '../Button/ApolloButton';
import { ButtonStyle } from '../../pages/Home/style';

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
              <UserAvatar
                alt={user.nickname}
                picturePath={user.picturePath}
                style={{ margin: 'auto 0' }}
              ></UserAvatar>
              <h3 style={{ margin: 'auto 10px' }}>Bem vindo, {user.nickname}</h3>
            </ClickableLogo>
            <DropdownContent>
              <li
                onClick={() => {
                  if (isProfessionalPath) navigate('/dashboard/profissional');
                  navigate('dashboard/cliente');
                }}
              >
                Dashboard
              </li>
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
          <>
            <Button
              component={Link}
              to={isProfessionalPath ? '/profissional/cadastro' : '/cadastro'}
              color="secondary"
              variant="text"
              style={ButtonStyle}
            >
              Criar conta
            </Button>
            <Button
              component={Link}
              to={isProfessionalPath ? '/profissional/login' : '/login'}
              color="secondary"
              variant="text"
              style={ButtonStyle}
            >
              Entrar
            </Button>
          </>
        )}
      </NavBar>
    </HeadContainer>
  );
};
