import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PersonItem from './PersonItem';
import ResearchPostForm from './ResearchPostForm';
import ResearchPostItem from './ResearchPostItem';
import { getPersonById } from '../../actions/person';

const Person = ({
  auth,
  getPersonById,
  person: { person, loading },
  match
}) => {
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
      <div>
        <div className='bg-white p-1 my-1'>
          {auth.isAuthenticated && <ResearchPostForm personId={person._id} />}
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
  );
};

Person.propTypes = {
  getPersonById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  person: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  person: state.person,
  auth: state.auth
});

export default connect(mapStateToProps, { getPersonById })(Person);
