import { quizQuestions} from './quizQuestions';
import { state } from './main';
import { DOMstrings } from './view';
import * as view from './view';

export function getName() {
    state.name = document.getElementById('name').value;
}

export function updateHeader() {
    // update question count
    DOMstrings.questionNumber.innerHTML = `${state.questionNumber + 1}/${quizQuestions.length}`;
    // update name (if needed)
    DOMstrings.name.innerHTML = state.name;
    // update score
    DOMstrings.displayScore.innerHTML = `${state.points}/${state.overallScore}`;
}

export function setQuestion() {
    DOMstrings.question.innerHTML = state.question;
}

export function setAnswers() {  
    let markup = '';
    const shuffledArray = shuffle(state.answerOptions);
    for (let cur of shuffledArray) {
        let html = '<li id="%id%">%question%</li>';
        let newHTML = html.replace('%question%', cur.content);
        newHTML = newHTML.replace('%id%', cur.points)
        markup += newHTML;
    }
    DOMstrings.answerOptions.insertAdjacentHTML('afterbegin', markup);
}

function updateQuestionAndAnswers() {
    state.questionNumber++;
    state.question = quizQuestions[state.questionNumber].question;
    state.answerOptions = quizQuestions[state.questionNumber].answers; 
}

export function nextQuestion() {
    // if no questions left, show results page
    if (state.questionNumber >= quizQuestions.length - 1){
        state.stage = 'result';
        view.displayResult();
    } else {
        view.clearHTML('.answerOptions');
        setQuestion();
        setAnswers();
        updateQuestionAndAnswers()
        updateHeader();
    }

}

const shuffle = function (array) {

	let currentIndex = array.length;
	let temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
};