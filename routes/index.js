var router = require("express").Router();
var articlesRouter = require("./api/articles");

router.use("/articles", articlesRouter);

module.exports = router;
