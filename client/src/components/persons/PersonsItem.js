import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PersonsItem = ({ person: { _id, person, party, state } }) => {
  return (
    <div className='profile bg-light'>
      <div>
        <Link to={`/persons/${_id}`} className='btn btn-primary'>
          View {person}
        </Link>
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
