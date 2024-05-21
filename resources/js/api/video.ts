import axios, { AxiosError } from 'axios';

import { Video } from '@/lib/validation/video';
import { BlogCategoryOption } from '@/lib/types';
import CONSTANTS from '@/config/constants';

const apiUrl = import.meta.env.VITE_BACKEND_API as string;
const adminApi = import.meta.env.VITE_ADMIN_API as string;

export const getVideo = async () => {
    return new Promise((resolve, reject) => {
        axios.get(`${apiUrl}/video/store`)
            .then((res) => {
                if (res.data.message == CONSTANTS.SUCCESS) {
                    resolve(res.data.data);
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export const videoCreate = async (data: any) => {
    return new Promise((resolve, reject) => {
        axios.post(`${apiUrl}/video/create`, data)
            .then((res) => {
                if (res.data.message) {
                    resolve(res.data.message)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export const videoEdit = async (data: any) => {
    return new Promise((resolve, reject) => {
        axios.post(`${apiUrl}/video/edit`, data)
            .then((res) => {
                if (res.data.message) {
                    resolve(res.data)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export const videoDelete = async (data: any) => {
    return new Promise((resolve, reject) => {
        axios.post(`${apiUrl}/video/delete`, data)
            .then((res) => {
                if (res.data.message) {
                    resolve(res.data.message)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export const emotionVideo = async (arg: String, id: number) => {
    return new Promise<{ code: string; message: string }>((resolve, reject) => {
        axios
            .post(`${apiUrl}/video/emoticon`, { 'id': id, 'type': arg })
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
}

export const sharePost = async (id: number) => {
    return new Promise<{ code: string; data?: Video; message: string }>(
        (resolve, reject) => {
            axios
                .get(`${apiUrl}/video/share/${id}`)
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

