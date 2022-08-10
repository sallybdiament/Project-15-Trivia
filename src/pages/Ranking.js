import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  // {
  //   ranking: [
  //     { name: nome_da_pessoa, score: 10, picture: url_da_foto_no_gravatar }
  //   ],
  //   token: token_recebido_pela_API
  // }

    getRankingAndRender = () => {
      const ranking = JSON.parse(localStorage.getItem('ranking'));
      if (!ranking) return null;
      const sortedRankingArray = ranking.sort((first, sec) => sec.score - first.score);

      const markup = (rankingObj, index) => (
        <div style={ { border: '1px solid black' } } key={ `${rankingObj.name}${index}` }>
          <p data-testid={ `player-name-${index}` }>{rankingObj.name}</p>
          <p data-testid={ `player-score-${index}` }>{rankingObj.score}</p>
        </div>
      );

      const renderMarkup = sortedRankingArray.map((el, i) => markup(el, i));

      return renderMarkup;
    }

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
          { this.getRankingAndRender() }
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
