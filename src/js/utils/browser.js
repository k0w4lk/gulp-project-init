import { FormHandler, isValid, sendData } from './functions.js';

const formHandler = new FormHandler(isValid, (name) =>
  sendData(name, (data) => localStorage.setItem('name', data)),
);

export const createFormHtml = (document) => {
  const bodyElement = document.querySelector('body');
  const formElement = document.createElement('form');
  formElement.classList.add('form');
  const inputElement = document.createElement('input');
  inputElement.classList.add('input');
  inputElement.attributes.placeholder = 'Имя';
  const buttonElement = document.createElement('button');
  buttonElement.classList.add('button');
  buttonElement.innerText = 'Отправить';
  formElement.append(inputElement, buttonElement);
  bodyElement.appendChild(formElement);
};

document.addEventListener('DOMContentLoaded', () => {
  createFormHtml(document);
  const formElement = document.querySelector('.form');
  formElement.addEventListener('submit', (event) => {
    event.preventDefault();
    formHandler.onSubmit(document.querySelector('.input').value);
  });
});
