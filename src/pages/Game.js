import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';

class Game extends React.Component {
  state = {
    questionList: [],
    loaded: false,
    nextQuestion: true,
    qNum: 0,
    endQuestions: false,
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  fetchQuestions = async () => {
    const errorCode = 3;
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    const { response_code: responseCode, results } = data;
    if (responseCode === errorCode) {
      history.push('/');
    }
    this.setState({ questionList: results, loaded: true });
  }

  renderQuestions = () => {
    const { questionList, qNum } = this.state;
    if (!questionList[qNum]) return null;
    const correct = (
      <button
        data-answer="correct"
        key="correct"
        type="button"
        data-testid="correct-answer"
      >
        {questionList[qNum].correct_answer}
      </button>
    );

    const incorrects = questionList[qNum].incorrect_answers.map(
      (resp, index) => (
        <button
          data-answer="incorrect"
          key={ index }
          type="button"
          data-testid={ `wrong-answer-${index}` }
        >
          {resp}
        </button>),
    );
    const answersArray = [correct, ...incorrects];
    const answerArray2 = [...incorrects, correct];
    const random = Math.random();
    const randomLimit = 0.55;

    if (random < randomLimit) {
      return answersArray;
    }
    return answerArray2;
  }

  handleClick = ({ target }) => {
    if (!target.type) return null;
    console.log(target.parentElement);
    const parent = target.parentElement;
    console.log(Array.from(parent.children));
    const children = Array.from(parent.children);

    children.forEach((btn) => {
      if (btn.dataset.answer === 'correct') {
        btn.style.border = '3px solid rgb(6 ,240, 15)';
      } else {
        btn.style.border = '3px solid rgb(255, 0, 0)';
      }
    });
    this.setState({ nextQuestion: false });
  }

  renderText = (title) => {
    const { questionList, qNum } = this.state;
    if (questionList[qNum]) return questionList[qNum][`${title}`];
    return null;
  }

  handleClickNext = () => {
    const { qNum } = this.state;
    const three = 3;
    if (qNum > three) {
      this.setState({ endQuestions: true });
      // const { history } = this.props;
      // history.push('/feedback');
    } else {
      this.setState({ qNum: qNum + 1, nextQuestion: true });
    }
  }

  render() {
    const { loaded, nextQuestion, endQuestions } = this.state;
    return (
      <>
        <Header />
        <p data-testid="question-category">{ this.renderText('category') }</p>
        <p data-testid="question-text">{ this.renderText('question') }</p>
        <div
          role="presentation"
          type="div"
          data-testid="answer-options"
          onClick={ this.handleClick }
        >
          { loaded && this.renderQuestions() }
        </div>
        <div>
          { endQuestions && <Redirect to="/feedback" /> }
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.handleClickNext }
            disabled={ nextQuestion }
          >
            Next
          </button>
        </div>
      </>
    );
  }
}

Game.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default Game;
