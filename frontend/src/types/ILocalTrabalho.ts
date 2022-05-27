import ITelefone from './ITelefone';

export default interface ILocalTrabalho {
  street: string;
  streetNumber: string;
  complement: string;
  phones: ITelefone[];
}
