import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// BEM: BLOCK-ELEMENT-MODIFICADOR
// header
// header__score
// header__score--green
class Header extends React.Component {
  render() {
    const { photo, name, score } = this.props;
    const { pathname } = document.location;
    return (
      <header
        className={ `header ${pathname === '/feedback' ? 'header--feedback' : ''}` }
      >
        <div>
          <img src={ photo } alt={ name } data-testid="header-profile-picture" />
          <span data-testid="header-player-name">{ name }</span>
        </div>
        <p data-testid="header-score">
          Pontuação:
          {' '}
          { score }

        </p>
      </header>
    );
  }
}

Header.propTypes = {
  photo: PropTypes.string,
};

Header.propTypes = { name: PropTypes.string,
  score: PropTypes.number }.isRequired;

Header.defaultProps = {
  photo: 'https://www.gravatar.com/avatar/c19ad9dbaf91c5533605fbf985177ccc',
};

const mapStateToProps = (state) => ({
  photo: state.player.photoUrl,
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
