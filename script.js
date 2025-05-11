const API_URL = "https://api.truthordarebot.xyz/v1/dare"; // Update with the correct API URL
let userName = "";

function startGame() {
  userName = document.getElementById("user-name").value;
  if (!userName) {
    alert("Please enter your name!");
    return;
  }

  // Display a loading message and then fetch a Truth or Dare after a short delay
  document.getElementById("result").textContent = `Fetching a Truth or Dare for ${userName}...`;
  setTimeout(fetchTruthOrDare, 2000); // Delay added before fetching
}

async function fetchTruthOrDare() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log("API Response:", data);

    const truthOrDare = data.type === "DARE" 
      ? data.question 
      : data.type === "TRUTH" 
      ? "Truth: " + data.question 
      : "Oops! Something went wrong.";

    displayResult(truthOrDare);  
  } catch (error) {
    console.error("API Error:", error);  
    displayResult("Sorry, couldn't fetch a truth or dare at the moment.");
  }
}

function displayResult(result) {
  const resultElement = document.getElementById("result");
  resultElement.textContent = `${userName}, Enjoy your Truth or Dare: ${result}`;
}
