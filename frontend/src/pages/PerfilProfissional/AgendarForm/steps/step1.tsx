import { ArrowDropDown } from '@mui/icons-material';
import React, { SetStateAction, Dispatch } from 'react';
import { ServiceType } from '..';
import { HighlightStep, OtherSteps, ServicesButton } from '../../style';
import { Line } from '../line';

interface Step1Interface {
  servicesAvailable: ServiceType[];
  setServicesAvailable: Dispatch<SetStateAction<ServiceType[]>>;
  choosenServices: ServiceType[];
  setChoosenServices: Dispatch<SetStateAction<ServiceType[]>>;
}
export const Step1 = ({
  servicesAvailable,
  setServicesAvailable,
  choosenServices,
  setChoosenServices
}: Step1Interface) => (
  <>
    <div style={{ display: 'flex' }}>
      <HighlightStep>Definir serviços</HighlightStep>
      <Line />
      <OtherSteps>Definir dia</OtherSteps>
      <Line />
      <OtherSteps>Definir horários</OtherSteps>
      <Line />
      <OtherSteps>Confirmar Agendamentos</OtherSteps>
    </div>

    <div
      style={{
        backgroundColor: 'var(--input)',
        color: 'var(--header)',
        display: 'flex',
        alignItems: 'center',
        width: 'auto',
        marginTop: '50px'
      }}
    >
      <ArrowDropDown style={{ fontSize: '3em' }} />
      <h2>Selectione serviços</h2>
      {servicesAvailable.map((service) => (
        <ServicesButton
          key={service.id}
          onClick={() => {
            setChoosenServices((curr) => [...curr, service]);
            setServicesAvailable((curr) => curr.filter((val) => val.id !== service.id));
          }}
        >
          {service.name}
        </ServicesButton>
      ))}
    </div>
    <div style={{ color: 'var(--header)', marginTop: '15px', display: 'flex' }}>
      <h4>Serviços Selecionados:</h4>
      {choosenServices.map((service) => (
        <ServicesButton
          key={service.id}
          onClick={() => {
            setServicesAvailable((curr) => [...curr, service]);
            setChoosenServices((curr) => curr.filter((val) => val.id !== service.id));
          }}
        >
          {service.name}
        </ServicesButton>
      ))}
    </div>
    <h2 style={{ marginTop: '100px', color: 'var(--header)' }}>
      Tempo total estimado:
      {choosenServices.length > 0 &&
        choosenServices
          .map((s) => Number.parseInt(s.time))
          .reduce((acc, next) => {
            return acc + next;
          }, 0)}{' '}
      min.
    </h2>
  </>
);
