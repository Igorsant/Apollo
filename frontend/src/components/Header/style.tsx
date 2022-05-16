import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeadContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: var(--header);
  font-weight: 20px;
`;

export const NavBar = styled.ul`
  height: 70px;
  list-style: none;
  display: flex;
  flex-direction: row;
`;

export const NavItem = styled.li`
  margin: 0 10px;
`;

export const Logo = styled(Link)`
  font-size: 1.5em;
`;

export const ClickableLogo = styled.div`
  display: flex;
  &:hover {
    cursor: pointer;
  }
`;

export const DropdownContent = styled.ul`
  display: none;
  position: absolute;
  list-style: none;
  box-shadow: -5px 0px 20px rgba(0, 0, 0, 0.2);
  background-color: var(--background);
  width: 10%;
  li {
    text-decoration: none;
    padding: 10px;
    color: black;
    border-bottom: 1px solid gray;
  }
  li:hover {
    cursor: pointer;
  }
`;

export const Wrapper = styled.div`
  & ${ClickableLogo}:hover + ${DropdownContent} {
    display: block;
  }
  ${DropdownContent}:hover {
    display: block;
  }
  margin: auto 0;
`;
