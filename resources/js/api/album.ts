import axios, { AxiosError } from 'axios';

import { Album } from '@/lib/validation/album';
import CONSTANTS from '@/config/constants';

const apiUrl = import.meta.env.VITE_BACKEND_API as string;

export const getMyAlbums = async () => {
  return new Promise<{ code: string; data?: Album[]; message: string }>(
    (resolve, reject) => {
      axios
        .get(`${apiUrl}/users/getalbums`)
        .then((res) => {
          if (res.data.message === CONSTANTS.SUCCESS) {
            resolve({
              code: CONSTANTS.SUCCESS,
              data: res.data.data,
              message: 'Success',
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
          console.log('Error while getting my albums:', err);
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

export const createAlbum = async (data: Album) => {
  return new Promise<{ code: string; message: string }>((resolve, reject) => {
    axios
      .post(`${apiUrl}/users/createalbum`, data)
      .then((res) => {
        if (res.data.message === CONSTANTS.SUCCESS) {
          resolve({
            code: CONSTANTS.SUCCESS,
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
        console.log('Error while creating album:', err);
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
  });
};

export const editAlbum = async (id: string, data: Album) => {
  return new Promise<{ code: string; message: string }>((resolve, reject) => {
    axios
      .post(`${apiUrl}/users/editalbum/${id}`, data)
      .then((res) => {
        if (res.data.message === CONSTANTS.SUCCESS) {
          resolve({
            code: CONSTANTS.SUCCESS,
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
        console.log('Error while edit album:', err);
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
  });
};

export const deleteAlbum = async (id: any) => {
  return new Promise<{ code: string; message: string }>((resolve, reject) => {
    axios
      .delete(`${apiUrl}/users/deletealbum/${id}`)
      .then((res) => {
        if (res.data.message === CONSTANTS.SUCCESS) {
          resolve({
            code: CONSTANTS.SUCCESS,
            message: 'Deleted Successfully!',
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
        console.log('Error while edit album:', err);
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
  });
};
