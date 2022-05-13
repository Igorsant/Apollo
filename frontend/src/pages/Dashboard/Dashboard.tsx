import React from 'react';
import { Header } from '../../components/Header/Header';
import { Avatar } from '@mui/material';
import { AuthCheck } from '../../components/AuthCheck/AuthCheck';

export const Dashboard = () => {
  return (
    <AuthCheck>
      <Header>
        <Avatar
          alt="default user"
          src="https://i1.wp.com/terracoeconomico.com.br/wp-content/uploads/2019/01/default-user-image.png?fit=300%2C300&ssl=1"
        ></Avatar>
        teste
      </Header>
    </AuthCheck>
  );
};
