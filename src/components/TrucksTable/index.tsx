import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteTruck, pagingResult, Truck, TruckParams, } from '../../services/api'
import { Table, IconButton, PaginationContainer, PaginationButton, TableContainer, TableTitleContainer, Button } from './styles'
import { PencilSimple, Trash } from '@phosphor-icons/react';
import Snackbar, { SnackbarProps } from '../Snackbar';
import Spinner from '../Spinner';

interface TrucksTableProps {
  truckPage: pagingResult<Truck>;
  isLoading: boolean;
  setPage: (page: number) => void;
  setParams: React.Dispatch<React.SetStateAction<TruckParams>>;
}

const TrucksTable: React.FC<TrucksTableProps> = ({ truckPage, setPage, setParams, isLoading }) => {
  const [tooltip, setTooltip] = useState<{ show: boolean; message: string; x: number; y: number }>({
    show: false,
    message: '',
    x: 0,
    y: 0,
  });
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false); 
  const [sb, setSnackbarStatus] = useState<SnackbarProps>(
    {
      message: '',
      status: 'success',
      show: false
    }
  );

  const handleShowSnackbar = (props :SnackbarProps) => {
    setSnackbarStatus(props);
    setTimeout(() => {
      setSnackbarStatus((prev) => ({...prev, show: false}))
    }, 2800);
  };
  
  const navigate = useNavigate();
  
  const totalPages = truckPage.totalPages;
  const currentTrucks = truckPage.items;
  
  const handleDelete = async (id: string) => {
    try {
      setLoadingDelete(true);
      await deleteTruck(id);
      
      let newPage = truckPage.page;
      if (truckPage.items.length == 1) {
        newPage = truckPage.page - 1;
      }
      
      setParams((prevParam) => ({
        ...prevParam,
        page: newPage,
      }));

      handleShowSnackbar({ message: "Caminhão deletado com sucesso!", status:'success', show:true });
    } catch (error) {
      console.error('Erro ao deletar caminhão:', error);
    } finally {
      setLoadingDelete(false)
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/truck-edit/${id}`);
  };

  const handleCreate = () => {    
    navigate(`/truck-create/`);
  };

  const copyToClipboard = (color: string, event: React.MouseEvent<HTMLDivElement>) => {
    navigator.clipboard.writeText(color).then(
      () => {
        setTooltip({
          show: true,
          message: `Cor ${color} copiada!`,
          x: event.clientX,
          y: event.clientY,
        });

        // Ocultar o tooltip após 2 segundos
        setTimeout(() => {
          setTooltip((prev) => ({ ...prev, show: false }));
        }, 2000);
      },
      (err) => {
        console.error('Erro ao copiar para a área de transferência: ', err);
      }
    );
  };

  const paginate = (pageNumber: number) => setPage(pageNumber);
  
  return (
    <TableContainer>
      <Snackbar message={sb.message} show={sb.show} status={sb.status} />
      <TableTitleContainer>
        <span>Caminhões</span>
        <Button type="submit"onClick={() => handleCreate()}>Cadastrar Novo</Button>
      </TableTitleContainer>
      { isLoading || loadingDelete ? (<Spinner />) : (
        <>
          <Table>
            <thead>
              <tr>
                <th>Chassi</th>
                <th>Ano</th>
                <th>Modelo</th>
                <th>Cor</th>
                <th>Planta</th>
                <th>Ações</th>
              </tr>
            </thead>         
            <tbody>
              {currentTrucks.map((truck) => (
                <tr key={truck.id}>
                  <td>{truck.chassis}</td>
                  <td>{truck.year}</td>
                  <td>{truck.model}</td>
                  <td>
                    <div
                      style={{
                        backgroundColor: truck.color,
                        width: '20px',
                        height: '20px',
                        cursor: 'pointer',
                      }}
                      onClick={(event) => copyToClipboard(truck.color, event)}
                      />
                  </td>
                    <td>{truck.plan}</td>
                  <td>
                    <IconButton onClick={() => handleEdit(truck.id)}>
                      <PencilSimple size={32} fill='blue' />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(truck.id)}>
                      <Trash size={32} fill='red' />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>      
          <PaginationContainer>
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationButton
                key={index + 1}
                onClick={() => paginate(index + 1)}
                active={truckPage.page === index + 1}
              >
                {index + 1}
              </PaginationButton>
            ))}
          </PaginationContainer>
        </>
      )}
      {tooltip.show && (
        <div
          style={{
            position: 'absolute',
            left: tooltip.x + 10,
            top: tooltip.y + 10,
            backgroundColor: 'black',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '4px',
            fontSize: '14px',
            pointerEvents: 'none',
            zIndex: 1000,
            opacity: 0.9,
          }}
        >
          {tooltip.message}
        </div>
      )}
    </TableContainer>
  );
};

export default TrucksTable;
