import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PersonItem from './PersonItem';
import { getPersonById } from '../../actions/person';

const Person = ({
  getPersonById,
  person: { person, loading },
  auth,
  match
}) => {
  useEffect(() => {
    getPersonById(match.params.id);
  }, [getPersonById, match.params.id]);

  return loading || person === null ? (
    <Spinner />
  ) : (
    <Fragment>
      {auth.isAuthenticated && auth.loading === false && (
        <Link to='/edit-person' className='btn btn-dark'>
          Edit Person
        </Link>
      )}
      <div className='profiles'>
        <PersonItem person={person} />
      </div>
    </Fragment>
  );
};

Person.propTypes = {
  getPersonById: PropTypes.func.isRequired,
  person: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  person: state.person,
  auth: state.auth
});

export default connect(mapStateToProps, { getPersonById })(Person);
