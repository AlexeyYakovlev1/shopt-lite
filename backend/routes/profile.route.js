import {Router} from 'express';
import user from '../models/user.model.js';

const router = Router();

// user page (profile)
router.get('/:id', async(req, res) => {
    try {
        if (req.user) {
            const findUser = await user.findById(req.params.id);
        
            console.log(findUser);
        }
    } catch (e) {
        console.log(e.message);
    }
});

// api user
router.get('/api/user', (req, res) => {
    try {
        res.status(200).send(req.user);
    } catch (e) {
        console.log(e.message);
    }
})

export default router;