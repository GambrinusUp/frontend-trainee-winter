import { AdvertisementType } from '../../../../shared/types';

export interface AdvertisementCardProps {
  id: number;
  name: string;
  location: string;
  image?: string;
  type: AdvertisementType;
}
