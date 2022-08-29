import { FC } from 'react';
import { HeadContainer, NavBar, Logo } from './style';
import { isAuthenticated } from '../../services/auth';
import { LoggedUserOptions } from './LoggedUserOptions';
import { useUser } from '../../hooks/useUser';
import { VisitorUserOptions } from './VisitorUserOptions';
import LogoImage from '../../images/Logo_apollo.png';
import LogoProfissional from '../../images/Logo_apollo_profissional.png';

interface HeaderProps {}

export const Header: FC<HeaderProps> = ({ children, ...props }) => {
  const user = useUser() as any;

  const isProfessionalPath =
    window.location.pathname.includes('/profissional') &&
    !window.location.pathname.includes('/perfil');
  const logo = isProfessionalPath || user?.type === 'PROFESSIONAL' ? LogoProfissional : LogoImage;

  return (
    <HeadContainer>
      <Logo to="/">
        <img src={logo} alt="Logo da Apollo" width={150} />
      </Logo>
      <NavBar style={{ display: 'flex' }} {...props}>
        {isAuthenticated() ? (
          <LoggedUserOptions user={user} />
        ) : (
          <VisitorUserOptions isProfessionalPath={isProfessionalPath} />
        )}
      </NavBar>
    </HeadContainer>
  );
};
