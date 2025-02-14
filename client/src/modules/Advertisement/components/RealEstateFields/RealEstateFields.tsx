import { Group, Text, Title } from '@mantine/core';

import { RealEstateAdvertisement } from '../../../../store/AdvertisementStore/AdvertisementStore.types';

const RealEstateFields = ({
  propertyType,
  area,
  rooms,
  price,
}: Omit<
  RealEstateAdvertisement,
  'type' | 'name' | 'description' | 'image' | 'location'
>) => {
  return (
    <>
      <Title order={4}>О недвижимости:</Title>
      <Group>
        <Text c="dimmed">Тип недвижимости:</Text>
        <Text size="md">{propertyType}</Text>
      </Group>
      <Group>
        <Text c="dimmed">Площадь:</Text>
        <Text size="md">{`${area} м²`}</Text>
      </Group>
      <Group>
        <Text c="dimmed">Количество комнат:</Text>
        <Text size="md">{rooms}</Text>
      </Group>
      <Group>
        <Text c="dimmed">Цена:</Text>
        <Text size="md">{`${price} руб.`}</Text>
      </Group>
    </>
  );
};

export default RealEstateFields;
