import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PersonsItem = ({ person: { _id, personName } }) => {
  return (
    <div className='profile bg-light'>
      <img src='#!' alt='' className='round-img' />
      <div>
        <p>
          <Link to={`/persons/${_id}`}>{personName}</Link>
        </p>
      </div>
    </div>
  );
};

PersonsItem.propTypes = {
  person: PropTypes.object.isRequired,
};

export default PersonsItem;
