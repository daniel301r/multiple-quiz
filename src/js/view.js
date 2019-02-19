export const DOMstrings = {
    question: document.querySelector('.question'),
    answerOptions: document.querySelector('.answerOptions'),
    container: document.querySelector('.container'),
    questionNumber: document.querySelector('.questionNumber'),
    name: document.querySelector('.name'),
    displayScore: document.querySelector('.displayScore'),
    inputForm: document.querySelector('.inputForm'),
    header: document.querySelector('.header')
}

export function clearHTML(node) {
    const thingToDelete = document.querySelector(node);
    while (thingToDelete.firstChild) {
        thingToDelete.removeChild(thingToDelete.firstChild);
    }
}

export function displayResult() {
    clearHTML('.container');
    // I tried using string literals but it doesn't seem to work, however, when I used a function expression
    // in another project it seemed to work
    let html = `
    <h1>Your result is: <span class="resultScore">%score%</span></h1>
        <p>This means that <span class="resultCaption">%comment%</span></p>
    `;
    html = html.replace('%score%', state.points);
    DOMstrings.container.insertAdjacentHTML('afterbegin', html);
}