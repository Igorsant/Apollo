import { ClickableLogo, DropdownContent, Wrapper } from './style';
import { logout } from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import { UserAvatar } from '../UserAvatar/UserAvatar';

interface LoggedUserProps {
  user: any;
}

export const LoggedUserOptions = ({ user }: LoggedUserProps) => {
  const navigate = useNavigate();

  const onDashboardClick = () => {
    if (user?.type === 'PROFESSIONAL') navigate('/dashboard/profissional');
    else navigate('dashboard/cliente');
  };

  const onLogoutClick = () => {
    logout();
    navigate('/login');
  };

  return (
    <Wrapper>
      <ClickableLogo>
        <UserAvatar alt={user.nickname} picturePath={user.picturePath}></UserAvatar>
        <h3 style={{ margin: 'auto 10px' }}>Bem vindo, {user.nickname}</h3>
      </ClickableLogo>
      <DropdownContent>
        <li onClick={() => onDashboardClick()}>
          <span>Dashboard</span>
        </li>
        <li onClick={() => onLogoutClick()}>Logout</li>
      </DropdownContent>
    </Wrapper>
  );
};
