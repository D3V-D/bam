const snake = document.getElementById("snake"); // hitbox and snake container

let currentQuizAnswerKey = []

let allowKeyActions = true

let snakeX = 0;
let snakeY = 0;

let snakeSpeed = 8

if (window.innerWidth < 550) {
    snakeSpeed = window.innerWidth / 100
}


document.addEventListener('keydown', (e) => {
    if (!allowKeyActions) {
        return false
    }
    // update pos when arrow pressed
    // use function so that we can detect collision
    // within and prevent movement if necessary
    switch (e.key) {
        case 'w':
            if (snakeY - snakeSpeed >= 0 && !isCollision(0, -snakeSpeed)) {
                snakeY -= snakeSpeed;
                switchSnakeImage('public/snake/upmove.gif');
            }
            break;
        case 's':
            //edit and add boundary
            if(!isCollision(0, snakeSpeed))
                snakeY += snakeSpeed;
                switchSnakeImage('public/snake/downmove.gif');
            break;
        case 'a':
            if (snakeX >= 0 && !isCollision(-snakeSpeed, 0))
                snakeX -= snakeSpeed;
                switchSnakeImage('public/snake/leftmove.gif');
            break;
        case 'd':
            if (snakeX + snake.offsetWidth < window.innerWidth && !isCollision(snakeSpeed, 0))
                snakeX += snakeSpeed;
                switchSnakeImage('public/snake/rightmove.gif');
            break;
        case 'e':
            handleQuizLogic()
            break;
        default:
            // other keys do nothing
            break;
    }

    snake.style.left = snakeX + 'px';
    snake.style.top = snakeY + 'px';

})

document.addEventListener('keyup', (e) => {
    if (!allowKeyActions) {
        return false
    }
    // on keyup, release animation
    switch (e.key) {
        case 'w':
            switchSnakeImage('public/snake/idle.png')
            break;
        case 's':
            switchSnakeImage('public/snake/idle.png')
            break;
        case 'a':
            switchSnakeImage('public/snake/idle.png')
            break;
        case 'd':
            switchSnakeImage('public/snake/idle.png')
            break;
        default:
            // other keys do nothing
            break;
    }
})

function switchSnakeImage(url) {
    let snakeImage = document.getElementById("snakeImg");

    snakeImage.src = url;
}

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

    const viewportHeight = window.innerHeight || document.documentElement.clientHeight

    if (adjustedHitbox.top > viewportHeight) {
        snake.style.top = snakeY
        return true;
    }

    const quizBlocks = document.getElementsByClassName('quiz-block')
    for (const el of quizBlocks) {
        const elHitbox = el.getBoundingClientRect();

        if (!(
            ((snakeHitbox.top + snakeHitbox.height) < (elHitbox.top)) ||
            (snakeHitbox.top > (elHitbox.top + elHitbox.height)) ||
            ((snakeHitbox.left + snakeHitbox.width) < elHitbox.left) ||
            (snakeHitbox.left > (elHitbox.left + elHitbox.width))
            )) {
                document.getElementById('ekey').style.display = 'inline-block'
        } else {
                document.getElementById('ekey').style.display = 'none'
        }
    }


    return false;

}

function handleQuizLogic() {
    const snakeHitbox = snake.getBoundingClientRect();
    const quizBlocks = document.getElementsByClassName('quiz-block')
    for (let i = 0; i < quizBlocks.length; i++) {
        const elHitbox = quizBlocks[i].getBoundingClientRect();

        if (!(
            ((snakeHitbox.top + snakeHitbox.height) < (elHitbox.top)) ||
            (snakeHitbox.top > (elHitbox.top + elHitbox.height)) ||
            ((snakeHitbox.left + snakeHitbox.width) < elHitbox.left) ||
            (snakeHitbox.left > (elHitbox.left + elHitbox.width))
            )) {
                openQuiz(i)
        }
    }
}

