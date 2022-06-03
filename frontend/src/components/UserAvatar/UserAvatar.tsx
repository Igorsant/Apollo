import React from 'react';
import { Avatar } from '@mui/material';
import api from '../../services/api';

interface UserAvatarProps {
  picturePath: string;
  alt: string;
  style?: any;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ picturePath, alt, style }) => {
  return <Avatar alt={alt} src={api.defaults.baseURL + picturePath} style={style}></Avatar>;
};
