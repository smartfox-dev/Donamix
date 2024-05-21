import axios, { AxiosError } from 'axios';

import CONSTANTS from '@/config/constants';
import { GroupComment } from '@/lib/validation/groupcomment';

const apiUrl = import.meta.env.VITE_BACKEND_API as string;

export const getCommentsByPost = async (postId: string) => {
  return new Promise<{ code: string; data?: Comment[]; message: string }>(
    (resolve, reject) => {
      axios
        .get(`${apiUrl}/post/commentsbypost/${postId}`)
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

export const createOrUpdateComment = async (data: Comment) => {
  return new Promise<{ code: string; data?: Comment; message: string }>(
    (resolve, reject) => {
      axios
        .post(`${apiUrl}/post/comment/store`, data)
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

export const createGroupOrUpdateComment = async (data: GroupComment) => {
  return new Promise<{ code: string; data?: GroupComment; message: string }>(
    (resolve, reject) => {
      axios
        .post(`${apiUrl}/group/comment/store`, data)
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

export const createOrUpdateVideoComment = async (data: Comment) => {
    return new Promise<{ code: string; data?: Comment; message: string }>(
      (resolve, reject) => {
        axios
          .post(`${apiUrl}/video/comment/store`, data)
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

  export const createOrUpdateForumComment = async (data: Comment) => {
    return new Promise<{ code: string; data?: Comment; message: string }>(
      (resolve, reject) => {
        axios
          .post(`${apiUrl}/forum/comment/store`, data)
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


export const deleteComment = async (id: number) => {
  return new Promise<{ code: string; message: string }>((resolve, reject) => {
    axios
      .delete(`${apiUrl}/post/comment/delete/${id}`)
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
        console.log('Error while deleting blog:', err);
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

export const deleteGroupComment = async (id: number) => {
  return new Promise<{ code: string; message: string }>((resolve, reject) => {
    axios
      .delete(`${apiUrl}/group/comment/delete/${id}`)
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
        console.log('Error while deleting blog:', err);
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