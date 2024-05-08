var form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    var content = document.querySelector(".content").value;
    var title = document.querySelector("#title").value;
    var author = document.querySelector("#author").value;

    if (title === "") {
        alert("Please set the title");
    } else if (author === "") {
        alert("Please set the author name")
    }
    else if (content === "") {
        alert("Body cannot be empty");
    } else {
        form.submit();
    }
});

var dialogBox = document.querySelector("dialog");
form.addEventListener("reset", (e) => {
    e.preventDefault();


    dialogBox.showModal();
});

document.querySelector("dialog .btn-2").addEventListener("click", () => {
    dialogBox.close();
})



