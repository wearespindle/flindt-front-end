import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Notifications from 'react-notification-system-redux';
import { fetchFeedbackAsReceiver, editFeedback } from '../actions/feedback';
import FeedbackRow from '../components/FeedbackRow';
import Header from '../components/header';

const moment = require('moment');

class ReceivedFeedbackList extends Component {
  componentWillMount() {
    this.get(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.get(nextProps, this.props);
  }

  get = (nextProps = {}, oldProps = {}) => {
    if (nextProps.access_token && !oldProps.access_token) {
      this.props.fetchFeedbackAsReceiver(nextProps.access_token);
    }
  };

  dismissActionableReminders() {
    const accessToken = this.props.user.user.access_token;

    // console.log(props);

    let errorArray = [];

    this.props.feedback
      .filter(
        feedbackObject =>
          feedbackObject.actionable_got_reminded === false &&
          moment(feedbackObject.date).isAfter(
            moment()
              .clone()
              .subtract(14, 'days')
              .startOf('day')
          ) &&
          moment(feedbackObject.date).isBefore(moment())
      )
      .map(feedbackObject => {
        this.props
          .editFeedback(
            {
              id: feedbackObject.id,
              actionable_got_reminded: true
            },
            accessToken,
            'receive'
          )
          .then(response => {
            if (response.payload.status !== 200) {
              errorArray.push(response.payload);
            }
          });

        return null;
      });

    if (errorArray.length > 0) {
      this.props.dispatch(
        Notifications.error({
          title: 'Error!',
          message: 'Something went wrong while saving the data!',
          position: 'tr',
          autoDismiss: 2
        })
      );
    } else {
      this.props.dispatch(
        Notifications.success({
          title: 'Sweet success!',
          message: 'Succesfully removed reminders! Thanks!',
          position: 'tr',
          autoDismiss: 2
        })
      );
    }
  }

  render() {
    if (!this.props.feedback.length) {
      return (
        <div className="content--wrapper">
          <div className="content--header">
            <Header />
            <div className="content--header-breadcrumbs">
              <ul>
                <li>Received feedback</li>
              </ul>
            </div>
          </div>

          {this.props.loading && (
            <div className="content">
              <div className="spinner">
                <div className="bounce1" />
                <div className="bounce2" />
                <div className="bounce3" />
              </div>
            </div>
          )}
          {!this.props.loading && (
            <div className="content is-text-center has-margin-top-100">
              <h3>Unfortunately nobody has given you feedback yet!</h3>
              <div className="content--no-feedback received" />
            </div>
          )}
        </div>
      );
    }

    let feedback = this.props.feedback;

    const actionableReminder = feedback.filter(
      feedbackObject =>
        feedbackObject.actionable === 'yes' &&
        feedbackObject.actionable_got_reminded === false &&
        moment(feedbackObject.date).isAfter(
          moment()
            .clone()
            .subtract(14, 'days')
            .startOf('day')
        ) &&
        moment(feedbackObject.date).isBefore(moment())
    );

    return (
      <div className="content--wrapper">
        <div className="content--header">
          <Header />
          <div className="content--header-breadcrumbs">
            <ul>
              <li>Received feedback</li>
            </ul>
          </div>
        </div>

        <div className="content">
          <div className="feedbacklist--wrapper">
            <h2>Received feedback</h2>

            {actionableReminder && (
              <div className="label--neutral">
                Hey, I noticed you wrote a follow-up action when you rated your
                received feedback. Have you thought about those actions yet? I
                marked the ones with a blue exclamation mark.
                <a onClick={() => this.dismissActionableReminders()}>
                  <i className="fa fa-close" />
                </a>
              </div>
            )}

            <table>
              <thead>
                <tr>
                  <th>Person</th>
                  <th>Role</th>
                  <th>Circle</th>
                  <th>Received on</th>
                  <th>Rated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {feedback
                  .filter(
                    feedbackObject =>
                      // Only display completed feedback.
                      feedbackObject.status === 1
                  )
                  .map(feedbackObject => (
                    <FeedbackRow
                      key={feedbackObject.id}
                      index={feedbackObject.id}
                      feedbackType="received"
                      details={feedbackObject}
                      completed
                    />
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  feedback: state.Feedback.feedback_as_receiver.feedback,
  access_token: state.User.data.user.access_token,
  loading: state.Feedback.feedback_as_receiver.loading,
  user: state.User.data,
  user_data: state.User.user_data
});

ReceivedFeedbackList.propTypes = {
  dispatch: propTypes.func,
  editFeedback: propTypes.func,
  feedback: propTypes.array,
  fetchFeedbackAsReceiver: propTypes.func,
  user: propTypes.object,
  loading: propTypes.bool
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      editFeedback,
      fetchFeedbackAsReceiver,
      dispatch
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReceivedFeedbackList);
