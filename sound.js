// Load audio files
let correctAudio = new Audio("correct.mp3");
let incorrectAudio = new Audio("incorrect.mp3");

// Play correct sound
function playCorrect() {
  correctAudio.play();
} 

// Play incorrect sound
function playIncorrect() {
  incorrectAudio.play();
}

// Call when answer is checked
if(isCorrect) {
  playCorrect();
} else {
  playIncorrect();
}
