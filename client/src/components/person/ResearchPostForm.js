import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addResearchPost } from '../../actions/person';

const ResearchPostForm = ({ personId, addResearchPost }) => {
  const [text, setText] = useState('');

  return (
    <div className='post-form'>
      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();
          addResearchPost(personId, { text });
          setText('');
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='1'
          placeholder='Describe your research'
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

ResearchPostForm.propTypes = {
  addResearchPost: PropTypes.func.isRequired
};

export default connect(null, { addResearchPost })(ResearchPostForm);
