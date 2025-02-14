import { NumberInput, Select, Stack, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

import { AUTO_BRANDS } from '../../../../constants/auto';
import { FormValues } from '../../PlacementForm.types';

const AutoForm = ({ form }: { form: UseFormReturnType<FormValues> }) => {
  return (
    <Stack gap="md" p="lg" w={{ base: '100%', sm: 600 }} align="stretch">
      <Select
        withAsterisk
        allowDeselect={false}
        radius="md"
        label="Марка"
        placeholder="Выберите марку авто"
        data={AUTO_BRANDS}
        key={form.key('brand')}
        {...form.getInputProps('brand')}
      />
      <TextInput
        withAsterisk
        radius="md"
        label="Модель"
        placeholder="Введите модель авто"
        key={form.key('model')}
        {...form.getInputProps('model')}
      />
      <NumberInput
        withAsterisk
        radius="md"
        label="Год выпуска"
        placeholder="Введите год выпуска"
        min={1886}
        max={2026}
        allowNegative={false}
        key={form.key('year')}
        {...form.getInputProps('year')}
      />
      <NumberInput
        radius="md"
        label="Пробег"
        placeholder="Введите пробег авто"
        hideControls
        allowNegative={false}
        suffix=" км."
        key={form.key('mileage')}
        {...form.getInputProps('mileage')}
      />
    </Stack>
  );
};

export default AutoForm;
