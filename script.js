const form = document.querySelector('form');
const section = document.querySelector('section');
let books = JSON.parse(localStorage.getItem('Books')) || [];
function storeBooks() {
  localStorage.setItem('Books', JSON.stringify(books));
}
function displayBooks() {
  section.innerHTML = '';
  const fragment = new DocumentFragment();
  books.forEach((book) => {
    const article = document.createElement('article');
    let articleHTML = `<p>${book.title}</p>`;
    articleHTML += `<p>${book.author}</p>`;
    articleHTML += `<button id="${book.id}">Remove</button>`;
    articleHTML += '<hr>';
    article.innerHTML = articleHTML;
    fragment.appendChild(article);
  });
  section.appendChild(fragment);
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
section.addEventListener('click', removeBook);
form.addEventListener('submit', addBook);
displayBooks();