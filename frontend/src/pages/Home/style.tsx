import styled from 'styled-components';

type Props = {
  url: string;
};

export const Parallax = styled.div<Props>`
  background-image: url(${({ url }) => url});

  min-height: 100vh;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const UpFirstContent = styled.div`
  width: 50%;
  font-size: 2em;
  padding: 5%;
`;

export const DownFirstContent = styled.div`
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DownGridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  width: 60%;
  gap: 10px;
`;

export const FirstParallax = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  min-height: 100vh;
  font-size: 2em;
`;

export const SecondParallax = styled(FirstParallax)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: start;
  padding-left: 5%;
`;

export const SecondParallaxSubTitle = styled.h2`
  width: 40%;
`;

export const ButtonStyle = {
  gridColumnStart: '1',
  gridColumnEnd: '3',
  fontSize: '1.1em'
};
