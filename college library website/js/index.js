function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

function Display() {

}

Display.prototype.add = function(book){
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

Display.prototype.showInTable = function(){
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
Display.prototype.clear = function(){
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
}
Display.prototype.validate = function(book){
    if(book.name.length<2 || book.author.length<2){
        return false;
    }
    else{
        return true;
    }
}
Display.prototype.show = function(type, displayMessage){
    let message = document.getElementById('message');
    message.innerHTML = `
                <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                    <strong>Messge:</strong> ${displayMessage}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">×</span>
                    </button>
                </div>`
    setTimeout(() =>{
        message.innerHTML="";
    },2000);
}

let display = new Display();
display.showInTable();

let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    e.preventDefault();
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;

    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');

    let type;
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
    let display = new Display();

    if(display.validate(book)){
        display.add(book);
        display.showInTable();
        display.clear();
        display.show('success', 'Your book has been successfully added');
    }
    else{
        display.show('danger', 'Sorry you cannot add this book');
    }
    
}