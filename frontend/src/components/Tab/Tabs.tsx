import React, { ChangeEvent } from 'react';
import { Tabs, Tab } from '@mui/material';
import Box from '@mui/material/Box';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

interface TabOption {
  value: number;
  label: string;
}

interface TabProps {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  opcoes: TabOption[];
}

export default function ApolloTab({ value, setValue, opcoes }: TabProps) {
  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="tabs" indicatorColor="primary">
          {opcoes.map((opcao, index) => (
            <Tab key={index} label={opcao.label} {...a11yProps(opcao.value)} />
          ))}
        </Tabs>
      </Box>
    </Box>
  );
}
