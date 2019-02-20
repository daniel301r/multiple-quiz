import { state } from './main'; 
import { quizQuestions} from './quizQuestions';

export const DOMstrings = {
    question: document.querySelector('.question'),
    answerOptions: document.querySelector('.answerOptions'),
    container: document.querySelector('.container'),
    questionNumber: document.querySelector('.questionNumber'),
    name: document.querySelector('.name'),
    displayScore: document.querySelector('.displayScore'),
    inputForm: document.querySelector('.inputForm'),
    header: document.querySelector('.header'),
    resetBtn: document.querySelector('.resetBtn'),
    resultsPage: document.querySelector('.resultsPage')
}

export function closeInputForm() {
    DOMstrings.inputForm.style.display = 'none';
}

export function displayQuestion() {
    DOMstrings.question.style.display = 'block';
}

export function displayAnswers() {
    DOMstrings.answerOptions.style.display = 'block';
}

export function displayResetBtn() {
    DOMstrings.resetBtn.style.display = 'block';
}

export function clearHTML(node) {
    const thingToDelete = document.querySelector(node);
    while (thingToDelete.firstChild) {
        thingToDelete.removeChild(thingToDelete.firstChild);
    }
}

export function displayHeader() {
    // change display setting to show elements
    DOMstrings.header.style.display = 'flex';
    DOMstrings.questionNumber.style.display = 'block';
    DOMstrings.displayScore.style.display = 'block';
}

export function displayResult() {
    clearHTML('.container');
    
    // --------- I tried using string literals but it doesn't seem to work, however, when I used a function expression
    // in another project it seemed to work
    let html = `
        <div class="resultsPage">
            <h1>Your result is: <span class="resultScore">%score%</span></h1>
            <p>This means that <span class="resultCaption">%comment%</span></p>
        </div>
    `;
    html = html.replace('%score%', state.points);

    const comment1 = `${state.name}, you are a crazy person`;
    const comment2 = `${state.name}, you are a normal person`;
    const comment3 = `${state.name}, you are quite a clever person`;

    if (state.points <= state.overallScore * 0.6) { 
        html = html.replace('%comment%', comment1);
    } else if (state.points >= state.overallScore * 0.6 && state.points <= state.overallScore * 0.8) {
        html = html.replace('%comment%', comment2);      
    } else {
        html = html.replace('%comment%', comment3); 
    }

    DOMstrings.container.insertAdjacentHTML('afterbegin', html);
}