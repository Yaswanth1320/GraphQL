const { Message, User, Reaction } = require("../../models");
const { Op } = require("sequelize");
const { PubSub } = require("graphql-subscriptions");

const pubsub = new PubSub();

module.exports = {
  Query: {
    getMessages: async (_, { from }, { user }) => {
      try {
        if (!user) {
          throw new Error("You need to login first");
        }
        const otherUser = await User.findOne({ where: { email: from } });

        if (!otherUser) {
          throw new Error("No such user found");
        }
        const emails = [user.data.email, otherUser.email];

        const messages = await Message.findAll({
          where: {
            from: { [Op.in]: emails },
            to: { [Op.in]: emails },
          },
          order: [["createdAt", "DESC"]],
        });
        return messages;
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

        pubsub.publish("NEW_MESSAGE", { newMessage: message });

        return message;
      } catch (error) {
        console.log(error);
      }
    },
    reactToMessage: async (_, { uuid, content }, { user }) => {
      const reactions = ["❤️", "😆", "😯", "😢", "😡", "👍", "👎"];
      try {
        if (!reactions.includes(content)) {
          throw new Error(`Invalid reaction ${content}`);
        }

        const email = user ? user.data.email : "";
        user = await User.findOne({ where: { email } });
        if (!user) {
          throw new Error("Please Login");
        }

        const message = await Message.findOne({ where: { uuid } });
        if (!message) {
          throw new Error("Message not found");
        }

        if (message.from !== user.email && message.to !== user.email) {
          throw new Error("Forbidden");
        }

        let reaction = await Reaction.findOne({
          where: { messageId: message.id, userId: user.id },
        });

        if (reaction) {
          reaction.content = content;
          await reaction.save();
        } else {
          reaction = await Reaction.create({
            messageId: message.id,
            userId: user.id,
            content: content,
          });
        }

        return reaction;
      } catch (error) {
        console.log(error)
      }
    },
  },
  Subscription: {
    newMessage: {
      subscribe: () => pubsub.asyncIterator(["NEW_MESSAGE"]),
    },
  },
};
