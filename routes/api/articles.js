var router = require("express").Router();
var mongoose = require("mongoose");

var Article = mongoose.model("Article");

router.get("/", (req, res) => {
  Article.find(
    {},
    ["title", "description", "body", "autor"],
    (err, articles) => {
      res.json(articles);
    }
  );
});

router.get("/:id", (req, res) => {
  Article.findOne({ _id: req.params.id }, (err, article) => {
    res.json(article);
  });
});

router.post("/", (req, res, next) => {
  var newArticle = req.body;
  var article = new Article();
  article.title = newArticle.title;
  article.description = newArticle.description;
  article.body = newArticle.body;
  article.autor = newArticle.autor;
  article.listComments = newArticle.listComments;
  article
    .save()
    .then(() => {
      return res.json({ isCreated: true });
    })
    .catch(next);
});

router.delete("/:id", (req, res) => {
  Article.deleteOne({ _id: req.params.id }, () => {
    res.json({ isDeleted: true });
  });
});

router.put("/:id", (req, res) => {
  Article.updateOne(
    { _id: req.params.id },
    {
      $set: {
        title: req.body.title,
        autor: req.body.autor,
      },
    }
  ).then(() => {
    res.json({ isUpdated: true });
  });
});

module.exports = router;
