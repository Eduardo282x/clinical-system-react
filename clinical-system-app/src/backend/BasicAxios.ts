/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from "../env/axios-instance";

export const getDataApi = (endpoint: string) => {
    return instance.get(endpoint).then((response: any) => {
        return response.data;
    }).catch(err => {
        console.log(err);
        return err;
    })
}

export const postDataApi = (endpoint: string, data: any) => {
    return instance.post(endpoint, data).then((response) => {
        return response.data;
    }).catch(err => {
        console.log(err);
        return err;
    })
}

export const putDataApi = (endpoint: string, data: any) => {
    return instance.put(endpoint, data).then((response) => {
        return response.data;
    }).catch(err => {
        console.log(err);
        return err;
    })
}