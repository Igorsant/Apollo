import ITelefone from './ITelefone';

export default interface ILocalTrabalho {
  street: string;
  streetNumber: number;
  complement: string;
  phone1: ITelefone;
  phone2: ITelefone;
}
