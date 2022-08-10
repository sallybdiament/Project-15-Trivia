import React from 'react';
import Feedback from '../pages/Feedback';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { screen, render, waitForElementToBeRemoved, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const wait = (seconds) => new Promise((resolve) => setTimeout(resolve(0), seconds * 1000));

describe('test the Feedback component', () => {
    it('should render the header', () => {
        renderWithRouterAndRedux(<Feedback />);
        const imgGravatar = screen.getByTestId('header-profile-picture');
        const score = screen.getByTestId('feedback-total-score');
        const assertions = screen.getByTestId('feedback-total-question');
        expect(imgGravatar).toBeInTheDocument();
        expect(score).toBeInTheDocument();
        expect(assertions).toBeInTheDocument();
    })
    it('Go to Login when clicking in the button Play Again', () => {
        const { history } = renderWithRouterAndRedux(<App />);
        history.push('/feedback');
        const btnPlayAgain = screen.getByTestId('btn-play-again');
        userEvent.click(btnPlayAgain);
        const { pathname } = history.location;
        expect(pathname).toBe('/');
    
        const emailInput = screen.getByLabelText('Digite o seu E-mail');
        expect(emailInput).toBeInTheDocument();
    })
    it('Go to Ranking when clicking in the button Ranking', () => {
        const { history } = renderWithRouterAndRedux(<App />);
        history.push('/feedback');
        const btnRanking = screen.getByTestId('btn-ranking');
        userEvent.click(btnRanking);
        const { pathname } = history.location;
        expect(pathname).toBe('/ranking');
    
        const btnPlayAgain = screen.getByTestId('btn-go-home');
        expect(btnPlayAgain).toBeInTheDocument();
    })
    it('checks if the message "Could be better..." is rendered if the asserts is less than 3', () => {
        renderWithRouterAndRedux(<Feedback />);
        const badFeedback = screen.getByTestId('feedback-text');
        expect(badFeedback).toBeInTheDocument();
    })
})
