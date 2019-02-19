import { quizQuestions} from './quizQuestions';
import { state } from './main';
import { DOMstrings } from './view';
import { clearHTML, displayResult } from './view';

export function setQuestion() {
    DOMstrings.question.style.display = 'block';
    DOMstrings.question.innerHTML = state.question;
}

export function setAnswers() {
    DOMstrings.answerOptions.style.display = 'block';
    
    let markup = '';

    for (let cur of state.answerOptions) {
        let html = '<li id="%id%">%question%</li>';
        let newHTML = html.replace('%question%', cur.content);
        newHTML = newHTML.replace('%id%', cur.points)
        markup += newHTML;
    }

    DOMstrings.answerOptions.insertAdjacentHTML('afterbegin', markup);
}

export function nextQuestion() {
    if (state.questionNumber >= quizQuestions.length - 1){
        displayResult();
    }
    state.questionNumber++;
    state.question = quizQuestions[state.questionNumber].question;
    state.answerOptions = quizQuestions[state.questionNumber].answers;; 
    clearHTML('.answerOptions');
    setQuestion();
    setAnswers();
}

export function updateHeader() {
    DOMstrings.header.style.display = 'flex';
    DOMstrings.questionNumber.style.display = 'block';
    DOMstrings.displayScore.style.display = 'block';
    
    DOMstrings.questionNumber.innerHTML = `${state.questionNumber + 1}/${quizQuestions.length}`;
    DOMstrings.name.innerHTML = state.name;
    // display score
    DOMstrings.displayScore.innerHTML = `${state.points}/${state.overallScore}`;
}