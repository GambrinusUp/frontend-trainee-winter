import { AdvertisementType } from '../../shared/types';

export interface AdvertisementState {
  advertisements: AdvertisementItemResponse[];
  advertisement: AdvertisementItemResponse;
  isEditing: boolean;
  advertisementEdit: AdvertisementItemResponse | undefined;
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  error?: string;
}

export interface AdvertisementsResponse {
  advertisements: AdvertisementItemResponse[];
  currentPage: number;
  totalPages: number;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface BaseAdvertisement {
  name: string;
  description: string;
  location: string;
  type: AdvertisementType;
  image?: string;
}

export interface RealEstateAdvertisement extends BaseAdvertisement {
  type: AdvertisementType.RealEstate;
  propertyType: string;
  area: number;
  rooms: number;
  price: number;
}

export interface AutoAdvertisement extends BaseAdvertisement {
  type: AdvertisementType.Auto;
  brand: string;
  model: string;
  year: number;
  mileage?: number;
}

export interface ServicesAdvertisement extends BaseAdvertisement {
  type: AdvertisementType.Services;
  serviceType: string;
  experience: number;
  cost: number;
  workSchedule?: string;
}

export type AdvertisementItem =
  | RealEstateAdvertisement
  | AutoAdvertisement
  | ServicesAdvertisement;

export type AdvertisementItemResponse = AdvertisementItem & { id: number };
