import styled from 'styled-components'

export const HomeContainer=styled.section`  
  background-color: ${props=>props.theme['background']};  
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`
export const Container = styled.div`
  max-width: 1160px;  
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;
