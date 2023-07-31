const sizeScreen = 30;
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const audio = new Audio("../assets/audio.mp3");
const score = document.querySelector(".score--value");
const finalScore = document.querySelector(".final-score > span");
const menu = document.querySelector(".menu-screen");
const buttonPlay = document.querySelector(".btn-play");
const initialPosition = { x: 0, y: 0 };
let snake = [initialPosition];
let direction;
let loopId;

const randomPosition = () => {
    return Math.floor(Math.random() * 20) * sizeScreen;
}

const generateRandomColor = () => {
    return "#" + Math.floor(Math.random()*16777215).toString(16);
}

const food = {
    x: randomPosition(),
    y: randomPosition(),
    color: generateRandomColor()
}

const generateFood = () => {
    ctx.fillStyle = food.color;
    ctx.fillRect(food.x, food.y, sizeScreen, sizeScreen);
}

const checkCollision = () => {
    const head = snake[snake.length - 1];
    const canvasLimit = canvas.width - sizeScreen;
    const neckIndex = snake.length - 2;

    const wallCollision =
        head.x < 0 || head.x > canvasLimit || head.y < 0 || head.y > canvasLimit;

    const selfCollision = snake.find((position, index) => {
        return index < neckIndex && position.x == head.x && position.y == head.y;
    })

    if (wallCollision || selfCollision) {
        gameOver();
    }
};

const incrementScore = () => {
    score.innerText = +score.innerText + 10;
}

const checkEat = () => {
    head = snake[snake.length -1];
    if(head.x == food.x && head.y == food.y){
        incrementScore();
        snake.push(head);
        audio.play();

        let x = randomPosition();
        let y = randomPosition();

        while (snake.find((position) => position.x == x && position.y == y)) {
            x = randomPosition();
            y = randomPosition();
        }
        
        food.x = x;
        food.y = y;
        food.color = generateRandomColor();
    }
}



const drawSnake = () => {
    ctx.fillStyle = "#ddd"

    snake.forEach((position, index) => {
        if (index == snake.length - 1) {
            ctx.fillStyle = "red"
        }
        ctx.fillRect(position.x, position.y, sizeScreen, sizeScreen)
    });
}


const moveSnake = () => {

    if(!direction) return;

    const head = snake[snake.length - 1];
  
    if(direction == 'right') {
        snake.push({
            x: head.x + sizeScreen,
            y: head.y
        })
    }

    if(direction == 'left') {
        snake.push({
            x: head.x - sizeScreen,
            y: head.y
        })
    }

    if(direction == 'down') {
        snake.push({
            x: head.x,
            y: head.y + sizeScreen
        })
    }

    if(direction == 'up') {
        snake.push({
            x: head.x,
            y: head.y - sizeScreen
        })
    }
    snake.shift()
};

const drawGrid = () => {
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#191919";

    for (let i = 30; i < canvas.width; i += 30) {
        ctx.beginPath();
        ctx.lineTo(i, 0);
        ctx.lineTo(i, 600);
        ctx.stroke();

        ctx.beginPath();
        ctx.lineTo(0, i);
        ctx.lineTo(600, i);
        ctx.stroke();
    }
}

const gameOver = () => {
    direction = undefined

    menu.style.display = "flex"
    finalScore.innerText = score.innerText
    canvas.style.filter = "blur(2px)"
}

const gameLoop = () => {
    clearInterval(loopId);
    ctx.clearRect(0, 0, 600, 600)
    generateFood();
    drawGrid();
    moveSnake()
    drawSnake();
    checkEat();
    checkCollision();

    console.log(parseInt(score.innerText));


    loopId = setTimeout(() => {
        gameLoop()
    }, 200 - parseInt(score.innerText))
}

gameLoop();

document.addEventListener("keydown", ({ key }) => {
    if (key == "ArrowRight" && direction != "left") {
        direction = "right";
    }

    if (key == "ArrowLeft" && direction != "right") {
        direction = "left";
    }

    if (key == "ArrowDown" && direction != "up") {
        direction = "down";
    }

    if (key == "ArrowUp" && direction != "down") {
        direction = "up";
    }
});

buttonPlay.addEventListener("click", () => {
    score.innerText = "00"
    menu.style.display = "none"
    canvas.style.filter = "none"

    snake = [initialPosition]
})