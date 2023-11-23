const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const botao = document.getElementById("button");

var xImg = new Image();
var oImg = new Image();
var board = new Image();
var empate = new Image();

xImg.src = 'img/X.png';
oImg.src = 'img/O.png';
board.src = 'img/board.png';
empate.src = 'img/EMPATE.png';

var player;
var whoWin;
let contagem;
const win_combinations = [
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],

    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],

    [1, 5, 9],
    [3, 5, 7]
];
let slots;

botao.addEventListener("click", function buttonClick() {
    comecou();
});

function comecou() {
    canvasClear();
    slots = [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
    ];

    whoWin = null;
    player = "X";
    contagem = 0;
    botao.innerHTML = "Resetar";
    
    drawImg(board, -75, -75, 150, 150);
    drawImg(board, -75, -75, 150, 150);
    setInterval(mainLoop, 1000/50);
}

let marker = {
    x: 0,
    y: 0
}

canvas.addEventListener("click", function canvasClick() {
    let x = event.offsetX;
    let y = event.offsetY;
    clickedOnSlot(x, y);
});

function someoneWinned(number, who) {
    const slot = slots.map((number, i) => [number, i])
    .filter((number) => number[0] === who)
    .map((number) => number[1]);

    for(combination of win_combinations) {
        if (combination.every((number) => slot.includes(number))) {
            whoWin = who;
            console.log(whoWin);
            return;
        }
    }
    if(contagem === 9) {
        whoWin = "EMPATE";
        console.log(whoWin);
        return;
    }
}

function endGame() {
    switch(whoWin) {
        case "X":
            canvasClear();
            drawImg(xImg, -75, -75, 150, 150);
            botao.innerHTML = "Jogar Novamente";
            break;
        case "O":
            canvasClear();
            drawImg(oImg, -75, -75, 150, 150);
            botao.innerHTML = "Jogar Novamente";
            break;
        case "EMPATE":
            canvasClear();
            drawImg(empate, -75, -90, 150, 150);
            drawImg(empate, -75, -90, 150, 150);
            botao.innerHTML = "Jogar Novamente";
            break;
        default:
            break;
    }
}

function clickedOnSlot(x, y) {
    if((x > 225 && x < 345) && (y > 15 && y < 145)) {
        createMarker(7);
    }
    if((x > 365 && x < 510) && (y > 15 && y < 145)) {
        createMarker(8);
    }
    if((x > 525 && x < 650) && (y > 15 && y < 145)) {
        createMarker(9);
    }


    if((x > 225 && x < 345) && (y > 165 && y < 310)) {
        createMarker(4);
    }
    if((x > 365 && x < 510) && (y > 165 && y < 310)) {
        createMarker(5);
    }
    if((x > 525 && x < 650) && (y > 165 && y < 310)) {
        createMarker(6);
    }


    if((x > 225 && x < 345) && (y > 335 && y < 470)) {
        createMarker(1);
    }
    if((x > 365 && x < 510) && (y > 335 && y < 470)) {
        createMarker(2);
    }
    if((x > 525 && x < 650) && (y > 335 && y < 470)) {
        createMarker(3);
    }
}

function drawImg(src, x, y, w, h) {
    ctx.drawImage(src, x+150, y+75.5, w, h);
}

function canvasClear() {
    ctx.clearRect(0, 0, 300, 151);
}

function occSlots(number, who) {
    slots[number] = who;
    contagem++;
}

function createMarker(number) {

    let posX = [
        0,
        -50,
        0,
        50,
        -50,
        0,
        50,
        -50,
        0,
        50,
    ]

    let posY = [
        0,
        50,
        50,
        50,
        0,
        0,
        0,
        -50,
        -50,
        -50,
    ]

    if(slots[number] == 0 && whoWin == null) {
        if(player == "X") {
            drawImg(xImg, posX[number]-25, posY[number]-25, 50, 50);
        } else {
            drawImg(oImg, posX[number]-25, posY[number]-25, 50, 50);
        }
        occSlots(number, player);
        someoneWinned(number, player);
        player = player === "X" ? "O" : "X";
    }

}

function mainLoop() {
    endGame();
}
