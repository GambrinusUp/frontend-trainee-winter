import { useForm } from '@mantine/form';
import { useEffect, useMemo, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useNotification } from '../../hooks/useNotification';
import { AdvertisementType } from '../../shared/types';
import {
  createAdvertisement,
  editAdvertisement,
} from '../../store/AdvertisementStore/AdvertisementStore.action';
import { debounce } from '../../utils/debounce';
import { isImageUrl } from './components/GeneralStep/GeneralStep.utils';
import { initialValues } from './PlacementForm.const';
import { FormValues } from './PlacementForm.types';
import { mapAdvertisementData } from './PlacementForm.utils';

const usePlacementForm = () => {
  const dispatch = useAppDispatch();
  const { showSuccess } = useNotification();
  const [active, setActive] = useState(0);
  const { isEditing, advertisementEdit } = useAppSelector(
    (state) => state.advertisementStore,
  );

  const debouncedSave = useMemo(
    () =>
      debounce((values: FormValues) => {
        localStorage.setItem('placementDraft', JSON.stringify(values));
      }, 300),
    [],
  );

  const savedData = JSON.parse(localStorage.getItem('placementDraft') || '{}');

  const form = useForm<FormValues>({
    mode: 'uncontrolled',
    initialValues: {
      ...initialValues,
      ...savedData,
    },
    validate: (values) => {
      const errors: Partial<Record<keyof FormValues, string>> = {};

      if (active === 0) {
        if (!values.name) errors.name = 'Название обязательно';
        else if (values.name.length > 100)
          errors.name = 'Максимум 100 символов';

        if (!values.description) errors.description = 'Описание обязательно';
        else if (values.description.length < 10)
          errors.description = 'Минимум 10 символов';
        else if (values.description.length > 1000)
          errors.description = 'Максимум 1000 символов';

        if (!values.location) errors.location = 'Локация обязательна';
        else if (values.location.length > 100)
          errors.location = 'Максимум 100 символов';

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
          else if (values.model.length > 50)
            errors.model = 'Максимум 50 символов';

          if (values.year < 1886 || values.year > 2026)
            errors.year =
              'Год выпуска должен быть в промежутке от 1886 по 2026';

          if (values.mileage <= 0)
            errors.mileage = 'Пробег должен быть больше 0 км.';
        }

        if (values.type === AdvertisementType.Services) {
          if (!values.serviceType) errors.serviceType = 'Тип услуги обязателен';

          if (values.experience <= 0)
            errors.experience = 'Опыт работы обязателен';

          if (values.cost <= 0) errors.cost = 'Стоимость должна быть больше 0';

          if (values.workSchedule && values.workSchedule.length > 50)
            errors.workSchedule = 'Максимум 50 символов';
        }
      }

      return errors;
    },
    onValuesChange: (values) => {
      if (!isEditing) {
        debouncedSave(values);
      }
    },
  });

  const clear = () => {
    form.setValues(initialValues);
    setActive(0);
  };

  const nextStep = () => {
    form.validate();
    if (form.isValid()) {
      setActive((current) => (current < 2 ? current + 1 : current));
    }
  };

  const prevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current));
  };

  const handleSubmit = async () => {
    form.validate();
    if (form.isValid()) {
      const formData = form.getValues();
      const finalData = mapAdvertisementData(formData);
      if (isEditing && advertisementEdit) {
        const result = await dispatch(
          editAdvertisement({
            id: advertisementEdit.id.toString(),
            advertisement: finalData,
          }),
        );
        if (result.meta.requestStatus === 'fulfilled') {
          showSuccess('Объявление успешно отредактировано');
        }
      } else {
        const result = await dispatch(createAdvertisement(finalData));
        if (result.meta.requestStatus === 'fulfilled') {
          showSuccess('Объявление успешно создано');
          localStorage.setItem('placementDraft', '{}');
        }
      }
      nextStep();
    }
  };

  useEffect(() => {
    if (isEditing && advertisementEdit) {
      form.setValues(advertisementEdit);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [advertisementEdit, isEditing]);

  return { form, active, setActive, nextStep, prevStep, handleSubmit, clear };
};

export default usePlacementForm;
