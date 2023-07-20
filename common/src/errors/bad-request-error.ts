import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
    public statusCode: number = 400;
    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
    serializeErrors(): { message: string; field?: string | undefined; }[] {
        return [
            {
                message: this.message
            }
        ]
    }
}