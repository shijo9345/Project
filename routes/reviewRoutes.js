const express = require('express');
const router = express.Router();
const { addReview, getReviewsByBook, deleteReview } = require('../controllers/reviewController');

router.post('/:bookId/add',addReview);
router.get('/:bookId', getReviewsByBook);
router.delete('/:reviewId',deleteReview);

module.exports = router;
