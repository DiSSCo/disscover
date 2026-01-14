import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { vi, afterEach } from 'vitest';

// Manually call cleanup after each test to prevent memory leaks 
// and ensure a fresh DOM for every test.
afterEach(() => {
    cleanup();
});

/* Very specific Radix mock setup */
// Check if PointerEvent exists, if not, mock it
if (!globalThis.PointerEvent) {
    class PointerEvent extends MouseEvent {
        constructor(type: string, params: PointerEventInit = {}) {
            super(type, params);
        }
    }
    globalThis.PointerEvent = PointerEvent as any;
}
  
// Radix uses ResizeObserver for positioning, so we mock them with vitest
globalThis.ResizeObserver = class ResizeObserver {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
};

// Mock pointer events through vitest
globalThis.HTMLElement.prototype.scrollIntoView = vi.fn();
globalThis.HTMLElement.prototype.hasPointerCapture = vi.fn();
globalThis.HTMLElement.prototype.releasePointerCapture = vi.fn();