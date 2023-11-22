const { User } = require('../models')
const bcrypt = require('bcryptjs')
const { UserInputError } = require('@apollo/server')

module.exports =  {
    Query: {
      getUsers: async() => {
         try {
            const users = await User.findAll();
            return users
         } catch (error) {
            console.log(error)
         }
      }
    },
    Mutation:{
        register: async(_,args) =>{
            let { username, email, password, confirmpassword } = args
            let errors = {}
            try {
                if(email.trim() == '') errors.email = "Email must not be empty"
                if(username.trim() == '') errors.username = "username must not be empty"
                if(password.trim() == '') errors.password = "password must not be empty"
                if(confirmpassword.trim() == '') errors.confirmpassword = "conformpassword must not be empty"

                if(password != confirmpassword) errors.confirmpassword = "Both password should be same"

                const userByUsername = await User.findOne({where : {username}});
                const userByEmail = await User.findOne({where : {email}});

                if(userByUsername) errors.username = "username already excists"
                if(userByEmail) errors.useremail = "email already excists"

                if(Object.keys(errors).length > 0){
                    throw errors
                }
                password = await bcrypt.hash(password, 6)
                const user = await User.create({
                    username,
                    email,
                    password
                })
                return user
            } catch (error) {
                console.log(error)
            }
        }
    }
  };