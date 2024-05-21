import axios, { AxiosError } from 'axios';

import { Group } from '@/lib/validation/group';
import CONSTANTS from '@/config/constants';
import { Job } from '@/lib/validation/job';

const apiUrl = import.meta.env.VITE_BACKEND_API as string;
const adminApi = import.meta.env.VITE_ADMIN_API as string;

export const setFavoriteStatus = async (params) => {
  return new Promise<{ code: string; data?: Group[]; message: string }>(
    (resolve, reject) => {
      console.log("====job_favorite:", params)
      axios
        .post(`${apiUrl}/job/favorite`, params)
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

export const createJob = async (data: Job) => {
  return new Promise<{ code: string; message: string }>((resolve, reject) => {
      axios
          .post(`${apiUrl}/job/store`, data)
          .then((res) => {
              if (res.data.message === CONSTANTS.SUCCESS) {
                  resolve({
                      code: CONSTANTS.SUCCESS,
                      message: 'Saved Successfully'
                  });
              } else {
                  reject({
                      code: CONSTANTS.FAILED,
                      message: res.data.status,
                      errors: res,
                  })
              }
          })
          .catch((err: AxiosError) => {
              console.log('Error while creating job:', err);
              reject({
                  code: CONSTANTS.FAILED,
                  message: err.response
                      ? err.response.status
                      : 'Failed with unknown error.',
                  errors: err.response.data.errors
              })
          })
          .finally(() => {
              reject({
                  code: CONSTANTS.FAILED,
                  message: 'Failed with unknown error.'
              });
          });
  })
}