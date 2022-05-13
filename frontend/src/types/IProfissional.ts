import IServico from './IServico';
// import IHoraTrabalho from './IHoraTrabalho';
import ILocalTrabalho from './ILocalTrabalho';
export default interface IProfissional {
  id: number;
  fullName: string;
  nickname: string;
  pictureBase64: string;
  aboutMe: string;
  // email: string;
  phone: string;
  // cpf: string;
  // password: string;
  services: IServico[];
  // workHours: IHoraTrabalho[];
  workplace: ILocalTrabalho;
}
