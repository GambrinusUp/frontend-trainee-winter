import { Image, Select, Stack, Textarea, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { useEffect, useMemo, useState } from 'react';

import { CATEGORIES } from '../../../../constants/categories';
import { debounce } from '../../../../utils/debounce';
import { FormValues } from '../../PlacementForm.types';
import { isImageUrl } from './GeneralStep.utils';

const GeneralStep = ({ form }: { form: UseFormReturnType<FormValues> }) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  const debouncedSetImageUrl = useMemo(
    () =>
      debounce((newLink: string) => {
        if (newLink.trim() !== '' && isImageUrl(newLink)) {
          setImageUrl(newLink);
        } else {
          setImageUrl(undefined);
        }
      }, 500),
    [],
  );

  useEffect(() => {
    setImageUrl(form.getValues().image);
  }, [form]);

  return (
    <Stack gap="md" p="lg" w={{ base: '100%', sm: 600 }} align="stretch">
      <TextInput
        withAsterisk
        radius="md"
        label="Название"
        placeholder="Введите название объявления"
        key={form.key('name')}
        {...form.getInputProps('name')}
      />
      <Textarea
        withAsterisk
        radius="md"
        autosize
        label="Описание"
        placeholder="Введите описание"
        maxRows={4}
        key={form.key('description')}
        {...form.getInputProps('description')}
      />
      <TextInput
        withAsterisk
        radius="md"
        label="Локация"
        placeholder="Введите описание"
        key={form.key('location')}
        {...form.getInputProps('location')}
      />
      <TextInput
        radius="md"
        label="Фото"
        placeholder="Прикрепите ссылку на фото"
        key={form.key('image')}
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
        key={form.key('type')}
        {...form.getInputProps('type')}
      />
    </Stack>
  );
};

export default GeneralStep;
