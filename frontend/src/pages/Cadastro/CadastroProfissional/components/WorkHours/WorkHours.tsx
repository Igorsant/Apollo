import { ChangeEvent, MouseEvent, useContext, useState } from 'react';
import { Grid } from '@mui/material';
import { Subtitle } from '../../../components';
import {
  DisplayWorkHour,
  WorkHourButton,
  WorkHourDay,
  WorkHourDayLabel,
  WorkHourDayWrapper,
  WorkHourInput,
  WorkHourInputSeparator,
  WorkHourInputWrapper,
  WorkHourWrapper
} from './styles';
import { NotificationContext } from '../../../../../components/NotificationProvider/NotificationProvider';

export const WorkHours = ({ formik }: any) => {
  const { showNotification } = useContext(NotificationContext);

  const [state, setState] = useState({
    workHours: Array(7).fill({ startTime: '', endTime: '' })
  });

  const handleChange = (weekday: number, key: 'startTime' | 'endTime') => {
    return (event: ChangeEvent<any>) => {
      const workHours = state.workHours;

      workHours[weekday][key] = event.target.value;
      setState({ workHours });
    };
  };

  const addWorkHour = (weekday: number) => {
    return (_: MouseEvent) => {
      const workHours = formik.values.workHours;
      const newWorkHours = state.workHours[weekday];

      if (newWorkHours.startTime.length === 0 || newWorkHours.endTime.length === 0) {
        showNotification('Por favor preencha ambos os campos', 'warning');
        return;
      }

      const regexp = /^\d{1,2}:\d{2}$/;

      if (!regexp.test(newWorkHours.startTime) || !regexp.test(newWorkHours.endTime)) {
        showNotification('Horário deve seguir o formato hh:mm', 'warning');
        return;
      }

      workHours.push({
        weekday,
        startTime: newWorkHours.startTime,
        endTime: newWorkHours.endTime
      });

      formik.setValues({
        ...formik.values,
        workHours
      });

      const tmp = state.workHours;
      tmp[weekday].startTime = '';
      tmp[weekday].endTime = '';

      setState({ workHours: tmp });
    };
  };

  const removeWorkHour = (weekday: number, index: number) => {
    return (_: MouseEvent) => {
      const weekDayWorkHours = formik.values.workHours.filter((w: any) => w.weekday === weekday);
      const otherWorkHours = formik.values.workHours.filter((w: any) => w.weekday !== weekday);

      weekDayWorkHours.splice(index, 1);

      const workHours = [...otherWorkHours, ...weekDayWorkHours];

      formik.setValues({
        ...formik.values,
        workHours
      });
    };
  };

  const weekdays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

  return (
    <Grid item xs={12} md={12} spacing={2} container>
      <Grid item xs={12} md={12}>
        <Subtitle>Jornadas de trabalho:</Subtitle>
      </Grid>
      <WorkHourWrapper>
        {weekdays.map((weekdayName, weekday) => (
          <WorkHourDayWrapper key={weekdayName}>
            <WorkHourDayLabel>{weekdayName}</WorkHourDayLabel>
            <WorkHourDay>
              {formik.values.workHours
                .filter((w: any) => w.weekday === weekday)
                .map((w: any, index: number) => {
                  return (
                    <WorkHourInputWrapper key={`${weekdayName}-${index}`}>
                      <DisplayWorkHour>{w.startTime}</DisplayWorkHour>
                      <WorkHourInputSeparator>~</WorkHourInputSeparator>
                      <DisplayWorkHour>{w.endTime}</DisplayWorkHour>
                      <WorkHourButton onClick={removeWorkHour(weekday, index)}>-</WorkHourButton>
                    </WorkHourInputWrapper>
                  );
                })}
              <WorkHourInputWrapper>
                <div style={{ flex: 3 }}>
                  <WorkHourInput
                    type="text"
                    value={state.workHours[weekday].startTime}
                    data-cy="workhourStart"
                    onChange={handleChange(weekday, 'startTime')}
                    placeholder="hh:mm"
                  />
                </div>
                <WorkHourInputSeparator>~</WorkHourInputSeparator>
                <div style={{ flex: 3 }}>
                  <WorkHourInput
                    type="text"
                    value={state.workHours[weekday].endTime}
                    data-cy="workhourEnd"
                    onChange={handleChange(weekday, 'endTime')}
                    placeholder="hh:mm"
                  />
                </div>
                <WorkHourButton onClick={addWorkHour(weekday)} data-cy="workhourAdd">
                  +
                </WorkHourButton>
              </WorkHourInputWrapper>
            </WorkHourDay>
          </WorkHourDayWrapper>
        ))}
      </WorkHourWrapper>
    </Grid>
  );
};
