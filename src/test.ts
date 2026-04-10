import 'zone.js';
import 'zone.js/testing';
import '@angular/core';
import '@angular/platform-browser';

// Polyfill for matchMedia if needed
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => {},
    }),
});
