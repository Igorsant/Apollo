import styled from 'styled-components'

export const HeadContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: var(--header);
  font-weight: 20px;
`

export const NavBar = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row;
`

export const NavItem = styled.li`
  margin: 0 10px;
`

export const Logo = styled.div`
  font-size: 1.5em;
`