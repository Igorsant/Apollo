import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { Stepper, Step, StepLabel, Box } from '@mui/material';

import { NotificationContext } from '../../../components/NotificationProvider/NotificationProvider';
import { Step1, validateStep1 } from './steps/step1';
import { Step2, validateStep2 } from './steps/step2';
import { Step3, validateStep3 } from './steps/step3';
import { Step4, validateStep4 } from './steps/step4';
import {
  AgendarModal,
  AgendarModalBackground,
  ModalNextStepButton,
  ModalPreviousStepButton,
  ModalCloseButton,
  ModalCurrentStep,
  ModalTitle,
  ModalUserButtons,
  ModalStepProgress
} from './style';
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

const stepStrings = [
  'Definir Serviços',
  'Definir Dia',
  'Definir Horários',
  'Confirmar Agendamentos'
];

export const AgendarForm = ({ professionalId, services, setShowAgendar }: AgendarFormType) => {
  const [selectedServices, setSelectedServices] = useState<ServiceType[]>([]);
  const [indexStep, setIndexStep] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [time, setTime] = useState<Date | null>(null);
  const { showNotification } = useContext(NotificationContext);

  const steps = [
    <Step1
      key={0}
      servicesAvailable={services}
      selectedServices={selectedServices}
      setSelectedServices={setSelectedServices}
    />,
    <Step2 key={1} startDate={startDate} setStartDate={setStartDate} />,
    <Step3 key={2} time={time} setTime={setTime} />,
    <Step4
      key={3}
      day={startDate}
      services={selectedServices}
      totalTime={selectedServices
        .map((s) => Number.parseInt(s.time))
        .reduce((acc, next) => {
          return acc + next;
        }, 0)}
      schedule={time as Date}
    />
  ];

  const validateFuncions = [
    () => validateStep1({ servicesAvailable: services, selectedServices, setSelectedServices }),
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
        services: selectedServices,
        totalTime: selectedServices
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
      serviceIds: selectedServices.map((s) => s.id)
    };

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
    <AgendarModalBackground>
      <AgendarModal>
        <ModalCloseButton onClick={() => setShowAgendar(false)} />
        <ModalTitle>Agendar Serviço</ModalTitle>
        <ModalStepProgress>
          <Box sx={{ width: '100%' }}>
            <Stepper activeStep={indexStep} alternativeLabel>
              {stepStrings.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </ModalStepProgress>

        <ModalCurrentStep>{steps[indexStep]}</ModalCurrentStep>

        <ModalUserButtons>
          <ModalNextStepButton variant="contained" onClick={handleMove}>
            {indexStep < 3 ? 'Avançar' : 'Confirmar Agendamento'}
          </ModalNextStepButton>
          <ModalPreviousStepButton variant="contained" onClick={handleBack}>
            Voltar
          </ModalPreviousStepButton>
        </ModalUserButtons>
      </AgendarModal>
    </AgendarModalBackground>
  );
};
