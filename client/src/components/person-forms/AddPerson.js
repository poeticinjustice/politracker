import React, { useState, Fragment } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPerson } from '../../actions/person';

const AddPerson = ({ addPerson, person: { person, loading }, history }) => {
  const [formData, setFormData] = useState({
    link1: '',
    link2: ''
  });
  const {
    personName,
    party,
    state,
    website,
    link1,
    link2,
    link3,
    link4
  } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    addPerson(formData, history);
  };

  return loading && person === null ? (
    <Redirect to='/persons' />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Add person</h1>

      <small>* = required field</small>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name of person'
            name='personName'
            value={personName}
            onChange={e => onChange(e)}
            required='true'
          />
          <small className='form-text'>*Add person's name</small>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='Party'
            name='party'
            value={party}
            onChange={e => onChange(e)}
          />
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='State'
            name='state'
            value={state}
            onChange={e => onChange(e)}
          />
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='Website'
            name='website'
            value={website}
            onChange={e => onChange(e)}
          />
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='Link'
            name='link1'
            value={link1}
            onChange={e => onChange(e)}
          />
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='Link'
            name='link2'
            value={link2}
            onChange={e => onChange(e)}
          />
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='Link'
            name='link3'
            value={link3}
            onChange={e => onChange(e)}
          />
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='Link'
            name='link4'
            value={link4}
            onChange={e => onChange(e)}
          />
        </div>

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/persons'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

addPerson.propTypes = {
  addPerson: PropTypes.func.isRequired,
  person: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  person: state.person
});
export default connect(mapStateToProps, { addPerson })(withRouter(AddPerson));
