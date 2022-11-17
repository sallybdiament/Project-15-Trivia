import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { storeScore } from '../redux/actions/index';

class Game extends React.Component {
  state = {
    questionList: [],
    nextQuestion: false,
    qNum: 0,
    endQuestions: false,
    time: 30,
    level: '',
    difficulty: 0,
    currentInterval: '',
    mathRandomValue: '',
  }

  componentDidMount = () => {
    this.fetchQuestions();
    // this.timer();
    this.setState({ mathRandomValue: Math.random() });
  }

  fetchQuestions = async () => {
    const { history } = this.props;
    const errorCode = 3;
    const token = localStorage.getItem('token');
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    const { response_code: responseCode } = data;
    if (responseCode === errorCode) {
      history.push('/');
    }
    const { results } = data;

    const [firstQuestion] = results;

    const { difficulty: level } = firstQuestion;

    this.setState({
      questionList: results, level }, () => {
      this.setDifficulty();
      this.renderQuestions();
    });
  }

  setDifficulty = () => {
    const { level } = this.state;
    switch (level) {
    case 'hard':
      this.setState({ difficulty: 3 });
      break;
    case 'medium':
      this.setState({ difficulty: 2 });
      break;
    case 'easy':
      this.setState({ difficulty: 1 });
      break;
    default:
      return 0;
    }
  }

  calculateScore = () => {
    const { storeScoreDispatch } = this.props;
    const ten = 10;
    const { time, difficulty } = this.state;
    const result = ten + (time * difficulty);
    storeScoreDispatch(result);
  }

  renderQuestions = () => {
    const { questionList, qNum, mathRandomValue } = this.state;
    if (!questionList[qNum] || !mathRandomValue) return null;
    const correct = (
      <button
        className="btn"
        data-answer="correct"
        key="correct"
        type="button"
        data-testid="correct-answer"
        onClick={ this.calculateScore }
      >
        {questionList[qNum].correct_answer}
      </button>
    );

    const incorrects = questionList[qNum].incorrect_answers.map(
      (resp, index) => (
        <button
          className="btn"
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
    const random = mathRandomValue;
    const randomLimit = 0.55;

    if (random < randomLimit) {
      // this.setState({ shuffledQuestions: answersArray });
      return answersArray;
    }
    // this.setState({ shuffledQuestions: answerArray2 });
    return answerArray2;
  }

  /**
   * Apply CSS styles accordingly when either one of the answers's btn or the "Next" btn is clicked.
   * @param { HTMLButtonElement } target The target element that on which the click event occured.
   * @param { boolean } action If true, the function renders colored borders on the buttons; otherwise the borders' style are set to 'none'.
   * @param { boolean } isNextClick If true, the parent element from which to traverse down to the children will be accepted via the parameter "answersDiv"
   * @param { HTMLDivElement } answersDiv this param is only used when the "handleClickNext" function is called; its value is the div element that contains the answers buttons.
   * @returns { void } The function does not return anything.
   */
  applyBorderColor = (target, action, isNextClick = false, answersDiv = null) => {
    if (target && !target.type && action) return null;
    const parent = isNextClick ? answersDiv : target.parentElement;
    const children = Array.from(parent.querySelectorAll('button'));

    children.forEach((btn) => {
      if (btn.dataset.answer === 'correct') {
        btn.style.border = `${action ? '3px solid rgb(6 ,240, 15)' : 'thin inset #555'}`;
      } else {
        btn.style.border = `${action ? '3px solid rgb(255, 0, 0)' : 'thin inset #555'}`;
      }
    });
    this.setState({ nextQuestion: true });
  }

  renderText = (title) => {
    const { questionList, qNum } = this.state;
    if (questionList[qNum]) return questionList[qNum][`${title}`];
    return null;
  }

  handleClickNext = () => {
    const btnNext = document.querySelector('button[data-name="btn-next"]');
    const answersDiv = btnNext.parentElement.previousElementSibling;
    const { qNum } = this.state;
    const three = 3;
    if (qNum > three) {
      this.setState({ endQuestions: true });
    } else {
      this.setState({
        qNum: qNum + 1,
        nextQuestion: true,
        time: 30,
      }, () => {
        this.timer();
        this.handleBtnsDisabling(false);
        this.applyBorderColor(null, false, true, answersDiv);
        this.setState({ mathRandomValue: Math.random() });
      });
    }
  }

  timer = () => {
    const { currentInterval } = this.state;
    clearInterval(currentInterval);
    const ONE_SECOND = 1000;
    const interval = setInterval(() => {
      this.setState((state) => ({ time: state.time - 1 }), () => {
        const { time } = this.state;
        if (time === 0) {
          clearInterval(interval);
          this.handleBtnsDisabling(true);
        }
      });
    }, ONE_SECOND);
    this.setState({ currentInterval: interval });
  }

  handleBtnsDisabling = (action) => {
    const btnCorrect = document.querySelector('button[data-answer="correct"]');
    const btnsIncorrects = document.querySelectorAll('button[data-answer="incorrect"]');
    const btns = [btnCorrect, ...Array.from(btnsIncorrects)];
    btns.forEach((btn) => { btn.disabled = action; });
  }

  render() {
    const { time, nextQuestion, endQuestions } = this.state;
    return (
      <>
        <Header />
        <section className="game-container">
          <div className="questions-container">
            <p className="questions-category" data-testid="question-category">
              { this.renderText('category') }
            </p>
            <p className="questions-question" data-testid="question-text">
              { this.renderText('question') }
            </p>
            <p>{ `Tempo restante: ${time}` }</p>

            <div
              data-name="answers-container"
              role="presentation"
              type="div"
              data-testid="answer-options"
              onClick={ (e) => this.applyBorderColor(e.target, true) }
            >
              { this.renderQuestions() }
            </div>
            <div>
              { endQuestions && <Redirect to="/feedback" /> }
              { nextQuestion && (
                <button
                  data-name="btn-next"
                  type="button"
                  data-testid="btn-next"
                  onClick={ this.handleClickNext }
                >
                  Próxima
                </button>)}
            </div>
          </div>
        </section>
      </>
    );
  }
}

Game.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
  storeScoreDispatch: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  storeScoreDispatch: (payload) => dispatch(storeScore(payload)),
});

export default connect(null, mapDispatchToProps)(Game);
