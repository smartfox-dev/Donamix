import axios, { AxiosError } from 'axios';

import CONSTANTS from '@/config/constants';
import { Comment } from '@/lib/validation/comment';

const apiUrl = import.meta.env.VITE_BACKEND_API as string;

export const getCommentsByBlog = async (blogId: string) => {
  return new Promise<{ code: string; data?: Comment[]; message: string }>(
    (resolve, reject) => {
      axios
        .get(`${apiUrl}/blog/commentsbyblog/${blogId}`)
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
          console.log('Error while getting comments by blog:', err);
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

export const createComment = async (data: Comment) => {
  return new Promise<{ code: string; data?: Comment; message: string }>(
    (resolve, reject) => {
      axios
        .post(`${apiUrl}/blog/addcomment`, data)
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
          console.log('Error while creating comment:', err);
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
