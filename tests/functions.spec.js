import { isValid, sendData, FormHandler } from '../src/js/utils/functions.js';

describe('Tests', () => {
  // units
  describe('isValid', () => {
    it('Should be valid', () => {
      expect(isValid('Alex')).toBeTruthy();
    });
    it('Should be invalid with empty string', () => {
      expect(isValid('  ')).toBeFalsy();
    });
    it('Should work with undefined', () => {
      expect(isValid()).toBeFalsy();
    });
  });
  describe('sendData', () => {
    it('Should send data', () => {
      const saveFn = jest.fn();
      sendData('alex', saveFn);
      expect(saveFn).toHaveBeenCalledWith('alex');
    });
  });
  // integration
  describe('FormHandler', () => {
    it('If name is valid data should be send', () => {
      const isValidFn = jest.fn().mockImplementation(() => true);
      const sendDataFn = jest.fn();
      const formHandler = new FormHandler(isValidFn, sendDataFn);
      const name = 'asd';
      formHandler.onSubmit(name);
      expect(isValidFn).toHaveBeenCalledWith(name);
      expect(sendDataFn).toHaveBeenCalledWith(name);
    });

    it('If name is invalid data should not be send', () => {
      const isValidFn = jest.fn().mockImplementation(() => false);
      const sendDataFn = jest.fn();
      const formHandler = new FormHandler(isValidFn, sendDataFn);
      const name = 'asd';
      formHandler.onSubmit(name);
      expect(isValidFn).toHaveBeenCalledWith(name);
      expect(sendDataFn).not.toHaveBeenCalled();
    });
  });
});
