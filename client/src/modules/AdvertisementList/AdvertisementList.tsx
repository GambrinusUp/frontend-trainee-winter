import { Flex, Loader, Pagination, Stack, Title } from '@mantine/core';
import { useScrollIntoView } from '@mantine/hooks';
import { useEffect, useMemo, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useNotification } from '../../hooks/useNotification';
import { AdvertisementType } from '../../shared/types';
import { getAdvertisements } from '../../store/AdvertisementStore/AdvertisementStore.action';
import { AdvertisementItemResponse } from '../../store/AdvertisementStore/AdvertisementStore.types';
import { debounce } from '../../utils/debounce';
import AdvertisementCard from './Components/AdvertisementCard/AdvertisementCard';
import Panel from './Components/Panel/Panel';

const AdvertisementList = () => {
  const dispatch = useAppDispatch();
  const { advertisements, currentPage, totalPages, isLoading, error } =
    useAppSelector((state) => state.advertisementStore);
  const { showError } = useNotification();
  const { scrollIntoView } = useScrollIntoView();
  const [filteredAdvertisements, setFilteredAdvertisements] = useState<
    AdvertisementItemResponse[]
  >([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<
    AdvertisementType | ''
  >('');

  useEffect(() => {
    dispatch(getAdvertisements({ page: currentPage, limit: 5 }));
  }, [currentPage, dispatch]);

  useEffect(() => {
    if (error) showError(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const debouncedSearch = useMemo(
    () =>
      debounce((term: string) => {
        let filtered = advertisements;
        if (term) {
          filtered = filtered.filter((advertisement) =>
            advertisement.name.toLowerCase().includes(term.toLowerCase()),
          );
        }
        if (selectedCategory) {
          filtered = filtered.filter(
            (advertisement) => advertisement.type === selectedCategory,
          );
        }
        setFilteredAdvertisements(filtered);
      }, 200),
    [advertisements, selectedCategory],
  );

  useEffect(() => {
    if (searchTerm.trim() !== '' || selectedCategory) {
      debouncedSearch(searchTerm);
    } else {
      setFilteredAdvertisements(advertisements);
    }
  }, [advertisements, debouncedSearch, searchTerm, selectedCategory]);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleCategoryChange = (category: AdvertisementType | '') => {
    setSelectedCategory(category);
  };

  const handleChangePage = (page: number) => {
    dispatch(getAdvertisements({ page, limit: 5 }));
    scrollIntoView({ alignment: 'start' });
  };

  return (
    <Flex direction="column" align="center" gap="lg">
      <Title order={1}>Список объявлений</Title>
      <Panel
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
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
            {filteredAdvertisements.length < 1 && 'Объявлений пока нет'}
            {filteredAdvertisements.map((advertisement) => (
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
