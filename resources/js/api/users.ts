import axios, { AxiosError } from 'axios';

import CONSTANTS from '@/config/constants';
import { User } from '@/lib/validation/user';
import { Blog } from '@/lib/validation/blog';

const apiUrl = import.meta.env.VITE_BACKEND_API as string;
const adminApi = import.meta.env.VITE_ADMIN_API as string;

export const updateUser = async (id: number, user: User) => {
    try {
        const res = await axios.put(`${apiUrl}/users/edit/${id}`, user);

        if (res.data.message === CONSTANTS.SUCCESS) {
            return {
                code: CONSTANTS.SUCCESS,
                message: 'Updated Successfully!',
            };
        } else {
            return {
                code: CONSTANTS.FAILED,
                message: res.data.status,
            };
        }
    } catch (err) {
        console.log('Error while getting user info:', err);
        return {
            code: CONSTANTS.FAILED,
            message: err,
        };
    }
};

export const changePassword = async (
    oldPassword: string,
    newPassword: string
) => {
    return new Promise<{ code: string; message: string }>((resolve, reject) => {
        axios
            .post(`${apiUrl}/users/changepassword`, {
                old_password: oldPassword,
                new_password: newPassword,
            })
            .then((res) => {
                if (res.data.message === CONSTANTS.SUCCESS) {
                    resolve({
                        code: CONSTANTS.SUCCESS,
                        message: 'Changed successfully!',
                    });
                } else {
                    console.log(res);
                    reject({
                        code: CONSTANTS.FAILED,
                        message: 'The old password is incorrect!',
                    });
                }
            })
            .catch((err: AxiosError) => {
                console.log('Error while changing the password:', err);
                reject({
                    code: CONSTANTS.FAILED,
                    message: 'Fields required!',
                });
            });
    });
};

