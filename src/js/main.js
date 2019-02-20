import { quizQuestions} from './quizQuestions';
import { DOMstrings } from './view';
import * as model from './model';
import * as view from './view';

// set up state function to change questions etc.

export let state = {
    questionNumber: 0,
    question: quizQuestions[0].question,
    answerOptions: quizQuestions[0].answers,
    overallScore: quizQuestions.length * 3,
    points: 0,
    name: '',
    stage: 'input'
}

function submitName(e) {
    // I added this to prevent page refresh - it kept going back to input page
    e.preventDefault();
    // store name in data then display it in header
    model.getName();
    // close input page and move to quiz (I deleted the clear html)
    view.closeInputForm();
    

    // display header
    view.displayHeader();
    model.updateHeader();
    // questions
    view.displayQuestion();
    model.setQuestion();
    // answers
    view.displayAnswers();
    model.setAnswers();
    // resetBTN
    view.displayResetBtn();

    state.stage = 'questions'
    console.log(state.question);
}

// set up event listeners to get name onto question page
DOMstrings.container.addEventListener('click', function(e){
    if (e.target.matches('.submitName')) {
        submitName(e);
    }
});

/* 

select answers

reset button

*/

// ------- I have added the points the from the object with quiz questions but probably better
// adding in a data-set rather than passing it in as the id?

function selectAnswer(e) {
    state.points += Number(e.target.id);
    model.updateHeader();
    model.nextQuestion();

}

DOMstrings.container.addEventListener('click', function(e){
    if (e.target.matches('li')) {
        selectAnswer(e);
    }
});



function resetQuiz() {
    if (state.stage === 'result') {
        const name = state.name;
        state = {
            questionNumber: 0,
            question: quizQuestions[0].question,
            answerOptions: quizQuestions[0].answers,
            overallScore: quizQuestions.length * 3,
            points: 0,
            name: name
        }
        // make the results page hidden and then make the others appear
        DOMstrings.resultsPage.style.display = 'none';

        model.updateHeader();
        view.displayQuestion();
        model.setAnswers();
    } else {
        const name = state.name;
        state = {
            questionNumber: 0,
            question: quizQuestions[0].question,
            answerOptions: quizQuestions[0].answers,
            overallScore: quizQuestions.length * 3,
            points: 0,
            name: name
        }
        view.clearHTML('.answerOptions');
        model.updateHeader();
        view.displayQuestion();
        model.setAnswers();
    }
}

document.body.addEventListener('click', function(e){
    if(e.target.matches('.resetBtn')){
        resetQuiz();
    }
});












