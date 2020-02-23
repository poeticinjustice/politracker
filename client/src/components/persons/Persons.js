import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PersonsItem from './PersonsItem';
import { getPersons } from '../../actions/person';

const Persons = ({ getPersons, person: { persons, loading } }) => {
  useEffect(() => {
    getPersons();
  }, [getPersons]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>People</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop' /> Who's accountable to you?
          </p>
          <div className='profiles'>
            {persons.length > 0 ? (
              persons.map(person => (
                <PersonsItem key={person._id} person={person} />
              ))
            ) : (
              <h4>No people found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Persons.propTypes = {
  getPersons: PropTypes.func.isRequired,
  person: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  person: state.person
});

export default connect(mapStateToProps, { getPersons })(Persons);
