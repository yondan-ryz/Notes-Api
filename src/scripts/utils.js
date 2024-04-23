class Utils {
  static showElement(element) {
    element.style.display = 'block';
    element.hidden = false;
  }

  static hideElement(element) {
    element.style.display = 'none';
    element.hidden = true;
  }

  static isValidInteger(newValue) {
      return Number.isNaN(newValue) || Number.isFinite(newValue);
    }
  }
  
  export default Utils;
  