/**
 * Platform-independent API Client
 * 
 * A simple wrapper around axios for better error handling and interceptors
 */

import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";



// interface ApiErrorResponse {
//     message: string;
//     errors?: Record<string, string[]>;
//     statusCode?: number;
// }

class ApiClient {
    private axiosInstance: AxiosInstance;

    private isRefreshToken = false;
    private refreshSubscribe: (() => void)[] = [];// store all failed request


    constructor(baseURL: string) {
        this.axiosInstance = axios.create({
            baseURL,
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });

        // Request interceptor - Add auth token
        this.axiosInstance.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem("accessToken");
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Response interceptor - Handle errors
        this.axiosInstance.interceptors.response.use(
            (response) => response,
            async (error: any) => {

                const originalRequest = error.config;
                if (error.response?.status == 401 && !originalRequest?._retry) {
                    if (this.isRefreshToken) {
                        return new Promise((resolve) => {
                            this._subscribeTokenRefresh(() => resolve(this.axiosInstance(originalRequest)))
                        })
                    }
                    originalRequest._retry = true;
                    this.isRefreshToken = true;

                    try {
                        //code
                        await axios.post(`${import.meta.env.BASE_URL}/refresh-token`, {}, { withCredentials: true })
                        this.isRefreshToken = false;
                        this._onRefreshSuccess();
                        return this.axiosInstance(originalRequest);
                    } catch (error: any) {
                        this.isRefreshToken = false;
                        this.refreshSubscribe = [];
                        this._handleLogout();
                        return Promise.reject(error)
                    }
                }
                return Promise.reject(error)
            }

        );
    }

    async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.axiosInstance.get<T>(endpoint, config);
        return response.data;
    }

    async post<T>(endpoint: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.axiosInstance.post<T>(endpoint, data, config);
        return response.data;
    }

    async put<T>(endpoint: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.axiosInstance.put<T>(endpoint, data, config);
        return response.data;
    }

    async patch<T>(endpoint: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.axiosInstance.patch<T>(endpoint, data, config);
        return response.data;
    }

    async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.axiosInstance.delete<T>(endpoint, config);
        return response.data;
    }

    _handleLogout = () => {
        localStorage.removeItem("accessToken");
        if (window.location.pathname == "/login") {
            window.location.href = "/login"
        }
    }

    // handle adding a new access token to queued request
    _subscribeTokenRefresh = (callback: () => void) => {
        this.refreshSubscribe.push(callback)
    }

    // execute queued request after refresh
    _onRefreshSuccess = () => {
        this.refreshSubscribe.forEach((callback) => callback())
        this.refreshSubscribe.length = 0;
    }

}

export const apiClient = new ApiClient(API_BASE_URL);
