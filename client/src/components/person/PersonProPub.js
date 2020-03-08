import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import Spinner from '../layout/Spinner';
import { getProPubData } from '../../actions/person';

const PersonProPub = ({ memberid, getProPubData, proPubData }) => {
  useEffect(() => {
    getProPubData(memberid);
  }, [getProPubData, memberid]);

  const personName = `${proPubData.first_name} ${proPubData.last_name}`;
  const dob = proPubData.date_of_birth;
  const party = proPubData.current_party;
  const website = proPubData.url;
  const proPublica = `https://projects.propublica.org/represent/members/${proPubData.id}`;
  const voteview = `https://voteview.com/person/${proPubData.icpsr_id}`;
  const twitter = `https://twitter.com/${proPubData.twitter_account}`;
  const govtrack = `https://www.govtrack.us/congress/members/${proPubData.govtrack_id}`;
  const openSecrets = `http://www.opensecrets.org/members-of-congress/summary?cid=${proPubData.crp_id}`;
  const image = `https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/225x275/${proPubData.id}.jpg`;

  return (
    <Fragment>
      <div className='profile bg-light'>
        <img src={image} alt='' className='round-img' />
        <div>
          <p>Name: {personName}</p>
          <p>dob: {dob}</p>
          <p>Party: {party}</p>
          <p>
            <a href={website} target='_blank' rel='noopener noreferrer'>
              {website}
            </a>
          </p>
        </div>
        <ul>
          <li className='text-primary'>
            <a href={proPublica} target='_blank' rel='noopener noreferrer'>
              Pro Publica
            </a>
          </li>
          <li className='text-primary'>
            <a href={voteview} target='_blank' rel='noopener noreferrer'>
              Voteview
            </a>
          </li>
          <li className='text-primary'>
            <a href={twitter} target='_blank' rel='noopener noreferrer'>
              Twitter
            </a>
          </li>
          <li className='text-primary'>
            <a href={govtrack} target='_blank' rel='noopener noreferrer'>
              GovTrack
            </a>
          </li>
          <li className='text-primary'>
            <a href={openSecrets} target='_blank' rel='noopener noreferrer'>
              Open Secrets
            </a>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

PersonProPub.propTypes = {
  getProPubData: PropTypes.func.isRequired,
  proPubData: PropTypes.object.isRequired,
  memberid: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  proPubData: state.person.proPubData
});

export default connect(mapStateToProps, { getProPubData })(PersonProPub);
