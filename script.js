const mainButtonsContainer = document.querySelector("#main-buttons-container");
const addBookButton = document.querySelector("#add-book-button");
const showBooksButton = document.querySelector("#show-books-button");
const booksContainer = document.querySelector("#books-container");

const addBookDialog = document.querySelector("#add-book-dialog");
const addBookForm = document.querySelector("#add-book-form");

const bookNameInput = document.querySelector("#book-name");
const bookAuthorInput = document.querySelector("#book-author");
const bookPagesInput = document.querySelector("#book-pages");

// const submitFormButton = document.querySelector("#submit-form-button");
const closeDialogButton = document.querySelector("#close-dialog-button");

addBookButton.addEventListener("click", () => {
    addBookDialog.showModal(); // Show the dialog box and prevent background interactions, put all focus on the dialog box
});

showBooksButton.addEventListener("click", () => {
    showBooks();
});

addBookForm.addEventListener("submit", function(e) {
    e.preventDefault(); // By default, the form will be sent to a sever that does not exist

    let bookName = bookNameInput.value;
    let bookAuthor = bookAuthorInput.value;
    let bookPages = bookPagesInput.value;

    console.log("Submitted " + bookName + ", " + bookAuthor + ", " + bookPages);

    bookNameInput.value = "";
    bookAuthorInput.value = "";
    bookPagesInput.value = "";

    addBookDialog.close();

    addBook(bookName, bookAuthor, bookPages);

});

closeDialogButton.addEventListener("click", () => {
    addBookDialog.close();
});

class Book {
    constructor (bookName = "Book", bookAuthor = "John Doe", bookPages = 100) {
        this.bookName = bookName;
        this.bookAuthor = bookAuthor;
        this.bookPages = bookPages;
        this.readStatus = false;
        this.bookId = crypto.randomUUID();
        this.printBookInformation = function () {
            return bookName + " by " + bookAuthor + ", " + bookPages + " pages in total";
        }
    }
}

Book.prototype.toggleReadStatus = function() {this.readStatus = !this.readStatus;}

const Library = [];

function addBook(bookName, bookAuthor, bookPages) {
    let book = new Book(bookName, bookAuthor, bookPages);
    Library.push(book);

    console.log(Library);
}

function showBooks() {

    booksContainer.innerHTML = "";
    
    let newButtons = document.querySelectorAll(".new-buttons");
    newButtons.forEach(button => button.remove());

    for (let i = 0; i < Library.length; i++) {

        let bookContainer = document.createElement("div");
        let bookInformation = document.createElement("p");

        let readStatusText = document.createElement("label");
        readStatusText.textContent = "Read";
        let readStatusCheckBox = document.createElement("input");
        readStatusCheckBox.setAttribute("type", "checkbox");

        let removeBookButton = document.createElement("button");
        removeBookButton.textContent = "Remove";

        bookInformation.textContent = Library[i].printBookInformation();
        
        bookContainer.appendChild(bookInformation);
        bookContainer.appendChild(readStatusText);
        bookContainer.appendChild(readStatusCheckBox);
        bookContainer.appendChild(removeBookButton);

        booksContainer.appendChild(bookContainer);

        removeBookButton.addEventListener("click", () => {
            bookContainer.remove();
            Library.splice(i, 1); // Remove the book for the specifc index from the Library array
        });

        readStatusCheckBox.checked = Library[i].readStatus;

        readStatusCheckBox.addEventListener("change", () => {
            Library[i].toggleReadStatus();
            readStatusCheckBox.checked = Library[i].readStatus;
        }); 

    }

    let clearButton = document.createElement("button");
    clearButton.textContent = "Clear Page";

    let removeAllButton = document.createElement("button");
    removeAllButton.textContent = "Remove All";
    
    if (Library.length != 0) {
        mainButtonsContainer.appendChild(clearButton);
        mainButtonsContainer.appendChild(removeAllButton);
    }
        
    clearButton.classList.add("new-buttons");
    removeAllButton.classList.add("new-buttons");

    clearButton.addEventListener("click", () => {
        booksContainer.innerHTML = "";
        newButtons = document.querySelectorAll(".new-buttons");
        newButtons.forEach(button => button.remove());
    });

    removeAllButton.addEventListener("click", () => {
        booksContainer.innerHTML = "";
        Library.length = 0;
        newButtons = document.querySelectorAll(".new-buttons");
        newButtons.forEach(button => button.remove());
    });

}
