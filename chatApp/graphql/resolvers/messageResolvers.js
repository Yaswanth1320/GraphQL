const { Message, User } = require("../../models");
const { Op } = require('sequelize')

module.exports = {
  Query: {
    getMessages: async (_, { from }, { user }) => {
      try {
        if (!user) {
          throw new Error("You need to login first");
        }
        const otherUser = await User.findOne({ where : { email: from}})

        if(!otherUser){
            throw new Error('No such user found')
        }
        const emails = [user.data.email, otherUser.email]

        const messages = await Message.findAll({
            where:{
                from: { [Op.in]: emails },
                to: { [Op.in]: emails }
            },
            order: [['createdAt','DESC']]
        })
        return messages

      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    sendMessage: async (parent, { to, content }, { user }) => {
      try {
        if (!user) {
          throw new Error("You need to login first");
        }

        const reciever = await User.findOne({ where: { email: to } });

        if (!reciever) {
          throw new Error("User not found");
        } else if (reciever.email === user.data.email) {
          throw new Error("you cant message to yourself");
        }

        if (content.trim() === "") {
          throw new Error("Content can't be empty");
        }

        const message = await Message.create({
          from: user.data.email,
          to,
          content,
        });

        return message;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
