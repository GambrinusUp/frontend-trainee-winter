import {
  Button,
  CloseButton,
  Flex,
  Group,
  Input,
  NumberInput,
  Select,
  Stack,
  TextInput,
} from '@mantine/core';
import { Plus, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { AUTO_BRANDS } from '../../../../constants/auto';
import { REALTY_TYPES } from '../../../../constants/realty';
import { SERVICES_TYPES } from '../../../../constants/services';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { AdvertisementType } from '../../../../shared/types';
import { setEdit } from '../../../../store/AdvertisementStore/AdvertisementStoreSlice';
import { PanelProps } from './Panel.types';

// Панель с фильтрами, поиском и кнопкой создания
const Panel = ({ form }: PanelProps) => {
  const { isLoggedIn } = useAppSelector((state) => state.authStore);
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
        key={form.key('name')}
        {...form.getInputProps('name')}
        rightSection={
          <CloseButton
            aria-label="Clear input"
            onClick={() => {
              form.setValues({ name: '' });
            }}
          />
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
        key={form.key('type')}
        {...form.getInputProps('type')}
        onChange={(value) => {
          const name = form.getValues().name;
          form.reset();
          form.setValues({ type: value as AdvertisementType });
          form.setValues({ name });
        }}
        clearable
        onClear={() => {
          const name = form.getValues().name;
          form.reset();
          form.setValues({ type: undefined });
          form.setValues({ name });
        }}
        w="80%"
      />

      {form.getValues().type && (
        <Flex gap="md" wrap="wrap" justify="center" w="100%">
          {form.getValues().type === AdvertisementType.RealEstate && (
            <>
              <Select
                label="Тип недвижимости"
                placeholder="Выберите тип"
                data={REALTY_TYPES}
                key={form.key('propertyType')}
                {...form.getInputProps('propertyType')}
                w={150}
              />
              <NumberInput
                label="Площадь от"
                key={form.key('areaFrom')}
                {...form.getInputProps('areaFrom')}
                allowNegative={false}
                w={100}
              />
              <NumberInput
                label="Площадь до"
                key={form.key('areaTo')}
                {...form.getInputProps('areaTo')}
                allowNegative={false}
                w={100}
              />
              <NumberInput
                label="Комнат"
                key={form.key('rooms')}
                {...form.getInputProps('rooms')}
                allowNegative={false}
                w={80}
              />
              <NumberInput
                label="Цена от"
                key={form.key('priceFrom')}
                {...form.getInputProps('priceFrom')}
                allowNegative={false}
                w={120}
              />
              <NumberInput
                label="Цена до"
                key={form.key('priceTo')}
                {...form.getInputProps('priceTo')}
                allowNegative={false}
                w={120}
              />
            </>
          )}

          {form.getValues().type === AdvertisementType.Auto && (
            <>
              <Select
                label="Марка"
                placeholder="Выберите марку"
                data={AUTO_BRANDS}
                key={form.key('brand')}
                {...form.getInputProps('brand')}
                w={150}
              />
              <TextInput
                label="Модель"
                key={form.key('model')}
                {...form.getInputProps('model')}
                w={120}
              />
              <NumberInput
                label="Год от"
                key={form.key('yearFrom')}
                {...form.getInputProps('yearFrom')}
                allowNegative={false}
                min={1886}
                max={2025}
                w={100}
              />
              <NumberInput
                label="Год до"
                key={form.key('yearTo')}
                {...form.getInputProps('yearTo')}
                allowNegative={false}
                min={1886}
                max={2026}
                w={100}
              />
            </>
          )}

          {form.getValues().type === AdvertisementType.Services && (
            <>
              <Select
                label="Тип услуги"
                placeholder="Выберите тип"
                data={SERVICES_TYPES}
                key={form.key('serviceType')}
                {...form.getInputProps('serviceType')}
                w={150}
              />
              <NumberInput
                label="Опыт (от)"
                key={form.key('experienceFrom')}
                {...form.getInputProps('experienceFrom')}
                allowNegative={false}
                w={100}
              />
              <NumberInput
                label="Стоимость от"
                key={form.key('costFrom')}
                {...form.getInputProps('costFrom')}
                allowNegative={false}
                w={120}
              />
              <NumberInput
                label="Стоимость до"
                key={form.key('costTo')}
                {...form.getInputProps('costTo')}
                allowNegative={false}
                w={120}
              />
            </>
          )}
        </Flex>
      )}
      {isLoggedIn && (
        <Group gap="md" justify="center">
          <Button rightSection={<Plus />} onClick={handleCreate}>
            Создать объявление
          </Button>
        </Group>
      )}
    </Stack>
  );
};

export default Panel;
