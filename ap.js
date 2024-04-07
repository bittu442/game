let currentQuestion = '';
let correctAnswer = '';
let score = 0;
let timeRemaining = 0;
let timerInterval;

function generateQuestion() {
    const category = getRandomInt(1, 2); // Randomly choose between 1 (missing value) and 2 (MCQ)
    switch (category) {
        case 1:
            generateMissingValueQuestion();
            break;
        case 2:
            generateMCQQuestion();
            break;
    }
    document.getElementById('quiz').textContent = currentQuestion;
}

function generateMissingValueQuestion() {
    const progression = generateProgression();
    const missingIndex = getRandomInt(0, 4);
    const missingValue = progression[missingIndex];
    progression[missingIndex] = '...';
    currentQuestion = `Missing value in the progression: ${progression}`;
    correctAnswer = missingValue;
}

function generateMCQQuestion() {
    const progression = generateProgression();
    const options = [];
    const correctIndex = getRandomInt(0, 3);
    for (let i = 0; i < 4; i++) {
        if (i === correctIndex) {
            options.push(correctAnswer);
        } else {
            let option;
            do {
                option = generateOption(correctAnswer);
            } while (options.includes(option) || option === correctAnswer);
            options.push(option);
        }
    }
    currentQuestion = `What is the next term in the progression: ${progression}?`;
    correctAnswer = progression[4];
    options.sort(() => Math.random() - 0.5); // Shuffle options
    currentQuestion += `\nOptions: ${options.join(', ')}`;
}

function generateOption(correctValue) {
    const deviation = getRandomInt(1, 5); // Generate a random deviation from the correct answer
    const isAddition = getRandomInt(0, 1) === 1; // Randomly choose between addition and subtraction
    const option = isAddition ? correctValue + deviation : correctValue - deviation;
    return option;
}

// Rest of the code remains the same...


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






