let currentQuestion = '';
let correctAnswer = '';
let score = 0;
let timeRemaining = 0;
let timerInterval;

function generateQuestion() {
    const category = getRandomInt(1, 4);
    switch (category) {
        case 1:
            const num1 = getRandomInt(1, 50);
            const num2 = getRandomInt(1, 50);
            const operator = ['+', '-', '*'][getRandomInt(0, 2)];
            currentQuestion = `${num1} ${operator} ${num2}`;
            correctAnswer = eval(currentQuestion);
            break;
        case 2:
            const gcdNum1 = getRandomInt(1, 50);
            const gcdNum2 = getRandomInt(1, 50);
            currentQuestion = `GCD of ${gcdNum1} and ${gcdNum2}`;
            correctAnswer = gcd(gcdNum1, gcdNum2);
            break;
        case 3:
            const primeNum = getRandomInt(1, 50);
            currentQuestion = `Is ${primeNum} a prime number? (yes/no)`;
            correctAnswer = isPrime(primeNum) ? 'yes' : 'no';
            break;
        case 4:
            const progression = generateProgression();
            const missingIndex = getRandomInt(0, 4);
            const missingValue = progression[missingIndex];
            progression[missingIndex] = '...';
            currentQuestion = `Missing value in the progression: ${progression}`;
            correctAnswer = missingValue;
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
    console.log(typeof duration, duration)
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

// Function to generate a random integer between min and max (inclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate an arithmetic progression
function generateProgression() {
    const start = getRandomInt(1, 20);
    const difference = getRandomInt(1, 10);
    const progression = [start];
    for (let i = 0; i < 4; i++) {
        progression.push(start + difference * (i + 1));
    }
    return progression;
}

// Function to check if a number is prime
function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
}

// Function to calculate the greatest common divisor (GCD) of two numbers
function gcd(a, b) {
    while (b !== 0) {
        [a, b] = [b, a % b];
    }
    return a;
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



// Start the quiz when the page loads
document.addEventListener('DOMContentLoaded', function () {
    generateQuestion(); // Generate the first question


    document.getElementById('timer_form').addEventListener('submit', handleSubmitT);


      document.getElementById('quizForm').addEventListener('submit', handleSubmit);
});