import styled from 'styled-components';

export const FormContainer = styled.div`
  max-width: 1160px;
  width: 100%;
  background-color: ${(props) => props.theme['container']};
  padding: 10px;
  margin: 10px auto;
  border-radius: 8px;  
`

export const FormTitleContainer = styled.div`
  font-size: 2rem;
  padding-bottom: 0.5rem;
`

export const FormFieldsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  gap: 0.5rem;
  padding: 10px 0 ;
`

export const FormButtonsContainer = styled.div`
  display: flex;
  justify-content: start;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`  
  border-radius: 6px;
  padding: 8px;
  font-size: 16px;  
`;

export const Select = styled.select`
  border-radius: 6px;
  height: 36px;
`;

export const Button = styled.button`
  border-radius: 6px;

  padding: 8px 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
`;