function openQuiz(num) {
    // num = which quiz and door
    // in DOM order
    // starts with 0    

    currentQuizAnswerKey = []

    const quizZeroQuestions = [
        {
            question: "The answer is B.",
            options: ["A", "B", "C", "D"],
            answer: "B"
        },
        {
            question: "The answer is not B.",
            options: ["A", "B", "C", "D"],
            answer: "D"
        },
        {
            question: "The answer is not B or D.",
            options: ["A", "B", "C", "D"],
            answer: "A"
        }
    ]

    if (num == 0) {
        questions = getNumRandomQuestions(quizZeroQuestions, 2)
        document.getElementById("quiz-0-container").innerHTML = ""

        for (let j = 0; j < questions.length; j++) {
            document.getElementById("quiz-0-container").innerHTML += "" + 
            "<div class='question'>" + questions[j].question + "<br>"
            + "<input type='radio' name='question" + (j+1) + "' value='" + questions[j].options[0] + "'>" + questions[j].options[0] + "<br>"
            + "<input type='radio' name='question" + (j+1) + "' value='" + questions[j].options[1] + "'>" + questions[j].options[1] + "<br>"
            + "<input type='radio' name='question" + (j+1) + "' value='" + questions[j].options[2] + "'>" + questions[j].options[2] + "<br>"
            + "<input type='radio' name='question" + (j+1) + "' value='" + questions[j].options[3] + "'>" + questions[j].options[3] + "<br>"
            + "</div>" 
            currentQuizAnswerKey += questions[j].answer // add answer to answer key
        }

        document.getElementById("quiz-0-container").innerHTML += "<button class='quiz-submit' id='quiz-0-container-submit' onclick='gradeQuiz(0)'>Submit</button>"

        document.getElementById("quiz-0").style.display = 'block'
        document.getElementById("quiz-black-backdrop").style.display = 'block'
        disableActions()
        document.getElementById("close-0").onclick = function(){
            document.getElementById("quiz-0").style.display = 'none'
            document.getElementById("quiz-black-backdrop").style.display = 'none'
            enableActions()
        }
    }
}

// quizNum indicates which quiz it is
function gradeQuiz(quizNum) {
    // currentQuizAnswerKey used for grading
    const totalQuestions = currentQuizAnswerKey.length

    // find all questions
    const questions = document.querySelectorAll("#quiz-" + quizNum + "-container .question")
    let score = 0;

    // iterate over every question
    // then iterate over their options, 
    // and score
    questions.forEach((question, index) => {
        const answerOptions = question.querySelectorAll("input[type='radio']")
        
        answerOptions.forEach(option => {
            if (option.checked && option.value === currentQuizAnswerKey[index]) {
                score++
            }
        })
    })

    const percentage = (score/totalQuestions) * 100;
    
    document.getElementById('quiz-' + quizNum + '-container').innerHTML = "<h3 class='score-header'>Your score:</h3>"
    + "<div class='score-bar-background' id='score-bar-" + quizNum + "-background'>"
    + "<div class='score-bar-foreground' style='width: " + percentage + "%' id='score-bar-" + quizNum + "-foreground'>"
    + "</div>"
    + "<div class='score-number' id='score-number-" + quizNum + "'>"
    + percentage + "%"
    + "</div>"

    // handle passing/failing logic
    if (percentage > 65) {
        // open gate
        document.getElementById('quiz-' + quizNum + '-container').innerHTML += "<div class='pass-alert quiz-alert'>Congratulations! You have passed the quiz, and the gate has now been opened.</div>"
        document.getElementById('score-bar-' + quizNum + '-foreground').style.background = 'lightgreen'
        openGate(quizNum)
    } else {
        // fail, ask to retry
        document.getElementById('quiz-' + quizNum + '-container').innerHTML += "<div class='fail-alert quiz-alert'>Oops! You didn't pass the quiz. Close out and try again to open the gate!</div>"
        document.getElementById('score-bar-' + quizNum + '-foreground').style.background = 'red'
    }

}

function openGate(gateNum) {
    const gate = document.getElementById("quiz-gate-" + gateNum)
    gate.removeAttribute("style")
    gate.src = 'public/door/dooropening.gif';
    gate.classList.remove("collision")
}

// num should be <= questionsList length
function getNumRandomQuestions(questionList, num) {
    const shuffledQuestions = questionList.sort(() => 0.5 - Math.random())
    return shuffledQuestions.slice(0,num)
}

function disableActions() {
    // disable scrolling
    document.body.style.overflow = "hidden";
    // set variable to stop key actions
    allowKeyActions = false
}

function enableActions() {
    // enable scrolling
    document.body.style.overflow = "auto";
    // set variable to allow key actions
    allowKeyActions = true
}

// check if on resize snake is outside of page
window.addEventListener('resize', (e) => {

    // move snake if out of bounds
    if (snakeX > window.innerWidth) {
        snakeX = window.innerWidth - snake.offsetWidth * 2; 
        snake.style.left = snakeX + 'px'
    }       

    if (window.innerWidth < 550) {
        snakeSpeed = window.innerWidth / 100
    }
})