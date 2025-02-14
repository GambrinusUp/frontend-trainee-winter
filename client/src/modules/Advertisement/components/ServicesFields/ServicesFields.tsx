import { Group, Text, Title } from '@mantine/core';

import { ServicesAdvertisement } from '../../../../store/AdvertisementStore/AdvertisementStore.types';

const ServicesFields = ({
  serviceType,
  experience,
  cost,
  workSchedule,
}: Omit<
  ServicesAdvertisement,
  'type' | 'name' | 'description' | 'image' | 'location'
>) => {
  return (
    <>
      <Title order={4}>Об услуге:</Title>
      <Group>
        <Text c="dimmed">Тип услуги:</Text>
        <Text size="md">{serviceType}</Text>
      </Group>
      <Group>
        <Text c="dimmed">Опыт работы в годах:</Text>
        <Text size="md">{experience}</Text>
      </Group>
      <Group>
        <Text c="dimmed">Стоимость услуги:</Text>
        <Text size="md">{`${cost} руб.`}</Text>
      </Group>
      {workSchedule && (
        <Group>
          <Text c="dimmed">График работы:</Text>
          <Text size="md">{workSchedule}</Text>
        </Group>
      )}
    </>
  );
};

export default ServicesFields;
