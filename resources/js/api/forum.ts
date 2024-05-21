import axios, { AxiosError } from 'axios';

import { Forum, forumValidator } from '@/lib/validation/forum';
import CONSTANTS from '@/config/constants';

const apiUrl = import.meta.env.VITE_BACKEND_API as string;

export const forumAdd = async (data: Forum) => {
    return new Promise<{ code: string; data?: Forum[]; message: string }>(
        (resolve, reject) => {
            axios
                .post(`${apiUrl}/forum/store`, data)
                .then((res) => {
                    if (res.data.message === CONSTANTS.SUCCESS) {
                        resolve({
                            code: CONSTANTS.SUCCESS,
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
}

export const getForums = () => {
    return new Promise((resolve, reject) => {
        axios
            .get(`${apiUrl}/forum/getforum`)
            .then((res) => {
                if (res.data.message === CONSTANTS.SUCCESS) {
                    resolve(res.data.data)
                } throw ('not success')
            })
            .catch((err) => {
                reject(err)
            })
            .finally(() => {
            });
    })

}

export const getDetail = async (data: any) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`${apiUrl}/forum/getdetail`, data)
            .then((res) => {
                if (res.data.message === CONSTANTS.SUCCESS) {
                    resolve(res.data.data)
                } throw ('not success')
            })
            .catch((err) => {
                reject(err)
            })
            .finally(() => {
            });
    })

}

export const deleteForum = async (data: any) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`${apiUrl}/forum/delete`, data)
            .then((res) => {
                if (res.data.message === CONSTANTS.SUCCESS) {
                    resolve(res.data.message)
                } throw ('not success')
            })
            .catch((err) => {
                reject(err)
            })
            .finally(() => {
            });
    })
}

export const getIntro = () => {
    return new Promise((resolve, reject) => {

        axios
            .get(`${apiUrl}/forum/intro`)
            .then((res) => {
                if (res.data.message === CONSTANTS.SUCCESS) {
                    resolve(res.data.data)
                } throw ('not success')
            })
            .catch((err) => {
                reject(err)
            })
            .finally(() => {
            });
    })

}

export const getGuide = () => {
    return new Promise((resolve, reject) => {
        axios
            .get(`${apiUrl}/forum/guide`)
            .then((res) => {
                if (res.data.message === CONSTANTS.SUCCESS) {
                    resolve(res.data.data)
                } throw ('not success')
            })
            .catch((err) => {
                reject(err)
            })
            .finally(() => {
            });
    })
}

export const getEducation = () => {
    return new Promise((resolve, reject) => {
        axios
            .get(`${apiUrl}/forum/education`)
            .then((res) => {
                if (res.data.message === CONSTANTS.SUCCESS) {
                    resolve(res.data.data)
                } throw ('not success')
            })
            .catch((err) => {
                reject(err)
            })
            .finally(() => {
            });
    })
}

export const getContribution = () => {
    return new Promise((resolve, reject) => {
        axios
            .get(`${apiUrl}/forum/contribution`)
            .then((res) => {
                if (res.data.message === CONSTANTS.SUCCESS) {
                    resolve(res.data.data)
                } throw ('not success')
            })
            .catch((err) => {
                reject(err)
            })
            .finally(() => {
            });
    })
}

export const getHelp = () => {
    return new Promise((resolve, reject) => {
        axios
            .get(`${apiUrl}/forum/help`)
            .then((res) => {
                if (res.data.message === CONSTANTS.SUCCESS) {
                    resolve(res.data.data)
                } throw ('not success')
            })
            .catch((err) => {
                reject(err)
            })
            .finally(() => {
            });
    })
}

export const getGeneral = () => {
    return new Promise((resolve, reject) => {
        axios
            .get(`${apiUrl}/forum/general`)
            .then((res) => {
                if (res.data.message === CONSTANTS.SUCCESS) {
                    resolve(res.data.data)
                } throw ('not success')
            })
            .catch((err) => {
                reject(err)
            })
            .finally(() => {
            });
    })
}

export const getFeedback = () => {
    return new Promise((resolve, reject) => {
        axios
            .get(`${apiUrl}/forum/feedback`)
            .then((res) => {
                if (res.data.message === CONSTANTS.SUCCESS) {
                    resolve(res.data.data)
                } throw ('not success')
            })
            .catch((err) => {
                reject(err)
            })
            .finally(() => {
            });
    })
}

export const getRandom = () => {
    return new Promise((resolve, reject) => {
        axios
            .get(`${apiUrl}/forum/random`)
            .then((res) => {
                if (res.data.message === CONSTANTS.SUCCESS) {
                    resolve(res.data.data)
                } throw ('not success')
            })
            .catch((err) => {
                reject(err)
            })
            .finally(() => {
            });
    })
}

export const getChat = () => {
    return new Promise((resolve, reject) => {
        axios
            .get(`${apiUrl}/forum/chat`)
            .then((res) => {
                if (res.data.message === CONSTANTS.SUCCESS) {
                    resolve(res.data.data)
                } throw ('not success')
            })
            .catch((err) => {
                reject(err)
            })
            .finally(() => {
            });
    })
}

export const getMobile = () => {
    return new Promise((resolve, reject) => {
        axios
            .get(`${apiUrl}/forum/mobile`)
            .then((res) => {
                if (res.data.message === CONSTANTS.SUCCESS) {
                    resolve(res.data.data)
                } throw ('not success')
            })
            .catch((err) => {
                reject(err)
            })
            .finally(() => {
            });
    })
}
