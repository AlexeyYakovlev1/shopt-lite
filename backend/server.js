import express from 'express';
import mongoose from 'mongoose';
import Cors from 'cors';
import bodyParser from 'body-parser';
import session from 'express-session';
import MongoStore from 'connect-mongodb-session';
import productsRoute from './routes/products.route.js';
import searchRoute from './routes/search.route.js';
import authRoute from './routes/auth.route.js';
import userMiddleware from './middlewares/user.middleware.js';
import varsMiddleware from './middlewares/vars.middleware.js';
import profileRoute from './routes/profile.route.js';
import productRoute from './routes/product.route.js';

const app = express();
const PORT = process.env.PORT || 5000;
const URL = 'mongodb+srv://alexey:iBaAQ1jjuRupYic3@cluster0.yzugn.mongodb.net/shopt-app?retryWrites=true&w=majority';

const store = new MongoStore(session)({
    collection: 'sessions',
    uri: URL
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: false,
    store
}));

app.use(Cors());
app.use(userMiddleware);
app.use(varsMiddleware);

app.use('/api/products', productsRoute);
app.use('/search', searchRoute);
app.use('/auth', authRoute);
app.use('/profile', profileRoute);
app.use('/product', productRoute);

// start server
async function start() {
    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });

        app.listen(PORT, () => console.log('server has been started'));
    } catch (e) {
        console.log(e.message);
        process.exit(1);
    }
}

start();