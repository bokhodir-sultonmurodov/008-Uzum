


const BASE_URL = "https://dummyjson.com"
// const loadingEl = document.querySelector(".loading")
const skeletonEl = document.querySelector(".skeleton")
const wrapperEl = document.querySelector(".wrapper")

function renderRecipe(data) {
    const fragment = document.createDocumentFragment()
    
    data.products.forEach((recipe) => {
        let card = document.createElement("div")
        card.className = "card"
        card.dataset.id = recipe.id
        card.innerHTML = `
            <img name="card-image" src="${recipe.thumbnail}" alt="${recipe.title}">
            <h3>${recipe.title}</h3>
            <p>${recipe.category}</p>`
        
        fragment.appendChild(card)
    })

    wrapperEl.appendChild(fragment)
}

function fetchData(endpoint) {
    fetch(`${BASE_URL}${endpoint}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error("Something went wrong :(")
            }
            return res.json()
        })
        .then((data) => {
            renderRecipe(data)
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            // loadingEl.style.display = "none"
            skeletonEl.style.display = "none"
        })
}

function renderSkeleton(count) {
    const fragment = document.createDocumentFragment()
    Array(count).fill("").forEach(() => {
        let skeletonItem = document.createElement("div")
        skeletonItem.className = "skeleton__item"
        skeletonItem.innerHTML = `
            <div class="skeleton__image skeleton__animation"></div>
            <div class="skeleton__text skeleton__animation"></div>
            <div class="skeleton__text skeleton__animation"></div>`
        
        fragment.appendChild(skeletonItem)
    })
    skeletonEl.appendChild(fragment)
}

window.addEventListener("load", () => {
    renderSkeleton(20)
    fetchData("/products")
})

wrapperEl.addEventListener("click", (event) => {
    let name = event.target.name
    if (name === "card-image") {
        const id = event.target.closest(".card").dataset.id
        open(`/pages/recipe.html?q=${id}`, "_self")
    }
})




