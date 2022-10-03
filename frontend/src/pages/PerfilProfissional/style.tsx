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
  background: var(--header);
  border-radius: 25px;
  border: none;
  color: white;
  cursor: pointer;
  padding: 10px 15px;
  white-space: nowrap;
  animation: fade 250ms forwards;

  @keyframes fade {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
