import { data } from './main';
import { DOMstrings } from './view';
import * as view from './view';



export const getUserInput = () => {
    // as the categories are identified using a number, the id in the object array in view.js, I need to get the 
    // value of the category the user enters in the input form and then find the name of the category in the list 
    function getCategoryID(category) {
        if (category) {
            const element = view.categories.find(cur => cur.name === category);
            return element.id;
        } else {
            return '';
        }
    }
    const quizSettings = {
        name: document.getElementById('name').value,
        amount: Number(DOMstrings.questionAmount.value),
        category: getCategoryID(DOMstrings.category.value),
        difficulty: DOMstrings.difficulty.value,
    }
    return quizSettings;
}

// create quiz class
export class createQuiz {
    constructor(name='', amount=10, category='', difficulty='') {
        this.name = name;
        this.amount = amount;
        this.category = category;
        this.difficulty = difficulty;
    }

    createFetchRequest(){
        let fetchRequest = '';
        // change this to switch statement
        if (this.name === '') {
            console.log('Please enter a name...')
        } else if (this.amount === 0 && this.category === '' && this.difficulty === ''){
            fetchRequest = 'https://opentdb.com/api.php?amount=10';
        } else if (this.amount === 0 && this.category === '') {
            fetchRequest = `https://opentdb.com/api.php?amount=10&difficulty=${this.difficulty}`;
        } else if (this.amount === 0 && this.difficulty === '') {
            fetchRequest = `https://opentdb.com/api.php?amount=10&category=${this.category}`;
        } else if (this.amount === 0) {
            fetchRequest = `https://opentdb.com/api.php?amount=10&category=${this.category}&difficulty=${this.difficulty}`;
        } else if (this.category === '' && this.difficulty === '') {
            fetchRequest = `https://opentdb.com/api.php?amount=${this.amount}`;
        } else if (this.difficulty === '') {
            fetchRequest = `https://opentdb.com/api.php?amount=${this.amount}&category=${this.category}`;
        } else if (this.category === '') {
            fetchRequest = `https://opentdb.com/api.php?amount=${this.amount}&difficulty=${this.difficulty}`;
        } else {
            fetchRequest = `https://opentdb.com/api.php?amount=${this.amount}&category=${this.category}&difficulty=${this.difficulty}`
        }
        this.fetchRequest = fetchRequest;
    }
    
    async getQuiz() {
        try {
            const result = await fetch(this.fetchRequest);
            const data = await result.json();
            this.results = data;
        } catch(err){
            console.log(err);
        }
    }
}

export class readyQuiz {
    constructor(questions, totalQuestions) {
        this.questions = questions;
        this.totalQuestions = totalQuestions; // use this to show the top score as well
    }
    // 1. get data from state
    setQuestion() {
        if(this.questions.response_code > 0) {
            console.log('Try being less selective, or lower the amount of questions...');
            return -1; // I don't know if this is the right way to stop a function from working
        }
        this.questionNumber = 0;
        this.currentQuestion = this.questions.results[0].question;
        this.correctAnswer = this.questions.results[0].correct_answer;
        this.category = this.questions.results[0].category;
        this.incorrectAnswers = this.questions.results[0].incorrect_answers;
        this.answerOptions = [this.correctAnswer, ...this.incorrectAnswers];
        this.points = 0;
    }
    updateQAndA() {
        this.questionNumber++;
        this.currentQuestion = this.questions.results[this.questionNumber].question;
        this.correctAnswer = this.questions.results[this.questionNumber].correct_answer;
        this.category = this.questions.results[this.questionNumber].category;
        this.incorrectAnswers = this.questions.results[this.questionNumber].incorrect_answers;
        // see if this is where you need to empty it ---- ?
        this.answerOptions = [];
        this.answerOptions = [this.correctAnswer, ...this.incorrectAnswers];
    
    }
    updateHeader() {
        // update question count
        DOMstrings.questionNumber.innerHTML = `${this.questionNumber + 1}/${this.totalQuestions}`;
        // update name (if needed)
        DOMstrings.name.innerHTML = data.newQuiz.name;
        // update score
        DOMstrings.displayScore.innerHTML = `${this.points}/${this.totalQuestions}`;
    }
    updateQuestion() {
        DOMstrings.question.innerHTML = this.currentQuestion;
    }
    updateAnswers() {
        let markup = '';
        const shuffledArray = shuffle(this.answerOptions);
        for (let cur of shuffledArray) {
            let html = '<li id="%id%">%question%</li>';
            let newHTML = html.replace('%question%', cur);
            newHTML = newHTML.replace('%id%', cur)
            markup += newHTML;
        }
        // recent addition because answer options weren't going after rest
        view.clearHTML('.answerOptions');
        DOMstrings.answerOptions.insertAdjacentHTML('afterbegin', markup);
    }
    nextQuestion() {
        // if no questions left, show results page
        if (this.questionNumber >= this.totalQuestions -1){
            this.stage = 'result';
            view.clearHTML('.resultsPage');
            view.displayResult();
        } else {
            view.clearHTML('.answerOptions');
            this.updateQAndA()
            view.setupAnswers();
            this.updateAnswers();
            this.updateQuestion();
            this.updateHeader();
        }
    }

}

export function setupQuestionBoard() {
    // display header
    view.setupHeader();
    data.quizInPlay.updateHeader();
    // questions
    view.setupQuestion();
    data.quizInPlay.updateQuestion();
    // answers
    view.setupAnswers();
    data.quizInPlay.updateAnswers(); // really this should be on the class and I should make a better function
    // resetBTN
    view.toggleBtns();
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




