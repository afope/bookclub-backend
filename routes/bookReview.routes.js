const { authJwt } = require("../middlewares");
const controller = require("../controllers/bookReview.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post(
    "/api/book/:book_id/review/add",
    [authJwt.verifyToken],
    controller.addReview
  );
};
