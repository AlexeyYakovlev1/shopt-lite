import {Router} from 'express';
import product from '../models/product.model.js';

const router = Router();

router.post('/', (req, res) => {
    product.find(async(err, data) => {
        if (err) res.status(400).send(err);
        else {
            if (req.body.q) {
                const newData = await data.filter(item => item.name.toLowerCase().search(req.body.q.trim().toLowerCase()) !== -1);
    
                res.status(200).send(newData);
            }
        }
    })
})

export default router;