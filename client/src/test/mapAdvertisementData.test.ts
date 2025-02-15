import { FormValues } from '../modules/PlacementForm/PlacementForm.types';
import { mapAdvertisementData } from '../modules/PlacementForm/PlacementForm.utils';
import { AdvertisementType } from '../shared/types';
import { AdvertisementItem } from '../store/AdvertisementStore/AdvertisementStore.types';

describe('mapAdvertisementData', () => {
  it('should map form data to auto advertisement item', () => {
    const formData: FormValues = {
      id: undefined,
      name: 'Toyota Camry',
      description: 'Надежный автомобиль',
      location: 'Москва',
      image: 'car.jpg',
      type: AdvertisementType.Auto,
      propertyType: '',
      area: 0,
      rooms: 0,
      price: 0,
      brand: 'Toyota',
      model: 'Camry',
      year: 2020,
      mileage: 15000,
      serviceType: '',
      experience: 0,
      cost: 0,
      workSchedule: '',
    };

    const expected: AdvertisementItem = {
      name: 'Toyota Camry',
      description: 'Надежный автомобиль',
      location: 'Москва',
      image: 'car.jpg',
      type: AdvertisementType.Auto,
      brand: 'Toyota',
      model: 'Camry',
      year: 2020,
      mileage: 15000,
    };

    expect(mapAdvertisementData(formData)).toEqual(expected);
  });

  it('should map form data to real estate advertisement item', () => {
    const formData: FormValues = {
      id: undefined,
      name: 'Квартира в центре',
      description: 'Просторная квартира в центре города',
      location: 'Москва',
      image: 'apartment.jpg',
      type: AdvertisementType.RealEstate,
      propertyType: 'Квартира',
      area: 100,
      rooms: 3,
      price: 15000000,
      brand: '',
      model: '',
      year: 2025,
      mileage: 0,
      serviceType: '',
      experience: 0,
      cost: 0,
      workSchedule: '',
    };

    const expected: AdvertisementItem = {
      name: 'Квартира в центре',
      description: 'Просторная квартира в центре города',
      location: 'Москва',
      image: 'apartment.jpg',
      type: AdvertisementType.RealEstate,
      propertyType: 'Квартира',
      area: 100,
      rooms: 3,
      price: 15000000,
    };

    expect(mapAdvertisementData(formData)).toEqual(expected);
  });

  it('should map form data to services advertisement item', () => {
    const formData: FormValues = {
      id: undefined,
      name: 'Ремонт квартир',
      description: 'Качественный ремонт квартир',
      location: 'Москва',
      image: 'repair.jpg',
      type: AdvertisementType.Services,
      propertyType: '',
      area: 0,
      rooms: 0,
      price: 0,
      brand: '',
      model: '',
      year: 2025,
      mileage: 0,
      serviceType: 'Ремонт',
      experience: 5,
      cost: 50000,
      workSchedule: 'Пн-Пт, 9:00-18:00',
    };

    const expected: AdvertisementItem = {
      name: 'Ремонт квартир',
      description: 'Качественный ремонт квартир',
      location: 'Москва',
      image: 'repair.jpg',
      type: AdvertisementType.Services,
      serviceType: 'Ремонт',
      experience: 5,
      cost: 50000,
      workSchedule: 'Пн-Пт, 9:00-18:00',
    };

    expect(mapAdvertisementData(formData)).toEqual(expected);
  });

  it('should handle empty fields correctly', () => {
    const formData: FormValues = {
      id: undefined,
      name: '',
      description: '',
      location: '',
      image: '',
      type: AdvertisementType.Auto,
      propertyType: '',
      area: 0,
      rooms: 0,
      price: 0,
      brand: '',
      model: '',
      year: 2025,
      mileage: 0,
      serviceType: '',
      experience: 0,
      cost: 0,
      workSchedule: '',
    };

    const expected: AdvertisementItem = {
      name: '',
      description: '',
      location: '',
      type: AdvertisementType.Auto,
      image: '',
      brand: '',
      model: '',
      year: 2025,
      mileage: 0,
    };

    expect(mapAdvertisementData(formData)).toEqual(expected);
  });
});
