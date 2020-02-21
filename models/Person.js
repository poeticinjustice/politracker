const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String
  },
  person: {
    type: String,
    required: true,
    unique: true
  },
  party: {
    type: String
  },
  state: {
    type: String
  },
  website: {
    type: String
  },
  link1: {
    type: String
  },
  link2: {
    type: String
  },
  link3: {
    type: String
  },
  link4: {
    type: String
  },
  image: {
    type: String
  },
  researchPosts: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      link: {
        type: String
      },
      note: {
        type: String
      },
      tags: {
        type: [String]
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Person = mongoose.model('person', PersonSchema);
