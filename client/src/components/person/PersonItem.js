import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const PersonItem = ({
  person: { personName, party, state, website, link1, link2, link3, link4 },
}) => {
  return (
    <Fragment>
      <div className='profile bg-light'>
        <img src='#!' alt='' className='round-img' />
        <div>
          <p>Added by...</p>
          <p>{personName}</p>
          <p>{party}</p>
          <p>{state}</p>
          <p>
            <a href={website}>{website}</a>
          </p>
        </div>
        <ul>
          <li className='text-primary'>
            <a href={link1}>{link1}</a>
          </li>
          <li className='text-primary'>
            <a href={link2}>{link2}</a>
          </li>
          <li className='text-primary'>
            <a href={link3}>{link3}</a>
          </li>
          <li className='text-primary'>
            <a href={link4}>{link4}</a>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

PersonItem.propTypes = {
  person: PropTypes.object.isRequired,
};

export default PersonItem;
