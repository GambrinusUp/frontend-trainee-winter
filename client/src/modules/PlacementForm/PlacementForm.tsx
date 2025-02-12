import { Button, em, Group, Stepper, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useNotification } from '../../hooks/useNotification';
import { createAdvertisement } from '../../store/AdvertisementStore/AdvertisementStore.action';
import CategoryStep from './components/CategoryStep/CategoryStep';
import GeneralStep from './components/GeneralStep/GeneralStep';
import usePlacementForm from './PlacementForm.hooks';
import { mapAdvertisementData } from './PlacementForm.utils';

const PlacementForm = () => {
  const error = useAppSelector((state) => state.advertisementStore.error);
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const { form, active, setActive, nextStep, prevStep } = usePlacementForm();
  const { showSuccess, showError } = useNotification();

  const handleSubmit = async () => {
    const formData = form.getValues();
    const finalData = mapAdvertisementData(formData);
    const result = await dispatch(createAdvertisement(finalData));
    if (result.meta.requestStatus === 'fulfilled') {
      showSuccess('Объявление успешно создано');
    }
  };

  useEffect(() => {
    if (error) showError(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <>
      <Title order={1}>Создание нового объявления</Title>
      <Stepper
        active={active}
        onStepClick={setActive}
        mt="lg"
        styles={{
          root: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          },
          content: {
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            textAlign: 'start',
          },
          steps: {
            width: isMobile ? '100%' : '50%',
          },
        }}
      >
        <Stepper.Step
          label="Основная информация"
          description="Название, описание, локация, фото, категория"
        >
          <GeneralStep form={form} />
        </Stepper.Step>
        <Stepper.Step
          label="Категорийная информация"
          description="Информация, специфичная для категории"
        >
          <CategoryStep form={form} />
        </Stepper.Step>
      </Stepper>
      <Group justify="center" mt="xl">
        <Button variant="default" onClick={prevStep} radius="md">
          Назад
        </Button>
        {active === 2 ? (
          <Button onClick={handleSubmit} radius="md">
            Создать
          </Button>
        ) : (
          <Button onClick={nextStep} radius="md">
            Далee
          </Button>
        )}
      </Group>
    </>
  );
};

export default PlacementForm;
