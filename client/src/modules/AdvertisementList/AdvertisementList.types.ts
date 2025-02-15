import { AdvertisementType } from '../../shared/types';

export interface FilterFormValues {
  name: string;
  type: AdvertisementType | undefined;
  propertyType?: string;
  areaFrom?: string;
  areaTo?: string;
  rooms?: string;
  priceFrom?: string;
  priceTo?: string;
  brand?: string;
  model?: string;
  yearFrom?: string;
  yearTo?: string;
  serviceType?: string;
  experienceFrom?: string;
  costFrom?: string;
  costTo?: string;
}
