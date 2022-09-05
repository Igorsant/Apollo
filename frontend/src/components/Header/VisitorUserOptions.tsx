import { Button } from '../Button/ApolloButton';
import { ButtonStyle } from '../../pages/Home/style';
import { Link } from 'react-router-dom';

interface VisitorUserProps {
  isProfessionalPath: boolean;
}

export const VisitorUserOptions = ({ isProfessionalPath }: VisitorUserProps) => {
  return (
    <>
      <Button
        component={Link}
        to={isProfessionalPath ? '/profissional/cadastro' : '/cadastro'}
        color="secondary"
        variant="text"
        data-cy="createAccountButton"
        style={ButtonStyle}
      >
        Criar conta
      </Button>
      <Button
        component={Link}
        to={isProfessionalPath ? '/profissional/login' : '/login'}
        color="secondary"
        variant="text"
        data-cy="loginAccountButton"
        style={ButtonStyle}
      >
        Entrar
      </Button>
    </>
  );
};
