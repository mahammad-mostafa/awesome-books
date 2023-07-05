const form = document.querySelector('.form');
const list = document.querySelector('.list');
let books = JSON.parse(localStorage.getItem('Books')) || [];
function storeBooks() {
  localStorage.setItem('Books', JSON.stringify(books));
}
function displayBooks() {
  list.innerHTML = '';
  const fragment = new DocumentFragment();
  books.forEach((book) => {
    const item = document.createElement('li');
    let itemHTML = `<p>"${book.title}" by ${book.author}</p>`;
    itemHTML += `<button id="${book.id}">Remove</button>`;
    item.innerHTML = itemHTML;
    fragment.appendChild(item);
  });
  list.appendChild(fragment);
  storeBooks();
}
function addBook(event) {
  event.preventDefault();
  books.push({
    id: `${Date.now()}`,
    title: form.title.value,
    author: form.author.value,
  });
  displayBooks();
  form.reset();
}
function removeBook(event) {
  if (event.target.id !== '') {
    books = books.filter((book) => book.id !== event.target.id);
    displayBooks();
  }
}
list.addEventListener('click', removeBook);
form.addEventListener('submit', addBook);
displayBooks();