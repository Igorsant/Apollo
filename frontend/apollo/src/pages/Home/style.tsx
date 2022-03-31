import styled from "styled-components";

type Props = {
  url: string
}

export const Parallax = styled.div<Props>`
  
  background-image: url(${({ url }) => url});

  min-height: 600px;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

export const UpFirstContent = styled.div`
  width: 50%;
  font-size: 2em;
  padding: 20px;
`

export const DownFirstContent = styled.div`
  height: 270px;
  display: flex;
  justify-content: center;
  align-items: end;
`