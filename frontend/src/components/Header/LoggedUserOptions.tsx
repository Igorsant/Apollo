import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Wrapper } from './style';
import { logout } from '../../services/auth';
import { NotificationContext } from '../../components/NotificationProvider/NotificationProvider';
import { UserAvatar } from '../UserAvatar/UserAvatar';
import {
  Stack,
  Paper,
  MenuList,
  MenuItem,
  Button,
  ClickAwayListener,
  Grow,
  Popper
} from '@mui/material';

interface LoggedUserProps {
  user: any;
}

export const LoggedUserOptions = ({ user }: LoggedUserProps) => {
  const navigate = useNavigate();
  const { showNotification } = useContext(NotificationContext);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const onDashboardClick = () => {
    if (user?.type === 'PROFESSIONAL') {
      navigate('/dashboard/profissional');
      return;
    }

    if (user?.type === 'CUSTOMER') {
      navigate('/dashboard/cliente');
      return;
    }

    showNotification('É necessário estar logado para realizar esta ação', 'error');
    navigate('/login', { replace: true });
  };

  const onLogoutClick = () => {
    logout();
    navigate('/login');
  };

  return (
    <Wrapper>
      <Button
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        variant="text"
        color="secondary"
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <UserAvatar alt={user.nickname} picturePath={user.picturePath}></UserAvatar>
          <span>Olá, {user.nickname}</span>
        </Stack>
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom'
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                >
                  <MenuItem
                    onClick={(e: any) => {
                      onDashboardClick();
                      handleClose(e);
                    }}
                  >
                    Dashboard
                  </MenuItem>
                  <MenuItem
                    onClick={(e: any) => {
                      onLogoutClick();
                      handleClose(e);
                    }}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Wrapper>
  );
};
