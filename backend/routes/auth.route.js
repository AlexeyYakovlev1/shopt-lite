import {Router} from 'express';
import user from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

const router = Router();

// register
router.post('/register', async(req, res) => {
    try {
        const {name, email, password} = req.body;
        const userFind = await user.findOne({email});

        if (!userFind) {
            const hashPassword = await bcryptjs.hash(password, 10);

            const newUser = new user({
                name: name,
                email: email,
                password: hashPassword
            });

            await newUser.save();

            console.log('пользователь успешно зарегистрировался!')
            res.redirect('/auth');
        } else {
            console.log('Такой пользователь уже существует!')
            res.status(400).send({message: 'Такой пользователь уже существует!'});
        }
    } catch (e) {
        console.log(e.message);
    }
})

// login
router.post('/login', async(req, res) => {
    try {
        const {email, password} = req.body;
        const userFind = await user.findOne({email});

        if (userFind) {
            const comparePassword = await bcryptjs.compare(password, userFind.password);

            if (comparePassword) {
                req.session.user = userFind;
                req.session.auth = true;

                await req.session.save(async(err) => {
                    if (err) {
                        throw err;
                    }

                    console.log('пользователь успешно вошел!')
                    res.redirect('/profile/'+userFind._id);
                })
            } else {
                console.log('данные неверны!')
                res.status(400).send({message: 'Данные неверны!'});
            }
        } else {
            console.log('Такого пользователя не существует!')
            res.status(400).send({message: 'Такого пользователя не существует!'});
        }

    } catch (e) {
        console.log(e.message);
    }
})

// logout
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    })
})

export default router;