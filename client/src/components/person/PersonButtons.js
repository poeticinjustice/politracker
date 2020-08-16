import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { deletePerson } from '../../actions/person';

const PersonButtons = ({ auth, deletePerson, person: { _id, user } }) => {
  return (
    <Fragment>
      {auth.isAuthenticated && !auth.loading && user === auth.user._id && (
        <Fragment>
          <Link to='/edit-person' className='btn btn-dark'>
            Edit Person
          </Link>
          <button
            onClick={() => deletePerson(_id)}
            type='button'
            className='btn btn-danger'
          >
            <i className='fas fa-times' />
          </button>
        </Fragment>
      )}
    </Fragment>
  );
};

PersonButtons.propTypes = {
  person: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePerson: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deletePerson })(PersonButtons);
