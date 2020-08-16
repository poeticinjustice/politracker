import React from 'react';
import PropTypes from 'prop-types';

const ProfileBy = ({
  profile: {
    user: { _id, name },
  },
}) => {
  return (
    <div className='profile bg-light'>
      <p>Added by ProfileBy</p>
    </div>
  );
};

ProfileBy.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileBy;
