// transition color of navbar based on amount down
window.onscroll = function (e) {
    if (window.scrollY <= window.innerHeight - 26) {
        switchNavColors(1);
    }
    if (window.scrollY >= window.innerHeight - 26) {
        switchNavColors(2)
    }
}

function switchNavColors(x) {
    const linkItems = document.getElementsByClassName("linkItem")
    const linkSpacers = document.getElementsByClassName("linkSpacer")
    let i = 0;
    let j =0;

    for (i = 0; i < linkItems.length; i++) {
        if (x == 1) {
            linkItems[i].style.background = "black";
            linkItems[i].style.color = "white";
            linkItems[i].style.border = "2px solid white";
        } else {
            linkItems[i].style.background = "white";
            linkItems[i].style.color = "black";
            linkItems[i].style.border = "2px solid black";
        }
    }

    for (j = 0; j < linkSpacers.length; j++) {
        if (x == 1) {
            linkSpacers[j].style.borderTop = "dashed 2px white";
        } else {
            linkSpacers[j].style.borderTop = "dashed 2px black";
        }
    }

}
