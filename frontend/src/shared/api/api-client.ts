/**
 * Platform-independent API Client
 * 
 * A simple wrapper around axios for better error handling and interceptors
 */

import axios, { AxiosError } from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

interface ApiErrorResponse {
    message: string;
    errors?: Record<string, string[]>;
    statusCode?: number;
}

class ApiClient {
    private axiosInstance: AxiosInstance;

    constructor(baseURL: string) {
        this.axiosInstance = axios.create({
            baseURL,
            headers: {
                "Content-Type": "application/json",
            },
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
            (error: AxiosError<ApiErrorResponse>) => {
                if (error.response) {
                    // Server responded with error
                    const message = error.response.data?.message || error.message;
                    throw new Error(message);
                } else if (error.request) {
                    // Request made but no response
                    throw new Error("No response from server");
                } else {
                    // Request setup error
                    throw new Error(error.message);
                }
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
}

export const apiClient = new ApiClient(API_BASE_URL);
