import { DOMstrings } from './view';
import { createQuiz, readyQuiz } from './model';
import * as model from './model';
import * as view from './view';

export let data = {}

// function selectPlayers(amount) {
//     if (amount === '1') {
//         data.players = 1; // don't know if I need to do this
//         DOMstrings.playerSelect.style.display = 'none';
//         DOMstrings.inputForm.style.display = 'flex';
//     } else if (amount === '2') {
//         // set up UI for two player select
//         console.log('This is two player mode');
//         DOMstrings.playerSelect.style.display = 'none';
//         DOMstrings.twoPlayerForm.style.display = 'flex';  
//     }
// }

// // I have a lot of event listeners on the container, should I put all of them in one event listener?
// DOMstrings.container.addEventListener('click', function(e){
//     if (e.target.id === '1' || '2') {
//         selectPlayers(e.target.value);
//     }
// });

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
    data.player1 = new readyQuiz(data.newQuiz.results, data.newQuiz.amount);
    data.player1.setQuestion();
    model.setupQuestionBoard();
}


// set up event listeners to get name onto question page and 
DOMstrings.container.addEventListener('click', function(e){
    if (e.target.matches('.submitName')) {
        playQuiz(e);
    }
});


function selectAnswer(e) {
    // check to see if the answer matches the correct one
    if (e.target.id === data.player1.correctAnswer){
        data.player1.points++
    } 
    data.player1.nextQuestion();
}

DOMstrings.container.addEventListener('click', function(e){
    if (e.target.matches('li')) {
        selectAnswer(e);
    }
});



function resetQuiz() {
    if (data.player1.stage === 'result') {
        DOMstrings.resultsPage.style.display = 'none';
        view.clearHTML('.answerOptions');
        data.player1.setQuestion();
        model.setupQuestionBoard();
    } else {
        view.clearHTML('.answerOptions');
        data.player1.setQuestion();
        data.player1.updateHeader();
        data.player1.updateQuestion();
        data.player1.updateAnswers();
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












