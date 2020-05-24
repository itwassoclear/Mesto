export class FormValidator {
    constructor(form) {
      this.form = form;
      this.inputElems = this.form.querySelectorAll('input');
      this.submitButton = this.form.querySelector('button[type="submit"]');
    }
  
    checkInputValidity(event) {
      const inputElem = event.target;
      const errorElem = this.form.querySelector(`#${inputElem.name}-error`);
  
      if (inputElem.validity.valueMissing) {
        inputElem.setCustomValidity('Это поле должно быть заполнено');
      } else if (inputElem.validity.tooShort) {
        inputElem.setCustomValidity('Должно быть от 2 до 30 символов');
      } else if (inputElem.validity.typeMismatch) {
        inputElem.setCustomValidity('Здесь должна быть ссылка');
      } else {
        inputElem.setCustomValidity('');
      }
  
      errorElem.textContent = inputElem.validationMessage;
    }
  
    setSubmitButtonState() {
      if (!this.form.checkValidity()) {
        this.submitButton.classList.add('popup__button_disabled');
        this.submitButton.setAttribute('disabled', true);
      } else {
        this.submitButton.classList.remove('popup__button_disabled');
        this.submitButton.removeAttribute('disabled');
      }
    }
  
    setEventListeners() {
      this.inputElems.forEach(inputElem => {
        inputElem.addEventListener('input', this.checkInputValidity.bind(this));
      });
      this.form.addEventListener('input', this.setSubmitButtonState.bind(this));
    }
}