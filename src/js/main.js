import { DOMstrings } from './view';
import { createQuiz, readyQuiz } from './model';
import * as model from './model';
import * as view from './view';

export let data = {}

const playQuiz = async (e) => {
    e.preventDefault();
    // get the inputs from the user
    const query = model.getUserInput();
    
    // create new quiz
    if(query) {
        // close input page and move to quiz
        view.toggleInputForm();
        view.renderLoader();

        data.newQuiz = new createQuiz(query.name, query.amount, query.category, query.difficulty);
        data.newQuiz.createFetchRequest();
        await data.newQuiz.getQuiz();
        view.clearLoader();
    }

    data.quizInPlay = new readyQuiz(data.newQuiz.results, data.newQuiz.amount);
    data.quizInPlay.setQuestion();
    model.setupQuestionBoard();
}


// set up event listeners to get name onto question page and 
DOMstrings.container.addEventListener('click', function(e){
    if (e.target.matches('.submitName')) {
        playQuiz(e);
    }
});


// ------- I added the content of the correct answer as the id so that I can check it against e.target.id
// -------- is it better to pass it in as a data attribute?
function selectAnswer(e) {
    // check to see if the answer matches the correct one
    if (e.target.id === data.quizInPlay.correctAnswer){
        data.quizInPlay.points++
    } 
    data.quizInPlay.nextQuestion();
}

DOMstrings.container.addEventListener('click', function(e){
    if (e.target.matches('li')) {
        selectAnswer(e);
    }
});



function resetQuiz() {
    if (data.quizInPlay.stage === 'result') {
        DOMstrings.resultsPage.style.display = 'none';
        view.clearHTML('.answerOptions');
        data.quizInPlay.setQuestion();
        model.setupQuestionBoard();
    } else {
        view.clearHTML('.answerOptions');
        data.quizInPlay.setQuestion();
        data.quizInPlay.updateHeader();
        data.quizInPlay.updateQuestion();
        data.quizInPlay.updateAnswers();
    }
}
document.body.addEventListener('click', function(e){
    if(e.target.matches('.startQuizAgain')){
        resetQuiz();
    }
});


function newQuiz() {
    // remove questions and answers or results page
    view.removeQandA();
    view.removeResultsPage();
    // remove btns
    view.toggleBtns();
    // add input form
    view.toggleInputForm();
    // clear data from data
    data = {};
}

document.body.addEventListener('click', function(e){
    if(e.target.matches('.newQuiz')){
        newQuiz();
    }
});












