// Array of math facts
const mathFacts = [
    "The equals sign (=) was invented in 1557 by Welsh mathematician Robert Recorde.",
    "The ancient Greeks believed that all numbers were representations of small dots called pebbles.",
    "The binary number system uses only two digits - 0 and 1. All computers work on binary code.",
    "The equals sign was once considered an obelus symbol for subtraction rather than equality.",
    "The first known use of zero as a placeholder was in ancient Babylonian mathematics.",
    "The infinity symbol was first used in 1655 by mathematician John Wallis."
  ];
  
  // Get random fact on page load
  function getRandomFact() {
    const randomIndex = Math.floor(Math.random() * mathFacts.length);
    document.getElementById("mathFact").innerText = mathFacts[randomIndex];
  }
  
  // Generate new fact on button click
  document.getElementById("newFactBtn").addEventListener("click", getRandomFact);
  
  // Initial load
  getRandomFact();
  