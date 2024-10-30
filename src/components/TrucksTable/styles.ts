import styled from 'styled-components';

export const TableContainer = styled.div`
  background-color: ${(props) => props.theme['container']};
  width: 100%;
  padding: 10px;
  border-radius: 8px;
`

export const TableTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  &>span {
    font-size: 2rem;
  }
  padding-bottom: 0.5rem;
`
export const Button = styled.button`
  border-radius: 6px;

  padding: 8px 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: ${(props) => props.theme['white']};

  th,
  td {
    padding: 8px 12px;
    border: 1px solid #ddd;
    text-align: left;
  }

  th {
    color: ${(props) => props.theme['white']};
    background-color: ${(props) => props.theme['gray-900']};
  }
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin: 0 5px;

  svg {
    color: #333;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

interface PaginationButtonProps {
  active: boolean;
}

export const PaginationButton = styled.button<PaginationButtonProps>`  
  background-color: ${(props) => (props.active ? '#007bff' : '#fff')};
  color: ${(props) => (props.active ? '#fff' : '#007bff')};
  border: 1px solid #007bff;
  padding: 5px 10px;
  margin: 0 2px;
  cursor: pointer;

  &:hover {
    background-color: #007bff;
    color: #fff;
  }
`;
