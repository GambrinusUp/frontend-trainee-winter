import {
  Button,
  CloseButton,
  Group,
  Input,
  Select,
  Stack,
} from '@mantine/core';
import { Plus, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../../../hooks/redux';
import { AdvertisementType } from '../../../../shared/types';
import { setEdit } from '../../../../store/AdvertisementStore/AdvertisementStoreSlice';
import { PanelProps } from './Panel.types';

const Panel = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}: PanelProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleCreate = () => {
    dispatch(setEdit({ isEditing: false }));
    navigate('/form');
  };

  const handleInputChange = (value: string) => {
    onSearchChange(value);
  };

  const handleClearSearch = () => {
    onSearchChange('');
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
        value={searchTerm}
        onChange={(event) => handleInputChange(event.target.value)}
        rightSection={
          <CloseButton aria-label="Clear input" onClick={handleClearSearch} />
        }
      />
      <Select
        maw={200}
        label="Категория"
        placeholder="Выберите категорию"
        data={[
          {
            value: AdvertisementType.RealEstate,
            label: AdvertisementType.RealEstate,
          },
          { value: AdvertisementType.Auto, label: AdvertisementType.Auto },
          {
            value: AdvertisementType.Services,
            label: AdvertisementType.Services,
          },
        ]}
        value={selectedCategory}
        onChange={(value) => onCategoryChange(value as AdvertisementType | '')}
        clearable
        w="80%"
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
