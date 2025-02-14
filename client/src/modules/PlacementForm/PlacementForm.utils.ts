import { AdvertisementType } from '../../shared/types';
import { AdvertisementItem } from '../../store/AdvertisementStore/AdvertisementStore.types';
import { FormValues } from './PlacementForm.types';

export const mapAdvertisementData = (
  formData: FormValues,
): AdvertisementItem => {
  const advertisementData: Record<
    AdvertisementType,
    Partial<AdvertisementItem>
  > = {
    [AdvertisementType.Auto]: {
      brand: formData.brand,
      model: formData.model,
      year: formData.year,
      mileage: formData.mileage,
    },
    [AdvertisementType.RealEstate]: {
      propertyType: formData.propertyType,
      area: formData.area,
      rooms: formData.rooms,
      price: formData.price,
    },
    [AdvertisementType.Services]: {
      serviceType: formData.serviceType,
      experience: formData.experience,
      cost: formData.cost,
      workSchedule: formData.workSchedule,
    },
  };

  return {
    name: formData.name,
    description: formData.description,
    location: formData.location,
    type: formData.type,
    image: formData.image,
    ...advertisementData[formData.type],
  } as AdvertisementItem;
};
