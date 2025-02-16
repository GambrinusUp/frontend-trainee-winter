import { Flex, Loader, Pagination, Stack, Title } from '@mantine/core';
import { useScrollIntoView } from '@mantine/hooks';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useNotification } from '../../hooks/useNotification';
import { getAdvertisements } from '../../store/AdvertisementStore/AdvertisementStore.action';
import useFilterForm from './AdvertisementList.hooks';
import AdvertisementCard from './Components/AdvertisementCard/AdvertisementCard';
import Panel from './Components/Panel/Panel';

// Модуль, для показа списка объявлений, с возможностью добавлении новых
const AdvertisementList = () => {
  const dispatch = useAppDispatch();
  const { advertisements, currentPage, totalPages, isLoading, error } =
    useAppSelector((state) => state.advertisementStore);
  const { form } = useFilterForm();
  const { showError } = useNotification();
  const { scrollIntoView } = useScrollIntoView();

  // Показ ошибок
  useEffect(() => {
    if (error) showError(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  // Получение данных
  useEffect(() => {
    dispatch(
      getAdvertisements({
        page: 1,
        limit: 5,
      }),
    );
  }, [dispatch]);

  // Пагинация
  const handleChangePage = (page: number) => {
    dispatch(
      getAdvertisements({
        page,
        limit: 5,
        ...form.getValues(),
      }),
    );
    scrollIntoView({ alignment: 'start' });
  };

  return (
    <Flex direction="column" align="center" gap="lg">
      <Title order={1}>Список объявлений</Title>
      <Panel form={form} />
      <Stack
        align="stretch"
        justify="flex-start"
        gap="md"
        w={{ base: '90%', sm: 700 }}
      >
        {isLoading ? (
          <Flex justify="center" align="center">
            <Loader color="blue" size="xl" />
          </Flex>
        ) : (
          <>
            {advertisements.length < 1 && 'Объявлений пока нет'}
            {advertisements.map((advertisement) => (
              <AdvertisementCard
                key={advertisement.id}
                id={advertisement.id}
                image={advertisement.image}
                name={advertisement.name}
                location={advertisement.location}
                type={advertisement.type}
              />
            ))}
          </>
        )}
      </Stack>
      <Pagination
        total={totalPages}
        value={currentPage}
        onChange={(page) => handleChangePage(page)}
        mt="md"
      />
    </Flex>
  );
};

export default AdvertisementList;
