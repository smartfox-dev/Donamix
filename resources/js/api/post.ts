import axios, { AxiosError } from 'axios';

import { Post } from '@/lib/validation/post';
import { BlogCategoryOption } from '@/lib/types';
import CONSTANTS from '@/config/constants';

const apiUrl = import.meta.env.VITE_BACKEND_API as string;
const adminApi = import.meta.env.VITE_ADMIN_API as string;

export const createPost = async (data: Post) => {
  return new Promise<{ code: string; message: string }>((resolve, reject) => {

    const formData = new FormData();
    formData.append("description", data.description);
    formData.append("video_link", data.video_link);
    formData.append("is_perspective", data.is_perspective);
    formData.append("user_id", data.user_id);
    formData.append("group_id", data.group_id)

    if(data.medias.length > 0){
      for (let index = 0; index < data.medias[0].length; index++) {
        formData.append("files[]", data.medias[0][index]);
      }
    }

    if(data.tags.length > 0){
      for (let index = 0; index < data.tags.length; index++) {
        if( data.tags[index].is_checked){
          formData.append("tags[][name]", data.tags[index]['name']);
        }
      }
    }


    axios
      .post(`${apiUrl}/post/store`, formData, { headers: {'Content-Type': 'multipart/form-data'} })
      .then((res) => {
        if (res.data.message === CONSTANTS.SUCCESS) {
          resolve({
            code: CONSTANTS.SUCCESS,
            data: res.data.data,
            message: 'Posted Successfully!',
          });
        } else {
          reject({
            code: CONSTANTS.FAILED,
            message: res.data.status,
            errors: res,
          });
        }
      })
      .catch((err: AxiosError) => {
        console.log('Error while creating blog:', err);
        reject({
          code: CONSTANTS.FAILED,
          message: err.response
            ? err.response.status
            : 'Failed with unknown error.',
          errors : err.response.data.errors
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

export const updatePost = async (data: Post) => {
  return new Promise<{ code: string; message: string }>((resolve, reject) => {


    const formData = new FormData();
    formData.append("id", data.id);
    formData.append("description", data.description);
    formData.append("video_link", data.video_link);
    formData.append("is_perspective", data.is_perspective);
    formData.append("user_id", data.user_id);

    if(data.new_medias.length > 0){
      for (let index = 0; index < data.new_medias[0].length; index++) {
        formData.append("files[]", data.new_medias[0][index]);
      }
    }

    if(data.tags && data.tags.length > 0){
      for (let index = 0; index < data.tags.length; index++) {
        if( data.tags[index].is_checked){
          formData.append("tags[][name]", data.tags[index]['name']);
        }
      }
    }

    axios
      .post(`${apiUrl}/post/edit/${data.id}`, formData, { headers: {'Content-Type': 'multipart/form-data'} })
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
        console.log('Error while updating blog:', err);
        reject({
          code: CONSTANTS.FAILED,
          message: err.response
            ? err.response.status
            : 'Failed with unknown error.',
          errors : err.response.data.errors
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

export const getPosts = async (params) => {
  return new Promise<{ code: string; data?: Post[]; message: string }>(
    (resolve, reject) => {
      console.log("======group_id:", params)
      axios
        .get(`${apiUrl}/post/getposts`, params)
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

export const getGroupPosts = async (params) => {
  return new Promise<{ code: string; data?: Post[]; message: string }>(
    (resolve, reject) => {
      axios
        .post(`${apiUrl}/post/getgroupposts`, params)
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


export const getPostsByUser = async (username: String) => {
  return new Promise<{ code: string; data?: Post[]; message: string }>(
    (resolve, reject) => {
      axios
        .get(`${apiUrl}/post/getposts/` + username)
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

export const getTimePostsByUser = async (id: Number) => {
    return new Promise<{ code: string; data?: Post[]; message: string }>(
      (resolve, reject) => {
        axios
          .get(`${apiUrl}/post/gettimeposts/` + id)
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


export const getPost = async (uuid: string) => {
  return new Promise<{ code: string; data?: Post[]; message: string }>(
    (resolve, reject) => {
      axios
        .get(`${apiUrl}/post/detail/` + uuid)
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

export const deletePost = async (id: number) => {
  return new Promise<{ code: string; message: string }>((resolve, reject) => {
    axios
      .delete(`${apiUrl}/post/delete/${id}`)
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


export const deletePhoto = async (id: number) => {
  return new Promise<{ code: string; message: string }>((resolve, reject) => {
    axios
      .delete(`${apiUrl}/post/photo/delete/${id}`)
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

export const sharePost = async (id: number) => {
  return new Promise<{ code: string; data?: Post; message: string }>(
    (resolve, reject) => {
      axios
        .get(`${apiUrl}/post/share/${id}`)
        .then((res) => {
          if (res.data.message === CONSTANTS.SUCCESS) {
            resolve({
              code: CONSTANTS.SUCCESS,
              data: res.data.data,
              message: 'Saved Successfully!',
            });
          } else {
            reject({
              code: CONSTANTS.FAILED,
              message: res.data.status,
            });
          }
        })
        .catch((err: AxiosError) => {
          console.log('Error while getting blog by id:', err);
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

export const emoticonPost = async (arg: String, id : number) => {
  return new Promise<{ code: string; message: string }>((resolve, reject) => {
    axios
    .post(`${apiUrl}/post/emoticon`,  {'id' : id, 'type' : arg})
    .then((res) => {
      if (res.data.message === CONSTANTS.SUCCESS) {
        resolve({
          code: CONSTANTS.SUCCESS,
          data: res.data.data,
          message: 'Saved Successfully!',
        });
      } else {
        reject({
          code: CONSTANTS.FAILED,
          message: res.data.status,
          errors: res,
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

export const emoticonGroup = async (arg: String, id : number) => {
  return new Promise<{ code: string; message: string }>((resolve, reject) => {
    console.log("===emoticon", arg, id)
    axios
    .post(`${apiUrl}/group/emoticon`,  {'id' : id, 'type' : arg})
    .then((res) => {
      if (res.data.message === CONSTANTS.SUCCESS) {
        resolve({
          code: CONSTANTS.SUCCESS,
          data: res.data.data,
          message: 'Saved Successfully!',
        });
      } else {
        reject({
          code: CONSTANTS.FAILED,
          message: res.data.status,
          errors: res,
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
