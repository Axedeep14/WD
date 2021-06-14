console.log('This is ES6 version of Project 2');
class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

class Display {
    add(book) {
        let books = localStorage.getItem("books");
    if (books == null) {
        booksObj = [];
    }
    else {
        booksObj = JSON.parse(books);
    }
    let myBook = {
        name: book.name,
        author: book.author,
        type: book.type
    }
    console.log(myBook);
    booksObj.push(myBook);
    localStorage.setItem("books", JSON.stringify(booksObj));
    }

    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }

    validate(book) {
        if (book.name.length < 2 || book.author.length < 2) {
            return false
        }
        else {
            return true;
        }
    }

    show(type, displayMessage) {
        let message = document.getElementById('message');
        let boldText;
        if(type==='success'){
            boldText = 'Success';
        }
        else{
            boldText = 'Error!';
        }
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>${boldText}:</strong> ${displayMessage}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>`;
        setTimeout(function () {
            message.innerHTML = ''
        }, 5000);
    
    }
    showInTable(){
        let books = localStorage.getItem("books");
        if (books == null) {
            booksObj = [];
        }
        else {
            booksObj = JSON.parse(books);
        }
        let html = "";
        booksObj.forEach(function (element, index) {
            html += `
            <tr>
                <td>${element.name}</td>
                <td>${element.author}</td>
                <td>${element.type}</td>
                <td><button id="${index}" onclick="deleteBook(this.id)" class="btn btn-primary">Delete Note</button></td>
            </tr>
                `;
        });
        let tableBody = document.getElementById('tableBody');
        if (booksObj.length != 0) {
            tableBody.innerHTML = html;
        }
        else {
            tableBody.innerHTML = `Nothing to show! Use add note `
        }
    }
}

function deleteBook(index) {
    let books = localStorage.getItem("books");
    if (books == null) {
        booksObj = [];
    }
    else {
        booksObj = JSON.parse(books);
    }
    booksObj.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(booksObj));
    display.showInTable();
}

let display = new Display();
display.showInTable();

// Add submit event listener to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log('YOu have submitted library form');
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');

    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }

    let book = new Book(name, author, type);
    console.log(book);

    let display = new Display();

    if (display.validate(book)) {

        display.add(book);
        display.showInTable();
        display.clear();
        display.show('success', 'Your book has been successfully added')
    }
    else {
        // Show error to the user
        display.show('danger', 'Sorry you cannot add this book');
    }

    e.preventDefault();
}
