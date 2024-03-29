import IServico from './IServico';
import IHoraTrabalho from './IHoraTrabalho';
import ILocalTrabalho from './ILocalTrabalho';
export default interface IProfissional {
  id: number;
  fullName: string;
  nickname: string;
  picturePath: string;
  aboutMe: string;
  email?: string;
  phone: string;
  cpf?: string;
  password?: string;
  services: IServico[];
  workHours?: IHoraTrabalho[];
  workplace: ILocalTrabalho;
  averageRating: string | null;
  totalReviews: number;
}
