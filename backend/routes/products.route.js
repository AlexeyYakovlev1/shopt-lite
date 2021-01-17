import {Router} from 'express';
import product from '../models/product.model.js';

const router = Router();

router.get('/', (req, res) => {
    try {
        product.find((err, data) => {
            if (err) res.status(400).send(err);
            else res.status(200).send(data);
        })
    } catch (e) {
        console.log(e.message);
    }
})

router.post('/', (req, res) => {
    const products = req.body;

    product.create(products, (err, data) => {
        if (err) res.status(400).send(err)
        else res.status(201).send(data);
    })
})



export default router;