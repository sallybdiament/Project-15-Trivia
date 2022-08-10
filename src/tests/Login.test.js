import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import Login from '../pages/Login'
import { screen, render, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const testEmail = 'test@email.com';
const testName = 'name';

describe('test the Login component', () => {
  it('checks if the function desabilitar() works', () => {
    renderWithRouterAndRedux(<Login />);
    const emailInput = screen.getByLabelText('Digite o seu E-mail');
    const nameInput = screen.getByLabelText('Digite o seu Nome');
    const btn = screen.getByRole('button', { name: 'Play' });

    expect(emailInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
    
    expect(btn.disabled).toBe(true);

    userEvent.type(emailInput, testEmail);
    expect(emailInput.value).toBe(testEmail)
    expect(btn.disabled).toBe(true);

    
    userEvent.type(nameInput, testName);
    expect(nameInput.value).toBe(testName)
    expect(btn.disabled).toBe(false);

    userEvent.type(emailInput, ' ');
    expect(btn.disabled).toBe(true);
  })

  it('checks if upon clicking the "Play" button the route changes to "/game"', async () => {
    const {history} = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByLabelText('Digite o seu E-mail');
    const nameInput = screen.getByLabelText('Digite o seu Nome');
    const btn = screen.getByRole('button', { name: 'Play' });

    expect(emailInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
    
    userEvent.type(emailInput, testEmail);
    userEvent.type(nameInput, testName);
    userEvent.click(btn);

    await waitForElementToBeRemoved(emailInput);

    const { pathname } = history.location;
    expect(pathname).toBe('/game');

    const name = screen.getByTestId('header-player-name');
    const category = screen.getByTestId('question-category');
    const question = screen.getByTestId('question-text');

    expect(name).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(question).toBeInTheDocument();

  });

  it('checks the "Configurações" button', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const configBtn = screen.getByRole('button', { name: 'Configurações'});
    userEvent.click(configBtn);

    expect(configBtn).not.toBeInTheDocument();

    const { pathname } = history.location;
    expect(pathname).toBe('/settings');
  })
})