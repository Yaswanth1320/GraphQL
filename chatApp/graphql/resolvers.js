// const { Message, User } = require("../models");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const { JWT_SECERT } = require("../config/env.json");
// const { Op } = require("sequelize");

// module.exports = {
//   Query: {
//     users: async () => {
//       const users = await User.findAll();
//       return users;
//     },
//     getUsers: async (parent, args, { user }, info) => {
//       try {
//         if (!user) {
//           throw new Error("Not authenticated");
//         }
//         const users = await User.findAll({
//           where: { email: { [Op.ne]: user.data.email } },
//         });

//         return users;
//       } catch (error) {
//         throw new Error("not authenticated");
//       }
//     },
//     login: async (_, args) => {
//       const { email, password } = args;
//       try {
//         const user = await User.findOne({
//           where: { email },
//         });

//         if (!user) {
//           throw new Error("User not excists");
//         }

//         const correctPassword = await bcrypt.compare(password, user.password);

//         if (!correctPassword) {
//           throw new Error("Invalid password or email");
//         }

//         const token = jwt.sign(
//           {
//             data: { email },
//           },
//           JWT_SECERT,
//           { expiresIn: 60 * 60 }
//         );

//         return {
//           ...user.toJSON(),
//           createdAt: user.createdAt.toISOString(),
//           token,
//         };
//       } catch (error) {
//         console.log(error);
//       }
//     },
//     deleteUser: async (_, args) => {
//       let { id } = args;

//       try {
//         const user = await User.findOne({
//           where: { id },
//         });
//         if (user) {
//           await user.destroy();
//         }
//         return user;
//       } catch (error) {
//         console.log(error);
//       }
//     },
//   },
//   Mutation: {
//     register: async (_, args) => {
//       let { username, email, password, confirmpassword } = args;
//       let errors = {};
//       try {
//         if (email.trim() == "") errors.email = "Email must not be empty";
//         if (username.trim() == "")
//           errors.username = "username must not be empty";
//         if (password.trim() == "")
//           errors.password = "password must not be empty";
//         if (confirmpassword.trim() == "")
//           errors.confirmpassword = "conformpassword must not be empty";

//         if (password != confirmpassword)
//           errors.confirmpassword = "Both password should be same";

//         const userByUsername = await User.findOne({ where: { username } });
//         const userByEmail = await User.findOne({ where: { email } });

//         if (userByUsername) errors.username = "username already excists";
//         if (userByEmail) errors.useremail = "email already excists";

//         if (Object.keys(errors).length > 0) {
//           throw errors;
//         }
//         password = await bcrypt.hash(password, 6);
//         const user = await User.create({
//           username,
//           email,
//           password,
//         });
//         return user;
//       } catch (error) {
//         console.log(error);
//       }
//     },
//     sendMessage: async (parent, { to, content }, { user }) => {
//       try {
//         if (!user) {
//           throw new Error("You need to login first");
//         }

//         const reciever = await User.findOne({ where: { email: to } });

//         if (!reciever) {
//           throw new Error("User not found");
//         } else if (reciever.email === user.data.email) {
//           throw new Error("you cant message to yourself");
//         }

//         if (content.trim() === "") {
//           throw new Error("Content can't be empty");
//         }

//         const message = await Message.create({
//           from: user.data.email,
//           to,
//           content,
//         });

//         return message;
//       } catch (error) {
//         console.log(error);
//       }
//     },
//   },
// };
const { Message,User } = require("../models");
const userResolvers = require('./resolvers/userResolvers.js')
const messageResolvers = require('./resolvers/messageResolvers.js')

module.exports = {
  Message:{
    createdAt: (parent) => parent.createdAt.toISOString()
  },
  Reaction:{
    createdAt: (parent) => parent.createdAt.toISOString(),
    message: async(parent) => await Message.findByPk(parent.messageId),
    user: async(parent) => await User.findByPk(parent.userId),
  },
  User:{
    createdAt: (parent) => parent.createdAt.toISOString()
  },
  Query:{
    ...userResolvers.Query,
    ...messageResolvers.Query
  },
  Mutation:{
    ...userResolvers.Mutation,
    ...messageResolvers.Mutation
  },
  Subscription:{
    ...messageResolvers.Subscription
  }
}