import React from 'react';
import { SpinnerContainer } from './styles';

const Spinner: React.FC = () => {
  return (
    <SpinnerContainer>
      <div className="loader"></div>
    </SpinnerContainer>
  );
};

export default Spinner;
