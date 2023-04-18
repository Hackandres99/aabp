const icon_search = document.getElementById("icon_search")
const suggestion_box = document.getElementById("suggestion_box")
const thumbnail_title = document.querySelectorAll(".thumbnail_title")
const input_search = document.getElementById("input_search")

// Searching materia from thumbnail_title
let module__titles = [],
    module__links = [],
    modules = []
thumbnail_title.forEach((e, i) => {
    module__titles[i] = e.innerText
    module__links[i] = e.parentNode.parentNode.lastElementChild.firstElementChild.getAttribute("href")
    modules[i] = { 'title': module__titles[i], 'link': module__links[i] }
})

// Removing Accents of string
const removingAccents = str => {
    let cadena = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    return cadena
}

const filter = () => {
    // Cleaning the suggestion box
    suggestion_box.innerHTML = '';
    // Reading the input value
    const text = input_search.value.toLowerCase();
    // touring the materias datas
    for (let module of modules) {
        // Extrating and formating properties from materias 
        let name = module.title,
            link = module.link,
            lower_case = name.toLowerCase(),
            upperCase = name.toUpperCase(),
            wOAccents = removingAccents(name),
            wOALC = removingAccents(name).toLowerCase()

        //  Verifiying if the search input value have match with an materia title
        if (wOALC.indexOf(text) !== -1 || wOAccents.indexOf(text) !== -1 ||
            lower_case.indexOf(text) !== -1 || upperCase.indexOf(text) !== -1) {
            suggestion_box.innerHTML += `
            <li><a href="${link}"><i class="fas fa-search"></i>${name}</a></li>`
        }
    }
    // Adding deffault message if there's no matches
    if (suggestion_box.innerHTML === '') {
        suggestion_box.innerHTML += `
            <li><a href=""><i class="fas fa-search"></i>Modulo no encontrado...</a></li> `
    }
    // Toggling suggestion view, if there is no text at the search input
    if (text === '') {
        suggestion_box.classList.remove("show_suggestion_box")
    } else {
        suggestion_box.classList.add("show_suggestion_box")
    }
};
// Executing filter function every time a key is pressed 
if (document.body.contains(icon_search)) {
    input_search.addEventListener("keyup", filter)
}