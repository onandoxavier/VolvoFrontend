import styled from 'styled-components';
import { ArrowLeft } from '@phosphor-icons/react';

export const Form = styled.form`
  max-width: 500px;
  margin: 10px auto;
  padding: 20px;
  background-color: ${(props) => props.theme['container']};
  border-radius: 8px;

  h2 {
    text-align: center;
  }

  label {
    display: block;
    margin-top: 15px;
    margin-bottom: 5px;
    font-weight: bold;
  }

  span {
    color: red;
    font-size: 14px;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 16px;
`;

export const Select = styled.select`
  width: 100%;
  padding: 8px;
  font-size: 16px;
`;

export const Button = styled.button`
  width: 100%;
  margin-top: 20px;
  padding: 10px;
  font-size: 18px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
`;

export const ColorPicker = styled.input`
  width: 50px;
  height: 50px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
`;

export const HeaderContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BackIcon = styled(ArrowLeft)`
  position: absolute;
  left: 0;
  cursor: pointer;
`;

export const Title = styled.h2`
  /* Estilos adicionais, se necessário */
`;