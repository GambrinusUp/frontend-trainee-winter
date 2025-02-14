import { Button, CloseButton, Group, Input, Stack } from '@mantine/core';
import { Plus, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../../../hooks/redux';
import { setEdit } from '../../../../store/AdvertisementStore/AdvertisementStoreSlice';

const Panel = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleCreate = () => {
    dispatch(setEdit({ isEditing: false }));
    navigate('/form');
  };

  return (
    <Stack gap="md" align="center" w="80%">
      <Input
        placeholder="Поиск по названию объявления"
        leftSection={<Search />}
        mb="sm"
        w="80%"
        radius="md"
        rightSectionPointerEvents="all"
        rightSection={<CloseButton aria-label="Clear input" />}
      />
      <Group justify="space-between" gap="md">
        <Button rightSection={<Plus />} onClick={handleCreate}>
          Создать объявление
        </Button>
      </Group>
    </Stack>
  );
};

export default Panel;
