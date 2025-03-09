//const newBookBtn = document.getElementById("new-book-btn");
const newBookForm = document.getElementById("new-book-form")

//newBookBtn.addEventListener('click', openForm());

function openForm() {
  document.getElementById("new-book-form").style.display = "block";
}

const myLibrary = [];

function Book(title, author, pages, readBook) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readBook = this.readBook;
    this.info = function() {
      return(this.title + " by " + this.author + " , " + this.pages + " pages, " + readBook);
    };
  };

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', 'not read yet');

console.log(theHobbit.info()); // "The Hobbit by J.R.R. Tolkien, 295 pages, not read yet"


function addBookToLibrary() {
    // take params, create a book then store it in the array
  }