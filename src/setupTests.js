// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// jsdom has never implemented IntersectionObserver
// (https://github.com/jsdom/jsdom/issues/2032). The `motion` library's
// `whileInView`/viewport features require it.
//
// This stub reports the observed element as intersecting immediately and
// synchronously, so components using `whileInView` reach their `visible`
// variant under test. A no-op stub would let every reveal assertion pass
// vacuously, which is worse than having no stub at all.
if (typeof window !== 'undefined' && !window.IntersectionObserver) {
  class MockIntersectionObserver {
    constructor(callback) {
      this.callback = callback;
    }

    observe(target) {
      this.callback(
        [{ target, isIntersecting: true, intersectionRatio: 1 }],
        this
      );
    }

    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }

  window.IntersectionObserver = MockIntersectionObserver;
  global.IntersectionObserver = MockIntersectionObserver;
}
