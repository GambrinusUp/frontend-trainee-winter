import { Flex, Loader, Pagination, Stack, Title } from '@mantine/core';
import { useScrollIntoView } from '@mantine/hooks';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useNotification } from '../../hooks/useNotification';
import { getAdvertisements } from '../../store/AdvertisementStore/AdvertisementStore.action';
import AdvertisementCard from './Components/AdvertisementCard/AdvertisementCard';
import Panel from './Components/Panel/Panel';

const AdvertisementList = () => {
  const dispatch = useAppDispatch();
  const { advertisements, currentPage, totalPages, isLoading, error } =
    useAppSelector((state) => state.advertisementStore);
  const { showError } = useNotification();
  const { scrollIntoView } = useScrollIntoView();

  useEffect(() => {
    dispatch(getAdvertisements({ page: currentPage, limit: 5 }));
  }, [currentPage, dispatch]);

  useEffect(() => {
    if (error) showError(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const handleChangePage = (page: number) => {
    dispatch(getAdvertisements({ page, limit: 5 }));
    scrollIntoView({ alignment: 'start' });
  };

  return (
    <Flex direction="column" align="center" gap="lg">
      <Title order={1}>Список объявлений</Title>
      <Panel />
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
