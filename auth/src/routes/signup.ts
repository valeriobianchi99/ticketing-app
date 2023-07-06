import express, { Request, Response} from 'express';
import { validationResult } from 'express-validator';
import { emailPasswordValidation } from '../validations/email-password-validation';
import { RequestValidationError } from '../errors/request-validation-error';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';

import jwt from 'jsonwebtoken';

const router = express.Router();

router.post(
    '/api/users/signup',
   ...emailPasswordValidation(), 
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            throw new RequestValidationError(errors.array());
        }
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            // console.log('Email in use');
            // return res.status(400).send({}); 
            throw new BadRequestError('Email already in use');           
        }
        const user = User.build({ email, password});
        await user.save();

        const userJwt = jwt.sign({
            id: user.id,
            email: user.email
        },
        'asdf');
        req.session = {
            jwt: userJwt
        };

        res.status(201).send(user);  
    }
);

export { router as signupRouter };