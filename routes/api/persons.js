const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Person = require('../../models/Person');
const User = require('../../models/User');

// @route    POST api/persons
// @desc     Add a person
// @access   Private
router.post(
  '/',
  [auth, [check('personName', 'Name of person is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      let duplicate = await Person.findOne({
        personName: req.body.personName,
      });

      if (duplicate) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Person with that name already exists' }] });
      }

      const newPerson = new Person({
        personName: req.body.personName,
        party: req.body.party,
        state: req.body.state,
        website: req.body.website,
        link1: req.body.link1,
        link2: req.body.link2,
        link3: req.body.link3,
        link4: req.body.link4,
        propubmemberid: req.body.propubmemberid,
        name: user.name,
        user: req.user.id,
      });

      const person = await newPerson.save();

      res.json(person);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route     PUT api/persons/:id
// @desc      Update person
// @access    Private
router.put(
  '/:id',
  [auth, [check('personName', 'Name of person is required').not().isEmpty()]],
  async (req, res) => {
    const {
      personName,
      party,
      state,
      website,
      link1,
      link2,
      link3,
      link4,
      propubmemberid,
    } = req.body;

    // Build person object
    const personFields = {};
    if (personName) personFields.personName = personName;
    if (party) personFields.party = party;
    if (state) personFields.state = state;
    if (website) personFields.website = website;
    if (link1) personFields.link1 = link1;
    if (link2) personFields.link2 = link2;
    if (link3) personFields.link3 = link3;
    if (link4) personFields.link4 = link4;
    if (propubmemberid) personFields.propubmemberid = propubmemberid;

    try {
      let person = await Person.findById(req.params.id);

      if (!person) return res.status(404).json({ msg: 'Person not found' });

      // Make sure user created person
      if (person.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Not authorized' });
      }

      person = await Person.findByIdAndUpdate(
        req.params.id,
        { $set: personFields },
        { new: true }
      );

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
      return res.status(404).json({ msg: 'Person not found' });
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

// @route    POST api/persons/researchPost/:id
// @desc     Post research on a person
// @access   Private
router.post(
  '/researchpost/:id',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
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
        link: req.body.link,
        note: req.body.note,
        name: user.name,
        user: req.user.id,
      };

      person.researchPosts.unshift(newResearchPost);

      await person.save();

      res.json(person.researchPosts);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/persons/researchpost/:id/:researchPost_id
// @desc     Delete research post
// @access   Private
router.delete('/researchpost/:id/:researchpost_id', auth, async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);

    // Pull out research post
    const researchPost = person.researchPosts.find(
      (researchPost) => researchPost.id === req.params.researchpost_id
    );

    // Make sure research post exists
    if (!researchPost) {
      return res.status(404).json({ msg: 'Research post does not exist' });
    }

    // Check user
    if (researchPost.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Get remove index
    const removeIndex = person.researchPosts
      .map((researchPost) => researchPost.id)
      .indexOf(req.params.researchPost_id);

    person.researchPosts.splice(removeIndex, 1);

    await person.save();

    res.json(person.researchPosts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/persons/propublica/:memberid
// @desc     Get person data from Pro Publica
// @access   Public
router.get('/propublica/:memberid', (req, res) => {
  try {
    const options = {
      uri: encodeURI(
        `https://api.propublica.org/congress/v1/members/${req.params.memberid}.json`
      ),
      method: 'GET',
      headers: {
        'x-api-key': `${config.get('proPublicaToken')}`,
      },
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);

      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: 'No Pro Publica member found' });
      }

      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
