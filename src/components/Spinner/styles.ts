import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  .loader {
    width: 48px;
    height: 48px;
    border: 5px solid #ccc;
    border-top-color: #333;
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
  }
`;
