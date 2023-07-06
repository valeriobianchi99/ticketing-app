import express, { Request, Response} from 'express';
import { emailPasswordValidation } from '../validations/email-password-validation';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';

import jwt from 'jsonwebtoken';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

router.post(
    '/api/users/signup',
   ...emailPasswordValidation(), 
   validateRequest,
    async (req: Request, res: Response) => {
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
        process.env.JWT_KEY!);
        req.session = {
            jwt: userJwt
        };

        res.status(201).send(user);  
    }
);

export { router as signupRouter };