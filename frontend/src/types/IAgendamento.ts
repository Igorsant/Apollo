export interface IAgendamento {
  id: Number;
  startTime: Date;
  endTime: Date;
  customer: { nickname: String };
  services: { name: String; startingPrice: Number; estimatedTime: Number }[];
}
