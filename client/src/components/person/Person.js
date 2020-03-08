import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PersonItem from './PersonItem';
import ResearchPostForm from './ResearchPostForm';
import ResearchPostItem from './ResearchPostItem';
import PersonProPub from './PersonProPub';
import { getPersonById, deletePerson } from '../../actions/person';

const Person = ({
  getPersonById,
  person: { person, loading, user, _id },
  auth,
  deletePerson,
  match
}) => {
  useEffect(() => {
    getPersonById(match.params.id);
  }, [getPersonById, match.params.id]);

  return (
    <Fragment>
      {person === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          {auth.isAuthenticated && !auth.loading ? (
            <div>
              <Link to='/persons' className='btn btn-light'>
                Back To People
              </Link>
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
            </div>
          ) : (
            <Link to='/persons' className='btn btn-light'>
              Back To People
            </Link>
          )}
          <div className='profiles'>
            <PersonItem person={person} />
          </div>
          <div>
            {person.propubmemberid && (
              <PersonProPub memberid={person.propubmemberid} />
            )}
          </div>
          <div>
            <div className='bg-white p-1 my-1'>
              {auth.isAuthenticated && (
                <ResearchPostForm personId={person._id} />
              )}
              <div className='comments'>
                {person.researchPosts.map(researchPost => (
                  <ResearchPostItem
                    key={researchPost._id}
                    researchPost={researchPost}
                    personId={person._id}
                  />
                ))}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Person.propTypes = {
  getPersonById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  person: PropTypes.object.isRequired,
  deletePerson: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  person: state.person,
  auth: state.auth
});

export default connect(mapStateToProps, { getPersonById, deletePerson })(
  Person
);
