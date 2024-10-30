import axios from 'axios';

console.log("API URL:", import.meta.env.VITE_API_URL);
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

interface enumResponse {
  id: number;
  description: string;
}

export interface pagingResult<T> {
  items: T[];
  page: number;
  rows: number;
  total: number;
  totalPages: number;
}

export interface Filters {
  models: enumResponse[];
  plans: enumResponse[];
}

export interface TruckParams {
  page: number,
  rows: number,
  chassis: string,
  color: string,
  plan: number,
  model: number,
  year: number,
}

export interface Truck {
  id: string;
  chassis: string;
  year: number;
  model: string;
  modelId: number;  
  plan: string;
  planId: number;
  color: string;  
}

export interface CreateTruckCommand {  
  chassis: string;
  year: number;
  model: number;
  color: string;
  plan: number;
}

export interface UpdateTruckCommand {  
  id: string;
  chassis: string;
  year: number;
  model: number;
  color: string;
  plan: number;
}

export const getFilters = async (): Promise<Filters> => {
  const response = await api.get<Filters>('/Truck/Filters');
  return response.data;
};

export const getTrucks = async (): Promise<pagingResult<Truck>> => {
  const response = await api.get<pagingResult<Truck>>('/Truck');
  return response.data;
};

export const getTrucksWithFilters = async (filters: TruckParams): Promise<pagingResult<Truck>> => {
  const response = await api.get<pagingResult<Truck>>('/truck', { params: filters });
  return response.data;
};

export const createTruck = async (truckData: CreateTruckCommand): Promise<void> => {
  await api.post('/truck', truckData);
};

export const deleteTruck = async (id: string): Promise<void> => {
  await api.delete(`/truck/${id}`);
};

export const getTruckById = async (id: string): Promise<Truck> => {
  const response = await api.get<Truck>(`/truck/${id}`);
  return response.data;
};

export const updateTruck = async (param: UpdateTruckCommand): Promise<void> => {
  await api.put(`/truck/`, param);
};
