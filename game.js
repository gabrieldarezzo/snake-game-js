const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const sizeScreen = 30;


// for(let i = 0; i < 60; i++) {
//     ctx.fillStyle = "#" + Math.floor(Math.random()*16777215).toString(16);;
//     // ctx.fillStyle = 'red';
//     ctx.fillRect(i * sizeScreen, i * sizeScreen,  sizeScreen, sizeScreen);
// }


const initialPosition = { x: 0, y: 0 }
let snake = [
    initialPosition
]
let direction = 'right';
let loopId;

const generateRandomColor = () => {
    return "#" + Math.floor(Math.random()*16777215).toString(16);
}

const generateFood = () => {
    ctx.fillStyle = generateRandomColor();
    let x = Math.floor(Math.random() * 20) * sizeScreen;
    let y = Math.floor(Math.random() * 20) * sizeScreen;
    ctx.fillRect(x, y, sizeScreen, sizeScreen);
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

drawSnake();
const gameLoop = () => {
    clearInterval(loopId);
    ctx.clearRect(0, 0, 600, 600)
    generateFood();
    moveSnake()
    drawSnake()
    // checkCollision()

    loopId = setTimeout(() => {
        gameLoop()
    }, 300)
}

gameLoop()    