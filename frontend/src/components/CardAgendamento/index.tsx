import { Card, CardActions, CardContent, CardHeader, Chip } from '@mui/material';
import moment from 'moment';
import { ReactElement } from 'react';

import { Button } from '../Button/ApolloButton';
import { IAgendamento } from '../../types/IAgendamento';

interface CardAgendamentoProps {
  name: string;
  agendamento: IAgendamento;
  avatar?: ReactElement;
  onAccept?: () => void;
  onRefuse?: () => void;
}

export const CardAgendamento = (props: CardAgendamentoProps) => {
  const { avatar, name, agendamento, onAccept, onRefuse } = props;

  return (
    <Card variant="elevation" color="secondary">
      <CardHeader
        title={name}
        subheader={`${moment(agendamento.startTime).locale('pt-br').format('HH:mm')} - ${moment(
          agendamento.endTime
        )
          .locale('pt-br')
          .format('HH:mm')} (${moment(agendamento.startTime)
          .locale('pt-br')
          .format('DD/MM/yyyy')})`}
        avatar={avatar && avatar}
      ></CardHeader>

      <CardContent>
        {agendamento.services.map((service, i) => (
          <Chip key={`service-${i}`} sx={{ margin: '0 0.2rem' }} label={service.name} />
        ))}
      </CardContent>

      <CardActions>
        {onAccept && (
          <Button variant="contained" color="success" onClick={() => onAccept()}>
            Aceitar
          </Button>
        )}

        {onRefuse && (
          <Button variant="contained" color="error" onClick={() => onRefuse()}>
            Cancelar
          </Button>
        )}
      </CardActions>
    </Card>
  );
};
