let score = JSON.parse(localStorage.getItem('score')) || {
    user: 0,
    computer: 0,
    ties: 0
};

const images = {
    Rock: 'rock.png',
    Paper: 'paper.png',
    Scissor: 'scissor.png'
};

updateScore();

function Game(userChoice) {
    const choices = ['Rock', 'Paper', 'Scissor'];
    const choice = choices[Math.floor(Math.random() * 3)];

    let result;

    if (userChoice === choice) {
        result = "It's a tie!";
        score.ties++;
    } 
    else if (
        (userChoice === 'Rock' && choice === 'Scissor') ||
        (userChoice === 'Paper' && choice === 'Rock') ||
        (userChoice === 'Scissor' && choice === 'Paper')
    ) {
        result = "You win!";
        score.user++;
    } 
    else {
        result = "Computer wins!";
        score.computer++;
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScore();
    updateResult(result, userChoice, choice);
}

function resetScore() {
    score = { user: 0, computer: 0, ties: 0 };
    localStorage.setItem('score', JSON.stringify(score));

    updateScore();
    updateResult("Score has been reset!", "", "");
}

function updateScore() {
    document.querySelector('.score').innerHTML =
        `Score - You: ${score.user}, Computer: ${score.computer}, Ties: ${score.ties}`;
}

function updateResult(result, userChoice, choice) {
    const resultEl = document.querySelector('.result');
    const movesEl = document.querySelector('.moves');

    resultEl.innerHTML = result;

    if (!userChoice || !choice) {
        movesEl.innerHTML = "";
        return;
    }

    movesEl.innerHTML = `
        <div>
            <p>You</p>
            <img src="${images[userChoice]}" class="move-img">
        </div>

        <div>
            <p>Computer</p>
            <img src="${images[choice]}" class="move-img">
        </div>`;
}