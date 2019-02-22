import { DOMstrings } from './view';
import { createQuiz, readyQuiz } from './model';
import * as model from './model';
import * as view from './view';

// why is this able to be const when it is updating and changing as 
// I do things in the app
export const data = {}

const getQuizQuestions = async () => {
    // get the inputs from the user
    const query = model.getUserInput();
    // create new quiz
    if(query) {
        data.newQuiz = new createQuiz(query.name, query.amount, query.category, query.difficulty);
        data.newQuiz.createFetchRequest();
        await data.newQuiz.getQuiz();
    }
    // I had to call this function here because it was loading before the promise had returned
    // in my submitName function below
    setupQuiz();
}

function setupQuiz() {
    // create the playing quiz class to handle events etc during play
    data.quizInPlay = new readyQuiz(data.newQuiz.results, data.newQuiz.amount);
    data.quizInPlay.setQuestion();
}

function playQuiz(e) {
    e.preventDefault();
    // close input page and move to quiz
    view.closeInputForm();
    
    getQuizQuestions(); // this is the function that I have to wait for
    view.setupRender();
    // because I had to wait for the promise to return
    setTimeout(model.setupQuestionBoard, 2000);
    setTimeout(view.closeRender, 2000);

    // it is closing 
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
    if(e.target.matches('.resetBtn')){
        resetQuiz();
    }
});












