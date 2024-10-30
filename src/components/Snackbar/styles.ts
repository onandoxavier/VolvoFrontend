import styled, { keyframes } from 'styled-components';

interface SnackbarContainerProps {
  status: 'success' | 'error';
}

const fadeIn = keyframes`
  from { bottom: 0; opacity: 0; }
  to { bottom: 30px; opacity: 1; }
`;

const fadeOut = keyframes`
  from { bottom: 30px; opacity: 1; }
  to { bottom: 0; opacity: 0; }
`;

export const SnackbarContainer = styled.div<SnackbarContainerProps>`
  visibility: hidden;
  min-width: 250px;
  margin-left: -125px;
  background-color: ${({ status }) =>
    status === 'success' ? 'green' : 'red'};
  color: ${(props) => props.theme['white']};
  text-align: center;
  border-radius: 2px;
  padding: 16px;
  position: fixed;
  z-index: 1;
  left: 50%;
  bottom: 30px;

  &.show {
    visibility: visible;
    -webkit-animation: ${fadeIn} 0.5s, ${fadeOut} 0.5s 2.5s;
    animation: ${fadeIn} 0.5s, ${fadeOut} 0.5s 2.5s;
  }
`;
