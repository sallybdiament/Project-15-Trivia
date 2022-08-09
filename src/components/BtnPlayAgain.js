import React from 'react';
import PropTypes from 'prop-types';

class BtnPlayAgain extends React.Component {
    handleClick = () => {
      const { history } = this.props;
      history.push('./');
    }

    render() {
      return (
        <button
          name="btnPlayAgain"
          onClick={ this.handleClick }
          type="button"
          data-testid="btn-play-again"
        >
          Play Again
        </button>
      );
    }
}

BtnPlayAgain.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
  push: PropTypes.func,
}.isRequired;

export default BtnPlayAgain;
