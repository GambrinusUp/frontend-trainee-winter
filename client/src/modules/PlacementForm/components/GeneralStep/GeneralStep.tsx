import { Image, Select, Stack, Textarea, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { useMemo, useState } from 'react';

import { CATEGORIES } from '../../../../constants/categories';
import { debounce } from '../../../../utils/debounce';
import { FormValues } from '../../PlacementForm.types';
import { isImageUrl } from './GeneralStep.utils';

const GeneralStep = ({ form }: { form: UseFormReturnType<FormValues> }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(
    form.values.image ? form.values.image : null,
  );

  const debouncedSetImageUrl = useMemo(
    () =>
      debounce((newLink: string) => {
        if (newLink.trim() !== '' && isImageUrl(newLink)) {
          setImageUrl(newLink);
        } else {
          setImageUrl(null);
        }
      }, 500),
    [],
  );

  return (
    <Stack gap="md" p="lg" w={{ base: '100%', sm: 600 }} align="stretch">
      <TextInput
        withAsterisk
        radius="md"
        label="Название"
        placeholder="Введите название объявления"
        {...form.getInputProps('name')}
      />
      <Textarea
        withAsterisk
        radius="md"
        autosize
        label="Описание"
        placeholder="Введите описание"
        maxRows={4}
        {...form.getInputProps('description')}
      />
      <TextInput
        withAsterisk
        radius="md"
        label="Локация"
        placeholder="Введите описание"
        {...form.getInputProps('location')}
      />
      <TextInput
        radius="md"
        label="Фото"
        placeholder="Прикрепите ссылку на фото"
        {...form.getInputProps('image')}
        onChange={(event) => {
          form.getInputProps('image').onChange(event);
          debouncedSetImageUrl(event.target.value);
        }}
      />
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="Загруженное изображение"
          width="100%"
          height="auto"
          radius="md"
          style={{ marginTop: '10px' }}
        />
      )}
      <Select
        withAsterisk
        allowDeselect={false}
        radius="md"
        label="Выберите категорию"
        placeholder="Категория"
        data={CATEGORIES}
        {...form.getInputProps('type')}
      />
    </Stack>
  );
};

export default GeneralStep;
