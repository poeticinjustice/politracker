import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updatePerson, getPersonById } from '../../actions/person';

const initialState = {
  personName: '',
  party: '',
  state: '',
  website: '',
  link1: '',
  link2: '',
  link3: '',
  link4: ''
};

const EditPerson = ({
  person: { person, loading },
  updatePerson,
  getPersonById,
  history
}) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (!person) getPersonById();
    if (!loading) {
      const personData = { ...initialState };
      for (const key in person) {
        if (key in personData) personData[key] = person[key];
      }
      setFormData(personData);
    }
  }, [loading, getPersonById, person]);

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
    updatePerson(person._id, formData, history, true);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Edit Person</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Make some updates
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name of person'
            name='personName'
            value={personName}
            onChange={e => onChange(e)}
          />
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
        <Link className='btn btn-light my-1' to='/persons/'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

EditPerson.propTypes = {
  updatePerson: PropTypes.func.isRequired,
  getPersonById: PropTypes.func.isRequired,
  person: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  person: state.person
});

export default connect(mapStateToProps, { updatePerson, getPersonById })(
  withRouter(EditPerson)
);
