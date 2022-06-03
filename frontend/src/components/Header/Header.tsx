import React, { FC } from 'react';
import { HeadContainer, NavBar, Logo, ClickableLogo, DropdownContent, Wrapper } from './style';
import LogoImage from '../../images/Logo_apollo.png';
import { isAuthenticated, logout } from '../../services/auth';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';

interface HeaderProps {}
export const Header: FC<HeaderProps> = ({ children, ...props }) => {
  const navigate = useNavigate();
  const user = useUser() as any;
  return (
    <HeadContainer>
      <Logo to="/">
        <img src={LogoImage} alt="Logo da Apollo" width={150} />
      </Logo>
      <NavBar style={{ display: 'flex' }} {...props}>
        {isAuthenticated() ? (
          <Wrapper>
            <ClickableLogo>
              <Avatar
                alt="default user"
                src={process.env.REACT_APP_API_URL + user.picturePath}
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
