const { Router } = require("express");
const createReview = require("../controllers/reviews/createReview.controller");
const getReviews = require("../controllers/reviews/getReviews.controller");
const changeDisplay = require("../controllers/reviews/changeDisplay.controller");
const router = Router();

router.post('/', createReview);
router.get("/", getReviews)
router.put("/:id", changeDisplay)


module.exports = router