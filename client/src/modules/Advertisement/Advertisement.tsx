import {
  Badge,
  Button,
  em,
  Flex,
  Group,
  Image,
  Loader,
  Spoiler,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useNotification } from '../../hooks/useNotification';
import { AdvertisementType } from '../../shared/types';
import NoImage from '../../static/izobrazhenie_sozdanie_kartinki_obgutyszi59o_512.png';
import {
  deleteAdvertisement,
  getAdvertisement,
} from '../../store/AdvertisementStore/AdvertisementStore.action';
import { setEdit } from '../../store/AdvertisementStore/AdvertisementStoreSlice';
import AutoFields from './components/AutoFields/AutoFields';
import RealEstateFields from './components/RealEstateFields/RealEstateFields';
import ServicesFields from './components/ServicesFields/ServicesFields';

// Модуль просмотра объявления, с возможностью редактирования и удаления
const Advertisement = () => {
  const { id } = useParams();
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useAppSelector((state) => state.authStore);
  const { advertisement, isLoading, error } = useAppSelector(
    (state) => state.advertisementStore,
  );
  const { showError, showSuccess } = useNotification();

  // Редактирование
  const handleEdit = () => {
    dispatch(setEdit({ isEditing: true, advertisementEdit: advertisement }));
    navigate('/form');
  };

  // Удаление
  const handleDelete = async () => {
    if (id) {
      const result = await dispatch(deleteAdvertisement({ id }));
      if (result.meta.requestStatus === 'fulfilled') {
        showSuccess('Объявление успешно удалено');
        navigate('/list');
      }
    }
  };

  // Получение информации об объявлении
  useEffect(() => {
    if (id) dispatch(getAdvertisement({ id }));
  }, [dispatch, id]);

  // Показ ошибок
  useEffect(() => {
    if (error) showError(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  // Отображение загрузки данных
  if (isLoading) {
    return (
      <Flex justify="center" align="center">
        <Loader color="blue" size="xl" />
      </Flex>
    );
  }

  return (
    <Flex gap={{ base: 'sm', sm: 'lg' }} w="100%" justify="center">
      <Group w="80%" gap="xl" justify={isMobile ? 'center' : 'flex-start'}>
        <Image
          radius="md"
          h={{ base: 250, sm: 400 }}
          w={{ base: 250, sm: 400 }}
          src={advertisement.image ? advertisement.image : NoImage}
        />
        <Stack align="flex-start" gap="xs" p="md" flex={1}>
          <Title order={2}>{advertisement.name}</Title>
          <Badge color="teal" size="lg" radius="md">
            {advertisement.type}
          </Badge>
          <Title order={4}>Описание:</Title>
          <Spoiler
            maxHeight={100}
            showLabel="Раскрыть"
            hideLabel="Скрыть"
            transitionDuration={1000}
            style={{ wordBreak: 'break-all' }}
          >
            <Text size="md">{advertisement.description}</Text>
          </Spoiler>
          <Title order={4}>Расположение:</Title>
          <Text size="md">{advertisement.location}</Text>
          {advertisement.type === AdvertisementType.RealEstate && (
            <RealEstateFields
              propertyType={advertisement.propertyType}
              area={advertisement.area}
              rooms={advertisement.rooms}
              price={advertisement.price}
            />
          )}
          {advertisement.type === AdvertisementType.Auto && (
            <AutoFields
              brand={advertisement.brand}
              model={advertisement.model}
              year={advertisement.year}
              mileage={advertisement.mileage}
            />
          )}
          {advertisement.type === AdvertisementType.Services && (
            <ServicesFields
              serviceType={advertisement.serviceType}
              experience={advertisement.experience}
              cost={advertisement.cost}
              workSchedule={advertisement.workSchedule}
            />
          )}
          {isLoggedIn && (
            <>
              <Button
                variant="filled"
                size="md"
                radius="md"
                mt="md"
                onClick={handleEdit}
              >
                Редактировать
              </Button>
              <Button
                variant="filled"
                color="red"
                size="md"
                radius="md"
                mt="md"
                onClick={handleDelete}
              >
                Удалить
              </Button>
            </>
          )}
        </Stack>
      </Group>
    </Flex>
  );
};

export default Advertisement;
