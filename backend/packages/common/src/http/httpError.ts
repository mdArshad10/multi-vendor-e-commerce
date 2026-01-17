
class ErrorHandler extends Error {
    constructor(
        public readonly message: string,
        public readonly statusCode: number,
        private readonly isOperational: boolean = true,
        private readonly details?: any,
    ) {
        super(message);
        this.name = "HttpError";
        

        Error.captureStackTrace(this, this.constructor);
    }
}


// =========== common Errors ===========
// 1. Not found
class NotFoundError extends ErrorHandler {
    constructor(message = 'Resource not found') {
        super(message, 400);
    }
}

// 2. Validation Error
class ValidationError extends ErrorHandler {
    constructor(message = 'Invalid request data', details?: any) {
        super(message, 400, true, details);
    }
}

// 3. Auth
class AuthError extends ErrorHandler {
    constructor(message = 'Unauthorize') {
        super(message, 401);
    }
}

// 4. Forbidden Error
class ForbiddenError extends ErrorHandler {
    constructor(message = 'Forbidden access') {
        super(message, 403);
    }
}

// 5. Database Error
class DatabaseError extends ErrorHandler {
    constructor(message = 'Database Error', details?: any) {
        super(message, 500, true, details);
    }
}

// 6. RateLimit Error
class RateLimitError extends ErrorHandler {
    constructor(message = 'Too many request, pls try again later') {
        super(message, 429);
    }
}

export {
    ErrorHandler,
    NotFoundError,
    ValidationError,
    AuthError,
    ForbiddenError,
    DatabaseError,
    RateLimitError,
};

