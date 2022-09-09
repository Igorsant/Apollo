import styled from 'styled-components';
import '../../index.css';

const FooterStyled = styled.div`
  padding: 15px;
  text-align: center;
  background-color: var(--header);
`;
export const Footer = () => (
  <FooterStyled data-cy="footer">Apollo, todos os direitos reservados</FooterStyled>
);
