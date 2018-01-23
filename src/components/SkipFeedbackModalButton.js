import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import { showSkipFeedbackModal } from '../actions/modal';

const SkipFeedbackModalButton = props => (
  <a
    className="action--button neutral skip--button is-right"
    onClick={() => props.showSkipFeedbackModal(props)}
  >
    Skip this feedback
  </a>
);

SkipFeedbackModalButton.propTypes = {
  showSkipFeedbackModal: propTypes.func
};

export default connect(null, { showSkipFeedbackModal })(
  SkipFeedbackModalButton
);
