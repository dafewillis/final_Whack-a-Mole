const reactors = document.querySelectorAll('.reactor');
const scoring = document.querySelector('.score')
const montgomeries = document.querySelectorAll('.montgomery')

let lastReactor;
let gameOver = false; 
let score = 0;

function popupTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randReactor(reactors) {
    const idx = Math.floor(Math.random() * reactors.length);
    const reactor = reactors[idx];
    if (reactor === lastReactor) {
        return randReactor(reactors);
    }

    lastReactor = reactor;
    return reactor;
}

function surprise() {
    const time = popupTime (500, 1000);
    const reactor = randReactor(reactors);
    reactor.classList.add('up');
    setTimeout(() => {
        reactor.classList.remove('up');
        if (!gameOver) surprise();
    }, time);
}

function gameOn() {
    scoring.textContent = 0;
    gameOver = false;
    score = 0;
    surprise();
    setTimeout(() => gameOver = true, 15000);
}

function whack(e) {
    if(!e.isTrusted) return;
    score++;
    this.classList.remove('up');
    scoring.textContent = score;
}

montgomeries.forEach(montgomery => montgomery.addEventListener('click', whack));

