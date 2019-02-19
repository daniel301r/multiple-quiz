import { quizQuestions} from './quizQuestions';
import { DOMstrings } from './view';
import * as model from './model';
import { clearHTML } from './view';

// set up state function to change questions etc.

export let state = {
    questionNumber: 0,
    question: quizQuestions[0].question,
    answerOptions: quizQuestions[0].answers,
    overallScore: quizQuestions.length * 3,
    points: 0,
    name: '',
    input: true
}



// I have added the points the from the object with quiz questions but probably better
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


function getName() {
    // store name in data then display it in header
    state.name = document.getElementById('name').value;
    // close input page and move to quiz
    // - oringally I just cleared the form but then the empty html element stayed,
    // now I've done both and it gets rid of all of it
    clearHTML('.inputForm');
    DOMstrings.inputForm.style.display = 'none';


    model.updateHeader();
    model.setQuestion();
    model.setAnswers();
}

// set up event listeners to get name on container
DOMstrings.container.addEventListener('click', function(e){
    if (e.target.matches('.submitName')) {
        getName();
    }
});













