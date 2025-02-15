import { useForm } from '@mantine/form';
import { useMemo } from 'react';

import { useAppDispatch } from '../../hooks/redux';
import { getAdvertisements } from '../../store/AdvertisementStore/AdvertisementStore.action';
import { debounce } from '../../utils/debounce';
import { FilterFormValues } from './AdvertisementList.types';

const useFilterForm = () => {
  const dispatch = useAppDispatch();

  const debouncedSearch = useMemo(
    () =>
      debounce((values: FilterFormValues) => {
        dispatch(
          getAdvertisements({
            page: 1,
            limit: 5,
            ...values,
          }),
        );
      }, 400),
    [dispatch],
  );

  const form = useForm<FilterFormValues>({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      type: undefined,
      propertyType: '',
      areaFrom: undefined,
      areaTo: undefined,
      rooms: undefined,
      priceFrom: undefined,
      priceTo: undefined,
      brand: '',
      model: '',
      yearFrom: undefined,
      yearTo: undefined,
      serviceType: '',
      experienceFrom: undefined,
      costFrom: undefined,
      costTo: undefined,
    },
    onValuesChange: (values) => {
      debouncedSearch(values);
    },
  });

  return { form };
};

export default useFilterForm;
