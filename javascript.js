const library = [];

const form = document.querySelector("form");

form.addEventListener('submit', (e) => {
    e.preventDefault();
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


const table = document.querySelector("#library-table");
const tableBody = table.querySelector("tbody");

function populateBookList() {
    tableBody.innerHTML = "";
    for (let book of library) {
        const entry = `<tr data-id="${book.id}">
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.read}</td>
                    <td>${book.id}</td>
                    <td><button class="btn-read">Read</button><button class="btn-delete">Delete</button></td>
                    </tr>`;
        tableBody.innerHTML += (entry);
    }

    for (let book of library) {
        const row = tableBody.querySelector(`[data-id="${book.id}"]`);
        const btnRead = row.querySelector(".btn-read");
        btnRead.addEventListener('click', () => {
            book.read = !book.read;
            populateBookList();
        });

        const btnDelete = row.querySelector(".btn-delete");
        btnDelete.addEventListener('click', () => {
            const index = library.indexOf(book);
            library.splice(index, 1);
            populateBookList();
        });
    }
}

populateBookList();

