
var tileStars = document.querySelectorAll(".stars");
var cross = document.querySelector(".fa-xmark");

if (cross) {
    cross.addEventListener("click", () => {
        document.querySelector(".status-container").style.display = "none";
    })
}

tileStars.forEach((element) => {
    var rating = parseInt(Array.from(element.classList).at(1).charAt(1));
    var staricons = element.querySelectorAll("i");
    for (var i = 0; i < 5; i++) {
        if (i < rating) {
            staricons[i].classList.add("active-star");
        }
    }
});



