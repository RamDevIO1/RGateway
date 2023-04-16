const db = require('../models')
const Post = db.posts

exports.findAll = (req, res) => {
  Post.find()
  .then((result) => {
    res.status(200).send(result)
  }).catch((err) => {
    res.status(500).send({
      message: err.message || "Some error on geting data"
    })
  })
}

exports.create = (req, res) => {
  const post = new Post({
    title: req.body.title,
    body: req.body.body,
    published: req.body.published ? req.body.published : false
  })
  
  post.save(post)
  .then((result) => {
    res.status(200).send(result)
  }).catch((err) => {
    res.status(409).send({
      message: err.message || "Some error on posting data"
    })
  })
}

exports.findOne = (req, res) => {
  const id = req.params.id
  
  Post.findById(id)
    .then((result) => {
      res.status(200).send(result)
    }).catch((err) => {
      res.status(409).send({
        message: err.message || "Some error on geting id data"
      })
    })
}

exports.update = (req, res) => {
  const id = req.params.id
  
  Post.findByIdAndUpdate(id, req.body)
  .then((result) => {
    if (!result) {
      res.status(404).send({
        message: "Post not found"
      })
    }
    
    res.status(200).send({
      message: "Post was updated"
    })
  }).catch((err) => {
    res.status(409).send({
      message: err.message || "Some error on updateing data"
    })
  })
}

exports.delete = (req, res) => {
  const id = req.params.id
  
  Post.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Post not found"
        })
      }
  
      res.status(200).send({
        message: "Post was deleted"
      })
    }).catch((err) => {
      res.status(409).send({
        message: err.message || "Some error on deleteing data"
      })
    })
}