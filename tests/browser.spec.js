import { createFormHtml } from '../src/js/utils/browser.js';

describe('Tests', () => {
  describe('createFormHtml', () => {
    createFormHtml(document);
    const formElement = document.querySelector('form');
    const inputElement = document.querySelector('input');
    const buttonElement = document.querySelector('button');
    it('Html form should be created', () => {
      expect(formElement).toBeTruthy();
      expect(inputElement).toBeTruthy();
      expect(buttonElement).toBeTruthy();
    });
    it('Elements should contain correct classes', () => {
      expect(formElement.classList.contains('form')).toBeTruthy();
      expect(inputElement.classList.contains('input')).toBeTruthy();
      expect(buttonElement.classList.contains('button')).toBeTruthy();
    });
    it('Elements should contain correct inner text', () => {
      expect(inputElement.attributes.placeholder).toEqual('Имя');
      expect(buttonElement.innerText).toEqual('Отправить');
    });
  });
});
