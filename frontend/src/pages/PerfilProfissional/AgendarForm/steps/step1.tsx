import { ArrowRight } from '@mui/icons-material';
import { ServiceType } from '..';
import { SetStateAction, Dispatch } from 'react';
import { Chip, Grid } from '@mui/material';

interface Step1Interface {
  servicesAvailable: ServiceType[];
  selectedServices: ServiceType[];
  setSelectedServices: Dispatch<SetStateAction<ServiceType[]>>;
}

export const validateStep1 = (args: Step1Interface): boolean =>
  Boolean(args.selectedServices && args.selectedServices.length);

export const Step1 = ({
  servicesAvailable,
  selectedServices,
  setSelectedServices
}: Step1Interface) => {
  const onServiceClick = (service: ServiceType) => {
    setSelectedServices((curr) => [...curr, service]);
  };

  const onServiceDelete = (service: ServiceType) => {
    setSelectedServices((curr) => curr.filter((val) => val.id !== service.id));
  };

  const calculateTimeFromServices = (services: ServiceType[]) => {
    return services.map((s) => Number.parseInt(s.time)).reduce((acc, next) => acc + next, 0);
  };

  return (
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
        <Grid container gap={1} gridTemplateColumns={'repeat(auto-fit, minmax(min-content, 10%))'}>
          {servicesAvailable
            .reduce((acc, next) => {
              if (!acc.find((val) => val.id === next.id || val.name === next.name)) {
                return [...acc, next];
              }
              return acc;
            }, [] as ServiceType[])
            .filter((s) => !selectedServices.includes(s))
            .map((service) => (
              <Chip
                color="primary"
                key={service.id}
                label={service.name}
                onClick={() => onServiceClick(service)}
              />
            ))}
        </Grid>
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
        {selectedServices.length > 0 && <h4>Serviços Selecionados:</h4>}
        <Grid
          container
          gap={1}
          padding={'0 10px'}
          gridTemplateColumns={'repeat(auto-fit, minmax(min-content, 0.2fr))'}
        >
          {selectedServices.map((service) => (
            <Chip
              color="secondary"
              key={service.id}
              label={service.name}
              onClick={() => onServiceDelete(service)}
              onDelete={() => onServiceDelete(service)}
            />
          ))}
        </Grid>
      </div>
      <h2 style={{ color: 'var(--header)', marginTop: '10px' }}>
        {selectedServices.length > 0 &&
          `Tempo total estimado: ${calculateTimeFromServices(selectedServices)} min`}
      </h2>
    </>
  );
};
