import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { photo, name, score } = this.props;
    return (
      <header>
        <div>
          <img src={ photo } alt={ name } data-testid="header-profile-picture" />
          <p data-testid="header-player-name">{ name }</p>
        </div>
        <p data-testid="header-score">{ score }</p>
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
