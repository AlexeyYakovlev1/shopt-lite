import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const user = new Schema({
    name: String,
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    bag: [
    	{
            img: String,
    		name: String,
    		price: Number,
    		description: String
    	}
    ]
})

export default model('user', user);