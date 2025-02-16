import { Group, Text, Title } from '@mantine/core';

import { AutoAdvertisement } from '../../../../store/AdvertisementStore/AdvertisementStore.types';

// Компонент, отображающий поля, связанные с авто
const AutoFields = ({
  brand,
  model,
  year,
  mileage,
}: Omit<
  AutoAdvertisement,
  'type' | 'name' | 'description' | 'image' | 'location'
>) => {
  return (
    <>
      <Title order={4}>Об авто:</Title>
      <Group>
        <Text c="dimmed">Марка:</Text>
        <Text size="md">{brand}</Text>
      </Group>
      <Group>
        <Text c="dimmed">Модель:</Text>
        <Text size="md">{model}</Text>
      </Group>
      <Group>
        <Text c="dimmed">Год выпуска:</Text>
        <Text size="md">{year}</Text>
      </Group>
      {mileage && (
        <Group>
          <Text c="dimmed">Пробег:</Text>
          <Text size="md">{`${mileage} км.`}</Text>
        </Group>
      )}
    </>
  );
};

export default AutoFields;
