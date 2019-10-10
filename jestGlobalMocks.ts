/**
 * ISSUE: https://github.com/angular/material2/issues/7101
 * Workaround for JSDOM missing transform property
 */

import 'babel-polyfill';
import 'jest-preset-angular';

Object.defineProperty(document.body.style, 'transform', {
    value: () => {
        return {
            enumerable: true,
            configurable: true,
        };
    },
});


Object.defineProperty(window, 'getComputedStyle', {
    value: () => ['-webkit-appearance']
});

const mock = () => {
    let storage = {};
    return {
        getItem: key => key in storage ? storage[key] : null,
        setItem: (key, value) => storage[key] = value || '',
        removeItem: key => delete storage[key],
        clear: () => storage = {},
    };
};


Object.defineProperty(window, 'CSS', { value: null });
Object.defineProperty(document, 'doctype', {
    value: '<!DOCTYPE html>'
});

Object.defineProperty(window, 'localStorage', {value: mock()});
Object.defineProperty(window, 'sessionStorage', {value: mock()});



Object.defineProperty(Element.prototype, 'innerText', {
    get: function() {
        return this.innerHTML.replace(/<[^>]+>/g, '').trim();
    },
    set: function(val) {
        this.innerHTML = val;
    }
});

Element.prototype.closest = function(s) {
    let el = this;
    if(!document.documentElement.contains(el)) {
        return null;
    }
    do {
        if(el.matches(s)) {
            return el;
        }
        el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
}
