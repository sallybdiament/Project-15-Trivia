import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { storeScore } from '../redux/actions/index';

class GameShuffle extends React.Component {
  state = {
    questionList: [],
    loaded: false,
    nextQuestion: false,
    qNum: 0,
    endQuestions: false,
    time: 30,
    optionsDisabled: false,
    level: '',
    difficulty: 0,
  }

  componentDidMount = () => {
    this.fetchQuestions();
    this.timer();
    // this.setDifficulty();
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
    console.log(data);
    const { results } = data;
    const [firstQuestion] = results;
    console.log(firstQuestion);
    const { difficulty: level } = firstQuestion;
    console.log(level);

    this.setState({
      questionList: results, loaded: true, level }, () => this.setDifficulty());
  }

  setDifficulty = () => {
    const { level } = this.state;
    console.log(level);
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
    console.log(time, difficulty);
    const result = ten + (time * difficulty);
    console.log(typeof result, result);
    storeScoreDispatch(result);
  }

  renderQuestions = () => {
    const { questionList, qNum, optionsDisabled } = this.state;
    if (!questionList[qNum]) return null;
    const correct = (
      <button
        className="btn"
        data-answer="correct"
        key="correct"
        type="button"
        data-testid="correct-answer"
        disabled={ optionsDisabled }
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
          disabled={ optionsDisabled }
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
    const parent = target.parentElement;
    const children = Array.from(parent.children);

    children.forEach((btn) => {
      if (btn.dataset.answer === 'correct') {
        btn.style.border = '3px solid rgb(6 ,240, 15)';
      } else {
        btn.style.border = '3px solid rgb(255, 0, 0)';
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
    const { qNum } = this.state;
    const three = 3;
    if (qNum > three) {
      this.setState({ endQuestions: true });
    } else {
      this.setState({
        qNum: qNum + 1,
        nextQuestion: true,
        time: 30,
        optionsDisabled: false }, () => this.timer());
    }
  }

  timer = () => {
    const ONE_SECOND = 1000;
    const interval = setInterval(() => {
      this.setState((state) => ({ time: state.time - 1 }), () => {
        const { time } = this.state;
        if (time === 0) {
          this.setState({ optionsDisabled: true }, () => clearInterval(interval));
        }
      });
    }, ONE_SECOND);
  }

  render() {
    const { time, loaded, nextQuestion, endQuestions } = this.state;
    return (
      <>
        <Header />
        <section className="game-container">
          <div className="questions-container">
            <p data-testid="question-category">{ this.renderText('category') }</p>
            <p data-testid="question-text">{ this.renderText('question') }</p>
            <p>{ `Tempo restante: ${time}` }</p>

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
              { nextQuestion && (
                <button
                  type="button"
                  data-testid="btn-next"
                  onClick={ this.handleClickNext }
                >
                  Próximo
                </button>)}
            </div>
          </div>
        </section>
      </>
    );
  }
}

GameShuffle.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
  storeScoreDispatch: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  storeScoreDispatch: (payload) => dispatch(storeScore(payload)),
});

export default connect(null, mapDispatchToProps)(GameShuffle);
