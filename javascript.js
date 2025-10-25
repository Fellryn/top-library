const library = [];

const form = document.querySelector("form");

form.addEventListener('submit', (e) => {
    // e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    if (data.author === "" || data.title === "") {
        alert("Please enter a title and author.");
        e.preventDefault();
        return;
    }

    const newBook = new Book(data.title, data.author, data.hasOwnProperty("read"));
    addBookToLibrary(newBook);
    populateBookList();
    form.reset();
});

function Book(title, author, read) {
    this.title = title;
    this.author = author;
    this.read = read;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(book) {
    library.push(book);        
}

const book1 = new Book("The Expanse", "James S. A. Corey", false);
addBookToLibrary(book1);

const book2 = new Book("The Three-Body Problem", "Liu Cixin", true);
addBookToLibrary(book2);

const book3 = new Book("Dune", "Frank Herbert", true);
addBookToLibrary(book3);

const book4 = new Book("Neuromancer", "William Gibson", false);
addBookToLibrary(book4);

const book5 = new Book("Snow Crash", "Neal Stephenson", true);
addBookToLibrary(book5);

const book6 = new Book("Foundation", "Isaac Asimov", false);
addBookToLibrary(book6);

const book7 = new Book("Hyperion", "Dan Simmons", true);
addBookToLibrary(book7);

const book8 = new Book("Brave New World", "Aldous Huxley", false);
addBookToLibrary(book8);


const dialog = document.querySelector("#dialog");
const showButton = document.querySelector("#add-book");
const closeButton = document.querySelector("#form > .btn-delete");

showButton.addEventListener('click', () => {
    dialog.showModal();
});

closeButton.addEventListener('click', () => {
    dialog.close();
});

const grid = document.querySelector(".grid");

function populateBookList() {
    grid.innerHTML = "";
    for (let book of library) {
        const entry = `<div class="card" data-id="${book.id}">
                        <div><h3>${book.title}</h3></div>
                        <div>${book.author}</div>
                        <div>${book.read === true ? "Read" : "Not Read"}</div>
                        <div><button class="btn-read">Read</button><button class="btn-delete">Delete</button></div>
                        </div>`;
        grid.innerHTML += (entry);
    }

    for (let book of library) {
        const card = grid.querySelector(`[data-id="${book.id}"]`);
        
        const btnRead = card.querySelector(".btn-read");
        btnRead.addEventListener('click', () => {
            book.read = !book.read;
            populateBookList();
        });

        const btnDelete = card.querySelector(".btn-delete");
        btnDelete.addEventListener('click', () => {
            const index = library.indexOf(book);
            library.splice(index, 1);
            populateBookList();
        });
    }
}

populateBookList();

