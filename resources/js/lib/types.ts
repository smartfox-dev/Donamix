export type DateType = {
  yy: number;
  mm: number;
  dd: number;
};

export type EducationType = {
  university: string;
  lastName: string;
  from: number;
  to: number;
  description: string;
};

export type ExperienceType = {
  company: string;
  position: string;
  from: number;
  to: number;
  location: string;
  description: string;
};

export type UserSettingType = {
  is_enable_friend_request: boolean;
  is_enable_private_message: boolean;
  is_enable_tagging: boolean;
  is_enable_private_profile: boolean;
  is_activate_account: boolean;
  is_remove_ads: boolean;
};

export type UserType = {
  name: string;
  username: string;
  email: string;
  image?: string;
  gender: 'Male' | 'Female';
  country: string;
  city: string;
  birthday: DateType;
  status: string;
  description: string;
  credit: number;
  otp_time: string;
  education?: EducationType;
  experience?: ExperienceType;
  interests?: string[];
  setting?: UserSettingType;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
};

export type AlbumType = {
  _id?: string;
  title: string;
  description: string;
}

export interface BlogCategoryOption {
  readonly _id: string;
  readonly name: string;
}