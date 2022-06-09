import React from 'react';
import { AuthCheck } from '../../../components/AuthCheck/AuthCheck';
import styled from 'styled-components';
import { Header } from '../../../components/Header/Header';

const MainCard = styled.div`
  background-color: white;
  width: 80vh;
  min-height: 100vh;
  margin: 50px auto;
  color: black;
  padding: 20px;
`;
export const Dashboard = () => {
  return (
    <AuthCheck>
      <Header></Header>
      <MainCard>Agendamentos pendentes</MainCard>
    </AuthCheck>
  );
};
