import { useForm } from '@mantine/form';
import { useState } from 'react';

import { AdvertisementType } from '../../shared/types';
import { isImageUrl } from './components/GeneralStep/GeneralStep.utils';
import { FormValues } from './PlacementForm.types';

const usePlacementForm = () => {
  const [active, setActive] = useState(0);

  const form = useForm<FormValues>({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      description: '',
      location: '',
      image: '',
      type: AdvertisementType.RealEstate,
      propertyType: '',
      area: 0,
      rooms: 0,
      price: 0,
      brand: '',
      model: '',
      year: 2025,
      mileage: 0,
      serviceType: '',
      experience: 0,
      cost: 0,
      workSchedule: '',
    },
    validate: (values) => {
      const errors: Partial<Record<keyof FormValues, string>> = {};

      if (active === 0) {
        if (!values.name) errors.name = 'Название обязательно';
        if (!values.description) errors.description = 'Описание обязательно';
        if (!values.location) errors.location = 'Локация обязательна';
        if (values.image && !isImageUrl(values.image))
          errors.image = 'Неверный формат ссылки';
        if (!values.type) errors.type = 'Категория обязательна';
      }

      if (active === 1) {
        if (values.type === AdvertisementType.RealEstate) {
          if (!values.propertyType)
            errors.propertyType = 'Тип недвижимости обязателен';
          if (values.area <= 0) errors.area = 'Площадь должна быть больше 0';
          if (values.rooms <= 0)
            errors.rooms = 'Количество комнат должно быть больше 0';
          if (values.price <= 0) errors.price = 'Цена должна быть больше 0';
        }

        if (values.type === AdvertisementType.Auto) {
          if (!values.brand) errors.brand = 'Марка обязательна';
          if (!values.model.trim()) errors.model = 'Модель обязательна';
          if (values.year < 1886 || values.year > 2026)
            errors.year =
              'Год выпуска обязателен и должен находиться в промежутке от 1886 по 2026 ';
          if (values.mileage <= 0)
            errors.mileage = 'Пробег должен быть больше 0 км.';
        }

        if (values.type === AdvertisementType.Services) {
          if (!values.serviceType) errors.serviceType = 'Тип услуги обязателен';
          if (values.experience <= 0)
            errors.experience = 'Опыт работы обязателен';
          if (values.cost <= 0) errors.cost = 'Стоимость должна быть больше 0';
        }
      }

      return errors;
    },
  });

  const nextStep = () => {
    form.validate();
    if (form.isValid()) {
      setActive((current) => (current < 2 ? current + 1 : current));
      console.log(form.getValues());
    }
  };

  const prevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current));
  };

  return { form, active, setActive, nextStep, prevStep };
};

export default usePlacementForm;
