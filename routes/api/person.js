const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Person = require('../../models/Person');
const User = require('../../models/User');

// @route   POST api/person
// @desc    Create a person
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newPerson = new Person({
        text: req.body.text,
        name: user.name,
        user: req.user.id
      });

      const person = await newPerson.save();

      res.json(person);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/persons
// @desc    Get all persons
// @access  Public
router.get('/', async (req, res) => {
  try {
    const persons = await Person.find().sort({ date: -1 });
    res.json(persons);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/person/:id
// @desc    Get person by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);

    if (!person) {
      return res.status(404).json({ msg: 'Person not found' });
    }

    res.json(person);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Person not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/person/:id
// @desc    Delete a person
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);

    if (!person) {
      return res.status(404).json({ msg: 'Person not found' });
    }

    // Check user
    if (person.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await person.remove();

    res.json({ msg: 'Person removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Person not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/person/researchPost/:id
// @desc    Add researchPost to person
// @access  Private
router.post(
  '/researchPost/:id',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const person = await Person.findById(req.params.id);

      const newResearchPost = {
        text: req.body.text,
        name: user.name,
        user: req.user.id
      };

      person.researchPosts.unshift(newReseach);

      await person.save();

      res.json(person.researchPosts);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/persons/researchPost/:id/:researchPost_id
// @desc    Delete research
// @access  Private
router.delete('/researchPost/:id/:researchPost_id', auth, async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);

    // Pull out researchPost
    const researchPost = person.researchPosts.find(
      researchPost => researchPost.id === req.params.researchPost_id
    );

    // Make sure researchPost exists
    if (!researchPost) {
      return res.status(404).json({ msg: 'research post does not exist' });
    }

    // Check user
    if (researchPost.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Get remove index
    const removeIndex = person.researchPosts
      .map(researchPost => researchPost.user.toString())
      .indexOf(req.user.id);

    person.researchPosts.splice(removeIndex, 1);

    await person.save();

    res.json(person.researchPosts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
