import { data } from './main'; 


export const DOMstrings = {
    question: document.querySelector('.question'),
    answerOptions: document.querySelector('.answerOptions'),
    container: document.querySelector('.container'),
    questionNumber: document.querySelector('.questionNumber'),
    name: document.querySelector('.name'),
    displayScore: document.querySelector('.displayScore'),
    inputForm: document.querySelector('.inputForm'),
    header: document.querySelector('.header'),
    resetBtn: document.querySelector('.startQuizAgain'),
    newQuiz: document.querySelector('.newQuiz'),
    resultsPage: document.querySelector('.resultsPage'),
    categoryList: document.getElementById('categories'),
    questionAmount: document.getElementById('amount'),
    difficulty: document.getElementById('difficulty'),
    category: document.getElementById('categories'),
    loader: document.querySelector('.loader'),
    loaderSpinner: document.querySelector('.loader i'),
    buttonDiv: document.querySelector('.resetBtns'),

}

export function toggleInputForm() {
    if (DOMstrings.inputForm.style.display === 'none'){
        DOMstrings.inputForm.style.display = 'flex';
    } else {
        DOMstrings.inputForm.style.display = 'none';
    }   
}
export function setupQuestion() {
    DOMstrings.question.style.display = 'block';
}
export function setupAnswers() {
    DOMstrings.answerOptions.style.display = 'block';
}
export function toggleBtns() {
    if (DOMstrings.buttonDiv.style.display === 'flex'){
        DOMstrings.buttonDiv.style.display = 'none';
    } else {
        DOMstrings.buttonDiv.style.display = 'flex';
    }
    
}
export function setupHeader() {
    // change display setting to show elements
    DOMstrings.header.style.display = 'flex';
    DOMstrings.questionNumber.style.display = 'block';
    DOMstrings.displayScore.style.display = 'block';
}

export function removeQandA() {
    DOMstrings.question.style.display = 'none';
    DOMstrings.answerOptions.style.display = 'none';
    DOMstrings.header.style.display = 'none';
    DOMstrings.questionNumber.style.display = 'none';
    DOMstrings.displayScore.style.display = 'none';
}

export function displayResult() {
    removeQandA();
    
    DOMstrings.resultsPage.style.display = 'block';
    
    let html = `
            <h1>Your result is: <span class="resultScore">${data.quizInPlay.points}/${data.quizInPlay.totalQuestions}</span></h1>
            <p>This means that <span class="resultCaption">%comment%</span></p>
    `;

    const comment1 = `${data.newQuiz.name}, you need to hit the books more`;
    const comment2 = `${data.newQuiz.name}, you are doing ok...`;
    const comment3 = `${data.newQuiz.name}, you are quite a clever person`;

    if (data.quizInPlay.points <= data.quizInPlay.totalQuestions * 0.5) { 
        html = html.replace('%comment%', comment1);
    } else if (data.quizInPlay.points > data.quizInPlay.totalQuestions * 0.5 && data.quizInPlay.points <= data.quizInPlay.totalQuestions * 0.75) {
        html = html.replace('%comment%', comment2);      
    } else {
        html = html.replace('%comment%', comment3); 
    }
    DOMstrings.resultsPage.insertAdjacentHTML('afterbegin', html);
}

export const categories = [
    {id: 9, name: "General Knowledge"},
    {id: 10, name: "Entertainment: Books"},
    {id: 11, name: "Entertainment: Film"},
    {id: 12, name: "Entertainment: Music"},
    {id: 13, name: "Entertainment: Musicals & Theatres"},
    {id: 14, name: "Entertainment: Television"},
    {id: 15, name: "Entertainment: Video Games"},
    {id: 16, name: "Entertainment: Board Games"},
    {id: 17, name: "Science & Nature"},
    {id: 18, name: "Science: Computers"},
    {id: 19, name: "Science: Mathematics"},
    {id: 20, name: "Mythology"},
    {id: 21, name: "Sports"},
    {id: 22, name: "Geography"},
    {id: 23, name: "History"},
    {id: 24, name: "Politics"},
    {id: 25, name: "Art"},
    {id: 26, name: "Celebrities"},
    {id: 27, name: "Animals"},
    {id: 28, name: "Vehicles"},
    {id: 29, name: "Entertainment: Comics"},
    {id: 30, name: "Science: Gadgets"},
    {id: 31, name: "Entertainment: Japanese Anime & Manga"},
    {id: 32, name: "Entertainment: Cartoon & Animations"}
]

export function createCategoryList(categories) {
    let markup = '';
    for (let cur of categories) {
        let html = `<option value="${cur.name}" id="${cur.id}">${cur.name}</option>`;
        markup += html;
    }
    DOMstrings.categoryList.insertAdjacentHTML('beforeend', markup);
}

// this needs to go in some sort of init function
createCategoryList(categories);

export function clearHTML(node) {
    const thingToDelete = document.querySelector(node);
    while (thingToDelete.firstChild) {
        thingToDelete.removeChild(thingToDelete.firstChild);
    }
}

export function renderLoader() {
    const loader = `
        <div class="loader">
            <i class="fas fa-spinner"></i>
        </div>
    `;
    DOMstrings.container.insertAdjacentHTML('afterbegin', loader);
}

export function clearLoader() {
    const loader = document.querySelector('.loader');
    if (loader) loader.parentElement.removeChild(loader);
}


