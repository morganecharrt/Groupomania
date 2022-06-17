const Post = require("../models/post");
const fs = require("fs");
const Joi = require("joi");

const postSchema = Joi.object({
  description: Joi.string().required(),
});

exports.createPost = (req, res, next) => {
  const postObject = JSON.parse(req.body.post);
  const { error } = postSchema.validate({
    description: postObject.description,
  });

  if (error == undefined) {
    delete postObject._id;
    let image = "";
    if (req.file) {
      image = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`;
    }
    const post = new Post({
      ...postObject,
      imageUrl: image,
    });
    post
      .save()
      .then(() => res.status(201).json({ message: "Objet enregistré !" }))
      .catch((error) => res.status(400).json({ error }));
  } else {
    return res
      .status(400)
      .json({ message: "Le champ description est obligatoire" });
  }
};

exports.getOnePost = (req, res, next) => {
  Post.findOne({
    _id: req.params.id,
  })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.modifyPost = (req, res, next) => {
  const postObject = JSON.parse(req.body.post);
  const { error } = postSchema.validate({
    description: postObject.description,
  });

  if (error == undefined) {
    let postObjectFinal = {};
    let image = "";
    if (req.file) {
      image = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`;

      postObjectFinal = {
        ...postObject,
        imageUrl: image,
      };
    } else {
      Post.findOne({ _id: req.params.id })
        .then((post) => {
          const filename = post.imageUrl.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {});
        })
        .catch((error) => res.status(500).json({ error }));

      postObjectFinal = { ...postObject };
    }
    Post.updateOne(
      { _id: req.params.id },
      { ...postObjectFinal, _id: req.params.id }
    )
      .then(() => res.status(200).json({ message: "Objet modifié !" }))
      .catch((error) => res.status(400).json({ error }));
  } else {
    return res
      .status(400)
      .json({ message: "Le champ description est obligatoire" });
  }
};

exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      const filename = post.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Post.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Objet supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getAllPost = (req, res, next) => {
  Post.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.likePost = (req, res, next) => {
  let userId = req.body.userId;
  Post.findOne({ _id: req.params.id })
    .then((postOK) => {
      const isPresent = postOK.usersLiked.findIndex(
        (element) => element == userId
      );

      if (isPresent === -1) {
        postOK.usersLiked.push(userId);
      } else {
        postOK.usersLiked.splice(isPresent, 1);
      }

      Post.updateOne({ _id: req.params.id }, postOK)

        .then(() => res.status(200).json({ message: "Objet modifié !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
