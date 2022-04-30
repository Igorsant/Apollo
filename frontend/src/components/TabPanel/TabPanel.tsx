import React from 'react';
import styled from 'styled-components';
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const Div = styled.div`
  width: 100%;
  margin: 5%;
`;

export default function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && children}
    </Div>
  );
}
