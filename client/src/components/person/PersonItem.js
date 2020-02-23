import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PersonItem = ({ person: { _id, person, party, state } }) => {
  return (
    <div className='profile bg-light'>
      <div>
        <h2>{person}</h2>
        <p>{party}</p>
        <p>{state}</p>
      </div>
    </div>
  );
};

PersonItem.propTypes = {
  person: PropTypes.object.isRequired
};

export default PersonItem;
