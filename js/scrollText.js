//appear letters as you scroll down
let previousY = window.scrollY;
window.onscroll = function (e) {

    const letters = document.getElementsByClassName("letter");
    const phrases = document.getElementsByClassName("phrase");
    let i = 1;
    for (i = 1; i < letters.length + 1; i++) {
        
        // hide first phrase (6 letters) when done, and change colors
        if (window.scrollY >= window.innerHeight + (150 * 5)) {
            phrases[0].classList.add("hidden");
            if (window.scrollY < window.innerHeight + (150 * (10+5))) {
                document.getElementById("phraseContainer").style.color = "white";
                document.getElementById("phraseContainer").style.background = "black";
            }
        } else {
            phrases[0].classList.remove("hidden");
            document.getElementById("phraseContainer").style.color = "black";
            document.getElementById("phraseContainer").style.background = "white";
        }
        
        // similar to previous section, but for third phrase to appear
        if (window.scrollY >= window.innerHeight + (150 * (10 + 5))) {
            phrases[1].classList.add("hidden");
            document.getElementById("phraseContainer").style.color = "black";
            document.getElementById("phraseContainer").style.background = "white";
        } else if (window.scrollY > window.innerHeight + (150 * 5)) {
            phrases[1].classList.remove("hidden");
            document.getElementById("phraseContainer").style.color = "white";
            document.getElementById("phraseContainer").style.background = "black";
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