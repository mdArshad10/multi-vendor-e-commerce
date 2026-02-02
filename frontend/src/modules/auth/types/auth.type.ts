
export interface RegisterRequest {
    email: string;
    name: string;
}

export interface LoginRequest {
    email: string;
    password: string;
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

export interface SellerUser {
    country: string;
    email: string;
    followers: string[] | [];
    following: string[] | [];
    id: string;
    name: string;
    phone_number: string;
    stripId: string | null;
    updatedAt: string;
    createdAt: string;
}
