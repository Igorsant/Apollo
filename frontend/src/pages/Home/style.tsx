import styled from 'styled-components';

type Props = {
  url: string;
};

export const Parallax = styled.div<Props>`
  background-image: url(${({ url }) => url});

  min-height: calc(100vh - 180px);
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
  display: grid;
  padding: 5%;
  grid-template-rows: 1fr;
  justify-content: stretch;
  gap: 15px;
`;

export const DownGridContainer = styled.div`
  display: grid;
  justify-content: stretch;
  grid-template-rows: 1fr;
  gap: 15px;
  grid-template-columns: 1fr 2fr;

  & button {
    grid-column-start: 1;
    grid-column-end: 3;
    margin-top: 15px;
  }

  @media (max-width: 768px) {
    grid-template-rows: 0.5fr 1fr;
    gap: 5px;
    grid-template-columns: 1fr;

    & button {
      grid-column-start: 1;
      grid-column-end: 2;
    }
  }
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
  margin-bottom: 30px;
`;

export const ButtonStyle = {
  gridColumnStart: '1',
  gridColumnEnd: '3',
  fontSize: '1.1em'
};
