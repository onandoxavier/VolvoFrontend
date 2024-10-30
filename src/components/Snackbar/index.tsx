import React from 'react';
import { SnackbarContainer } from './styles';

export interface SnackbarProps {
  message: string;
  status: 'success' | 'error'
  show: boolean;
}

const Snackbar: React.FC<SnackbarProps> = ({ message, show, status }) => {
  return (    
    <SnackbarContainer 
      status={status}
      className={show ? 'show' : ''}>
      {message}
    </SnackbarContainer>
  );
};

export default Snackbar;