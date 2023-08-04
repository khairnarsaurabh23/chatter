const sequelize = require("../utils/database");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const SECRET_KEY = 'process.env.SECRET_KEY';

// Models
const User = sequelize.models.user;

exports.allFriends = (req, res, next) => {
  let token = req.headers.token;
  if (token !== "") {
    jwt.verify(token, SECRET_KEY, async function (err, decryptToken) {
      if (err) {
              err = {
                name: 'JsonWebTokenError',
                message: 'jwt malformed'
              }
        console.log(err);
        res.status(401).send(err);
      }
      try {
        //find all users except the current;
        let friends = await User.findAll({
          where: {
            id: {
              [Op.ne]: decryptToken.userId,
            },
          },
          attributes: ["id", "name"],
        });

        res.status(200).json({
          status: "success",
          data: { user: decryptToken.name, friends: friends },
        });
      } catch (error) {
        console.log(error);
      }
    });
  } else {
    res.status(404).json({ status: "error", message: "User Not Found." });
  }
};
