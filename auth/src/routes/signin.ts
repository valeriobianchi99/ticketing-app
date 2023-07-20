import express, { Request, Response } from 'express';
import { emailPasswordValidation } from '../validations/email-password-validation';
import { validateRequest, BadRequestError } from  '@sgtickets/common';
import { User } from '../models/user';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get(
    '/api/users/signin',
    ...emailPasswordValidation(),
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if(!existingUser) {
            throw new BadRequestError('Invalid credentials');
        }
        const passwordsMatch = await Password.compare(existingUser.password, password);
        if(!passwordsMatch) {
            throw new BadRequestError('Invalid credentials');
        }
        
        const userJwt = jwt.sign({
            id: existingUser.id,
            email: existingUser.email
        },
        process.env.JWT_KEY!);
        req.session = {
            jwt: userJwt
        };

        res.status(201).send(existingUser);  
});

export { router as signinRouter };