const snake = document.getElementById("snake"); // hitbox and snake container

let snakeX = 0;
let snakeY = 0;

let snakeSpeed = 10;

// snake.style.transition = "top 0.1s ease, left 0.1s";
document.addEventListener('keydown', (e) => {
    // update pos when arrow pressed
    // use function so that we can detect collision
    // within and prevent movement if necessary
    switch (e.key) {
        case 'w':
            if (snakeY - snakeSpeed >= 0 && !isCollision(0, -snakeSpeed)) {
                snakeY -= snakeSpeed;
            }
            break;
        case 's':
            //edit and add boundary
            if(!isCollision(0, snakeSpeed))
                snakeY += snakeSpeed;
            break;
        case 'a':
            if (snakeX >= 0 && !isCollision(-snakeSpeed, 0))
                snakeX -= snakeSpeed;
            break;
        case 'd':
            if (snakeX + snake.offsetWidth < window.innerWidth && !isCollision(snakeSpeed, 0))
                snakeX += snakeSpeed;
            break;
        default:
            // other keys do nothing
            break;
    }

    snake.style.left = snakeX + 'px';
    snake.style.top = snakeY + 'px';

})

function isCollision(additionalX, additionalY) {
    // check collisons with the following:
    // .collision class elements
    // the edges of the viewport
    const snakeHitbox = snake.getBoundingClientRect();
    const adjustedHitbox = new DOMRect(
        snakeHitbox.left + additionalX,
        snakeHitbox.top + additionalY,
        snakeHitbox.width,
        snakeHitbox.height
    )
    const collisionElements = document.getElementsByClassName('collision')
    for (const el of collisionElements) {
        const elHitbox = el.getBoundingClientRect();

        if (!(
            ((adjustedHitbox.top + adjustedHitbox.height) < (elHitbox.top)) ||
            (adjustedHitbox.top > (elHitbox.top + elHitbox.height)) ||
            ((adjustedHitbox.left + adjustedHitbox.width) < elHitbox.left) ||
            (adjustedHitbox.left > (elHitbox.left + elHitbox.width))
            )) {
                return true;
            }
    }
    return false;

    // viewport collison to be implemented for bottom
}

// check if on resize snake is outside of page
window.addEventListener('resize', (e) => {

    // move snake if out of bounds
    if (snakeX > window.innerWidth) {
        snakeX = window.innerWidth - snake.offsetWidth * 2; 
        snake.style.left = snakeX + 'px'
    }       
})