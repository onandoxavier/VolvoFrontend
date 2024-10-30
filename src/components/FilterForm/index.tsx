import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Filters, TruckParams } from '../../services/api';
import { Form, 
  Input, Button, Select, FormContainer, FormTitleContainer, 
  FormButtonsContainer, 
  FormFieldsContainer} from './styles';
import Spinner from '../Spinner';

interface FilterFormProps {
  filters: Filters;
  isLoading: boolean;
  setParams: (params: TruckParams) => void
}

const filterSchema = z.object({
  chassi: z.string().optional(),
  color: z.string().optional(),
  model: z.preprocess((val) => (val === '' ? 0 : Number(val)), z.number().optional()),
  year: z.preprocess((val) => (!isNaN(Number(val)) ? Number(val) : undefined), z.number().optional()),
  plan: z.preprocess((val) => (val === '' ? 0 : Number(val)), z.number().optional()),
});

type FilterFormValues = z.infer<typeof filterSchema>;

const FilterForm: React.FC<FilterFormProps> = ({ filters, setParams, isLoading }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FilterFormValues>({
    resolver: zodResolver(filterSchema),
  });

  const onSubmit = (data: FilterFormValues) => {
    const params: TruckParams = {
      page: 1,
      rows: 5,
      chassis: data.chassi || '',
      color: data.color || '',
      model: data.model || 0,
      year: data.year || 0,
      plan: data.plan || 0,
    };

    setParams(params);
  };

  const handleClear = () => {
    reset();
    setParams({
      page: 1,
      rows: 5,
      chassis: '',
      color: '',
      model: 0,
      year: 0,
      plan: 0,
    });
  };

  return (
    <FormContainer>
      <FormTitleContainer>
        <span>Filtros</span>
      </FormTitleContainer>
      
      { isLoading ? (<Spinner />) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormFieldsContainer>
            <Input
              type="text"
              {...register('chassi')}
              placeholder="Chassi"
            />
            {errors.chassi && <span>{errors.chassi.message}</span>}

            <Input
              type="text"
              {...register('color')}
              placeholder="Cor"
            />
            {errors.color && <span>{errors.color.message}</span>}

            <Input
              type="number"
              {...register('year', { valueAsNumber: true })}
              placeholder="Ano"
            />
            {errors.year && <span>{errors.year.message}</span>}

            <Select {...register('model')}>
              <option value="">Selecione um modelo</option>
              {filters.models.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.description}
                </option>
              ))}
            </Select>
            {errors.model && <span>{errors.model.message}</span>}

            <Select {...register('plan')}>
              <option value="">Selecione uma planta</option>
              {filters.plans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.description}
                </option>
              ))}
            </Select>
            {errors.plan && <span>{errors.plan.message}</span>}
          </FormFieldsContainer>
          <FormButtonsContainer>
            <div style={{ 
              display: 'flex', 
              justifyContent:'end',
              gap: '10px' 
              
              }}>
              <Button type="submit">Filtrar</Button>
              <Button type="button" onClick={handleClear}>Limpar</Button>
            </div>      
          </FormButtonsContainer>  
        </Form>
      )}
    </FormContainer>
  );
};

export default FilterForm;