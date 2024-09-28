// Replace this with your actual backend URL from Render
const backendUrl = 'https://your-app-name.onrender.com';

document.getElementById('startButton').addEventListener('click', startLevel);
document.getElementById('submitAnswer').addEventListener('click', submitAnswer);

function startLevel() {
    fetch(`${backendUrl}/api/music/start-level/1`)
        .then(response => response.text())
        .then(data => {
            document.getElementById('instructions').textContent = data;
            document.getElementById('feedback').textContent = "";
            playSound(data); // Play the sound based on the response
        })
        .catch(error => console.error('Error starting level:', error));
}

function submitAnswer() {
    const answer = document.getElementById('userAnswer').value;
    fetch(`${backendUrl}/api/music/submit-answer?answer=${answer}`, {
        method: 'POST'
    })
    .then(response => response.json())
    .then(result => {
        document.getElementById('feedback').textContent = result ? "Correct!" : "Incorrect!";
        document.getElementById('userAnswer').value = ''; // Clear input
    })
    .catch(error => console.error('Error submitting answer:', error));
}

// Function to play the sound using the browser's audio capabilities
function playSound(audioName) {
    const audioUrl = `${backendUrl}/audio/${audioName.replace(/ /g, '_')}.wav`; // Ensure the file name matches
    const audio = new Audio(audioUrl);
    audio.play().catch(error => console.error('Error playing audio:', error));
}
