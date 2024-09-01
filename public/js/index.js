const container = document.querySelector(".container")
window.addEventListener("scroll", (e) => {
    if (window.scrollY > 200) {
        const arrowDown = document.querySelector(".arrow-down")
        arrowDown.classList.remove("hidden")
    }
})