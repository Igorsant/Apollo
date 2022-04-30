import React from 'react';
import MuiButton, { ButtonProps } from '@mui/material/Button';

interface ApolloButtonProps extends ButtonProps {
  onClick?: () => void;
  style?: React.CSSProperties;
  component?: any;
  to?: string;
}

export const Button: React.FC<ApolloButtonProps> = ({
  children,
  onClick,
  variant,
  style,
  component,
  to,
  ...props
}) => {
  return (
    <MuiButton
      component={component}
      to={to}
      variant={variant}
      onClick={onClick}
      style={style}
      {...props}>
      {children}
    </MuiButton>
  );
};
