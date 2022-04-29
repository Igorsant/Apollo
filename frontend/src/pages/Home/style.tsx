import styled from "styled-components";

type Props = {
  url: string
}

export const Parallax = styled.div<Props>`
  
  background-image: url(${({ url }) => url});

  min-height: 100vh;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

export const UpFirstContent = styled.div`
  width: 50%;
  font-size: 2em;
  padding: 5%;
`

export const DownFirstContent = styled.div`
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
`