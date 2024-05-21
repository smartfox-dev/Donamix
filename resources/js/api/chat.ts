import axios, { AxiosError } from 'axios';

import CONSTANTS from '@/config/constants';

const apiUrl = import.meta.env.VITE_BACKEND_API as string;

export const getComment = async (data: any) => {
    return new Promise(
        (resolve, reject) => {
            axios
                .post(`${apiUrl}/chat/all`, data)
                .then((res) => {
                    if (res.data.message === CONSTANTS.SUCCESS) {
                        resolve(res.data.data);
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

export const getPrivateRoom = async (data: any) => {
    return new Promise(
        (resolve, reject) => {
            axios.post(`${apiUrl}/chat/private_room`, data)
                .then((res) => {
                    if (res.data.message === CONSTANTS.SUCCESS) {
                        resolve(res.data.data);
                    } else {
                        console.log(res);
                        reject({
                            code: CONSTANTS.FAILED,
                            message: res.data.message,
                        });
                    }
                })
                .catch((err: AxiosError) => {
                    console.log('Error while getting my albums:', err);
                    reject({
                        code: CONSTANTS.FAILED,
                        message: err.response
                            ? err.response.message
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
    )
}

export const getPrivateChat = async (data: any) => {
    return new Promise(
        (resolve, reject) => {
            axios
                .post(`${apiUrl}/chat/private`, data)
                .then((res) => {
                    if (res.data.message === CONSTANTS.SUCCESS) {
                        resolve(res.data.data);
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

export const getList = async () => {
    return new Promise(
        (resolve, reject) => {
            axios
                .get(`${apiUrl}/chat/roomlist`)
                .then((res) => {
                    if (res.data.message === CONSTANTS.SUCCESS) {
                        resolve(res.data.data);
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

export const getRoomName = async (data: any) => {
    return new Promise((resolve, reject) => {
        axios.post(`${apiUrl}/chat/roomname`, data)
            .then((res) => {
                if (res.data.message === CONSTANTS.SUCCESS) {
                    resolve(res.data.data);
                }
                throw ('res.data.message is not success')
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export const roomReg = async (data: any) => {
    return new Promise((resolve, reject) => {
        axios.post(`${apiUrl}/chat/roomReg`, data)
            .then((res) => {
                if (res.data.message === CONSTANTS.SUCCESS) {
                    resolve(res.data.message);
                }
                throw ('Reg Room is not success')
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export const kickroom = async (data: any) => {
    return new Promise((resolve, reject) => {
        axios.post(`${apiUrl}/chat/kickroom`, data)
            .then((res) => {
                if (res.data.message === CONSTANTS.SUCCESS) {
                    resolve(res.data.message);
                }
                throw ('you are kicked')
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export const roomOut = async () => {
    return new Promise((resolve, reject) => {
        axios.get(`${apiUrl}/chat/roomOut`)
            .then((res) => {
                if (res.data.message === CONSTANTS.SUCCESS) {
                    resolve(res.data.message);
                }
                throw ('Reg Room is not success')
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export const logout = async () => {
    return new Promise((resolve, reject) => {
        axios.get(`${apiUrl}/chat/logout`)
            .then((res) => {
                if (res.data.message === CONSTANTS.SUCCESS) {
                    resolve(res.data.message);
                }
                throw ('Reg Room is not success')
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export const roomMember = async () => {
    return new Promise((resolve, reject) => {
        axios.get(`${apiUrl}/chat/room_member`)
            .then((res) => {
                if (res.data.message === CONSTANTS.SUCCESS) {
                    resolve(res.data.data);
                }
                throw ('Reg Room is not success')
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export const chatSent = async () => {
    return new Promise((resolve, reject) => {
        axios.get(`${apiUrl}/chat/chatsent`)
            .then((res) => {
                if (res.data.message === CONSTANTS.SUCCESS) {
                    resolve(res.data.data);
                }
                throw ('Reg Room is not success')
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export const chatRead = async () => {
    return new Promise((resolve, reject) => {
        axios.get(`${apiUrl}/chat/chatread`)
            .then((res) => {
                if (res.data.message === CONSTANTS.SUCCESS) {
                    resolve(res.data.data);
                }
                throw ('Reg Room is not success')
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export const chatUnRead = async () => {
    return new Promise((resolve, reject) => {
        axios.get(`${apiUrl}/chat/chatunread`)
            .then((res) => {
                if (res.data.message === CONSTANTS.SUCCESS) {
                    resolve(res.data.data);
                }
                throw ('Reg Room is not success')
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export const chatDelete = async (data: any) => {
    return new Promise((resolve, reject) => {
        axios.post(`${apiUrl}/chat/delete`, data)
            .then((res) => {
                if (res.data.message === CONSTANTS.SUCCESS) {
                    resolve(res.data.message);
                }
                throw ('Reg Room is not success')
            })
            .catch((err) => {
                reject(err)
            })
    })
}
