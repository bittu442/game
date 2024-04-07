let currentQuestion = '';
let correctAnswer = '';
let score = 0;
let timeRemaining = 0;
let timerInterval;

function generateQuestion() {
    const category = getRandomInt(1, 5); // Including new challenge types
    switch (category) {
        case 1:
            const gcdNum1 = getRandomInt(1, 50);
            const gcdNum2 = getRandomInt(1, 50);
            currentQuestion = `GCD of ${gcdNum1} and ${gcdNum2}`;
            correctAnswer = gcd(gcdNum1, gcdNum2);
            break;
        case 2:
            const gcdIdentifyNum = getRandomInt(1, 50);
            const gcdIdentifyDivisor = getRandomInt(2, gcdIdentifyNum);
            currentQuestion = `Identify if ${gcdIdentifyDivisor} is a divisor of ${gcdIdentifyNum} (yes/no)`;
            correctAnswer = gcdIdentifyNum % gcdIdentifyDivisor === 0 ? 'yes' : 'no';
            break;
        case 3:
            const gcdPuzzleNum1 = getRandomInt(1, 20);
            const gcdPuzzleNum2 = gcdPuzzleNum1 * getRandomInt(2, 5);
            currentQuestion = `What is the GCD of ${gcdPuzzleNum1} and ${gcdPuzzleNum2}?`;
            correctAnswer = gcd(gcdPuzzleNum1, gcdPuzzleNum2);
            break;
        case 4:
            const gcdFactorizationNum = getRandomInt(1, 50);
            const gcdFactors = getGCDFactors(gcdFactorizationNum);
            currentQuestion = `Factorize ${gcdFactorizationNum} and find its GCD factors: ${gcdFactors.join(', ')}`;
            correctAnswer = gcd(gcdFactors);
            break;
        case 5:
            const gcdMultipleChoiceNum = getRandomInt(1, 50);
            const gcdMCOptions = generateMultipleChoiceOptions(gcdMultipleChoiceNum);
            const gcdMCIndex = getRandomInt(0, 3);
            currentQuestion = `What is the GCD of ${gcdMultipleChoiceNum}?`;
            correctAnswer = gcd(gcdMultipleChoiceNum);
            gcdMCOptions[gcdMCIndex] = correctAnswer;
            break;
    }
    document.getElementById('quiz').textContent = currentQuestion;
}

function handleSubmit(event) {
    event.preventDefault(); // Prevents the default form submission

    // Get the input value
    const inputElement = document.getElementById('answer');
    const userAnswer = inputElement.value.trim().toLowerCase();

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

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateMultipleChoiceOptions(num) {
    const options = [];
    for (let i = 0; i < 4; i++) {
        options.push(getRandomInt(num - 10, num + 10));
    }
    return options;
}

function getGCDFactors(num) {
    const factors = [];
    for (let i = 1; i <= num; i++) {
        if (num % i === 0) {
            factors.push(i);
        }
    }
    return factors;
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
