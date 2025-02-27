export default class AppError extends Error {
    statusCode: number;
    status: string;
    isOperational: boolean;

    constructor(message: string, statusCode: number) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        // property to distinguish b/w simple errors and programming error/bugs
        // to display in client
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}