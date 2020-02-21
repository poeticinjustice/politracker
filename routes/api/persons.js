const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Person = require('../../models/Person');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route    POST api/persons
// @desc     Create a person
// @access   Private
router.post(
  '/',
  [
    auth,
    [
      check('person', 'Name of person is required')
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

      let duplicate = await Person.findOne({
        person: req.body.person
      });

      if (duplicate) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Person already exists' }] });
      }

      const newPerson = new Person({
        person: req.body.person,
        party: req.body.party,
        state: req.body.state,
        website: req.body.website,
        link1: req.body.link1,
        link2: req.body.link2,
        link3: req.body.link3,
        link4: req.body.link4,
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

// @route    GET api/persons
// @desc     Get all persons
// @access   public
router.get('/', async (req, res) => {
  try {
    const persons = await Person.find().sort({ date: -1 });
    res.json(persons);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/persons/:id
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
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/persons/:id
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

module.exports = router;
