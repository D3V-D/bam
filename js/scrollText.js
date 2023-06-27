//appear letters as you scroll down
let previousY = window.scrollY;
let currSection = document.getElementById('titlesection')
const sections = document.querySelectorAll('section')

window.onscroll = function (e) {
    sections.forEach(section => {
        if (section.id == 'intro') {
            console.log(window.pageYOffset)
            console.log(section.offsetTop)
        }
        if (window.pageYOffset > section.offsetTop) {
            currSection = section
            console.log('changed to ' + section)
        }
    })
    console.log(window.getComputedStyle(currSection).backgroundColor)
    document.body.style.background = window.getComputedStyle(currSection).backgroundColor

    const letters = document.getElementsByClassName("letter");
    const phrases = document.getElementsByClassName("phrase");
    let i = 1;
    for (i = 1; i < letters.length + 1; i++) {
        
        // hide first phrase (6 letters) when done, and change colors
        if (window.scrollY >= window.innerHeight + (150 * 5)) {
            phrases[0].classList.add("hidden");
            if (window.scrollY < window.innerHeight + (150 * (10+5))) {
                document.getElementById("intro").style.color = "white";
                document.getElementById("intro").style.background = "black";
            }
        } else {
            phrases[0].classList.remove("hidden");
            document.getElementById("intro").style.color = "black";
            document.getElementById("intro").style.background = "white";
        }
        
        // similar to previous section, but for third phrase to appear
        if (window.scrollY >= window.innerHeight + (150 * (10 + 5))) {
            phrases[1].classList.add("hidden");
            document.getElementById("intro").style.color = "black";
            document.getElementById("intro").style.background = "white";
        } else if (window.scrollY > window.innerHeight + (150 * 5)) {
            phrases[1].classList.remove("hidden");
            document.getElementById("intro").style.color = "white";
            document.getElementById("intro").style.background = "black";
        }

        
        // show letters && hide letters
        if (window.scrollY > window.innerHeight + (150 * (i-1)) - 2) {
            letters[i-1].classList.remove("hidden");
        } else {
            letters[i-1].classList.add("hidden");
        }
    }
    previousY = window.scrollY;
}