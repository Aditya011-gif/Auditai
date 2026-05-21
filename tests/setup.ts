import "@testing-library/jest-dom/vitest";

class IntersectionObserverMock {
  observe = () => undefined;
  disconnect = () => undefined;
  unobserve = () => undefined;
  takeRecords = () => [];
}

Object.defineProperty(globalThis, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserverMock
});
