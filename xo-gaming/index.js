var playerTurn, moves, isGameOver, span;
playerTurn = "x";
moves = 0;
isGameOver = false;
span = document.querySelectorAll("#grid-inner .box span");

var scores = { x: 0, o: 0, draw: 0 };

function updateScoreboard() {
    var sx = document.getElementById("score-x");
    var so = document.getElementById("score-o");
    var sd = document.getElementById("score-draw");
    if (sx) sx.textContent = scores.x;
    if (so) so.textContent = scores.o;
    if (sd) sd.textContent = scores.draw;
}

function updateStatus() {
    var status = document.getElementById("status");
    if (status) status.textContent = "Player " + playerTurn.toUpperCase() + "'s turn";
}

function play(y) {
    if (y.dataset.player == "none" && window.isGameOver == false) {
        y.innerHTML = playerTurn.toUpperCase();
        y.dataset.player = playerTurn;
        y.className = playerTurn === "x" ? "x-mark" : "o-mark";
        moves++;

        if (playerTurn == "x") {
            playerTurn = "o";
        } else {
            playerTurn = "x";
        }
        updateStatus();
    }

    /* Win Types */
    checkWinner(1, 2, 3);
    checkWinner(4, 5, 6);
    checkWinner(7, 8, 9);
    checkWinner(1, 4, 7);
    checkWinner(2, 5, 8);
    checkWinner(3, 6, 9);
    checkWinner(1, 5, 9);
    checkWinner(3, 5, 7);

    /* No Winner */
    if (moves == 9 && isGameOver == false) { draw(); }
}

function checkWinner(a, b, c) {
    a--; b--; c--;
    if (
        span[a].dataset.player === span[b].dataset.player &&
        span[b].dataset.player === span[c].dataset.player &&
        span[a].dataset.player === span[c].dataset.player &&
        (span[a].dataset.player === "x" || span[a].dataset.player === "o") &&
        isGameOver == false
    ) {
        span[a].parentNode.classList.add("activeBox");
        span[b].parentNode.classList.add("activeBox");
        span[c].parentNode.classList.add("activeBox");
        gameOver(a);
    }
}

function showModal(titleText, messageText) {
    // Overlay
    var overlay = document.createElement("div");
    overlay.className = "overlay";

    // Alert box
    var div = document.createElement("div");
    div.className = "alert";

    var title = document.createElement("span");
    title.className = "alert-title";
    title.textContent = titleText;

    var msg = document.createElement("span");
    msg.className = "alert-message";
    msg.textContent = messageText;

    var btn = document.createElement("button");
    btn.textContent = "Play Again";
    btn.onclick = playAgain;

    div.appendChild(title);
    div.appendChild(msg);
    div.appendChild(btn);
    overlay.appendChild(div);
    document.body.appendChild(overlay);
}

function gameOver(a) {
    var winner = span[a].dataset.player;
    scores[winner]++;
    updateScoreboard();
    showModal("Victory", "Player " + winner.toUpperCase() + " wins");
    window.isGameOver = true;
    moves = 0;
}

function draw() {
    scores.draw++;
    updateScoreboard();
    showModal("Draw", "Honours even");
    window.isGameOver = true;
    moves = 0;
}

function playAgain() {
    var overlay = document.querySelector(".overlay");
    if (overlay) overlay.remove();

    window.isGameOver = false;
    playerTurn = "x";
    moves = 0;

    for (var k = 0; k < span.length; k++) {
        span[k].dataset.player = "none";
        span[k].innerHTML = "&nbsp;";
        span[k].className = "";
        span[k].parentNode.classList.remove("activeBox");
    }

    updateStatus();
}

// Init status on load
updateStatus();