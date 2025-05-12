let newFormBtn = document.getElementById("new-form-btn");
let formDiv = document.getElementById("form-div");
let newBookForm = document.getElementById("new-book-form");
let closeFormBtn = document.getElementById("close-form-btn");
let booksContainer = document.querySelector(".books-container");
const myLibrary = [];

newFormBtn.addEventListener('click', openForm);

function openForm() {
  newBookForm.classList.add("open-new-form");
  document.getElementById("book-title").focus();
}

closeFormBtn.addEventListener('click', closeForm);

function closeForm() {
  newBookForm.classList.remove("open-new-form");
  newBookForm.reset();
}

let bookCheck = {
  bookReadStatus: function() {
    if (this.unreadOrRead === "Yes") {
      this.unreadOrRead = "No";
    } else {
      this.unreadOrRead = "Yes";
    }
    console.log(myLibrary);
  }
}

class createBook {
    constructor(title, author, numberPages, unreadOrRead) {
      this.title = title;
      this.author = author;
      this.numberPages = numberPages;
      this.unreadOrRead = unreadOrRead;
      this.id = crypto.randomUUID;
      Object.setPrototypeOf(this, bookCheck);
    };
  }

function addBookToLibrary(title, author, numberPages, unreadOrRead) {  
    let book = new createBook(title, author, numberPages, unreadOrRead);
    myLibrary.push(book);
    createBookCard(book);
    return myLibrary;
  }

addBookToLibrary("Example Book The Hobbit", "J.R.R. Tolkien", 295, "No");
function createBookCard(book) {
  
    let bookCard = document.createElement("div");
    bookCard.classList.add("card");
    bookCard.id = book.id;
    booksContainer.appendChild(bookCard);
  
    let bookTitle = document.createElement("p");
    bookTitle.classList.add("book-title");
    bookTitle.textContent = book.title;
    bookCard.appendChild(bookTitle);
  
    let author = document.createElement("p");
    author.classList.add("author");
    author.textContent = "by " + book.author;
    bookCard.appendChild(author);
  
    let numberPages = document.createElement("p");
    numberPages.classList.add("number-pages");
    numberPages.textContent = book.numberPages + " pages";
    bookCard.appendChild(numberPages);
  
    let bookCardButtonsContainer = document.createElement("div");
    bookCardButtonsContainer.classList.add("book-card-buttons-container");
    bookCard.appendChild(bookCardButtonsContainer);
  
    let unreadOrRead = document.createElement("button");
    unreadOrRead.classList.add("book-read-button");
    if (book.unreadOrRead === "Yes") {
      unreadOrRead.classList.add("read-button");
      unreadOrRead.textContent = "Read";
    } else {
      unreadOrRead.classList.add("unread-button");
      unreadOrRead.textContent = "Unread";
    }
    unreadOrRead.addEventListener("click", () => {
      book.bookReadStatus();
      if (unreadOrRead.classList.contains("read-button")) {
        unreadOrRead.classList.remove("read-button");
        unreadOrRead.classList.add("unread-button");
        unreadOrRead.textContent = "Unread";
      } else {
        unreadOrRead.classList.remove("unread-button");
        unreadOrRead.classList.add("read-button");
        unreadOrRead.textContent = "Read";
      }
    });
    bookCardButtonsContainer.appendChild(unreadOrRead);

    let bookRemoveButton = document.createElement("button");
    bookRemoveButton.classList.add("book-card-remove-button");
    bookRemoveButton.textContent = "Remove";
	  bookRemoveButton.addEventListener("click", () => {
		  bookCard.remove();
  		myLibrary.splice(myLibrary.indexOf(book), 1);
	  	console.log(myLibrary);
	  });
	  bookCardButtonsContainer.appendChild(bookRemoveButton);
  }


  newBookForm.addEventListener("submit", (event) => {
    let title = document.querySelector("#book-title").value;
    let author = document.querySelector("#author").value;
    let numberPages = document.querySelector("#number-pages").value;
    let unreadOrRead = document.querySelector("#unread-or-read");
    if (unreadOrRead.checked) {
      unreadOrRead = "Yes";
    } else {
      unreadOrRead = "No";
    }
    addBookToLibrary(title, author, numberPages, unreadOrRead);
    event.preventDefault();
    newBookForm.classList.remove("open-new-form");
    newBookForm.reset();
  });