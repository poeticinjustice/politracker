import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PersonsItem = ({ person: { _id, personName, party, state } }) => {
  return (
    <div className='profile bg-light'>
      <img src='#!' alt='' className='round-img' />
      <div>
        <p>
          <Link to={`/persons/${_id}`}>{personName}</Link>
        </p>
        <p>{party}</p>
        <p>{state}</p>
      </div>
    </div>
  );
};

PersonsItem.propTypes = {
  person: PropTypes.object.isRequired
};

export default PersonsItem;
