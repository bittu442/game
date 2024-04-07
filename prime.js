let currentQuestion = '';
let correctAnswer = '';
let score = 0;
let timeRemaining = 0;
let timerInterval;

function generateQuestion() {
    const category = getRandomInt(1, 5); // Including 5 categories now
    switch (category) {
        case 1:
            generatePrimeNumberQuestion();
            break;
        case 2:
            generateMissingOperatorQuestion();
            break;
        case 3:
            generateMixedOperationQuestion();
            break;
        case 4:
            generateYesOrNoQuestion();
            break;
        case 5:
            generateMultipleChoiceQuestion();
            break;
    }
    document.getElementById('quiz').textContent = currentQuestion;
}

function generatePrimeNumberQuestion() {
    const primeNum = getRandomInt(1, 50);
    currentQuestion = `Is ${primeNum} a prime number? (yes/no)`;
    correctAnswer = isPrime(primeNum) ? 'yes' : 'no';
}

function generateMissingOperatorQuestion() {
    const num1 = getRandomInt(1, 50);
    const num2 = getRandomInt(1, 50);
    const operator = ['+', '-', '*'][getRandomInt(0, 2)];
    currentQuestion = `${num1} ${operator} ${num2} = ?`;
    correctAnswer = eval(num1 + operator + num2);
}

function generateMixedOperationQuestion() {
    const num1 = getRandomInt(1, 20);
    const num2 = getRandomInt(1, 20);
    const num3 = getRandomInt(1, 20);
    const operator1 = ['+', '-', '*'][getRandomInt(0, 2)];
    const operator2 = ['+', '-'][getRandomInt(0, 1)];
    currentQuestion = `${num1} ${operator1} ${num2} ${operator2} ${num3} = ?`;
    correctAnswer = eval(num1 + operator1 + num2 + operator2 + num3);
}

function generateYesOrNoQuestion() {
    const num = getRandomInt(1, 50);
    currentQuestion = `Is ${num} a perfect square? (yes/no)`;
    correctAnswer = isPerfectSquare(num) ? 'yes' : 'no';
}

function generateMultipleChoiceQuestion() {
    const num = getRandomInt(1, 50);
    const options = [num, num + 1, num + 2, num + 3];
    const correctIndex = getRandomInt(0, 3);
    correctAnswer = options[correctIndex];
    currentQuestion = `Which of the following numbers is prime: ${options.join(', ')}?`;
}

function handleSubmit(event) {
    event.preventDefault();
    const inputElement = document.getElementById('answer');
    const userAnswer = inputElement.value.trim().toLowerCase();
    if (userAnswer === String(correctAnswer).toLowerCase()) {
        score++;
        document.getElementById('score').textContent = score;
        document.getElementById('result').textContent = 'Correct!';
    } else {
        document.getElementById('result').textContent = 'Incorrect!';
    }
    generateQuestion();
    inputElement.value = '';
}

function startTimer(duration) {
    timeRemaining = duration;
    const timerDisplay = document.getElementById('timer');
    timerInterval = setInterval(function () {
        timerDisplay.textContent = `Time remaining: ${timeRemaining} seconds`;
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            document.getElementById('quizForm').removeEventListener('submit', handleSubmit);
            document.getElementById('quiz').textContent = '';
            document.getElementById('result').textContent = `Time's up! Your final score is ${score}`;
        }
        timeRemaining--;
    }, 1000);
}

function handleSubmitT(event){
    event.preventDefault();
    let time = document.getElementById('time').value;
    startTimer(time*60);
    document.getElementById('timer_form').classList.remove('show');
    document.getElementById('timer_form').classList.add('hide');
    document.getElementById('content').classList.add('show');
    document.getElementById('content').classList.remove('hide');
    document.getElementById('score-div').classList.add('show');
    document.getElementById('score-div').classList.remove('hide');
}

document.addEventListener('DOMContentLoaded', function () {
    generateQuestion();
    document.getElementById('timer_form').addEventListener('submit', handleSubmitT);
    document.getElementById('quizForm').addEventListener('submit', handleSubmit);
});

// Helper functions

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
}

function isPerfectSquare(num) {
    return Math.sqrt(num) % 1 === 0;
}
