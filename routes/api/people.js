const express = require('express');
const router = express.Router();

// @route   GET api/people
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('People Route'));

module.exports = router;
