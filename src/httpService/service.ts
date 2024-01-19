import axios, { AxiosRequestHeaders } from 'axios';
import { baseUrl } from './config'

export const HTTP = axios.create({ baseURL: baseUrl });
HTTP.interceptors.request.use(
  async (config) => {
    config.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      //'Authorization': `Bearer ${token?.accessToken}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-XSRF-TOKEN',
    } as unknown as AxiosRequestHeaders;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

HTTP.interceptors.response.use(undefined, function (error) {
    
    if (error) {
        const originalRequest = error.config;
        if ((error.response.status === 401 || error.response.status === 403) && !originalRequest._retry) {
            originalRequest._retry = true;
        }
       
    }
    return Promise.reject(error);
});

export function GET(url: string, queryPayload = {}) {
    return HTTP.get(`${baseUrl}${url}`, queryPayload);
}

export function POST(url: string, body: any) {
    return HTTP.post(`${baseUrl}${url}`, body);
}

export function PUT(url: string, body: any) {
    return HTTP.put(`${baseUrl}${url}`, body);
}

export function DELETE(url: string, queryPayload = {}) {
    return HTTP.delete(`${baseUrl}${url}`, queryPayload);
}
