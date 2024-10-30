import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { getFilters, createTruck, Filters, CreateTruckCommand } from '../../services/api';
import { Form, Input, Button, Select, ColorPicker, HeaderContainer, BackIcon, Title } from './styles'
import Snackbar, { SnackbarProps } from '../../components/Snackbar';
import Spinner from '../../components/Spinner';

const truckSchema = z.object({
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

type TruckFormData = z.infer<typeof truckSchema>;

const CadastrarCaminhao: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false); 
  const [filters, setFilters] = useState<Filters>({ models: [], plans: [] });
  const [sb, setSnackbarStatus] = useState<SnackbarProps>(
    {
      message: '',
      status: 'success',
      show: false
    }
  );

  const handleShowSnackbar = (props :SnackbarProps) => {
    setSnackbarStatus(props);    
    // Oculta o Snackbar após 3 segundos
    setTimeout(() => {
      setSnackbarStatus((prev) => ({...prev, show: false}))
    }, 2800);
  };

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TruckFormData>({
    resolver: zodResolver(truckSchema),
  });

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

  const onSubmit = async (data: TruckFormData) => {
    try {
      setIsLoading(true);
      const newTruck: CreateTruckCommand = {
        chassis: data.chassi,
        year: data.year,
        model: data.model,
        plan: data.plan,
        color: data.cor,
      };

      await createTruck(newTruck);
      // handleShowSnackbar({ message: 'Caminhão cadastrado com sucesso!', status:'success', show:true });
      alert('Caminhão cadastrado com sucesso!');
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
  
  const handleBack = () => {
    navigate(`/`);
  };

  return (    
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Snackbar message={sb.message} show={sb.show} status={sb.status} />
      <HeaderContainer>
        <BackIcon size={32} onClick={handleBack} />
        <Title>Cadastrar Caminhão</Title>
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
      <Select id="model" {...register('model')}>
        <option value="">Selecione um modelo</option>
          {filters.models.map((model) => (
            <option key={model.id} value={model.id}>
              {model.description}
            </option>
          ))}
      </Select>
      {errors.model && <span>{errors.model.message}</span>}

      <label htmlFor="plan">Planta:</label>
      <Select id="plan" {...register('plan')}>
        <option value="">Selecione uma planta</option>
          {filters.plans.map((plan) => (
            <option key={plan.id} value={plan.id}>
              {plan.description}
            </option>
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
        (<Button type="submit">Cadastrar</Button>)
      }
    </Form>
  );
};

export default CadastrarCaminhao;
