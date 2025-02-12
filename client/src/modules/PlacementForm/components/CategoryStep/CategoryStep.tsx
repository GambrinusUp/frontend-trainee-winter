import { UseFormReturnType } from '@mantine/form';

import { AdvertisementType } from '../../../../shared/types';
import { FormValues } from '../../PlacementForm.types';
import AutoForm from '../AutoForm/AutoForm';
import RealtyForm from '../RealtyForm/RealtyForm';
import ServicesForm from '../ServicesForm/ServicesForm';

const CategoryStep = ({ form }: { form: UseFormReturnType<FormValues> }) => {
  const type = form.getValues().type;

  switch (type) {
    case AdvertisementType.RealEstate:
      return <RealtyForm form={form} />;
    case AdvertisementType.Auto:
      return <AutoForm form={form} />;
    case AdvertisementType.Services:
      return <ServicesForm form={form} />;
    default:
      return <>Категория не выбрана</>;
  }
};

export default CategoryStep;
