{
  'use strict';

  class BooksList {
    constructor() {
      this.favoriteBooks = [];
      this.filters = [];
      this.initData();
      this.getElements();
      this.render();
      this.initActions();
    }

    initData() {
      this.data = dataSource.books;
    }

    getElements() {
      this.bookList = document.querySelector('.books-list');
      this.templateBook = Handlebars.compile(document.querySelector('#template-book').innerHTML);
      this.filtersForm = document.querySelector('.filters');
      //this.bookImages = this.bookList.querySelectorAll('.book__image');
    }

    render() {
      for (const book of this.data) {
        const bgColour = this.setRatingBgColour(book.rating);
        const bgWidth = book.rating * 10;
        book.ratingBgc = bgColour;
        book.ratingWidth = bgWidth;
        const generatedHTML = this.templateBook(book);
        const domElem = utils.createDOMFromHTML(generatedHTML);
        this.bookList.appendChild(domElem);
      }
    }

    initActions() {
      this.bookList.addEventListener('dblclick', this.toggleFavorite.bind(this));
      this.filtersForm.addEventListener('click', this.filterBooks.bind(this));
    }

    toggleFavorite(event) {
      event.preventDefault();
      const clickedElem = event.target.offsetParent;
      if (clickedElem.classList.contains('book__image')) {
        const bookId = clickedElem.getAttribute('data-id');
        if (!this.favoriteBooks.includes(bookId)) {
          clickedElem.classList.add('favorite');
          this.favoriteBooks.push(bookId);
        } else {
          clickedElem.classList.remove('favorite');
          this.favoriteBooks.splice(this.favoriteBooks.indexOf(bookId), 1);
        }
        console.log(this.favoriteBooks);
      }
    }

    filterBooks(event) {
      const clickedElem = event.target;
      if (clickedElem.tagName === 'INPUT' && clickedElem.type === 'checkbox' && clickedElem.name === 'filter') {
        const filterValue = clickedElem.value;
        if (clickedElem.checked && !this.filters.includes(filterValue)) {
          this.filters.push(filterValue);
        } else if (!clickedElem.checked && this.filters.includes(filterValue)) {
          this.filters.splice(this.filters.indexOf(filterValue), 1);
        }
        for (const book of this.data) {
          let shouldBeHidden = false;
          for (const filter of this.filters) {
            if (!book.details[filter]) {
              shouldBeHidden = true;
              break;
            }
          }
          //
          const bookImages = this.bookList.querySelectorAll('.book__image');
          //
          for (const bookImage of bookImages) {
            if (book.id == bookImage.getAttribute('data-id')) {
              if (shouldBeHidden) {
                bookImage.classList.add('hidden');
              } else {
                bookImage.classList.remove('hidden');
              }
            }
          }
        }
      }
    }
    setRatingBgColour(rating) {
      let background;
      if (rating < 6) {
        background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      }
      if (rating > 6 && rating <= 8) {
        background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      }
      if (rating > 8 && rating <= 9) {
        background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      }
      if (rating > 9) {
        background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
      return background;
    }
  }
  const app = new BooksList();
  console.log(app);
}