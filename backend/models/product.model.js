import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const product = new Schema({
    img: String,
    name: String,
    description: String,
    price: Number
})

export default model('product', product);