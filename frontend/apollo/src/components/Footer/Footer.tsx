import React from 'react'
import styled from 'styled-components'

const FooterStyled = styled.div`
  padding: 15px;
  text-align: center;
  background-color: var(--header);
`
export const Footer = () => (
  <FooterStyled>Apollo, todos os direitos reservados</FooterStyled>
)