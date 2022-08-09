import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
    handleClickPlayAgain = () => {
      const { history } = this.props;
      history.push('/');
    }

    render() {
      return (
        <div>
          <h1 data-testid="ranking-title">Ranking</h1>
          <button
            name="btnPlayAgain"
            onClick={ this.handleClickPlayAgain }
            type="button"
            data-testid="btn-go-home"
          >
            Play Again
          </button>
        </div>
      );
    }
}

Ranking.propTypes = {
  // score: PropTypes.number,
  // assertions: PropTypes.number,
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default Ranking;
