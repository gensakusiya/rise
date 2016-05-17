'use strict';

let Template = function () {
};

Template.prototype = Object.create({
  /**
   * @param template {function || string} - template id or constructor function
   * @param box {object || string} - target
   */
  render(template, box) {
    let el = box;

    if (typeof box === 'string') {
      el = document.querySelector(box);
    }

    if (typeof template === 'function') {
      template = template();
    }

    el.innerHTML = template;
  }
});

export default function () {
  return new Template();
}
