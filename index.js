baseURL = "http://localhost:3000"
recipeURL = `${baseURL}/recipes`

fetch(recipeURL)
    .then (response => response.json)
    .then(showRecipes)

function getRecipes(recipe) {
    recipe.forEach(recipe => {
        const h3 = document.createElement(h3)
        h3.innerText  = `<a href ='show.html?id=${recipe.id}'>${recipe.name}</a>`
        body.main.appendChild(h3)
    })
}