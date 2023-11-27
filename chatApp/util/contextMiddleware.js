const jwt = require('jsonwebtoken')
const { JWT_SECERT } = require('../config/env.json')

module.exports = (context) => {
    if (context.req && context.req.headers.authorization) {
        jwt.verify(context.req.headers.authorization, JWT_SECERT, (err, decodedToken) => {
          if (err) {
            // throw new Error("not authenticated");
          }
          context.user = decodedToken;
        });
      }
      return context
}