import {
  Badge,
  Button,
  Card,
  em,
  Flex,
  Group,
  Image,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Link } from 'react-router-dom';

import NoImage from '../../../../static/izobrazhenie_sozdanie_kartinki_obgutyszi59o_512.png';
import { AdvertisementCardProps } from './AdvertisementCard.types';

const AdvertisementCard = ({
  id,
  name,
  location,
  image,
  type,
}: AdvertisementCardProps) => {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Flex
        direction={{ base: 'column', sm: 'row' }}
        gap={{ base: 'sm', sm: 'lg' }}
        align="center"
      >
        <Image
          radius="md"
          h={200}
          w={200}
          fit="contain"
          src={image ? image : NoImage}
        />
        <Group justify={isMobile ? 'center' : 'space-between'} w="100%">
          <Stack
            align="flex-start"
            gap="md"
            p="md"
            flex={{ base: 0, sm: 1 }}
            w={{ base: '100%', sm: 'auto' }}
          >
            <Title order={4}>{name}</Title>
            <Text size="md">{location}</Text>
            <Badge color="teal" size="lg" radius="md">
              {type}
            </Badge>
          </Stack>
          <Link to={`/item/${id}`}>
            <Button>Открыть объявление</Button>
          </Link>
        </Group>
      </Flex>
    </Card>
  );
};

export default AdvertisementCard;
