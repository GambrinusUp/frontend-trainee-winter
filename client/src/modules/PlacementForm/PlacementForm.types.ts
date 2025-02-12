import { AdvertisementType } from '../../shared/types';

export interface FormValues {
  name: string;
  description: string;
  location: string;
  image: string;
  type: AdvertisementType;

  propertyType: string;
  area: number;
  rooms: number;
  price: number;

  brand: string;
  model: string;
  year: number;
  mileage: number;

  serviceType: string;
  experience: number;
  cost: number;
  workSchedule: string;
}
