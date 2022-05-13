import React, { FC } from 'react';
import { HeadContainer, NavBar, Logo } from './style';
import LogoImage from '../../images/Logo_apollo.png';
import { isAuthenticated } from '../../services/auth';
import { Avatar } from '@mui/material';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ClickableLogo = styled.a`
  display: flex;
  &:hover {
    cursor: pointer;
  }
`;
interface HeaderProps {}
export const Header: FC<HeaderProps> = ({ children, ...props }) => {
  const navigate = useNavigate();
  return (
    <HeadContainer>
      <Logo to="/">
        <img src={LogoImage} alt="Logo da Apollo" width={150} />
      </Logo>
      <NavBar style={{ display: 'flex' }} {...props}>
        {isAuthenticated() ? (
          <>
            <ClickableLogo onClick={() => navigate('/dashboard')} style={{ display: 'flex' }}>
              <Avatar
                alt="default user"
                src="https://i1.wp.com/terracoeconomico.com.br/wp-content/uploads/2019/01/default-user-image.png?fit=300%2C300&ssl=1"
                style={{ margin: 'auto 0' }}
              ></Avatar>
              <h3 style={{ margin: 'auto 10px' }}>Bem vindo, Igor</h3>
            </ClickableLogo>
          </>
        ) : (
          children
        )}
      </NavBar>
    </HeadContainer>
  );
};
