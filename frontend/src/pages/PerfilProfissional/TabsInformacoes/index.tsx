import { CircularProgress } from '@mui/material';
import React, { useState } from 'react';

import { Avaliacoes } from './Avaliacoes';
import ApolloTab from '../../../components/Tab/Tabs';
import IProfissional from '../../../types/IProfissional';
import ServicosDisponiveis from './ServicosDisponiveis';
import TabPanel from '../../../components/Tab/TabPanel/TabPanel';

interface TabsInformacoesProps {
  profissional: IProfissional | undefined;
  id: string | undefined;
}
export const TabsInformacoes: React.FC<TabsInformacoesProps> = ({ profissional, id }) => {
  const [tabValue, setTabValue] = useState<number>(0);

  return (
    <>
      <ApolloTab
        value={tabValue}
        setValue={setTabValue}
        opcoes={[
          { value: 0, label: 'Sobre Mim' },
          { value: 1, label: 'Serviços Disponíveis' },
          { value: 2, label: 'Avaliações' }
        ]}
      ></ApolloTab>
      <TabPanel value={tabValue} index={0}>
        {!profissional && <CircularProgress />}
        {profissional?.aboutMe === null ? (
          <span style={{ color: 'gray' }}>O profissional não disponibilizou esta informação.</span>
        ) : (
          profissional?.aboutMe
        )}
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        {!profissional && <CircularProgress />}
        <ServicosDisponiveis servicos={profissional?.services}></ServicosDisponiveis>
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        {!profissional ? <CircularProgress /> : <Avaliacoes profissionalId={id}></Avaliacoes>}
      </TabPanel>
    </>
  );
};
