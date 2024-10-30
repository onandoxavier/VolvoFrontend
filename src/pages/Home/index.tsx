import React, { useEffect, useState } from 'react';
import { getFilters, Truck, Filters, pagingResult, TruckParams, getTrucksWithFilters } from '../../services/api';
import FilterForm from '../../components/FilterForm';
import TrucksTable from '../../components/TrucksTable';
import { Container, HomeContainer } from './styles';

const Home: React.FC = () => { 
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loadingFilters, setLoadingFilters] = useState<boolean>(false);
  const [loadingTrucks, setLoadingTrucks] = useState<boolean>(false); 
  const [filters, setFilters] = useState<Filters>({
    models:[],
    plans:[]
  });
  const [truckPage, setTrucks] = useState<pagingResult<Truck>>({
    items: [],
    page: 1,
    rows: 5,
    total: 0,
    totalPages: 1
  });
  const [truckFilters, setTruckFilters] = useState<TruckParams>({    
    page: 1,
    rows: 5,
    chassis: "",
    color: "",
    model: 0,
    plan:0,
    year: 0    
  })

  useEffect(() => {
    const fetchFilters = async() => {
      try {
        setLoadingFilters(true);
        const filtersData = await getFilters();
        setFilters(filtersData);        
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoadingFilters(false);
      }
    };

    fetchFilters();
  }, [])

  useEffect(() => {    
    const fetchData = async () => {
      try {
        setLoadingTrucks(true);        
        const trucksData = await getTrucksWithFilters(truckFilters);
        setTrucks(trucksData);        
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoadingTrucks(false);
      }
    };

    fetchData();
  }, [truckFilters]);

  useEffect(() => {
    setTruckFilters((prevParam) => ({
      ...prevParam,
      page: currentPage,
    }));
  }, [currentPage])

  return (
    <HomeContainer>
      <Container>
        <FilterForm 
          filters={filters} 
          setParams={setTruckFilters} 
          isLoading={loadingFilters} />
        <TrucksTable 
          truckPage={truckPage} 
          setPage={setCurrentPage}
          setParams={setTruckFilters} 
          isLoading={loadingTrucks} />          
      </Container>
    </HomeContainer>
  );
};

export default Home;
