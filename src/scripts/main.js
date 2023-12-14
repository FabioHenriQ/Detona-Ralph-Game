const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values: {
        gameVelocity: 500,
        hitPosiiton: 0,
        results: 0,
        curretTime : 60,
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
}

main();

function main() {
    addListenerHitBox();
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", ()=>{
            if (square.id === state.values.hitPosiiton){
                state.values.results++
                state.view.score.textContent = state.values.results;
                state.values.hitPosiiton = null;
                playSound('hit.m4a');
            }
        })
    });
}

function randomSquare() {
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");

    state.values.hitPosiiton = randomSquare.id;
}


function countDown() {
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;

    if (state.values.curretTime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        playSound('gameover.mp3');
        alert(" Game Over! O seu resultado foi: " + state.values.results);
    }
}

function playSound(audioSound) {
    let audio = new Audio(`./src/audios/${audioSound}`);
    audio.volume = .2;
    audio.play();
}
