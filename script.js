class Books {
  bookList = [];

  constructor() {
    this.bookList = JSON.parse(localStorage.getItem('Books')) || [];
  }

  addBook(book) {
    this.bookList.push(book);
    this.storeList();
  }

  removeBook(id) {
    this.bookList = this.bookList.filter((book) => book.id !== id);
    this.storeList();
  }

  storeList() {
    localStorage.setItem('Books', JSON.stringify(this.bookList));
  }
}
const books = new Books();
const list = document.querySelector('.list');
const form = document.querySelector('.form');
function displayBooks() {
  list.innerHTML = '';
  const fragment = new DocumentFragment();
  books.bookList.forEach((book) => {
    const item = document.createElement('li');
    let itemHTML = `<p>"${book.title}" by ${book.author}</p>`;
    itemHTML += `<button id="${book.id}">Remove</button>`;
    item.innerHTML = itemHTML;
    fragment.appendChild(item);
  });
  list.appendChild(fragment);
}
function addEvent(event) {
  event.preventDefault();
  books.addBook({ id: `${Date.now()}`, title: form.title.value, author: form.author.value });
  displayBooks();
  form.reset();
}
function removeEvent(event) {
  if (event.target.id !== '') {
    books.removeBook(event.target.id);
    displayBooks();
  }
}
list.addEventListener('click', removeEvent);
form.addEventListener('submit', addEvent);
displayBooks();