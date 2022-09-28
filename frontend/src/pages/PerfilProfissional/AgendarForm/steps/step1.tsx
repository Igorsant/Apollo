import { ArrowRight } from '@mui/icons-material';
import { ServicesButton } from '../../style';
import { ServiceType } from '..';
import { SetStateAction, Dispatch } from 'react';

interface Step1Interface {
  servicesAvailable: ServiceType[];
  setServicesAvailable: Dispatch<SetStateAction<ServiceType[]>>;
  choosenServices: ServiceType[];
  setChoosenServices: Dispatch<SetStateAction<ServiceType[]>>;
}

export const validateStep1 = (args: Step1Interface): boolean =>
  Boolean(args.choosenServices && args.choosenServices.length);

export const Step1 = ({
  servicesAvailable,
  setServicesAvailable,
  choosenServices,
  setChoosenServices
}: Step1Interface) => (
  <>
    <div
      style={{
        alignItems: 'center',
        backgroundColor: 'var(--input)',
        color: 'var(--header)',
        display: 'flex',
        gap: '10px',
        padding: '10px',
        textAlign: 'center',
        whiteSpace: 'nowrap',
        width: 'auto'
      }}
    >
      <ArrowRight style={{ fontSize: '2rem' }} />
      <h2>Selecione serviços</h2>
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
    <div
      style={{
        alignItems: 'start',
        color: 'var(--header)',
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        marginTop: '1rem',
        padding: '10px 0'
      }}
    >
      {choosenServices.length > 0 && <h4>Serviços Selecionados:</h4>}
      <div
        style={{
          alignItems: 'start',
          display: 'grid',
          gap: '10px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min-content, 15%))',
          padding: '0 10px',
          whiteSpace: 'nowrap'
        }}
      >
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
    </div>
    <h2 style={{ color: 'var(--header)', marginTop: '10px' }}>
      {choosenServices.length > 0 &&
        `Tempo total estimado: ${choosenServices
          .map((s) => Number.parseInt(s.time))
          .reduce((acc, next) => {
            return acc + next;
          }, 0)}
       min.`}
    </h2>
  </>
);