export const getInterests = async () => {
    return new Promise<{ code: string; message: string }>((resolve, reject) => {
        axios
            .post(`${adminApi}/interests`)
            .then((res) => {
                if (res.data.message === CONSTANTS.SUCCESS) {
                    resolve({
                        code: CONSTANTS.SUCCESS,
                        message: 'Changed successfully!',
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
                console.log('Error while changing the password:', err);
                reject({
                    code: CONSTANTS.FAILED,
                    message: err.response
                        ? err.response.status
                        : 'Failed with unknown error.',
                });
            });
    });
};

export const getProfile = async (username: string) => {
    return new Promise<{ code: string; data?: User; message: string }>(
        (resolve, reject) => {
            axios
                .get(`${apiUrl}/profile/` + username)
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

export const getIDProfile = async (id: Number) => {
    return new Promise<{ code: string; data?: User; message: string }>(
        (resolve, reject) => {
            axios
                .get(`${apiUrl}/profile/id/` + id)
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


export const changeStatusFriend = async (id: number, status: Number) => {
    return new Promise<{ code: string; data?: User; message: string }>(
        (resolve, reject) => {
            axios
                .get(`${apiUrl}/profile/changeStatus/` + id + `/` + status)
                .then((res) => {
                    if (res.data.success === CONSTANTS.SUCCESS) {
                        resolve({
                            code: CONSTANTS.SUCCESS,
                            data: res.data.data,
                            message: res.data.message,
                        });
                    } else {
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



export const connectUser = async (id: number, username: String) => {
    try {
        const res = await axios.post(`${apiUrl}/profile/connect`, {
            from: id,
            username: username,
        });

        if (res.data.message === CONSTANTS.SUCCESS) {
            return {
                code: CONSTANTS.SUCCESS,
                message: 'Updated Successfully!',
            };
        } else {
            return {
                code: CONSTANTS.FAILED,
                message: res.data.status,
            };
        }
    } catch (err) {
        console.log('Error while getting user info:', err);
        return {
            code: CONSTANTS.FAILED,
            message: err,
        };
    }
};

export const connectCancel = async (id: number, username: String) => {
    try {
        const res = await axios.post(`${apiUrl}/profile/connect_cancel`, {
            from: id,
            username: username,
        });

        if (res.data.message === CONSTANTS.SUCCESS) {
            return {
                code: CONSTANTS.SUCCESS,
                message: 'Updated Successfully!',
            };
        } else {
            return {
                code: CONSTANTS.FAILED,
                message: res.data.status,
            };
        }
    } catch (err) {
        console.log('Error while getting user info:', err);
        return {
            code: CONSTANTS.FAILED,
            message: err,
        };
    }
};

export const getFriends = async () => {
    return new Promise<{ code: string; data?: User[]; message: string }> (
        (resolve, reject) => {
            axios.get(`${apiUrl}/users/friends`)
                .then((res) => {
                    if(res.data.message === CONSTANTS.SUCCESS) {
                        resolve({
                            code: CONSTANTS.SUCCESS,
                            data: res.data.data,
                            message: res.data.message
                        });
                    }
                    else{
                        reject({
                            code: CONSTANTS.FAILED,
                            message: res.data.status
                        });
                    }
                })
                .catch((err: AxiosError) => {
                    console.log('Error while user:', err);
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
    )
}

export const unFriend = async (data: any) => {
    return new Promise (
        (resolve, reject) => {
            axios.post(`${apiUrl}/users/unfriend`, data)
                .then((res) => {
                    if(res.data.message === CONSTANTS.SUCCESS) {
                        resolve({
                            code: CONSTANTS.SUCCESS,
                            message: res.data.message,
                            data: res.data.data
                        });
                    }
                    else{
                        reject({
                            code: CONSTANTS.FAILED
                        });
                    }
                })
                .catch((err: AxiosError) => {
                    console.log('Error while user:', err);
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
    )
}

export const getAll = async () => {
    return new Promise<{ code: string; data?: User[]; message: string }> (
        (resolve, reject) => {
            axios.get(`${apiUrl}/search/users/all`)
                .then((res) => {
                    if(res.data.message === CONSTANTS.SUCCESS) {
                        resolve({
                            code: CONSTANTS.SUCCESS,
                            data: res.data.data,
                            message: res.data.message
                        });
                    }
                    else{
                        reject({
                            code: CONSTANTS.FAILED,
                            message: res.data.status
                        });
                    }
                })
                .catch((err: AxiosError) => {
                    console.log('Error while user:', err);
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
    )
}

export const getGroupAll = async (data:any) => {
    return new Promise(
        (resolve, reject) => {
            axios.post(`${apiUrl}/search/users/groupall`, data)
                .then((res) => {
                    if(res.data.message === CONSTANTS.SUCCESS) {
                        resolve(res.data);
                    }
                    else{
                        reject(res.data.message);
                    }
                })
                .catch((err: AxiosError) => {
                    console.log('Error while user:', err);
                    reject(err.response);
                })
                .finally(() => {
                    reject('Failed with unknown error.');
                });
        }
    )
}

export const getSearchName = async(data: any) => {
    return new Promise (
        (resolve, reject) => {
            axios.post(`${apiUrl}/search/users`, data)
                .then((res) => {
                    if(res.data.message === CONSTANTS.SUCCESS) {
                        resolve({
                            code: CONSTANTS.SUCCESS,
                            data: res.data.data,
                            message: res.data.message
                        });
                    }
                    else{
                        reject({
                            code: CONSTANTS.FAILED,
                            message: res.data.status
                        });
                    }
                })
                .catch((err: AxiosError) => {
                    console.log('Error while user:', err);
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
    )
}

export const getUpdated = async () => {
    return new Promise<{code: string; data?: User[]; message: string}> (
        (resolve, reject) => {
            axios.get(`${apiUrl}/search/updated_profile`)
            .then((res) => {
                if(res.data.message === CONSTANTS.SUCCESS) {
                    resolve({
                        code: CONSTANTS.SUCCESS,
                        data: res.data.data,
                        message: res.data.message
                    });
                }
                else{
                    reject({
                        code: CONSTANTS.FAILED,
                        message: res.data.status
                    });
                }
            })
            .catch((err: AxiosError) => {
                console.log('Error while user:', err);
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
    )
}

export const getPost = async () => {
    return new Promise<{code: string; data?: Blog[]; message: string}> (
        (resolve, reject) => {
            axios.get(`${apiUrl}/search/blogs/all`)
            .then((res) => {
                if(res.data.message === CONSTANTS.SUCCESS) {
                    resolve({
                        code: CONSTANTS.SUCCESS,
                        data: res.data.data,
                        message: res.data.message
                    });
                }
                else{
                    reject({
                        code: CONSTANTS.FAILED,
                        message: res.data.status
                    });
                }
            })
            .catch((err: AxiosError) => {
                console.log('Error while user:', err);
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
    )
}

export const getPostByUser = async (data:any) => {
    return new Promise((resolve, reject) => {
        axios.post(`${apiUrl}/search/blogs`, data)
            .then((res) => {
                if(res.data.message == CONSTANTS.SUCCESS) {
                    resolve(res.data.data)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export const sendReport = async (data: any) => {
    try {
        const res = await axios.post(`${apiUrl}/users/report`, data)
        return res.data;
    } catch (err) {
        console.log(err);

    }
}

export const sendBlock = async (data: any) => {
    try {
        const res = await axios.post(`${apiUrl}/users/block`, data)
        return res.data;
    } catch (err) {
        console.log(err);

    }
}

export const blockedMember = async () => {
    return new Promise((resolve, reject) => {
        axios.get(`${apiUrl}/users/blockedMember`)
            .then((res) => {
                console.log(res)
                if(res.data.message == CONSTANTS.SUCCESS) {
                    resolve(res.data.data)
                }
                throw('Not success')
            })
            .catch((err) => {
                reject(err)
            })
            .finally(() => {})
    })
}

export const unblock = async (data: any) => {
    try {
        const res = await axios.post(`${apiUrl}/users/unblock`, data)
        return res.data;
    } catch (err) {
        console.log(err);

    }
}

export const nearbyMember = async () => {
    return new Promise((resolve, reject) => {
        axios.get(`${apiUrl}/search/nearby`)
            .then((res) => {
                console.log(res)
                if(res.data.message == CONSTANTS.SUCCESS) {
                    resolve(res.data.data)
                }
                throw('Not success')
            })
            .catch((err) => {
                reject(err)
            })
            .finally(() => {})
    })
}

export const nearbyUpdatedMember = async () => {
    return new Promise((resolve, reject) => {
        axios.get(`${apiUrl}/search/nearby/updated`)
            .then((res) => {
                console.log(res)
                if(res.data.message == CONSTANTS.SUCCESS) {
                    resolve(res.data.data)
                }
                throw('Not success')
            })
            .catch((err) => {
                reject(err)
            })
            .finally(() => {})
    })
}

export const sendKick = async(data:any) => {
    return new Promise((resolve, reject) => {
        axios.post(`${apiUrl}/chat/kick`, data)
            .then((res) => {
                if(res.data.message === CONSTANTS.SUCCESS) {
                    resolve(res.data.message);
                }
                else {
                    reject(res.data);
                }
            })
            .catch((err) => {
                reject(err);
            })
    })
}

export const sendMute = async(data: any) => {
    return new Promise((resolve, reject) => {
        axios.post(`${apiUrl}/chat/mute`, data)
            .then((res) => {
                if(res.data.message === CONSTANTS.SUCCESS) {
                    resolve(res.data.message);
                }
                else {
                    reject(res.data);
                }
            })
            .catch((err) => {
                reject(err);
            })
    })
}

export const sendUnMute = async(data: any) => {
    return new Promise((resolve, reject) => {
        axios.post(`${apiUrl}/chat/unmute`, data)
            .then((res) => {
                if(res.data.message === CONSTANTS.SUCCESS) {
                    resolve(res.data.message);
                }
                else {
                    reject(res.data);
                }
            })
            .catch((err) => {
                reject(err);
            })
    })
}

export const getChatMember = async() => {
    return new Promise((resolve, reject) => {
        axios.get(`${apiUrl}/chat/chatmember`)
            .then((res) => {
                if(res.data.message === CONSTANTS.SUCCESS) {
                    resolve(res.data.data);
                }
                else {
                    reject(res.data.message);
                }
            })
            .catch((err) => {
                reject(err);
            })
    })
}

export const sendBot = async() => {
    return new Promise((resolve, reject) => {
        axios.get(`${apiUrl}/chat/access_bot`)
            .then((res) => {
                if(res.data.message === CONSTANTS.SUCCESS) {
                    resolve(res.data.message);
                }
                else {
                    reject(res.data.message);
                }
            })
            .catch((err) => {
                reject(err);
            })
    })
}

export const mailDelete = async(data: any) => {
    return new Promise((resolve, reject) => {
        axios.post(`${apiUrl}/chat/mail_delete`, data)
            .then((res) => {
                if(res.data.message === CONSTANTS.SUCCESS) {
                    resolve(res.data.message);
                }
                else {
                    reject(res.data.message);
                }
            })
            .catch((err) => {
                reject(err);
            })
    })
}
