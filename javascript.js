const library = [];

const form = document.querySelector("form");

form.addEventListener('submit', (e) => {
    // e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    if (data.author === "" || data.title === "") {
        alert("Please enter a title and author");
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

const book1 = new Book("The Expanse", "H.G. Wells", true);
addBookToLibrary(book1);

const book2 = new Book("Three Body Problem", "Some Guy", false)
addBookToLibrary(book2);

const grid = document.querySelector(".grid");

function populateBookList() {
    grid.innerHTML = "";
    for (let book of library) {
        const entry = `<div class="card" data-id="${book.id}">
                        <div>${book.title}</div>
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

