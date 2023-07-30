const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const sizeScreen = 30;


// for(let i = 0; i < 60; i++) {
//     ctx.fillStyle = "#" + Math.floor(Math.random()*16777215).toString(16);;
//     // ctx.fillStyle = 'red';
//     ctx.fillRect(i * sizeScreen, i * sizeScreen,  sizeScreen, sizeScreen);
// }

let snake = [
    // {
    //     x: 200,
    //     y: 140,
    // },
    // {
    //     x: 200,
    //     y: 170,
    // },
    {
        x: 200,
        y: 200,
    },
    {
        x: 230,
        y: 200,
    },
    {
        x: 260,
        y: 200,
    }
];
let direction = 'right';

const drawSnake = () => {
    snake.forEach((position, i) => {
        ctx.fillStyle = 'white';
        if(i == 0) ctx.fillStyle = 'red';
        
        ctx.fillRect(position.x, position.y, sizeScreen, sizeScreen);
    });   
}

const moveSnake = () => {
    const head = snake[snake.length - 1];
    snake.shift();

    if(direction = 'right') {
        // console.log(direction);
        snake.push({
            x: head.x + sizeScreen,
            y: head.y
        })
    }
};


// const gameLoop = () => window.setInterval(() => {
//     console.log('hit');


//     // console.log(snake);
//     // snake = [{
//     //     x: snake[0].x + 30,
//     //     y: 170,
//     // }].concat(snake)

//     // console.log(snake[0].x + 30);
//     // snake.push({
//     //     x: snake[0].x + 30,
//     //     x: 170,
//     // });

//     drawSnake();
// }, 500);



// gameLoop();
moveSnake();
drawSnake();