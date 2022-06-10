import React from 'react';
import styled from 'styled-components';
import { ServiceType } from '..';
import { HighlightStep, ServicesButton } from '../../style';
import { Line } from '../line';

const Label = styled.h3`
  color: var(--header);
`;

const LabelContainer = styled.div`
  display: flex;
  margin: 20px 0;
  gap: 10px;
`;

interface Step4Interface {
  services: ServiceType[];
  day: Date;
  totalTime: number;
  schedule: Date;
}

export const Step4 = ({ services, day, totalTime, schedule }: Step4Interface) => (
  <>
    <div style={{ display: 'flex' }}>
      <HighlightStep>Definir serviços</HighlightStep>
      <Line />
      <HighlightStep>Definir dia</HighlightStep>
      <Line />
      <HighlightStep>Definir horários</HighlightStep>
      <Line />
      <HighlightStep>Confirmar Agendamentos</HighlightStep>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <LabelContainer>
        <Label>Serviços Selecionados:</Label>
        {services.map((service) => (
          <ServicesButton key={service.name}>{service.name}</ServicesButton>
        ))}
      </LabelContainer>
      <LabelContainer>
        <Label>Dia Selecionados:</Label>
        <Label>
          {day.getUTCDate() +
            '/' +
            (day.getMonth() + 1).toString().padStart(2, '0') +
            '/' +
            day.getFullYear()}
        </Label>
      </LabelContainer>
      <LabelContainer>
        <Label>Horário Selecionados:</Label>
        <Label>
          {schedule &&
            schedule.getHours().toString().padStart(2, '0') +
              ':' +
              schedule.getMinutes().toString().padStart(2, '0')}
        </Label>
      </LabelContainer>
      <LabelContainer>
        <Label>Tempo total estimado:</Label>
        <Label>{totalTime + ' min'}</Label>
      </LabelContainer>
    </div>
  </>
);
