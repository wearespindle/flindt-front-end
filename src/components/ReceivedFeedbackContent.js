import React from 'react';
import propTypes from 'prop-types';
import Time from 'react-time';
import RoleModalButton from '../components/RoleModalButton';
import RatingRows from '../components/RatingRow';

require('moment/locale/nl');

const ReceivedFeedbackContent = props => {
  const { feedback, person } = props;
  const accessToken = props.user.user.access_token;

  let table;

  if (feedback.role) {
    let role = feedback.role.role;

    table = (
      <table className="feedback-form--meta">
        <thead>
          <tr>
            <th>Person</th>
            <th>Role</th>
            <th>Circle</th>
            <th>Received on</th>
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
                <RoleModalButton
                  accessToken={accessToken}
                  role={role.parent.id}
                >
                  {role.parent.name}
                </RoleModalButton>
              )}
            </td>
            <td data-label="Received on">
              <Time value={feedback.date} locale="EN" format="D MMMM YYYY" />
            </td>
          </tr>
        </tbody>
      </table>
    );
  } else {
    table = (
      <table className="feedback-form--meta">
        <thead>
          <tr>
            <th>Person</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-label="Person">
              {person.first_name} {person.prefix} {person.last_name}
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  return (
    <div>
      {table}

      {feedback.role && <RatingRows remarks={feedback.role.remarks} />}

      {feedback.individual && (
        <div className="feedback-form--row">
          <div className="feedback-form--answer-container">
            <strong>{feedback.individual.question.content}</strong>

            <div className="feedback-form--answer">
              <p>{feedback.individual.answer}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

ReceivedFeedbackContent.propTypes = {
  feedback: propTypes.object,
  person: propTypes.object,
  question: propTypes.object,
  user: propTypes.object
};

export default ReceivedFeedbackContent;
