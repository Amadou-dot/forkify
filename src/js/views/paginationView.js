import View from './view';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  #prevPageMarkup(currentPage) {
    return `
        <button data-goto=${
          currentPage - 1
        } class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currentPage - 1}</span>
        </button>`;
  }

  #nextPageMarkup(currentPage) {
    return `
        <button data-goto=${
          currentPage + 1
        } class="btn--inline pagination__btn--next">
          <span>Page ${currentPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>`;
  }
  _;
  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // Page 1 + other pages
    if (currentPage === 1 && numPages > 1)
      return this.#nextPageMarkup(currentPage);

    // page between first and last
    if (currentPage < numPages)
      return (
        this.#prevPageMarkup(currentPage) + this.#nextPageMarkup(currentPage)
      );

    // last page
    if (currentPage === numPages && numPages > 1)
      return this.#prevPageMarkup(currentPage);

    // only 1 page. omit buttons
    return '';
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const gotoPage = Number(btn.dataset.goto);
      handler(gotoPage);
    });
  }
}

export default new PaginationView();
