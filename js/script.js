const mario = document.querySelector('.mario');
        const pipe = document.getElementById('pipe');
        const lua = document.getElementById('lua');
        const scoreDisplay = document.getElementById('score');
        const highScoreDisplay = document.getElementById('high-score');
        const gameOverDisplay = document.getElementById('game-over');
        const finalScoreDisplay = document.getElementById('final-score');
        const gameBoard = document.getElementById('game-board');

        let score = 0;
        let highScore = localStorage.getItem('highScore') || 0;
        highScoreDisplay.textContent = highScore;
        let isNight = false;

        const jump = () => {
            if (!mario.classList.contains('jump')) {
                mario.classList.add('jump');
                setTimeout(() => mario.classList.remove('jump'), 500);
            }
        }

        const loop = setInterval(() => {
            const pipePosition = pipe.getBoundingClientRect().left;
            const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

            if (pipePosition <= 150 && pipePosition > 0 && marioPosition < 80) {
                pipe.style.animation = 'none';
                pipe.style.left = `${pipePosition}px`;

                mario.style.animation = 'none';
                mario.style.bottom = `${marioPosition}px`;

                mario.src = './images/game-over.png';    
                mario.style.width = '150px';
                mario.style.marginLeft = '50px';    

                clearInterval(loop);

                finalScoreDisplay.textContent = score;
                gameOverDisplay.style.display = 'block';

                if (score > highScore) {
                    localStorage.setItem('highScore', score);
                }
            } else {
                score++;
                scoreDisplay.textContent = score;

                if (score % 1500 === 0) {
                    isNight = !isNight;
                    gameBoard.style.background = isNight ? 'linear-gradient(#0B3D91, #1C1C3C)' : 'linear-gradient(#87CEEB, #E0F8FF)';
                    lua.style.display = isNight ? 'block' : 'none';
                    pipe.src = isNight ? './images/alma.png' : './images/pipe.png';
                }
            }
        }, 10);

        document.addEventListener('keydown', jump);