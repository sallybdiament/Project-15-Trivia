import React from 'react';

class Ranking extends React.Component {
    handleClickPlayAgain = () => {
      const { history } = this.props;
      history.push('./');
    }

    render() {
      return (
        <div>
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

export default Ranking;
