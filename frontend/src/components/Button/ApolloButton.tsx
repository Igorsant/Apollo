import React from "react";
import styled from "styled-components";
import MuiButton, { ButtonProps } from "@mui/material/Button";

// export const ApolloButton = styled.button`
//   padding: 7px 60px;
//   border-radius: 3px;
//   background-color: var(--header);
//   color: white;
//   border: none;
//   font-size: 0.7em;
//   font-weight: 500;
// `

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
      {...props}
    >
      {children}
    </MuiButton>
  );
};
