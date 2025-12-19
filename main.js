/*JS Calls*/
let newFormBtn = document.getElementById("new-form-btn");
let formDiv = document.getElementById("form-div");
let newBookForm = document.getElementById("new-book-form");
let addBookBtn = document.getElementById("add-book-btn");
let closeFormBtn = document.getElementById("close-form-btn");
let booksContainer = document.querySelector(".books-container");

const titleInput = document.getElementById("book-title");
const authorInput = document.getElementById("author");

const titleError = titleInput.nextElementSibling;
const authorError = authorInput.nextElementSibling;

const myLibrary = [];

/*Open Form*/
newFormBtn.addEventListener('click', openForm);

function openForm() {
  newBookForm.classList.add("open-new-form");
  document.getElementById("book-title").focus();
  titleError.textContent = '';
  authorError.textContent = '';
}

/*Close Form*/
closeFormBtn.addEventListener('click', closeForm);

function closeForm() {
  newBookForm.classList.remove("open-new-form");
  newBookForm.reset();
}

/*Check book status*/
let bookCheck = {
  bookReadStatus: function() {
    if (this.unreadOrRead === "Yes") {
      this.unreadOrRead = "No";
    } else {
      this.unreadOrRead = "Yes";
    }
  }
}
/*Create books using form data*/
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

/*Add book to Library*/
function addBookToLibrary(title, author, numberPages, unreadOrRead) {  
    let book = new createBook(title, author, numberPages, unreadOrRead);
    myLibrary.push(book);
    createBookCard(book);
    return myLibrary;
  }

/*Example book*/
addBookToLibrary("Example Book The Hobbit", "J.R.R. Tolkien", 295, "No");

/*Create and add bood card to library*/
function createBookCard(book) {

  /*create card for book*/
    let bookCard = document.createElement("div");
    bookCard.classList.add("card");
    bookCard.id = book.id;
    booksContainer.appendChild(bookCard);
  
  /*add book title to card*/
    let bookTitle = document.createElement("p");
    bookTitle.classList.add("book-title");
    bookTitle.textContent = book.title;
    bookCard.appendChild(bookTitle);
  
  /*add author to card*/
    let author = document.createElement("p");
    author.classList.add("author");
    author.textContent = "by " + book.author;
    bookCard.appendChild(author);
  
  /*add number of pages to card*/
    let numberPages = document.createElement("p");
    numberPages.classList.add("number-pages");
    if(!book.numberPages) {
      numberPages.textContent = "N/A pages";
    } else {
      numberPages.textContent = book.numberPages + " pages";
    }
    bookCard.appendChild(numberPages);
  
  /*add to buttons container to card*/
    let bookCardButtonsContainer = document.createElement("div");
    bookCardButtonsContainer.classList.add("book-card-buttons-container");
    bookCard.appendChild(bookCardButtonsContainer);
  
  /*add buttons to container on card about read or unread*/
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

  /*add remove button to buttons container on card*/
    let bookRemoveButton = document.createElement("button");
    bookRemoveButton.classList.add("book-card-remove-button");
    bookRemoveButton.textContent = "Remove";
	  bookRemoveButton.addEventListener("click", () => {
		  bookCard.remove();
  		myLibrary.splice(myLibrary.indexOf(book), 1);
	  });
	  bookCardButtonsContainer.appendChild(bookRemoveButton);
  }

function showError(inputElement, errorSpan) {
  errorSpan.textContent = '';
  if (inputElement.validity.valueMissing) {
    // If empty
    errorSpan.textContent = "Please enter " + `${inputElement.name}` + ".";
  } else if (inputElement.validity.tooShort) {
    // If too short,
    errorSpan.textContent = `${inputElement.name.charAt(0).toUpperCase() + inputElement.name.slice(1)}` + " should be at least " + `${inputElement.minLength}` + " characters.";
  } else if (inputElement.validity.tooLong) {
    //If too long
    errorSpan.textContent = `${inputElement.name.charAt(0).toUpperCase() + inputElement.name.slice(1)}` + " should be less than " + `${inputElement.maxLength}`+ " characters.";
  } else{
            // Handle any other potential errors (e.g., typeMismatch if input type was email)
            errorSpan.textContent = "Entered value for " + `${inputElement.id}` + " is invalid.";
  }
  // Add the `active` class
  errorSpan.className = "error active";
}

titleInput.addEventListener("input",() => {
  if (titleInput.validity.valid) {
    titleError.textContent = ""; // Remove the message content
    titleError.className = "error"; // Removes the `active` class
  } else {
    // If there is still an error, show the correct error
    showError(titleInput, titleError);
  }
});

authorInput.addEventListener("input",() => {
  if (authorInput.validity.valid) {
    authorError.textContent = ""; // Remove the message content
    authorError.className = "error"; // Removes the `active` class
  } else {
    // If there is still an error, show the correct error
    showError(authorInput, authorError);
  }
});

/*Submit event for form*/
  addBookBtn.addEventListener("click", (event) => {
    if (!titleInput.validity.valid) {
        // If either is invalid, show their respective errors immediately
        showError(titleInput, titleError);
        // Prevent form submission if validation fails
        event.preventDefault();
        return;
    }
    if (!authorInput.validity.valid){
        showError(authorInput, authorError);
        // Prevent form submission if validation fails
        event.preventDefault();
        return;
    }
    //proceeds if above is valid
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