const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  userName: {
    type: String
  },
  personName: {
    type: String
  },
  party: {
    type: String
  },
  state: {
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
  research: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
        required: true
      },
      userName: {
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
