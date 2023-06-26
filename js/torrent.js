//change as needed
const numOfTorrentImages = 99;
for (let i = 1; i <= numOfTorrentImages; i++) {
    // loop through and create img html for each image
    document.getElementById("torrent-container").innerHTML += "<img src='./public/torrentImgs/torrentImgs(" + i + ").jpeg' class='torrent-image' id='torrent-image-" + i + "'>"
}

const torrentContainer = document.querySelector('#torrent-container');
const torrentImages = document.querySelectorAll('.torrent-image');

// Randomize flow times and positions for each image
torrentImages.forEach((image) => {
  image.style.top = (Math.random() * 90) + "%"
  image.style.animation = "image-flow " + ((Math.random() * 5) + 2) + "s linear infinite"
});