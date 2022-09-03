import styled from 'styled-components';

const Step = styled.span`
  color: white;
  padding: 10px 20px;
  border-radius: 15px;
  background: var(--step-bg);
`;

export const HighlightStep = styled(Step)`
  --step-bg: var(--header);
  animation: animate-highlight-step 700ms forwards;

  @keyframes animate-highlight-step {
    0% {
      background: lightgray;
    }

    100% {
      background: var(--header);
    }
  }
`;

export const OtherSteps = styled(Step)`
  --step-bg: lightgray;
`;

export const ServicesButton = styled.button`
  color: white;
  background: var(--header);
  padding: 5px 10px;
  border-radius: 10px;
  border: none;
  margin: 0 7px;
`;
