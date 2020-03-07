import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteResearchPost } from '../../actions/person';

const ResearchPostItem = ({
  personId,
  researchPost: { _id, text, name, user, date },
  auth,
  deleteResearchPost
}) => (
  <div className='post bg-white p-1 my-1'>
    <div>
      <Link to={`/profile/${user}`}>
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p className='my-1'>{text}</p>
      <p className='post-date'>
        Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
      </p>
      {auth.isAuthenticated && !auth.loading && user === auth.user._id && (
        <div>
          <Link to='/update-research' className='btn btn-dark'>
            Update Research
          </Link>
          <button
            onClick={() => deleteResearchPost(personId, _id)}
            type='button'
            className='btn btn-danger'
          >
            <i className='fas fa-times' />
          </button>
        </div>
      )}
    </div>
  </div>
);

ResearchPostItem.propTypes = {
  personId: PropTypes.string.isRequired,
  researchPost: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteResearchPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteResearchPost })(
  ResearchPostItem
);
