window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");

    loader.classList.add("loader--hidden");

    loader.addEventListener("transitionend", () => {
        if (loader.parentNode) {
            loader.parentNode.removeChild(loader);
        }
    });
});
