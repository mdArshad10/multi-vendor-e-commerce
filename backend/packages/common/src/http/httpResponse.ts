
interface HttpResponseInterface<T> {
    message: string,
    statusCode: number,
    data: T,
    meta?: Record<string, unknown>,
    success: boolean
}

export class HttpResponse<T = unknown> {

    constructor(
        private readonly message: string,
        private readonly statusCode: number,
        private readonly data: T,
        private readonly meta?: Record<string, unknown>,
        private readonly success: boolean = true,
    ) {

    }

    get Success(): boolean {
        return this.statusCode >= 200 && this.statusCode <= 300;
    }

    toJSON(): HttpResponseInterface<T> {
        return {
            message: this.message,
            statusCode: this.statusCode,
            data: this.data,
            success: this.statusCode >= 200 && this.statusCode <= 300,
            ...(this.meta && { meta: this.meta })
        }
    }

    /**
     * 200 OK
     */
    static success<T>(data: T, message = "Success", meta?: Record<string, unknown>): HttpResponse<T> {
        return new HttpResponse(message, 200, data, meta);
    }

    /**
     * 201 Created
     */
    static created<T>(data: T, message = "Created successfully", meta?: Record<string, unknown>): HttpResponse<T> {
        return new HttpResponse(message, 201, data, meta);
    }

    /**
     * 204 No Content
     */
    static noContent(message = "No content"): HttpResponse<null> {
        return new HttpResponse(message, 204, null);
    }

    /**
     * 400 Bad Request
     */
    static badRequest<T = null>(message = "Bad request", data: T = null as T): HttpResponse<T> {
        return new HttpResponse(message, 400, data);
    }

    /**
     * 401 Unauthorized
     */
    static unauthorized<T = null>(message = "Unauthorized", data: T = null as T): HttpResponse<T> {
        return new HttpResponse(message, 401, data);
    }

    /**
     * 403 Forbidden
     */
    static forbidden<T = null>(message = "Forbidden", data: T = null as T): HttpResponse<T> {
        return new HttpResponse(message, 403, data);
    }

    /**
     * 404 Not Found
     */
    static notFound<T = null>(message = "Not found", data: T = null as T): HttpResponse<T> {
        return new HttpResponse(message, 404, data);
    }

    /**
     * 500 Internal Server Error
     */
    static serverError<T = null>(message = "Internal server error", data: T = null as T): HttpResponse<T> {
        return new HttpResponse(message, 500, data);
    }
}