import { NumberInput, Select, Stack } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

import { REALTY_TYPES } from '../../../../constants/realty';
import { FormValues } from '../../PlacementForm.types';

const RealtyForm = ({ form }: { form: UseFormReturnType<FormValues> }) => {
  return (
    <Stack gap="md" p="lg" w={{ base: '100%', sm: 600 }} align="stretch">
      <Select
        withAsterisk
        allowDeselect={false}
        radius="md"
        label="Тип недвижимости"
        placeholder="Выберите тип недвижимости"
        data={REALTY_TYPES}
        {...form.getInputProps('propertyType')}
      />
      <NumberInput
        withAsterisk
        radius="md"
        label="Площадь"
        placeholder="Введите площадь"
        hideControls
        allowNegative={false}
        suffix=" кв. м"
        {...form.getInputProps('area')}
      />
      <NumberInput
        withAsterisk
        radius="md"
        label="Количество комнат"
        placeholder="Введите количество комнат"
        hideControls
        allowNegative={false}
        {...form.getInputProps('rooms')}
      />
      <NumberInput
        withAsterisk
        radius="md"
        label="Цена"
        placeholder="Введите цену"
        hideControls
        allowNegative={false}
        suffix=" руб."
        {...form.getInputProps('price')}
      />
    </Stack>
  );
};

export default RealtyForm;
