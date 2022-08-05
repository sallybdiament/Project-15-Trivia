// Funcionalidades
import React from 'react';
import PropTypes from 'prop-types';

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

    handleClick = async () => {
      const { history } = this.props;
      const link = 'https://opentdb.com/api_token.php?command=request';
      const response = await fetch(link);
      const resultado = await response.json();
      const salvarStorage = localStorage.setItem('token', resultado.token);
      history.push('/game');
      return salvarStorage;
    }

    render() {
      const { inputEmail, inputName, desabilitado } = this.state;
      return (
        <form>
          <label htmlFor="email">
            Digite o seu E-mail
            <input
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
            <input
              name="inputName"
              value={ inputName }
              type="text"
              data-testid="input-player-name"
              id="name"
              onChange={ this.handleChange }
            />
          </label>
          <button
            name="btnPlay"
            disabled={ desabilitado }
            onClick={ this.handleClick }
            type="button"
            data-testid="btn-play"
          >
            Play
          </button>
          <button
            name="btnSettings"
            onClick={ this.handleSettingsClick }
            type="button"
            data-testid="btn-settings"
          >
            Configurações
          </button>
        </form>
      );
    }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
    push: PropTypes.func,
}.isRequired;

export default Login;
