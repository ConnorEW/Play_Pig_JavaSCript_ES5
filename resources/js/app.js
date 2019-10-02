/*
GAME RULES:

- The game has 2 players playing in rounds
- Each turn, a player rolls a dice as many times as they wish. Each result gets added to the ROUND score
- BUT, if the player rolls a 1, all their ROUND score gets lost. Then, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach their GLOBAL score to the winning score, wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, setScore, previousRoll, winningScore;

newGame();

document.querySelector('.btn-roll').addEventListener('click', function(){
    if (gamePlaying){
        var dice = Math.floor(Math.random() * 6 + 1);
        var diceDOM = document.querySelector('.dice');
 
        diceDOM.style.display = 'block';
        diceDOM.src = './resources/images/dice-' + dice + '.png';

        if (dice !== 1){
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            if (previousRoll == 6 && dice == 6){
                scores[activePlayer] = 0;
                document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
                roundReset();
            } else {
                previousRoll = dice;
            };
        } else{
            roundReset();
        };
    };
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gamePlaying){
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        if (scores[activePlayer] >= winningScore){
            document.querySelector('#name-' + activePlayer).textContent = "WINNER!";
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            gamePlaying = false;
        } else {
        roundReset();
        };
    };
});

document.querySelector('.btn-new').addEventListener('click', newGame);

function roundReset(){
    dice = 0;
    roundScore = 0;
    previousRoll = 0;
    document.querySelector('#current-' + activePlayer).textContent = 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
}

function newGame(){
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    setScore = true;
    
    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
}

document.querySelector('.btn-score').addEventListener('click', function(){
    var input = document.querySelector('.final-score').value;
    if (setScore){
        if (input){
            winningScore = input;
        };
    };
    gamePlaying = true;
    setScore = false;
});