import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
    componentDidMount = () => {
      this.updateLocalStorage();
    }

    updateLocalStorage = () => {
      const { name, picture, score } = this.props;
      if (!name) return null;
      const currentPlayerRankingData = { name, score, picture };
      const ranking = localStorage.getItem('ranking');
      const rankingArray = ranking ? JSON.parse(ranking) : [];
      const newRankingArray = [...rankingArray, currentPlayerRankingData];
      localStorage.setItem('ranking', JSON.stringify(newRankingArray));
    }

    handleClickPlayAgain = () => {
      const { history } = this.props;
      history.push('/');
    }

    handleClickRanking = () => {
      const { history } = this.props;
      history.push('/ranking');
    }

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
          <button
            name="btnPlayAgain"
            onClick={ this.handleClickPlayAgain }
            type="button"
            data-testid="btn-play-again"
          >
            Play Again
          </button>
          <button
            name="btnRanking"
            onClick={ this.handleClickRanking }
            type="button"
            data-testid="btn-ranking"
          >
            Ranking
          </button>
        </div>
      );
    }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
  name: state.player.name,
  picture: state.player.photoUrl,
});

Feedback.propTypes = {
  score: PropTypes.number,
  assertions: PropTypes.number,
  history: PropTypes.objectOf(PropTypes.any),
  name: PropTypes.string,
  picture: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
