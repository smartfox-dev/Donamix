import axios, {AxiosError} from "axios";
import CONSTANTS from "@/config/constants";
import { formatDate } from "@/lib/utils";

const apiUrl = import.meta.env.VITE_BACKEND_API as string;

export const getAll = async() => {
    return new Promise((resolve, reject) => {
        axios.get(`${apiUrl}/market/all`)
            .then((res) => {
                if(res.data.message === CONSTANTS.SUCCESS) {
                    resolve(res.data.data);
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export const getMarketAll = async() => {
    return new Promise((resolve, reject) => {
        axios.get(`${apiUrl}/market/marketall`)
            .then((res) => {
                if(res.data.message === CONSTANTS.SUCCESS) {
                    resolve(res.data.data);
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export const create = async (data: any) => {
    return new Promise((resolve, reject) => {
        let formData = new FormData();

        formData.append('title', data.title);
        formData.append('price', data.price);
        formData.append('location', data.location);
        formData.append('category', data.category);
        formData.append('condition', data.condition);
        formData.append('description', data.description);
        console.log(data)
        if(data.images.length > 0){
            for (let index = 0; index < data.images.length; index++) {
              formData.append("files[]", data.images[index]);
            }
        }
        console.log(formData)

        axios.post(`${apiUrl}/market/store`, formData, {headers: {'Content-Type': 'multipart/form-data'} })
            .then((res) => {
                if(res.data.message === CONSTANTS.SUCCESS) {
                    resolve(res.data.data);
                }
                else {
                    resolve(res.data)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export const edit = async (data: any) => {
    return new Promise((resolve, reject) => {
        axios.post(`${apiUrl}/market/edit`, data)
            .then((res) => {
                if(res.data.message === CONSTANTS.SUCCESS) {
                    resolve(res.data.data)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export const deleteMarket = async (data: any) => {
    return new Promise((resolve, reject) => {
        axios.post(`${apiUrl}/market/delete`, data)
            .then((res) => {
                if(res.data.message === CONSTANTS.SUCCESS) {
                    resolve(res.data.data);
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export const report = async(data: any) => {
    return new Promise((resolve, reject) => {
        axios.post(`${apiUrl}/market/report`, data)
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

export const marketreport = async(data: any) => {
    return new Promise((resolve, reject) => {
        axios.post(`${apiUrl}/market/marketreport`, data)
            .then((res) => {
                if(res.data.message == CONSTANTS.SUCCESS) {
                    resolve(res.data.message)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}


export const getDetail = async(data: any) => {
    return new Promise((resolve, reject) => {
        axios.post(`${apiUrl}/market/detail`, data)
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
