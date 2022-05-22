import ServiceType from './service.type';

type SchedulingType = {
  confirmed?: boolean;
  customerId?: number;
  endTime?: Date;
  id?: number;
  professionalId?: number;
  services?: ServiceType[];
  startTime?: Date;
  totalPrice?: string;
  professional?: { nickname: string; picturePath: string; id: number };
  customer?: { nickname: string; picturePath: string };
};

export default SchedulingType;
