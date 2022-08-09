import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
    handleClickPlayAgain = () => {
      const { history } = this.props;
      history.push('./');
    }

    render() {
      return (
        <div>
          <h1 data-testid="ranking-title">Ranking</h1>
          <button
            name="btnPlayAgain"
            onClick={ this.handleClickPlayAgain }
            type="button"
            data-testid="btn-play-again"
          >
            Play Again
          </button>
        </div>
      );
    }
}

Ranking.propTypes = {
  score: PropTypes.number,
  assertions: PropTypes.number,
}.isRequired;

export default Ranking;
