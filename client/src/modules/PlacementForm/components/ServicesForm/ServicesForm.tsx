import { NumberInput, Select, Stack, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

import { SERVICES_TYPES } from '../../../../constants/services';
import { FormValues } from '../../PlacementForm.types';

const ServicesForm = ({ form }: { form: UseFormReturnType<FormValues> }) => {
  return (
    <Stack gap="md" p="lg" w={{ base: '100%', sm: 600 }} align="stretch">
      <Select
        withAsterisk
        allowDeselect={false}
        radius="md"
        label="Тип услуги"
        placeholder="Выберите тип услуги"
        data={SERVICES_TYPES}
        {...form.getInputProps('serviceType')}
      />
      <NumberInput
        radius="md"
        label="Опыт работы"
        placeholder="Введите ваш опыт работы"
        allowNegative={false}
        suffix=" лет"
        {...form.getInputProps('experience')}
      />
      <NumberInput
        radius="md"
        withAsterisk
        hideControls
        label="Стоимость"
        placeholder="Введите стоимость услуги"
        allowNegative={false}
        {...form.getInputProps('cost')}
      />
      <TextInput
        radius="md"
        label="График работы"
        placeholder="Введите график работы "
        {...form.getInputProps('workSchedule')}
      />
    </Stack>
  );
};

export default ServicesForm;
