import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeadContainer = styled.div`
  align-items: center;
  background-color: var(--header);
  display: flex;
  font-weight: 20px;
  justify-content: space-between;
  padding: 0 20px;
`;

export const NavBar = styled.ul`
  display: flex;
  flex-direction: row;
  height: 70px;
  list-style: none;
`;

export const NavItem = styled.li`
  margin: 0 10px;
`;

export const Logo = styled(Link)`
  align-self: stretch;
  font-size: 1.5em;
  padding: 10px 0;

  img {
    height: 100%;
  }
`;

export const ClickableLogo = styled.div`
  display: flex;
  &:hover {
    cursor: pointer;
  }
`;

export const DropdownContent = styled.ul`
  background-color: var(--background);
  box-shadow: -5px 0px 20px rgba(0, 0, 0, 0.2);
  display: none;
  list-style: none;
  position: absolute;
  width: 10%;
  li {
    border-bottom: 1px solid gray;
    color: black;
    padding: 10px;
    text-decoration: none;
  }
  li:hover {
    cursor: pointer;
  }
`;

export const Wrapper = styled.div`
  & ${ClickableLogo}:hover + ${DropdownContent} {
    display: block;
    width: clamp(min-content, 100%, 300px);
  }

  ${DropdownContent}:hover {
    display: block;
  }

  margin: auto 0;
`;
