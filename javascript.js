const library = [];

function Book(title, author, read) {
    this.title = title;
    this.author = author;
    this.read = read;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(book) {
    library.push(book);        
}

const book1 = new Book("The Expanse", "H.G. Wells", false);
addBookToLibrary(book1);

const book2 = new Book("Three Body Problem", "Some Guy", false)
addBookToLibrary(book2);

const book3 = new Book("Three Body Problem", "Some Guy", false)
addBookToLibrary(book3);

const book4 = new Book("Three Body Problem", "Some Guy", false)
addBookToLibrary(book3);


const table = document.querySelector("#library-table");
const tableBody = table.querySelector("tbody");

for (let book of library) {
    const entry = `<tr>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.read}</td>
                    <td>${book.id}</td>
                    </tr>`;
    tableBody.innerHTML += (entry);
}