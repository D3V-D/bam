const blocks = document.getElementsByClassName("maze-block");
let numBlocks = blocks.length
let unusedNumbers = []

for (let i = 1; i <= 47; i++) {
    unusedNumbers.push(i)
}

while (numBlocks > 0) {
    numBlocks--

    // random index for the unused numbers array (0 to length-1)
    let randomIndex = Math.floor(Math.random() * unusedNumbers.length)

    // using index, grab an image and then remove that image's number from unused numbers
    // thus, every iteration should be a unique image
    let imageNum = unusedNumbers[randomIndex]
    
    unusedNumbers.splice(randomIndex, 1) // remove 1 item only

    let imageURL = "'./img/mazeImgs/newsimage"+imageNum+".jpeg'"

    console.log(blocks[numBlocks])

    blocks[numBlocks].style.backgroundImage = "url(" + imageURL + ")"
}
// background-image: url("../img/mazeImgs/newsImage##.jpeg")