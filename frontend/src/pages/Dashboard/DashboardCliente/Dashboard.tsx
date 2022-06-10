import React from 'react';
import { AuthCheck } from '../../../components/AuthCheck/AuthCheck';
import styled from 'styled-components';

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
      <MainCard>Agendamentos pendentes</MainCard>
    </AuthCheck>
  );
};
