import { Avatar } from '@mui/material';
import api from '../../services/api';
import React from 'react';
import styled from 'styled-components';

interface UserAvatarProps {
  picturePath: string;
  alt: string;
}

const StyledAvatar = styled(Avatar)`
  background-color: var(--background);
`;

export const UserAvatar: React.FC<UserAvatarProps> = ({ picturePath, alt }) => {
  return <StyledAvatar alt={alt} src={api.defaults.baseURL + picturePath} />;
};
