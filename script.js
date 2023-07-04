const form = document.querySelector('form');
const section = document.querySelector('section');
const books = JSON.parse(localStorage.getItem('Books')) || [];
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
    for (let i = 0; i < books.length; i += 1) {
      if (books[i].id === event.target.id) {
        books.splice(i, 1);
        displayBooks();
        break;
      }
    }
  }
}
section.addEventListener('click', removeBook);
form.addEventListener('submit', addBook);
displayBooks();