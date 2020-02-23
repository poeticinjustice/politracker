import React from 'react';
import PropTypes from 'prop-types';

const PersonItem = ({ person: { person, party, state } }) => {
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
