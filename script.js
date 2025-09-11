
const TRUTH_API_URL = "https://api.truthordarebot.xyz/v1/truth";
const DARE_API_URL = "https://api.truthordarebot.xyz/v1/dare";
let userName = "";

function startGame() {
  userName = document.getElementById("user-name").value;
  if (!userName) {
    alert("Ooh, playing hard to get? Tell me your name so we can have some real fun! 😏");
    return;
  }
  document.getElementById("result").textContent = `Fetching a Truth or Dare for ${userName}...`;
  setTimeout(fetchTruthOrDare, 2000);
}

async function fetchTruthOrDare() {
  // Randomly choose truth or dare
  const isTruth = Math.random() < 0.5;
  const apiUrl = isTruth ? TRUTH_API_URL : DARE_API_URL;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log("API Response:", data);
    let resultText = "";
    if (data.type === "TRUTH") {
      // <BR></BR>
      resultText = "Truth: " + data.question;
    } else if (data.type === "DARE") {
      resultText = "Dare: " + data.question;
    } else {
      resultText = "Oops! Something went wrong.";
    }
    displayResult(resultText);
  } catch (error) {
    console.error("API Error:", error);
    displayResult("Sorry, couldn't fetch a truth or dare at the moment.");
  }
}

function displayResult(result) {
  const resultElement = document.getElementById("result");
  resultElement.innerHTML = `${userName}, Enjoy your Truth or Dare:<br><br>${result}`;
}
