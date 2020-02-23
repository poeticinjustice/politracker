import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPerson } from '../../actions/person';

const PersonForm = ({ addPerson }) => {
  const [person, setText] = useState('');

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Add Person</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();
          addPerson({ person });
          setText('');
        }}
      >
        <div className='form-group'>
          <input
            type='text'
            placeholder='Add a person'
            name='person'
            value={person}
            onChange={e => setText(e.target.value)}
          />
        </div>
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

PersonForm.propTypes = {
  addPerson: PropTypes.func.isRequired
};

export default connect(null, { addPerson })(PersonForm);
