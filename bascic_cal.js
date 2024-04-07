let currentQuestion = '';
let correctAnswer = '';
let score = 0;
let timeRemaining = 0;
let timerInterval;

function generateQuestion() {
    const category = getRandomInt(1, 4);
    switch (category) {
        case 1:
            generatePatternRecognition();
            break;
        case 2:
            generateMissingOperator();
            break;
        case 3:
            generateMixedOperation();
            break;
        case 4:
            generateMultipleChoice();
            break;
    }
    document.getElementById('quiz').textContent = currentQuestion;
}

function handleSubmit(event) {
    event.preventDefault(); // Prevents the default form submission

    // Get the input value
    const inputElement = document.getElementById('answer');
    const userAnswer = inputElement.value.trim().toLowerCase();
    // Array of emoji
    const emojis = ['🤔','😊','🥳','😎','🧐','😃','😍','😱','😲','😈','🤓','😇','😨','😝','😜']; 

    // Pick a random emoji
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];



    // Check if the user's answer is correct
    if (userAnswer === String(correctAnswer).toLowerCase()) {
        score++;
        
        document.getElementById('score').textContent = score;
        document.getElementById('result').textContent = 'Correct!';
    } else {
        document.getElementById('result').textContent = 'Incorrect!';
    }

    // Generate a new question after each answer submission
    generateQuestion();

    // Clear the input field
    inputElement.value = '';
}

// Function to generate a random integer between min and max (inclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generatePatternRecognition() {
    const start = getRandomInt(1, 10);
    const difference = getRandomInt(1, 5);
    const termPosition = getRandomInt(1, 4);
    const missingTerm = start + (termPosition - 1) * difference;
    currentQuestion = `What is the ${termPosition}th term in the sequence: ${start}, __, __, __, ${missingTerm}?${randomEmoji}`;
    correctAnswer = start + (termPosition - 1) * difference;
}

function generateMissingOperator() {
    const num1 = getRandomInt(1, 10);
    const num2 = getRandomInt(1, 10);
    const operators = ['+', '-', '*'];
    const operator = operators[getRandomInt(0, 2)];
    currentQuestion = `${num1} ${operator} ${num2} = ?`;
    switch (operator) {
        case '+':
            correctAnswer = num1 + num2;
            break;
        case '-':
            correctAnswer = num1 - num2;
            break;
        case '*':
            correctAnswer = num1 * num2;
            break;
    }
}

function generateMixedOperation() {
    const num1 = getRandomInt(1, 10);
    const num2 = getRandomInt(1, 10);
    const num3 = getRandomInt(1, 10);
    const operators = ['+', '-', '*'];
    const operator1 = operators[getRandomInt(0, 2)];
    const operator2 = operators[getRandomInt(0, 2)];
    currentQuestion = `${num1} ${operator1} ${num2} ${operator2} ${num3} = ?${randomEmoji}`;
    const intermediateResult = eval(`${num1} ${operator1} ${num2}`);
    switch (operator2) {
        case '+':
            correctAnswer = intermediateResult + num3;
            break;
        case '-':
            correctAnswer = intermediateResult - num3;
            break;
        case '*':
            correctAnswer = intermediateResult * num3;
            break;
    }
}

function generateMultipleChoice() {
    const num1 = getRandomInt(1, 10);
    const num2 = getRandomInt(1, 10);
    const operator = ['+', '-', '*'][getRandomInt(0, 2)];
    currentQuestion = `What is ${num1} ${operator} ${num2}?${randomEmoji}`;
    correctAnswer = eval(`${num1} ${operator} ${num2}`);
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
            document.getElementById('result').textContent = ` "Oops,Times up!" Your final score is ${score}`;
        }

        timeRemaining--;
    }, 1000);
}
function handleSubmitT(event){
    event.preventDefault(); // Prevents the default form submission

    let time = document.getElementById('time').value;
    startTimer(time*60); // Set the timer duration in seconds (e.g., 120 seconds = 2 minutes)
     document.getElementById('timer_form').classList.remove('show')
    
    document.getElementById('timer_form').classList.add('hide')

    document.getElementById('content').classList.add('show')

    document.getElementById('content').classList.remove('hide')
    

    document.getElementById('score-div').classList.add('show')

    document.getElementById('score-div').classList.remove('hide')

}

// Function to generate a random integer between min and max (inclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Start the quiz when the page loads
document.addEventListener('DOMContentLoaded', function () {
    generateQuestion(); // Generate the first question

    document.getElementById('timer_form').addEventListener('submit', handleSubmitT);
    document.getElementById('quizForm').addEventListener('submit', handleSubmit);
});

