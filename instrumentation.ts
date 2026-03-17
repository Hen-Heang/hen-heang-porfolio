export async function register() {
    // Node.js 22+ exposes a partial localStorage global when --localstorage-file
    // is passed without a valid path (done by Next.js/Turbopack). This creates a
    // broken localStorage where getItem/setItem are not callable, causing next-themes
    // to crash during SSR. Patch it to a safe no-op implementation.
    if (
        typeof localStorage !== "undefined" &&
        typeof localStorage.getItem !== "function"
    ) {
        Object.defineProperty(globalThis, "localStorage", {
            value: {
                getItem: () => null,
                setItem: () => {},
                removeItem: () => {},
                clear: () => {},
                key: () => null,
                length: 0,
            },
            configurable: true,
            writable: true,
        })
    }
}
