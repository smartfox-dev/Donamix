import axios, { AxiosError } from 'axios';

import { Advertise } from '@/lib/validation/advertise';
import CONSTANTS from '@/config/constants';

const apiUrl = import.meta.env.VITE_BACKEND_API as string;
const adminApi = import.meta.env.VITE_ADMIN_API as string;

export const createAdvertise = async (data: Advertise) => {
    return new Promise<{ code: string; message: string }>((resolve, reject) => {
        axios
            .post(`${apiUrl}/advertise/store`, data)
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
                console.log('Error while creating advertise:', err);
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

export const getFeedData = async () => {
    return new Promise<{ code: string; message: string }>((resolve, reject) => {
        axios
            .post(`${apiUrl}/advertise/feed`)
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
                    })
                }
            })
            .catch((err: AxiosError) => {
                console.log('Error while creating advertise:', err);
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

export const getGroupList = async () => {
    return new Promise<{ code: string; message: string }>((resolve, reject) => {
        axios
            .post(`${apiUrl}/group/list`)
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
                    })
                }
            })
            .catch((err: AxiosError) => {
                console.log('Error while creating advertise:', err);
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

export const getVideoData = async () => {
    return new Promise<{ code: string; message: string }>((resolve, reject) => {
        axios
            .post(`${apiUrl}/advertise/video`)
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
                    })
                }
            })
            .catch((err: AxiosError) => {
                console.log('Error while creating advertise:', err);
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

export const getSidebarData = async () => {
    return new Promise<{ code: string; message: string }>((resolve, reject) => {
        axios
            .post(`${apiUrl}/advertise/sidebar`)
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
                    })
                }
            })
            .catch((err: AxiosError) => {
                console.log('Error while creating advertise:', err);
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