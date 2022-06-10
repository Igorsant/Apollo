export interface IAgendamento {
  id: number;
  startTime: Date;
  endTime: Date;
  customer: { nickname: String };
  professional: { nickname: string; picturePath: string };
  services: { name: String; startingPrice: Number; estimatedTime: Number }[];
}
