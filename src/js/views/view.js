import icons from 'url:../../img/icons.svg';

export default class View {
  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data  The data to be rendered (e.g recipe)
   * @param {Boolean} [render=true] If false, create and return markup string instead of rendering to the DOM
   * @returns {undefined | string} A string is returned if render is false
   * @this {Object} View instance
   * @author Amadou Seck
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderErr();
    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;

    this._clearParentElement();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    // newDOM elements are compared against newMarkup
    const newMarkup = this._generateMarkup();
    // create a virtual DOM to check changes between curr and new elements
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));

    // compare elements
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      //prettier-ignore
      // Update changed TEXT content
      if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== '') 
        curEl.textContent = newEl.textContent;

      // update changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl))
        // prettier-ignore
        Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value));
    });
  }

  _clearParentElement() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `<div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>`;
    this._clearParentElement();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderErr(message = this._errMessage) {
    const markup = `<div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>`;
    this._clearParentElement();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `<div class="message">
    <div>
      <svg>
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>`;
    this._clearParentElement();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
