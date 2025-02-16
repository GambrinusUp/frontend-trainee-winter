import { Button, em, Group, Stepper, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Loader } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useNotification } from '../../hooks/useNotification';
import { setEdit } from '../../store/AdvertisementStore/AdvertisementStoreSlice';
import CategoryStep from './components/CategoryStep/CategoryStep';
import GeneralStep from './components/GeneralStep/GeneralStep';
import usePlacementForm from './PlacementForm.hooks';

// Модуль с формой для размещения и редактирования объявлений
const PlacementForm = () => {
  const { isLoggedIn } = useAppSelector((state) => state.authStore);
  const { isEditing, isLoading, error } = useAppSelector(
    (state) => state.advertisementStore,
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const { form, active, setActive, nextStep, prevStep, handleSubmit, clear } =
    usePlacementForm();
  const { showError } = useNotification();

  const handleBack = () => {
    navigate('/list');
    dispatch(setEdit({ isEditing: false }));
  };

  useEffect(() => {
    if (!isLoggedIn) navigate('/list');
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (error) showError(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <>
      <Group justify="center">
        <Title order={1}>
          {!isEditing
            ? 'Создание нового объявления'
            : 'Редактирование объявления'}
        </Title>
      </Group>
      {!isEditing && active < 2 && (
        <Group justify="center">
          <Button onClick={clear} variant="light" color="red" mt="md">
            Очистить черновик
          </Button>
        </Group>
      )}
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
        <Stepper.Completed>
          {isLoading ? (
            <Loader color="blue" size="xl" />
          ) : error ? (
            'Возникла ошибка при создании объявления'
          ) : isEditing ? (
            'Объявление отредактировано'
          ) : (
            'Объявление создано'
          )}
        </Stepper.Completed>
      </Stepper>
      <Group justify="center" mt="xl">
        {active === 2 ? (
          <Button onClick={handleBack} radius="md">
            Назад в объявления
          </Button>
        ) : (
          <>
            {active === 0 ? (
              <Button variant="default" onClick={handleBack} radius="md">
                Назад в объявления
              </Button>
            ) : (
              <Button variant="default" onClick={prevStep} radius="md">
                Назад
              </Button>
            )}
            {active === 1 ? (
              <Button onClick={handleSubmit} radius="md">
                {isEditing ? 'Изменить' : 'Создать'}
              </Button>
            ) : (
              <Button onClick={nextStep} radius="md">
                Далее
              </Button>
            )}
          </>
        )}
      </Group>
    </>
  );
};

export default PlacementForm;
