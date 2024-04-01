import axios, { AxiosError, AxiosPromise } from "axios";
import IRequestParams from "../../interfaces/IRequestParams";

const api = axios.create({
    baseURL: 'http://localhost:8080/'
})


export const getRequest = async (route: string, query: IRequestParams<unknown> | null = null, apiUse = api): AxiosPromise => {
    try {
        const response = await apiUse.get(`${route}`,
            {
                params: {
                    ...query
                }
            });

        return response;
    } catch (error) {
        throw (error as AxiosError);
    }
};

export const postRequest = async <T>(route: string, body: T | null = null, apiUse = api): AxiosPromise => {
    try {
      const response = await apiUse.post(`${route}`, body);
  
      return response;
    } catch (error) {
      throw (error as AxiosError);
    }
  };

  export const putRequest = async <T>(route: string, body: T | null = null, apiUse = api): AxiosPromise => {
    try {
      const response = await apiUse.put(`${route}`, body);
  
      return response;
    } catch (error) {
      throw (error as AxiosError);
    }
  };

  export const deleteRequest = async (route: string, apiUse = api): AxiosPromise => {
    try {
      const response = await apiUse.delete(`${route}`);
  
      return response;
    } catch (error) {
      throw (error as AxiosError);
    }
  };