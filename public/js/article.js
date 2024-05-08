var stars = document.querySelector(".stars");

var rating = parseInt(Array.from(stars.classList).at(1).charAt(1));
var staricons = stars.querySelectorAll("i");
for (var i = 0; i < 5; i++) {
    if (i < rating) {
        staricons[i].classList.add("active-star");
    }
}
