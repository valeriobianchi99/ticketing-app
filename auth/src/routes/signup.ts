import express, { Request, Response} from 'express';
import { body, validationResult } from 'express-validator';
import { emailPasswordValidation } from '../validations/email-password-validation';
import { RequestValidationError } from '../errors/request-validation-error';

const router = express.Router();

router.post(
    '/api/users/signup',
   ...emailPasswordValidation(), 
    (req: Request, res: Response) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            throw new RequestValidationError(errors.array());
        }
        const { email, password } = req.body;
        console.log('Creating a user...');
        res.send({});
        
    }
);

export { router as signupRouter };