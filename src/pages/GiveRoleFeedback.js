import propTypes from 'prop-types';
import React, { Component } from 'react';
import Time from 'react-time';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Notifications from 'react-notification-system-redux';

import history from '../utils/history';

import RoleModalButton from '../components/RoleModalButton';
import SkipFeedbackModalButton from '../components/SkipFeedbackModalButton';
import Header from '../components/header';

import { cleanFeedback, fetchFeedback, editFeedback } from '../actions/feedback';

// renderField component for reduxForms.
const renderTextArea = ({ input, meta: { touched, error } }) => (
  <div>
    <textarea {...input} required />
    {touched && error && <span className="label--alert">{error}</span>}
  </div>
);

renderTextArea.propTypes = {
  input: propTypes.object,
  meta: propTypes.object
};

// Assign this class to a variable to 'connect' both reduxForm and redux without
// ESLint throwing a `no-class-assign`-error.
let GiveRoleFeedbackClass = class GiveRoleFeedback extends Component {
  constructor(props) {
    super(props);

    this._handleSubmit = this._handleSubmit.bind(this);

    this.state = {
      id: this.props.match.params.feedbackId
    };
  }

  componentWillMount() {
    let accessToken = this.props.user.user.access_token;

    this.props.fetchFeedback(accessToken, this.props.match.params.feedbackId);
  }

  componentWillUnmount() {
    this.props.cleanFeedback();
  }

  _handleSubmit(values, dispatch, props) {
    const { id } = this.state;
    let ratings = this.props.feedback.feedback.round.available_ratings;
    let accessToken = this.props.user.user.access_token;
    let remarks = [];

    // Loop through ratings and set the content for the values.
    ratings.map((rating, index) => {
      remarks.push({
        rating: {
          rating_id: rating.id,
          name: rating.name,
          description: rating.description
        },
        content: values[rating.name]
      });

      return null;
    });

    this.props
      .editFeedback(
        {
          id,
          status: 1,
          role: { remarks }
        },
        accessToken
      )
      .then(response => {
        if (response.payload.status !== 200) {
          this.props.dispatch(
            Notifications.error({
              title: 'Error!',
              message: 'Something went wrong while saving the data!',
              position: 'tr',
              autoDismiss: 4
            })
          );
        } else {
          this.props.dispatch(
            Notifications.success({
              title: 'Sweet success!',
              message: 'Feedback succesfully saved! Thanks!',
              position: 'tr',
              autoDismiss: 4
            })
          );

          // Send the user back to his feedback overview after a succesful action.
          history.push('/give-feedback/');
        }
      });
  }

  render() {
    const { feedback } = this.props.feedback;

    if (!Object.keys(feedback).length) {
      return (
        <div className="content--wrapper">
          <div className="content--header">
            <Header />
            <div className="content--header-breadcrumbs">
              <ul>
                <li>Give feedback</li>
                <li>Feedback on role</li>
              </ul>
            </div>
          </div>

          <div className="content">
            <h2>Feedback on role</h2>

            <div className="feedback-form--wrapper">
              <div className="spinner">
                <div className="bounce1" />
                <div className="bounce2" />
                <div className="bounce3" />
              </div>
            </div>
          </div>
        </div>
      );
    }

    let person = feedback.recipient;
    const { handleSubmit } = this.props;
    const ratings = feedback.round.available_ratings;
    const role = feedback.role.role;
    const accessToken = this.props.user.user.access_token;
    const requested = feedback.role.requested;

    return (
      <div className="content--wrapper">
        <div className="content--header">
          <Header />
          <div className="content--header-breadcrumbs">
            <ul>
              <li>Give feedback</li>
              <li>Feedback on role</li>
            </ul>
          </div>
        </div>

        <div className="content">
          <h2>Feedback on role</h2>

          <div className="feedback-form--wrapper">
            <table className="feedback-form--meta">
              <thead>
                <tr>
                  <th>Person</th>
                  <th>Role</th>
                  <th>Circle</th>
                  <th>Requested on</th>
                  {requested && <th>Requested</th>}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Person">
                    {person.first_name} {person.prefix} {person.last_name}
                  </td>
                  <td data-label="Role">
                    <RoleModalButton accessToken={accessToken} role={role.id}>
                      {role.name}
                    </RoleModalButton>
                  </td>
                  <td data-label="Circle">
                    {role.parent && (
                      <RoleModalButton accessToken={accessToken} role={role.parent.id}>
                        {role.parent.name}
                      </RoleModalButton>
                    )}
                  </td>
                  <td data-label="Received on">
                    <Time value={feedback.date} locale="EN" format="D MMMM YYYY" />
                  </td>
                  {requested && <td>Feedback requested by {person.first_name}</td>}
                </tr>
              </tbody>
            </table>
            <div className="feedback-form--row padding-bottom-0">
              <div className="feedback-form--form">
                <form onSubmit={handleSubmit(this._handleSubmit)}>
                  {ratings.map(rating => {
                    return (
                      <div key={rating.id} className="feedback-form--row">
                        {rating.image && (
                          <div className="l-5 feedback-form--row-smiley">
                            <img alt="Rating" src={rating.image} />
                          </div>
                        )}

                        <div className={rating.image ? 'l-43' : ''}>
                          <label htmlFor={rating.name}>
                            <strong>{rating.description}</strong>
                            <span className="is-required">*</span>
                          </label>
                          <Field name={rating.name} component={renderTextArea} />
                        </div>
                      </div>
                    );
                  })}

                  <Link to="/give-feedback" className="action--button neutral">
                    <i className="fa fa-chevron-left" /> Back to overview
                  </Link>

                  <button className="action--button is-right" type="submit">
                    Save
                  </button>
                  <SkipFeedbackModalButton />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

// reduxForm validate function.
function validate(values) {
  const errors = {};
  //
  // if (!values.improvementFeedback) {
  //     errors.improvementFeedback = 'Please fill in some improvements';
  // }
  //
  // if (!values.positiveFeedback) {
  //     errors.positiveFeedback = 'Please try to fill in any positive notes for this role';
  // }

  return errors;
}

// Redux functions to map state and dispatch to props.
const mapStateToProps = state => ({
  feedback: state.Feedback.feedback,
  user: state.User.data
});

GiveRoleFeedbackClass.propTypes = {
  cleanFeedback: propTypes.func,
  editFeedback: propTypes.func,
  dispatch: propTypes.func,
  feedback: propTypes.object,
  fetchFeedback: propTypes.func,
  handleSubmit: propTypes.func,
  params: propTypes.object,
  user: propTypes.object
};

GiveRoleFeedbackClass.contextTypes = {
  router: propTypes.object
};

// Connect reduxForm to our class.
GiveRoleFeedbackClass = reduxForm({
  form: 'GivePersonalFeedbackForm',
  validate
})(GiveRoleFeedbackClass);

export default connect(mapStateToProps, {
  fetchFeedback,
  editFeedback,
  cleanFeedback
})(GiveRoleFeedbackClass);
