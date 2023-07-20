import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
    public reason: string = 'Error connecting to database';
    public statusCode: number = 500;

    constructor() {
        super('Error connecting to database');

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors() {
        return [
            {
                message: this.reason
            }
        ]
    }
}