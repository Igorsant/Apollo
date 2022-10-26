import styled from 'styled-components';
import { Chip, Grid } from '@mui/material';

import { ServiceType } from '..';
import {
  getDayFromDate,
  getHoursFromDate,
  getMinutesFromDate,
  getMonthFromDate,
  getYearFromDate
} from '../../../../helpers/dateHelper';

const Label = styled.h3`
  color: var(--header);
`;

const LabelContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

interface Step4Interface {
  services: ServiceType[];
  day: Date;
  totalTime: number;
  schedule: Date;
}

export const validateStep4 = ({ services, day, totalTime, schedule }: Step4Interface): boolean =>
  Boolean(services && day && totalTime && schedule);

const formatSchedulingDate = (date: Date) =>
  [getDayFromDate(date), getMonthFromDate(date), getYearFromDate(date)].join('/');

const formatSchedulingTime = (date: Date) =>
  [getHoursFromDate(date), getMinutesFromDate(date)].join(':');

export const Step4 = ({ services, day, totalTime, schedule }: Step4Interface) => (
  <>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <LabelContainer>
        <Label>Serviços Selecionados:</Label>
        <Grid
          container
          gap={1}
          padding={'0 10px'}
          gridTemplateColumns={'repeat(auto-fit, minmax(min-content, 0.2fr))'}
        >
          {services.map((service) => (
            <Chip color="primary" key={service.id} label={service.name} />
          ))}
        </Grid>
      </LabelContainer>
      <LabelContainer>
        <Label>Dia Selecionados:</Label>
        <Label>{formatSchedulingDate(day)}</Label>
      </LabelContainer>
      <LabelContainer>
        <Label>Horário Selecionados:</Label>
        <Label>{schedule && formatSchedulingTime(schedule)}</Label>
      </LabelContainer>
      <LabelContainer>
        <Label>Tempo total estimado:</Label>
        <Label>{totalTime + ' min'}</Label>
      </LabelContainer>
    </div>
  </>
);
