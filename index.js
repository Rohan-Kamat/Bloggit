import express from 'express';
import { dirname } from "path";
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import { writeFile, readFileSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 3000;

class Blog {
    constructor(title, author, date, rating, ratingCount, file) {
        this.title = title;
        this.author = author;
        this.date = date;
        this.rating = rating;
        this.ratingCount = ratingCount
        this.file = file;

    }
}
var blogList = [];

var fileCreated = false;

//Middlewares
app.use(bodyParser.urlencoded({ extended: true }), express.static("public"));

var articleIsValid = false;
function authenticateArticle(req, res, next) {
    var articleId = parseInt(req.params.id);
    articleIsValid = false;
    if (articleId != undefined && articleId < blogList.length) {
        articleIsValid = true;
    }
    next();
}
app.use("/article/:id", authenticateArticle);

var htmlFromText = ""
function textToHtml(req, res, next) {
    if (Object.keys(req.body).length > 0) {
        var content = req.body.content;
        var lines = content.split("\r\n");
    
        htmlFromText = "<p>";
        for (var i = 0; i < lines.length; i++) {
            htmlFromText += lines[i];
            if (lines[i] === '') {
                continue
            }
            if (i < lines.length - 1 && lines[i + 1] === '') {
                htmlFromText += "</p><p>";
            } else if (i === lines.length - 1) {
                htmlFromText += "</p>";
            } else {
                htmlFromText += "<br>"
            }
        }
    }
    next();
}
app.use("/create", textToHtml)




//Endpoint handlers
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/html/homepage.html");
});

app.get("/blogs", (req, res) => {

    res.render("blogs.ejs", {
        stylesheet: "blogs.css",
        blogs: blogList,
        fileCreated: fileCreated
    });

    fileCreated = false;
});

app.get("/article/:id", (req, res) => {
    var blogId = req.params.id;
    if (articleIsValid) {
        var blog = blogList[blogId];
        var filePath = __dirname + "/public/assets/blogs/" + blog.file;
        var blogContent = readFileSync(filePath, 'utf8');
        res.render("article.ejs", {
            stylesheet: "article.css",
            blogId: blogId,
            blog: blog,
            content: blogContent
        });
    } else {
        res.sendStatus(404);
    }
});

app.get("/create", (req, res) => {
    res.render("create.ejs", {
        stylesheet: "create.css",
        blogId: blogList.length
    });
});

app.post("/create", (req, res) => {
    const title = req.body["title"];
    const author = req.body["author"];

    console.log(title, htmlFromText, author)
    
    const filename = title + ".txt";
    const filepath = __dirname + "/public/assets/blogs/" + filename;
    const date = new Date();
    const rating = 0;

    writeFile(filepath, htmlFromText, (err) => {
        if (err) throw err;
        console.log("File has been saved")
    });
    const newBlog = new Blog(
        title,
        author,
        date,
        rating,
        0,
        filename
    );

    blogList.push(newBlog);
    console.log(blogList);

    fileCreated = true;
    res.redirect("/blogs");
});

app.get("/article/:id/rate", (req, res) => {
    if (articleIsValid) {
        var blogId = req.params.id;
        var blog = blogList[blogId];
        res.render("rate.ejs", {
            stylesheet: "rate.css",
            title: blog.title,
            author: blog.author,
            blogId: blogId
        });
    } else {
        res.sendStatus(404);
    }
});

app.post("/article/:id/rate", (req, res) => {
    if (articleIsValid) {
        var articleId = req.params.id;
        var blog = blogList[articleId];
        var rating = parseInt(req.body["rating"]);

        blog.rating = (blog.rating * blog.ratingCount + rating) / (blog.ratingCount + 1);
        blog.ratingCount++;
        console.log(blog);
        res.redirect(`/article/${articleId}`);

    } else {
        res.sendStatus(404);
    }
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});


