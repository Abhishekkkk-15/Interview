import mongoose from 'mongoose';
import { type } from 'os';

const exgRate = mongoose.Schema({
    country:{
        type:String
    },
    rate:{
        type:Number
    },
    user:{
        type:String
    }
})
const user = mongoose.Schema({
    userName:{
        type:String,
        unique:true
    },
    password:{
        type:String
    }
})

export const User = mongoose.model('User', user)
export const ExchangeRate = mongoose.model('ExchangeRate', exgRate)