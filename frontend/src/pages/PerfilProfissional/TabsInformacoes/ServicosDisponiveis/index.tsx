import React from 'react';
import { Grid } from '@material-ui/core';
import IServico from '../../../../types/IServico';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { formatMoney } from '../../../../services/formatMoney';
import styled from 'styled-components';

const Service = styled(Grid)`
  &:nth-child(odd) {
    border-right: 2px solid lightgray;
  }

  &:nth-child(even) {
    padding-left: 2em !important;
  }
`;

interface ServicosProps {
  servicos: IServico[] | undefined;
}
export default function ServicosDisponiveis({ servicos = [] }: ServicosProps) {
  return (
    <Grid container spacing={2}>
      {servicos.map((servico, index) => (
        <Service key={index} container item md={6}>
          <Grid
            item
            container
            justifyContent="flex-start"
            alignItems="center"
            md={12}
            style={{ fontSize: '1.2em', fontWeight: '400', fontFamily: 'Merriweather' }}
          >
            {servico.name}
          </Grid>
          <Grid item md={7} xl={5} style={{ display: 'flex', alignItems: 'center' }}>
            <AttachMoneyIcon color="primary" sx={{ margin: 0 }} />
            {`A partir de ${formatMoney(Number.parseFloat(servico.startingPrice))}`}
          </Grid>
          <Grid item md={5} xl={7} style={{ display: 'flex', alignItems: 'center' }}>
            <AccessTimeIcon color="primary" />
            {`${servico.estimatedTime} min.`}
          </Grid>
        </Service>
      ))}
    </Grid>
  );
}
