const navbar = document.getElementById("topNav");

// transition color of navbar based on amount down
let previousY = window.scrollY;
window.onscroll = function (e) {

    // check if scrolled down, then hide navbar
    if (window.scrollY > previousY && window.scrollY > 170) {
        hideNav();
    } 
    // otherwise, if scrolled up, show navbar
    if (window.scrollY < previousY) {
        showNav();
    }

    const letters = document.getElementsByClassName("letter");
    const phrases = document.getElementsByClassName("phrase");
    let i = 1;
    for (i = 1; i < letters.length + 1; i++) {
        
        // hide first phrase (6 letters) when done, and change colors
        if (window.scrollY >= window.innerHeight + (150 * 6)) {
            phrases[0].classList.add("hidden");
            if (window.scrollY < window.innerHeight + (150 * (10+6))) {
                switchNavColors(1);
                document.getElementById("phraseContainer").style.color = "white";
                document.getElementById("phraseContainer").style.background = "black";
            }
        } else {
            phrases[0].classList.remove("hidden");
            switchNavColors(2);
            document.getElementById("phraseContainer").style.color = "black";
            document.getElementById("phraseContainer").style.background = "white";
        }
        
        // similar to previous section, but for third phrase to appear
        if (window.scrollY >= window.innerHeight + (150 * (10 + 6))) {
            phrases[1].classList.add("hidden");
            switchNavColors(2);
            document.getElementById("phraseContainer").style.color = "black";
            document.getElementById("phraseContainer").style.background = "white";
        } else if (window.scrollY > window.innerHeight + (150 * 6)) {
            phrases[1].classList.remove("hidden");
            switchNavColors(1);
            document.getElementById("phraseContainer").style.color = "white";
            document.getElementById("phraseContainer").style.background = "black";
        }

        
        // show letters && hide letters
        if (window.scrollY > window.innerHeight + (150 * i)) {
            letters[i-1].classList.remove("hidden");
        } else {
            letters[i-1].classList.add("hidden");
        }
    }

    if (window.scrollY <= window.innerHeight - 26) {
        switchNavColors(1);
    }

    if (window.scrollY >= (window.innerHeight * 6.6)) {
        switchNavColors(1);
    }

    previousY = window.scrollY;
}


function hideNav() {
    navbar.style.animation = "slideNavAway 0.8s ease-in-out forwards";
}

function showNav() {
    navbar.style.animation = "slideNavIn 0.4s ease-in-out forwards";
}

let hoverColorMode = 1;
function switchNavColors(x) {
    const linkItems = document.getElementsByClassName("linkItem")
    const linkSpacers = document.getElementsByClassName("linkSpacer")
    let i = 0;
    let j =0;

    for (i = 0; i < linkItems.length; i++) {
        let currItem = linkItems[i];
        if (x == 1) {
            currItem.style.background = "black";
            currItem.style.color = "white";
            currItem.style.border = "2px solid white";
            currItem.addEventListener("mouseover", (e) => {
                currItem.style.background = "white";
                currItem.style.color = "black";
            })
            currItem.addEventListener("mouseout", (e) => {
                currItem.style.background = "black";
                currItem.style.color = "white";
            })
        } else {
            currItem.style.background = "white";
            currItem.style.color = "black";
            currItem.style.border = "2px solid black";
            currItem.addEventListener("mouseover", (e) => {
                currItem.style.background = "black";
                currItem.style.color = "white";
            })
            currItem.addEventListener("mouseout", (e) => {
                currItem.style.background = "white";
                currItem.style.color = "black";
            })
        }
    }

    for (j = 0; j < linkSpacers.length; j++) {
        if (x == 1) {
            linkSpacers[j].style.borderTop = "dashed 2px white";
        } else {
            linkSpacers[j].style.borderTop = "dashed 2px black";
        }
    }

    hoverColorMode = x; 

}