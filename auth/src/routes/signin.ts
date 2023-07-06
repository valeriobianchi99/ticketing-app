import express, { Request, Response } from 'express';
import { emailPasswordValidation } from '../validations/email-password-validation';
import { validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';

const router = express.Router();

router.get(
    '/api/users/signin',
    ...emailPasswordValidation(),
    (req: Request, res: Response) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            throw new RequestValidationError(errors.array());
        }
});

export { router as signinRouter };