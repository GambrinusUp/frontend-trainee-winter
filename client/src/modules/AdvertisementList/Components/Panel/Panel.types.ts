import { UseFormReturnType } from '@mantine/form';

import { FilterFormValues } from '../../AdvertisementList.types';

export interface PanelProps {
  form: UseFormReturnType<FilterFormValues>;
}
