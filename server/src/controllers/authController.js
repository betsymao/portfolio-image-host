const { db } = require('../config/db');
const ApiError = require('../utilities/ApiError');
const { 
    findUser, 
    hashPassword, 
    userDetailsToJSON, 
    jwtSignUser, 
    comparePassword 
} = require('../utilities/authServices');

module.exports = {
//   async getUsers(req, res, next) {
//     const usersRef = db.collection('users');
//     const snapshot = await usersRef.get();

//     if (snapshot.empty) {
//       return next(ApiError.badRequest('The users you were looking for do not exist'));
//     } else {
//       let users = [];
//       snapshot.forEach(doc => {
//         users.push({
//           id: doc.id,
//           username: doc.data().username,
//           email: doc.data().email,
//           isAdmin: doc.data().isAdmin
//         });
//       });
//       res.send(users);
//     }
//   },

  async register(req, res, next) {
    try {
      const { username, email, password } = req.body;

      const userMatch = await findUser(email);
      if (userMatch.length === 1) {
        return next(ApiError.badRequest('This email is already in use.'));
      }

      const usersRef = db.collection('users');
      const response = await usersRef.add({
        username: username,
        email: email,
        password: await hashPassword(password),
        isAdmin: false,
      });
      console.log(`User has successfully registered: ${response.id}`);

      const userJSON = await userDetailsToJSON(response.id);

      res.send({
        token: jwtSignUser(userJSON)
      });

      res.send('Register endpoint matched.');
    } catch(err) {
      return next(ApiError.internal('There were issues registering the account.', err));
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const userMatch = await findUser(email);
      if (userMatch.length === 0) {
        return next(ApiError.badRequest('The credentials entered are not correct (DEBUG: email).'));
      }

      const passwordMatch = await comparePassword(userMatch, password);
      if (!passwordMatch) {
        return next(ApiError.badRequest('The credentials entered are not correct (DEBUG: pwd).'));
      }

      console.log(`User has successfully logged in: ${userMatch[0].id}`);
      const userJSON = await userDetailsToJSON(userMatch[0].id);

      res.send({
        token: jwtSignUser(userJSON)
      });

    } catch(err) {
      return next(ApiError.internal('There were issues logging into the account.', err));
    }
  }
};