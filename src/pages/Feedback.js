import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import BtnPlayAgain from '../components/BtnPlayAgain';

class Feedback extends React.Component {
  render() {
    const { score, assertions } = this.props;
    const numberOfRightAnswers = 3;
    return (
      <div>
        <Header />
        <p data-testid="feedback-total-score">{ score }</p>
        <p data-testid="feedback-total-question">{ assertions }</p>
        { assertions < numberOfRightAnswers
          ? <p data-testid="feedback-text">Could be better...</p>
          : <p data-testid="feedback-text">Well Done!</p>}
        <BtnPlayAgain />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  score: PropTypes.number,
  assertions: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
