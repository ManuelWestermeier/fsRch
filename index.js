const searchInput = document.querySelector("input")
const optionsElement = document.getElementById("options")
const submitForm = document.querySelector("form")
const currentSearchEngine = localStorage.getItem("c-s-e")
    || "https://www.startpage.com/search"

const urls = [
    ["GOOGLE", "https://www.google.com/search"],
    ["DUCKDUCKGO", "https://duckduckgo.com/?t=h_&ia=web"],
    ["BING", "https://www.bing.com/"],
    ["STARTPAGE", "https://www.startpage.com/search"]
]

function update() {
    optionsElement.innerHTML = ""
    urls.forEach(([name, url]) => {
        if (currentSearchEngine == url)
            submitForm.action = url
        optionsElement.innerHTML += `<button title='${url}' ${currentSearchEngine == url ? `class="active"` : ""} onclick="goto('${url}')">
                ${name}
            </button>`
    })
}

function goto(base) {
    localStorage.setItem("c-s-e", base)
    const url = new URL(base)
    url.searchParams.set("q", searchInput.value)
    window.location = url.toString()
}

update()

searchInput.focus()
searchInput.value = localStorage.getItem("last-searched") || ""
searchInput.addEventListener("input", e => localStorage.setItem("last-searched", e.target.value))
onblur = () => searchInput.focus()