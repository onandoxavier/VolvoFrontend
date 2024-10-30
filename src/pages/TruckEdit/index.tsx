import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import { getTruckById, updateTruck, UpdateTruckCommand, Filters, getFilters, Truck } from '../../services/api'
import { Form, Input, Button, ColorPicker, HeaderContainer, BackIcon, Title, Select } from './styles'
import Snackbar, { SnackbarProps } from '../../components/Snackbar';
import Spinner from '../../components/Spinner';

const truckEditSchema = z.object({
  chassi: z.string()
    .min(1,'O campo Chassi é obrigatório')
    .transform((value) => value.replace(/\s/g, ''))
    .refine((value) => /^[A-Za-z0-9]{3,3}[A-Za-z0-9]{6,6}[A-Za-z0-9]{2,2}[A-Za-z0-9]{6,6}$/
    .test(value ?? ""), 'Valor do chassi é invalido'),    
  year: z.preprocess(
    (val) => (!isNaN(Number(val)) ? Number(val) : undefined),
    z.number({ invalid_type_error: 'Ano deve ser um número' })
      .int('Ano deve ser um número inteiro')
      .min(1900, 'Ano deve ser maior que 1900')
      .max(new Date().getFullYear() + 10, 'Ano não pode ser mais de 10 anos no futuro')
  ),
  model: z.preprocess((val) => (val === '' ? 0 : Number(val)), 
    z.number().min(1, 'Selecione um modelo')),
  plan: z.preprocess((val) => (val === '' ? 0 : Number(val)), 
    z.number().min(1, 'Selecione uma planta')),
  cor: z.string().min(1, 'Selecione uma cor'),
});

type TruckEditFormData = z.infer<typeof truckEditSchema>;

const TruckEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const truckId = id!;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState<Filters>({ models: [], plans: [] });
  const [truck, setTruck] = useState<Truck | null>(null);
  const [sb, setSnackbarStatus] = useState<SnackbarProps>(
    {
      message: '',
      status: 'success',
      show: false
    }
  );

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const filtersData = await getFilters();
        setFilters(filtersData);
      } catch (error) {
        console.error('Erro ao buscar filtros:', error);
      }
    };

    fetchFilters();
  }, []);

  const onSubmit = async (data: TruckEditFormData) => {
    try {
      setIsLoading(true);
      const updateParams: UpdateTruckCommand = {
        id: truckId,
        chassis: data.chassi,
        year: data.year,
        model: data.model,
        plan: data.plan,
        color: data.cor,
      };

      await updateTruck(updateParams);      
      // handleShowSnackbar({ message: 'Caminhão cadastrado com sucesso!', status:'success', show:true });
      alert('Caminhão editado com sucesso!');
      reset();
      navigate('/'); // Redireciona para a página inicial ou outra página desejada
    } catch (error: any) {
      const messages = error.response.data.errors;
      messages.map((e: string) => {
        handleShowSnackbar({ message: e, status:'error', show:true });
      });      
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowSnackbar = (props :SnackbarProps) => {
    setSnackbarStatus(props);    
    // Oculta o Snackbar após 3 segundos
    setTimeout(() => {
      setSnackbarStatus((prev) => ({...prev, show: false}))
    }, 2800);
  };

  useEffect(() => {
    const fetchTruck = async () => {
      try {
        if (truckId) {
          const truckData = await getTruckById(truckId);
          setTruck(truckData);
          // Inicializa os valores do formulário com os dados do caminhão
          reset({
            chassi: truckData.chassis,
            year: truckData.year,
            model: truckData.modelId,
            plan: truckData.planId,
            cor: truckData.color,
        });
        }
      } catch (error) {
        console.error('Erro ao buscar caminhão:', error);
      }
    };

    fetchTruck();
  }, [truckId]);

  const handleBack = () => {
    navigate(`/`);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TruckEditFormData>({
    resolver: zodResolver(truckEditSchema),
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Snackbar message={sb.message} show={sb.show} status={sb.status} />
      <HeaderContainer>
        <BackIcon size={32} onClick={handleBack} />
        <Title>Editar Caminhão</Title>
      </HeaderContainer>
      
      <label htmlFor="chassi">Chassi:</label>
      <Input
        id="chassi"
        type="text"
        {...register('chassi')}
        placeholder="Informe o chassi"
      />
      {errors.chassi && <span>{errors.chassi.message}</span>}
      
      <label htmlFor="year">Ano:</label>      
      <Input
        id="year"
        type="number"
        {...register('year', { valueAsNumber: true })}
        placeholder="Informe o ano"
      />
      {errors.year && <span>{errors.year.message}</span>}
      
      <label htmlFor="model">Modelo:</label>
      <Select id="model" defaultValue={truck?.model} {...register('model')}>
        <option value="">Selecione um modelo</option>
          {filters.models.map((model) => (             
            <option key={model.id} value={model.id}> {model.description} </option>
          ))}
      </Select>
      {errors.model && <span>{errors.model.message}</span>}
      
      <label htmlFor="plan">Planta:</label>
      <Select id="plan" {...register('plan')} defaultValue={1}
      > 
        <option value="">Selecione uma planta</option>          
          {filters.plans.map((plan) => (            
            <option key={plan.id} value={plan.id}> {plan.description} </option> 
          ))}
      </Select>
      {errors.plan && <span>{errors.plan.message}</span>}
      
      <label htmlFor="cor">Cor:</label>
      <ColorPicker
        id="cor"
        type="color"
        {...register('cor')}
        placeholder="Selecione a cor"
      />
      {errors.cor && <span>{errors.cor.message}</span>}

      { isLoading ? 
        (<Spinner/>):
        (<Button type="submit">Salvar</Button>)
      }
    </Form>
  );
};

export default TruckEdit;
