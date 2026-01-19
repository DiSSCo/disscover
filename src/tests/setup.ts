import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { vi, afterEach } from 'vitest';

/* Manually call cleanup after each test to prevent memory leaks and ensure a fresh DOM for every test */
afterEach(() => {
    cleanup();
});

/* Very specific Radix mock setup to check if PointerEvent exists and if not, to mock it */
if (!globalThis.PointerEvent) {
    class PointerEvent extends MouseEvent {
        constructor(type: string, params: PointerEventInit = {}) {
            super(type, params);
        }
    }
    globalThis.PointerEvent = PointerEvent as any;
}
  
/* Very specific Radix mock setup to mock the use of ResizeObserver for positioning */
globalThis.ResizeObserver = class ResizeObserver {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
};

/* Mock pointer events through vitest for Radix as well */
globalThis.HTMLElement.prototype.scrollIntoView = vi.fn();
globalThis.HTMLElement.prototype.hasPointerCapture = vi.fn();
globalThis.HTMLElement.prototype.releasePointerCapture = vi.fn();