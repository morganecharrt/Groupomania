const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

require("dotenv").config();
const Joi = require("joi");

const schemaUser = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().min(8).max(30).uppercase().lowercase(),
  username: Joi.string().min(2).max(30),
});

exports.signup = (req, res, next) => {
  const { error } = schemaUser.validate({
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
  });
  if (error === undefined) {
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        const user = new User({
          username: req.body.username,
          email: req.body.email,
          password: hash,
        });
        user
          .save()
          .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((e) => res.status(500).json({ e }));
  } else {
    return res.status(400).json({ message: error.details[0].message });
  }
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            username: user.username,
            userId: user._id,
            isAdmin: user.isAdmin,
            token: jwt.sign(
              { userId: user._id },
              process.env.SECRET_CRIPTOKEN,
              {
                expiresIn: "24h",
              }
            ),
          });
        })
        .catch((e) => res.status(500).json({ e }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getUser = (req, res, next) => {
  console.log(req.body.userId);
  User.findOne({
    _id: req.body.userId,
  })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};
