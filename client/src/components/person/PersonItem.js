import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deletePerson } from '../../actions/person';

const PersonItem = ({
  auth,
  deletePerson,
  person: {
    _id,
    user,
    person,
    party,
    state,
    website,
    link1,
    link2,
    link3,
    link4
  }
}) => {
  return (
    <Fragment>
      <Link to='/persons' className='btn btn-light'>
        Back To People
      </Link>
      <div className='profile bg-light'>
        <img src='#!' alt='' className='round-img' />
        <div>
          <p>{person}</p>
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
      {!auth.loading && user === auth.user._id && (
        <button
          onClick={() => deletePerson(_id)}
          type='button'
          className='btn btn-danger'
        >
          <i className='fas fa-times' />
        </button>
      )}
    </Fragment>
  );
};

PersonItem.propTypes = {
  person: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deletePerson })(PersonItem);
