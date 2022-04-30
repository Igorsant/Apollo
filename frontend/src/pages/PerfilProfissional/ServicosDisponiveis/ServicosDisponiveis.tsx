import React from 'react';
import { Grid } from '@material-ui/core';
import IServico from '../../../types/IServico';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface ServicosProps {
  servicos: IServico[] | undefined;
}
export default function ServicosDisponiveis({ servicos = [] }: ServicosProps) {
  return (
    <Grid container spacing={2}>
      {servicos.map((servico, index) => (
        <Grid key={index} container item md={6}>
          <Grid item justify="center" alignItems="center" md={12}>
            {servico.name}
          </Grid>
          <Grid item md={8}>
            <AttachMoneyIcon color="primary" sx={{ margin: 0 }} />
            {`A partir de R$${servico.startingPrice}`}
          </Grid>
          <Grid item md={4}>
            <AccessTimeIcon color="primary" />
            {`${servico.estimatedTime} min`}
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}
