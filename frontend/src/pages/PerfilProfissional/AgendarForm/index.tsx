import { Button } from '../../../components/Button/ApolloButton';
import { Close } from '@mui/icons-material';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { NotificationContext } from '../../../components/NotificationProvider/NotificationProvider';
import { Step1, validateStep1 } from './steps/step1';
import { Step2, validateStep2 } from './steps/step2';
import { Step3, validateStep3 } from './steps/step3';
import { Step4, validateStep4 } from './steps/step4';
import api from '../../../services/api';

export type ServiceType = {
  id: number;
  name: string;
  time: string;
};

type AgendarFormType = {
  setShowAgendar: Dispatch<SetStateAction<boolean>>;
  services: ServiceType[];
  professionalId: string | undefined;
  servicesIds: number[] | undefined;
};

export const AgendarForm = ({ professionalId, services, setShowAgendar }: AgendarFormType) => {
  const [choosenServices, setChoosenServices] = useState<ServiceType[]>([]);
  const [indexStep, setIndexStep] = useState(0);
  const [servicesAvailable, setServicesAvailable] = useState<ServiceType[]>(services);
  const [startDate, setStartDate] = useState(new Date());
  const [time, setTime] = useState<Date | null>(null);
  const { showNotification } = useContext(NotificationContext);

  const steps = [
    <Step1
      key={0}
      servicesAvailable={servicesAvailable}
      setServicesAvailable={setServicesAvailable}
      choosenServices={choosenServices}
      setChoosenServices={setChoosenServices}
    />,
    <Step2 key={1} startDate={startDate} setStartDate={setStartDate} />,
    <Step3 key={2} time={time} setTime={setTime} />,
    <Step4
      key={3}
      day={startDate}
      services={choosenServices}
      totalTime={choosenServices
        .map((s) => Number.parseInt(s.time))
        .reduce((acc, next) => {
          return acc + next;
        }, 0)}
      schedule={time as Date}
    />
  ];

  const validateFuncions = [
    () =>
      validateStep1({
        servicesAvailable,
        setServicesAvailable,
        choosenServices,
        setChoosenServices
      }),
    () =>
      validateStep2({
        startDate,
        setStartDate
      }),
    () =>
      validateStep3({
        time,
        setTime
      }),
    () =>
      validateStep4({
        day: startDate,
        services: choosenServices,
        totalTime: choosenServices
          .map((s) => Number.parseInt(s.time))
          .reduce((acc, next) => {
            return acc + next;
          }, 0),
        schedule: time as Date
      })
  ];

  const handleSubmit = () => {
    startDate.setHours(time?.getHours() as number);
    startDate.setMinutes(time?.getMinutes() as number);

    const data = {
      professionalId,
      startTime: startDate,
      serviceIds: choosenServices.map((s) => s.id)
    };

    console.log(data);

    api.post(`schedulings`, data).then((_) => {
      showNotification('Agendamento criado com sucesso', 'success');
      setShowAgendar(false);
    });
  };

  const handleMove = () => {
    if (indexStep === 3) {
      handleSubmit();
      return;
    }

    const validateFn = validateFuncions[indexStep];
    if (!validateFn()) {
      showNotification('Alguma informação inválida na etapa de agendamento', 'warning');
      return;
    }

    setIndexStep((curr) => curr + 1);
  };

  const handleBack = () => {
    if (indexStep === 0) {
      setShowAgendar(false);
    } else {
      setIndexStep((curr) => curr - 1);
    }
  };

  return (
    <div
      style={{
        width: '80%',
        backgroundColor: 'white',
        color: 'black',
        height: '70%',
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Close
        style={{
          float: 'right',
          fontSize: '3em',
          color: 'var(--header)',
          alignSelf: 'end',
          cursor: 'pointer'
        }}
        onClick={() => setShowAgendar(false)}
      />
      <h2
        style={{
          fontWeight: '400',
          display: 'block',
          marginBottom: '50px'
        }}
      >
        Agendar Serviço
      </h2>
      <div>
        <div style={{ height: '40vh' }}>{steps[indexStep]}</div>

        <div style={{ marginTop: '40px' }}>
          <Button
            variant="contained"
            style={{ width: '49%', backgroundColor: '#CD3838' }}
            onClick={handleBack}
          >
            Voltar
          </Button>

          <Button
            variant="contained"
            style={{ width: '49%', marginLeft: '2%' }}
            onClick={handleMove}
          >
            {indexStep < 3 ? 'Avançar' : 'Confirmar Agendamento'}
          </Button>
        </div>
      </div>
    </div>
  );
};
