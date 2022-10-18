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
