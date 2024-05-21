const CONSTANTS = {
  SUCCESS: 'success',
  FAILED: 'failed',
  NODIGITS: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`~!@#$%^&*()_+-=,./?><;\'"[]{}:'
};

export interface Option {
  readonly value: string;
  readonly label: string;
}

export const InterestOptions: readonly Option[] = [
  { value: 'cooking', label: 'Cooking' },
  { value: 'dance', label: 'Dance' },
  { value: 'photography', label: 'Photogrpahy' },
  { value: 'reading', label: 'Reading' },
  { value: 'baking', label: 'Baking' },
  { value: 'video-game', label: 'Video Game' },
  { value: 'drawing', label: 'Drawing' },
  { value: 'gardening', label: 'Gardening' },
  { value: 'blog', label: 'Blog' },
  { value: 'writing', label: 'Writing' },
  { value: 'painting', label: 'Painting' },
  { value: 'art', label: 'Art' },
  { value: 'music', label: 'Music' },
  { value: 'knitting', label: 'Knitting' },
  { value: 'calligraphy', label: 'Calligraphy' },
  { value: 'hiking', label: 'Hiking' },
  { value: 'fishing', label: 'Fishing' },
  { value: 'pottery', label: 'Pottery' },
  { value: 'camping', label: 'Camping' },
  { value: 'yoga', label: 'Yoga' },
  { value: 'travel', label: 'Travel' },
  { value: 'swimming', label: 'Swimming' },
  { value: 'volunteering', label: 'Volunteering' },
];

export default CONSTANTS;
