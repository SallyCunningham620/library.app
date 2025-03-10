let newFormBtn = document.getElementById("new-form-btn");
let newBookForm = document.getElementById("new-book-form");
let closeFormBtn = document.getElementById("close-form-btn");

newFormBtn.addEventListener('click', openForm);

function openForm() {
  newBookForm.classList.add("open-new-form");
  console.log("ouch");
}

closeFormBtn.addEventListener('click', closeForm);

function closeForm() {
  newBookForm.classList.remove("open-new-form");
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