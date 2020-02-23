import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PersonItem from './PersonItem';
import { getPersonById } from '../../actions/person';

const Person = ({ getPersonById, person: { _id, person, loading }, match }) => {
  useEffect(() => {
    getPersonById(match.params.id);
  }, [getPersonById, match.params.id]);

  return loading || person === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='profiles'>
        <PersonItem person={person} />
      </div>
    </Fragment>
  );
};

Person.propTypes = {
  getPersonById: PropTypes.func.isRequired,
  person: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  person: state.person
});

export default connect(mapStateToProps, { getPersonById })(Person);
