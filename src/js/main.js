import { DOMstrings } from './view';
import { createQuiz, readyQuiz } from './model';
import * as model from './model';
import * as view from './view';

export let data = {
    twoPlayer: false,
    secondQuiz: false,
    player1turn: true
}

function selectPlayers(amount) {
    if (amount === '1') {
        data.players = 1; // don't know if I need to do this
        DOMstrings.playerSelect.style.display = 'none';
        DOMstrings.inputForm.style.display = 'flex';
    } else if (amount === '2') {
        //add data here to state to say it is two player
        data.twoPlayer = true;
        DOMstrings.playerSelect.style.display = 'none';
        // put the normal form here and just collect the data to a different place
        DOMstrings.inputForm.style.display = 'flex';
    }
}

// I have a lot of event listeners on the container, should I put all of them in one event listener?
DOMstrings.container.addEventListener('click', function(e){
    if (e.target.value === '1' || '2') {
        selectPlayers(e.target.value);
    }
});

const playQuiz = async (e) => {
    e.preventDefault();
    
    // get the inputs from the user
    const query = model.getUserInput();

    // create new quiz
    if(query) {
        if(data.secondQuiz && data.twoPlayer) {
            // close input page and move to quiz
            view.toggleInputForm();
            view.renderLoader();

            // create quiz
            data.newQuiz2 = new createQuiz(query.name, query.amount, query.category, query.difficulty);
            data.newQuiz2.createFetchRequest();
            await data.newQuiz2.getQuiz();
            view.clearLoader();
        } else { // this is player 1
            // close input page and move to quiz
            view.toggleInputForm();
            view.renderLoader();

            // create quiz
            data.newQuiz1 = new createQuiz(query.name, query.amount, query.category, query.difficulty);
            data.newQuiz1.createFetchRequest();
            await data.newQuiz1.getQuiz();
            view.clearLoader();
        }
    }
    
    if (data.twoPlayer && !data.secondQuiz) {
        // 1. add the player1 quiz
        data.player1 = new readyQuiz(data.newQuiz1.results, data.newQuiz1.amount);
        // 2. clear input form data

        // 3. show input form
        view.toggleInputForm();
        // 4. tell it that it is the second quiz
        data.secondQuiz = true;
        // 5. stop function from running
        return -1;
    }
    
    if(data.secondQuiz && data.twoPlayer){
        data.player2 = new readyQuiz(data.newQuiz2.results, data.newQuiz2.amount, data.newQuiz2.name);
        // this is to set up the quiz for the first player first question
        data.player1.setQuestion();
        data.player2.setQuestion();
        model.setupQuestionBoard(1);
    } else { // this is one player
        data.player1 = new readyQuiz(data.newQuiz1.results, data.newQuiz1.amount, data.newQuiz1.name);
        data.player1.setQuestion();
        model.setupQuestionBoard(1);
    }


}


// set up event listeners to get name onto question page and 
DOMstrings.container.addEventListener('click', function(e){ 
    if (e.target.matches('.submitQuiz')) {
        // if two players then load the question board again
        playQuiz(e);
    }
});


function selectAnswer(e) {
    if (data.player1turn){ // check to see if player 1 turn
        console.log('it knows it is player 1 turn')
        if (e.target.id === data.player1.correctAnswer){ // check if answer is correct
            data.player1.points++
        } 
        // change to player two first questions
        console.log('setting up question board')
        model.setupQuestionBoard(2);
        data.player1turn = false;
        console.log(data)
    }
    // data.player1.nextQuestion();
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
        // will have to change this later to add two player functionality
        model.setupQuestionBoard(1);
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
    // clear quiz data from data
    

    
    if(data.twoPlayer){
        // don't do anything at the moment
        // I've added new parameters to the data
    } else {
        data.player1 = {};
    }  
    // data = {};
}

document.body.addEventListener('click', function(e){
    if(e.target.matches('.newQuiz')){
        newQuiz();
    }
});















