export interface Response<T> {
    message: string,
    statusCode: number,
    success: boolean,
    data: T | {
        id?: string,
        createdAt?: string,
        updatedAt?: string
    }
}

