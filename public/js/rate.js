var stars = document.querySelectorAll(".stars i");

var rating = 0;
stars.forEach((element) => {
    element.addEventListener("click", (e) => {
        rating = parseInt(e.target.id.charAt(1)) + 1;
        for (var i = 0; i < 5; i++) {
            if (i < rating) {
                stars[i].classList.add("star-active");
            } else {
                stars[i].classList.remove("star-active");
            }
        }
    })
});

var form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (rating === 0) {
        alert("Please set a rating")
    } else {
        form.querySelector("#rating").value = rating;
        form.submit();
    }
});

form.querySelector("input[type='button']").addEventListener("click", () => {
    history.back();
})