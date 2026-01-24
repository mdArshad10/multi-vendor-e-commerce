export interface Response<T> {
    message: string,
    statusCode: number,
    success: boolean,
    data: T
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface ResponseLoginData {
    data: {
        id: string,
        email: string
    }
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    role?: "customer" | "vendor";
}



export interface User {
    id: string;
    email: string;
    name: string;
    role: "customer" | "vendor" | "admin";
    avatar?: string;
    createdAt: string;
}