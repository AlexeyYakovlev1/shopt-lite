import {Router} from 'express';
import product from '../models/product.model.js';
import user from '../models/user.model.js';

const router = Router();

// add products to bag page for users
router.post('/add/bag/:id', async(req, res) => {
    try {
    	const {img, name, price, description, id} = await req.body;
        const findUser = await user.findById(req.params.id);

        await user.updateOne({
        	name: findUser.name,
		    email: findUser.email,
		    password: findUser.password
        }, 
        {$push: {bag: {$each: [{img, name, price, description, _id: id}], $position: 0}}});

        res.redirect('/bag/'+findUser._id);
    } catch (e) {
    	console.log(e.message);
    }
})

// give api for front end
router.get('/api/bag', async(req, res) => {
	try {
		user.find((err) => {
			if (err) res.status(400).send(err);
			else res.status(200).send(req.user.bag);
		})
	} catch (e) {
		console.log(e.message);
	}
})

// delete products from bag
router.post('/delete/:id', async(req, res) => {
    try {
        const deleteProduct = await product.findById(req.params.id);

        await user.updateOne({}, {$pull: {bag: {_id: deleteProduct}}});

        res.redirect('/');
    } catch (e) {
        console.log(e.message);
    }
})

export default router;