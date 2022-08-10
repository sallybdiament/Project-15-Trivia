// Funcionalidades
import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import { storePlayer } from '../redux/actions/index';
import triviaLogo from '../images/logo trivia sem tracado.png';
import { Link, Redirect } from 'react-router-dom';

// Importações

class Login extends React.Component {
    state = {
      inputEmail: '',
      inputName: '',
      desabilitado: true,
    }

    handleChange = (event) => {
      const { target: { name, value } } = event;
      this.setState({
        [name]: value,
      }, () => this.desabilitar());
    }

    desabilitar = () => {
      const { inputEmail, inputName } = this.state;
      if (inputEmail && inputName) {
        this.setState({ desabilitado: false });
      } else {
        this.setState({ desabilitado: true });
      }
    }

    handleSettingsClick = () => {
      const { history } = this.props;
      history.push('./settings');
    }

    handleClick = async () => {
      const { inputName, inputEmail } = this.state;
      this.gravatar(inputEmail, inputName);
      const { history } = this.props;
      const link = 'https://opentdb.com/api_token.php?command=request';
      const response = await fetch(link);
      const resultado = await response.json();
      const salvarStorage = localStorage.setItem('token', resultado.token);
      history.push('/game');
      return salvarStorage;
    }

    gravatar = (email, name) => {
      let data = {};
      const { storePlayerDispatch } = this.props;
      const hashedEmail = md5(email).toString();
      fetch(`https://www.gravatar.com/avatar/${hashedEmail}`)
        .then((res) => {
          data = { photo: res.url, name, email };
          storePlayerDispatch(data);
        });
    }

    render() {
      const { inputEmail, inputName, desabilitado } = this.state;
      return (
        <div className="login-container">
          <img src={ triviaLogo } alt="logo-trivia" className="trivia-logo" />
          <form className="login-form">
            <label htmlFor="email">
              Digite o seu E-mail
              <br />
              <input
                className="login-input"
                name="inputEmail"
                value={ inputEmail }
                type="email"
                data-testid="input-gravatar-email"
                id="email"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="name">
              Digite o seu Nome
              <br />
              <input
                className="login-input"
                name="inputName"
                value={ inputName }
                type="text"
                data-testid="input-player-name"
                id="name"
                onChange={ this.handleChange }
              />
            </label>
            <button
              className="btn"
              name="btnPlay"
              disabled={ desabilitado }
              onClick={ this.handleClick }
              type="button"
              data-testid="btn-play"
            >
              Play Classic
            </button>
            <button
              className="btn"
              name="btn-shuffle-mode"
              disabled={ desabilitado }
              type="button"
            >
              <Link to="/shuffle" className="btn--link-shuffle">Play Shuffle</Link>
            </button>
          </form>
          <button
            className="login-config-btn btn"
            name="btnSettings"
            onClick={ this.handleSettingsClick }
            type="button"
            data-testid="btn-settings"
          >
            Configurações
          </button>
        </div>
      );
    }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
  push: PropTypes.func,
  savePhoto: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  storePlayerDispatch: (data) => dispatch(storePlayer(data)),
});

export default connect(null, mapDispatchToProps)(Login);
