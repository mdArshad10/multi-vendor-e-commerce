export interface Response<T> {
    message: string,
    statusCode: number,
    success: boolean,
    data: T
}

export interface LoginRequest {
    email: string;
    name: string;
}

export interface VerifyUserRequest extends LoginRequest {
    password: string;
    otp: string;
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
    following: string[];
    followers: string[];
    createdAt: string;
    updatedAt: string;
}