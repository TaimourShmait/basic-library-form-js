// Main DOM elements and Event Listeners

const mainButtonsContainer = document.querySelector("#main-buttons-container");
const booksContainer = document.querySelector("#books-container");
const addBookForm = document.querySelector("#add-book-form");

const bookNameInput = document.querySelector("#book-name");
const bookAuthorInput = document.querySelector("#book-author");
const bookPagesInput = document.querySelector("#book-pages");
const bookGenreInput = document.querySelectorAll('input[name="book-genre"]');

const booksTable = document.querySelector("#books-table");

addBookForm.addEventListener("submit", function(e) {
    e.preventDefault(); // By default, the form will be sent to a sever that does not exist

    let bookName = bookNameInput.value;
    let bookAuthor = bookAuthorInput.value;
    let bookPages = bookPagesInput.value;   
    let bookGenre;

    bookGenreInput.forEach(radio => {if (radio.checked) {bookGenre = radio.value;}});

    console.log("Submitted " + bookName + ", " + bookAuthor + ", " + bookGenre + ", " + bookPages);

    bookNameInput.value = "";
    bookAuthorInput.value = "";
    bookPagesInput.value = "";
    bookGenreInput.forEach(radio => {radio.checked = false});


    addBook(bookName, bookAuthor, bookPages, bookGenre);

});

class Book {
    constructor (bookName = "Book", bookAuthor = "John Doe", bookPages = 100, bookGenre = "Fiction") {
        this.bookName = bookName;
        this.bookAuthor = bookAuthor;
        this.bookGenre = bookGenre;
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

function addBook(bookName, bookAuthor, bookPages, bookGenre) {
    console.log("Reached addBook function");
    let book = new Book(bookName, bookAuthor, bookGenre, bookPages);
    Library.push(book);

    console.log(Library);

    showBooks();
}

function showBooks() {

    booksContainer.style.display = "flex";

    while (booksTable.rows.length > 1) {
        booksTable.deleteRow(1);
    }

    for (let i = 0; i < Library.length; i++) {

        console.log(Library[i].bookPages + " in the showBooks function!");

        let bookContainer = document.createElement("tr");
        bookContainer.id = "book-container";

        let name = document.createElement("th");
        let author = document.createElement("th");
        let pageCount = document.createElement("th");
        let genre = document.createElement("th");
        let read = document.createElement("th");
        
        let readStatusCheckBox = document.createElement("input");
        readStatusCheckBox.setAttribute("type", "checkbox");

        read.appendChild(readStatusCheckBox);

        name.textContent = Library[i].bookName;
        author.textContent = Library[i].bookAuthor;
        pageCount.textContent = Library[i].bookPages;
        genre.textContent = Library[i].bookGenre;
        
        bookContainer.appendChild(name);
        bookContainer.appendChild(author);
        bookContainer.appendChild(pageCount);
        bookContainer.appendChild(genre);
        bookContainer.appendChild(read);

        booksTable.appendChild(bookContainer);

        readStatusCheckBox.checked = Library[i].readStatus;

        readStatusCheckBox.addEventListener("change", () => {
            Library[i].toggleReadStatus();
            readStatusCheckBox.checked = Library[i].readStatus;
        }); 

    }

}
