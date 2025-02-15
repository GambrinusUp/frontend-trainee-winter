import { AdvertisementType } from '../../../../shared/types';

export interface PanelProps {
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void;
  selectedCategory: AdvertisementType | '';
  onCategoryChange: (value: AdvertisementType | '') => void;
}
