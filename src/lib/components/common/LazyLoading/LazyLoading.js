// @ts-nocheck
let options = {
    root: null,
    rootMargin: "0px",
    threshold: 0,
};

export const lazyLoad = (image, src) => {
    let currentSrc = src; // Track the current src
    let observer;

    const loaded = () => {
        image.style.opacity = "1"; // Apply animation
    };

    const loadImage = () => {
        if (image.src !== currentSrc) {
            image.src = currentSrc; // Set new src
            if (image.complete) {
                loaded();
            } else {
                image.addEventListener('load', loaded, { once: true }); // Ensure it's only called once
            }
        }
    };

    const createObserver = () => {
        observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                loadImage();
            }
        }, options);
        observer.observe(image);
    };

    createObserver();

    return {
        update(newSrc) {
            if (newSrc !== currentSrc) {
                currentSrc = newSrc;
                observer.disconnect(); // Disconnect old observer
                createObserver(); // Create a new observer for the updated src
            }
        },
        destroy() {
            observer.disconnect(); // Clean up the observer
            image.removeEventListener('load', loaded); // Remove event listener
        },
    };
};