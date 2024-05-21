import axios, { AxiosError } from 'axios';

import { BlogCategoryOption } from '@/lib/types';
import CONSTANTS from '@/config/constants';

const apiUrl = import.meta.env.VITE_BACKEND_API as string;
const adminApi = import.meta.env.VITE_ADMIN_API as string;

export type BirthdayMember = {
    avatar: string;
    firstName: string;
    lastName: string;
    role: string;
    // birthdate: Date;
  };

export const getBirthdayMembers = async () => {
  return new Promise<{ code: string; data?: BirthdayMember[]; message: string }>(
    (resolve, reject) => {
      axios
        .get(`${apiUrl}/getbirthdays`)
        .then((res) => {
          if (res.data.message === CONSTANTS.SUCCESS) {
            resolve({
              code: CONSTANTS.SUCCESS,
              data: res.data.data,
              message: 'Saved Successfully!',
            });
          } else {
            console.log(res);
            reject({
              code: CONSTANTS.FAILED,
              message: res.data.status,
            });
          }
        })
        .catch((err: AxiosError) => {
          console.log('Error while fetching blog:', err);
          reject({
            code: CONSTANTS.FAILED,
            message: err.response
              ? err.response.status
              : 'Failed with unknown error.',
          });
        })
        .finally(() => {
          reject({
            code: CONSTANTS.FAILED,
            message: 'Failed with unknown error.',
          });
        });
    }
  );
};