import {users,quotes} from './fakedb.js'
import mongoose, { model } from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import { JWT_SECERT } from './config.js';

const User = mongoose.model("User");
const Quote = mongoose.model("Quote");
export const resolvers = {
    Query: {
       users: () => users,
       user:  (_,args) => users.find((ur) => args._id === ur._id),
       quotes: () => quotes,
       iquote: (_,args) => quotes.filter(quote => quote.by === args.by)
    },
    User: {
        quotes: (ur) => quotes.filter(quote => quote.by === ur._id),
    },
    Mutation: {
        addUser: async (_,{userType}) => { 
            const user =await User.findOne({email:userType.email})
            if(user){
                throw new Error("user already exists")
            }
            const hashedpassword = await bcrypt.hash(userType.password,12)

            const newUser = new User({
                ...userType,
                password: hashedpassword
            })
            return await newUser.save()
        },
        signinUser: async(_,{userSignin}) => {
            const user =await User.findOne({email:userSignin.email})
            if(!user){
                throw new Error("Signup to Login")
            }
            const doMatch = await bcrypt.compare(userSignin.password, user.password)
            if(!doMatch){
                throw new Error("email or password is invalid")
            }
            const token = jwt.sign({userId: user._id},JWT_SECERT)
            return {token}
        },
        createQuote: async(_,{name},{userId}) => {
            if(!userId){
                throw new Error('You must be logged in')
            }
            const newQuote= new Quote({
                    name,
                    by:userId
                })
                await newQuote.save()
                return "Quote saved Successfully"
            }
    }
}

