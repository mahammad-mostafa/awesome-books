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
const pages = ['#list', '#add', '#contact'];
const menu = document.querySelector('.header-menu');
const links = document.querySelectorAll('.header-menu a');
const contents = document.querySelectorAll('.content');
const list = document.querySelector('.content-list');
const form = document.querySelector('.content-form');
function displayContent(hash) {
  pages.forEach((page) => {
    const link = links[pages.indexOf(page)];
    const content = contents[pages.indexOf(page)];
    if (page === hash && content.classList.contains('visible') === false) {
      link.classList.add('active');
      content.classList.add('visible');
    } else if (content.classList.contains('visible')) {
      link.classList.remove('active');
      content.classList.remove('visible');
    }
  });
}
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
function contentEvent(event) {
  event.preventDefault();
  if (event.target.hash !== '') {
    displayContent(event.target.hash);
  }
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
menu.addEventListener('click', contentEvent);
list.addEventListener('click', removeEvent);
form.addEventListener('submit', addEvent);
displayContent('#list');
displayBooks();