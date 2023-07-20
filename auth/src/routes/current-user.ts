import express from 'express';
import { currentUser, requireAuth } from '@sgtickets/common';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, requireAuth,  (req, res) => {
    res.send({
        currentUser: req.currentUser
    })
});

export { router as currentUserRouter };